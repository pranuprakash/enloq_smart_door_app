import React, { useEffect, useState } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import {  getDocs, query, where } from "firebase/firestore";
import { auth } from "../../config/firebase";
import { 
    View,
    Switch,
    StyleSheet,
    ScrollView,
    Alert,
    TouchableOpacity,
    Platform
} from "react-native";
import Theme from "../Theme";
import Header from "../../components/utils/Header";
import Typo from "../../components/Typography/Typo";
import Space from "../../components/utils/Space";
import InputBox from "../../components/utils/InputBox";
import FullButton from "../../components/Buttons/FullButton";
import {
    updateDoc,
    getDoc,
    collection,
    doc,
    arrayUnion,
    setDoc,
    onSnapshot
  } from "firebase/firestore";
import { dbFS } from "../../config/firebase";
import useStore from "../../store";
import DateTimePicker from '@react-native-community/datetimepicker';
import DoorCard from "../../components/Cards/DoorCard";

function AddGuestScreen({navigation, route}){
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [selectedDoors, setSelectedDoors] = useState([]);
    const [guestName,setGuestName] = useState('')
    const [guestEmail,setGuestEmail] = useState('')
    const [loading,setLoading] = useState(false)
    const userData = useStore((state) => state.userData);
    const doorData = useStore((state) => state.doorData); 
    const setDoorData = useStore((state) => state.setDoorData); 
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const setUserID = useStore((state) => state.setUserID);
    const [signupSuccess, setSignupSuccess] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
  
    
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate;
      setShow(false);
      setDate(currentDate);
    };

    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };

    const showDatepicker = () => {
      showMode("date");
    };


    const handleDoorSelection = (doorID) => {
        setSelectedDoors((prevSelectedDoors) => {
          if (prevSelectedDoors.includes(doorID)) {
            return prevSelectedDoors.filter((id) => id !== doorID);
          } else {
            return [...prevSelectedDoors, doorID];
          }
        });
      };
    

      const handleCreateGuestPass = async () => {
        setLoading(true);
        try {
          if (!guestEmail || !guestName || !selectedDoors) {
            Alert.alert("Please enter all the details", "", [{ text: "OK" }]);
          } else if (selectedDoors.length === 0) {
            Alert.alert("Please select door(s)", "", [{ text: "OK" }]);
          } else {
            const premisesRef = doc(dbFS, "premises", userData.premisesID);
            const linkedDoorsRef = collection(premisesRef, "linkedDoors");
      
            const existingDoors = [];
      
            // Check if the user with guestEmail already exists in the users collection
            const usersQuery = query(collection(dbFS, "users"), where("email", "==", guestEmail));
            const usersSnapshot = await getDocs(usersQuery);
      
            if (usersSnapshot.empty) {

      
      
              // Create a new user account with a temporary password
              const { user } = await createUserWithEmailAndPassword(auth, guestEmail, "123456");
      
              // Send email verification to the user
              await sendEmailVerification(user);
              await sendPasswordResetEmail(auth, guestEmail);
              const usersRef= collection(dbFS,"users")
              // const userID = user.uid
              // const userRole = "user"
              // const userDoc = { name, email, userID, userRole };
              // User does not exist, create a new user document
              const newUser = {
                name: guestName,
                email: guestEmail,
                premisesID: userData.premisesID, // Match the premisesID of the admin
                userRole: "user",
                userID: user.uid,
              };
              await setDoc(doc(usersRef, user.uid), newUser);
              setUserID(user.uid);
              setSignupSuccess(true);
            } else {
              // User already exists, update their premisesID
              const userDoc = usersSnapshot.docs[0];
              const userRef = doc(dbFS, "users", userDoc.id);
              await updateDoc(userRef, { premisesID: userData.premisesID });
            }
      
            await Promise.all(
              selectedDoors.map(async (doorId) => {
                const doorRef = doc(linkedDoorsRef, doorId);
                const doorSnapshot = await getDoc(doorRef);
      
                if (doorSnapshot.exists()) {
                  const doorData = doorSnapshot.data();
                  const doorGuests = doorData.accessPass || [];
      
                  // Check if guestEmail already exists in doorGuests
                  if (doorGuests.some((guest) => guest.guestEmail === guestEmail)) {
                    existingDoors.push(doorData.doorNickname);
                  } else {
                    await updateDoc(doorRef, {
                      accessibleBy: arrayUnion({
                        guestEmail,
                        guestName,
                        expiryDate: isEnabled ? null : date,
                        permanentAccess: isEnabled ? true : false,
                        active: true,
                      }),
                    });
                  }
                } else {
                  console.log(`Door with ID ${doorId} does not exist`);
                }
              })
            );
      
            if (existingDoors.length > 0) {
              Alert.alert(`Access already granted to ${existingDoors.join(", ")}`, "", [{ text: "OK" }]);
            } else {
              Alert.alert("Access pass created successfully", "", [{ text: "OK" }]);
      
              // Create a new guest pass document in the accessPass subcollection
              const passCollectionRef = collection(premisesRef, "accessPass");
              const newPassLink = doc(passCollectionRef, guestEmail);
      
              const addNewPass = {
                guestEmail,
                guestName,
                expiryDate: isEnabled ? null : date,
                accessibleDoors: selectedDoors,
                permanentAccess: isEnabled ? true : false,
                active: true,
              };
      
              await setDoc(newPassLink, addNewPass);
      
              navigation.goBack();
            }
          }
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
      
      useEffect(() => {
        fetchDoorData()
      }, []);
    
      const fetchDoorData = () => {
        if(doorData){
          console.log('Door Data Exists')
        }
        else {
          const linkedDoorsRef = collection(dbFS, "premises", userData.premisesID, "linkedDoors");
    
        return onSnapshot(linkedDoorsRef, (snapshot) => {
          const doorData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setDoorData(doorData);
        });
        }
      };
      
      


    return (
      <View style={styles.container}>
        <Header
          subtitle={"Issue a guest pass"}
          hasBackIcon={true}
          title={"Add Guests"}
        />
        <View style={styles.body}>
          <ScrollView>
            <View style={styles.cardFull}>
              <InputBox
                value={guestName}
                onChangeText={(text) => setGuestName(text)}
                leftIcon={"user"}
                placeholder={"Guest Name"}
              />
              <Space space={25} />
              <InputBox
                value={guestEmail}
                onChangeText={(text) => setGuestEmail(text)}
                leftIcon={"mail"}
                placeholder={"Guest Email Address"}
              />
              <Space space={15} />

              <View style={styles.picker}>
                <Typo>Permanent Access?</Typo>
                <Switch
                  trackColor={{ false: "#767577", true: Theme.primaryColor }}
                  thumbColor={isEnabled ? "#fff" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
              </View>
              <Space space={15} />

              <>
                {isEnabled ? null : Platform.OS === "ios" ? (
                  <TouchableOpacity
                    onPress={showDatepicker}
                    style={styles.picker}
                  >
                    <Typo>Pass Expiry Date :</Typo>

                    <DateTimePicker
                      testID="dateTimePicker"
                      value={date}
                      minimumDate={new Date()}
                      mode={mode}
                      is24Hour={true}
                      onChange={onChange}
                      display="calendar"
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={showDatepicker}
                    style={styles.picker}
                  >
                    <Typo>Pass Expiry Date :</Typo>
                    {show ? null : (
                      <Typo m style={{ color: Theme.primaryColor }}>
                        {date.toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "numeric",
                          year: "numeric",
                        })}
                      </Typo>
                    )}
                    {show && (
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        minimumDate={new Date()}
                        mode={mode}
                        is24Hour={true}
                        onChange={onChange}
                        display="calendar"
                      />
                    )}
                  </TouchableOpacity>
                )}
              </>

              <Space space={25} />
              <View style={styles.pickWrapper}>
                {doorData === null ||
                doorData === undefined ||
                doorData.length === 0 ? (
                  <>
                    <Typo>No Doors found</Typo>
                    <Space space={15} />
                    <FullButton
                    label={'Link a door'}
                    btnColor={Theme.orangeColor}
                    handlePress={()=>navigation.navigate('DoorsScreen')}
                    />
                  </>
                ) : (
                  doorData.map((item) => (
                    <DoorCard
                      //handlePress
                      displayMode={true}
                      key={item.id}
                      doorName={item.doorNickname}
                      doorID={item.doorID}
                      addedOn={item.timestamp}
                      doorItem={item}
                      isSelected={selectedDoors.includes(item.doorID)}
                      handlePress={() => handleDoorSelection(item.doorID)}
                    />
                  ))
                )}
              </View>
            </View>
          </ScrollView>
          <View style={{ paddingBottom: 35, paddingHorizontal: 15 }}>
            <FullButton
              handlePress={() => handleCreateGuestPass()}
              loading={loading}
              label={"Create Guest Pass"}
              btnColor={Theme.primaryColor}
            />
          </View>
        </View>
      </View>
    );}
export default AddGuestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.lightBackgroundColor,
  },
  body: {
    flex: 7,
    paddingHorizontal: 20,
  },
  smartdoor: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    resizeMode: "contain",
  },
  shadowProp: {
    shadowColor: "#e7e7e7",
    shadowOffset: { width: -2, height: 15 },
    shadowOpacity: 0.8,
    shadowRadius: 25,
  },
  cardWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  cardFull: {
    width: "100%",
    backgroundColor: "white",
    marginTop: 15,
    padding: 15,
    borderRadius: 15,
  },
  picker: {
    paddingVertical: 15,
    alignItems: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderColor: "#e5e5e5",
    marginHorizontal: 10,
  },
  pickWrapper:{
    borderWidth:1,
    borderColor:'#f7f7f7',
    paddingVertical:10,
    backgroundColor:'#f5f9ff',
    borderRadius:15,
    paddingHorizontal:15,
  }
});