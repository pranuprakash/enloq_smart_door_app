import { TH, THead } from "@expo/html-elements";
import React, { useState } from "react";
import { 
    View,
    Text,
    StyleSheet,
    ScrollView,
    Alert
} from "react-native";
import Theme from "../Theme";
import Header from "../../components/utils/Header";
import Typo from "../../components/Typography/Typo";
import Space from "../../components/utils/Space";
import ThickLine from "../../components/utils/ThickLine";
import InputBox from "../../components/utils/InputBox";
import FullButtonStroke from "../../components/Buttons/FullButtonStroke";
import FullButton from "../../components/Buttons/FullButton";
import { addDoc, collection, doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { dbFS } from "../../config/firebase";
import useStore from "../../store";


function AddDoorScreen({navigation}){

    const [doorID,setDoorID] = useState('')
    const [nickname,setNickname] = useState('')
    const [purchaserEmail,setPurchaserEmail] = useState('')
    const [loading,setLoading] = useState(false)
    const userData = useStore((state) => state.userData);


    const handleLinkDoor = async () => {
        setLoading(true);
        try {
          if (doorID && nickname && purchaserEmail) {
            const doorRef = doc(dbFS, "smartDoors", doorID);
            const doorDoc = await getDoc(doorRef);
            console.log(doorDoc)
            if (doorDoc.exists()) {
              const doorData = doorDoc.data();
              if (doorData.purchaserEmail === purchaserEmail && !doorData.doorLinked) {
                
                const doorref = doc(dbFS, "smartDoors", doorID);

                await updateDoc(doorref, {
                    doorLinked: true,
                    premisesID:userData.premisesID,                    
                });

                const premisesRef = doc(dbFS, "premises", userData.premisesID);

                const linkedDoorsCollectionRef = collection(
                  dbFS,
                  "premises",
                  userData.premisesID,
                  "linkedDoors"
                );
      
                const newLinkedDoorRef = doc(linkedDoorsCollectionRef, doorID);

                const newLinkedDoor = {
                  doorID,
                  doorNickname: nickname,
                  timestamp: serverTimestamp()
                };
      
                await setDoc(newLinkedDoorRef, newLinkedDoor);

                
                Alert.alert("Door added successfully", "", [
                  { text: "OK" }
                ]);

                setDoorID(null)
                setNickname(null)
                setPurchaserEmail(null)
                navigation.navigate('DashboardScreen');

              } else {
                // Handle the case when conditions are not met
                Alert.alert("Mismatching DoorID or Purchaser's Email, or door is already linked", "", [
                  { text: "OK" }
                ]);
              }
            } else {
              Alert.alert("Invalid Door ID", "", [
                { text: "OK" }
              ]);
            }
          } else {
            Alert.alert("Please enter all the details", "", [
              { text: "Cancel", style: "cancel" },
              { text: "OK" }
            ]);
          }
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      };

    return (
      <View style={styles.container}>
        <Header
          subtitle={"Configure a door to your account"}
          hasBackIcon={true}
          title={"Add Door"}
        />
        <View style={styles.body}>
          <ScrollView>
            {/* <View style={styles.cardWrapper}>
              <SquareCard
                handlePress={() => navigation.navigate("CameraScreen")}
                icon={"scan1"}
                label="Scan a"
                title="QR Code"
              />
              <SquareCard icon={"shake"} label="Connect with" title="NFC" />
            </View> */}

            <View style={{ paddingHorizontal: 10 }}>
              <View style={styles.cardFull}>
                <Typo>Enter The Details</Typo>
                <Space space={10} />
                <ThickLine color={"#e5e5e5"} />
                <Space space={10} />
                <InputBox
                  value={doorID}
                  onChangeText={(text) => setDoorID(text)}
                  leftIcon={"hash"}
                  placeholder={"Door ID"}
                />
                <Space space={25} />
                <InputBox
                  value={purchaserEmail}
                  onChangeText={(text) => setPurchaserEmail(text)}
                  leftIcon={"mail"}
                  placeholder={"Purchaser Email Address"}
                />
                <Space space={25} />
                <InputBox
                  value={nickname}
                  onChangeText={(text) => setNickname(text)}
                  leftIcon={"user"}
                  placeholder={"Enter a Door Nickname"}
                />
                <Space space={25} />
                <FullButton
                  loading={loading}
                  handlePress={()=>handleLinkDoor()}
                  label={"Add Door"}
                  btnColor={Theme.primaryColor}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    );}
export default AddDoorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.lightBackgroundColor,
  },
  body:{
    flex:7,
    paddingHorizontal:20
  },
  smartdoor: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    resizeMode:'contain'
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
  cardFull:{
    width:'100%',
    backgroundColor:'white',
    marginTop:15,
    padding: 15,
    borderRadius: 15,
  }
});