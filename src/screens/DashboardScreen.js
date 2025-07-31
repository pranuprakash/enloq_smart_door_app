import React, { useEffect, useState } from "react";
import { 
    View,
    ScrollView,
    StyleSheet,
    ActivityIndicator,
    Alert,
    TouchableOpacity
} from "react-native";

import Header from '../../components/utils/Header'
import Theme from "../Theme";
import YourDoorCard from "../../components/Cards/YourDoorCard";
import Space from "../../components/utils/Space";
import Typo from "../../components/Typography/Typo";
import SquareCard from "../../components/Cards/SquareCard";
import { dbFS } from "../../config/firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import useStore from "../../store";
import { MaterialIcons,MaterialCommunityIcons } from '@expo/vector-icons';





function DashboardScreen({navigation,onUserTypeChange}){

  const userID = useStore((state) => state.userID);
  const userData = useStore((state) => state.userData);
  const setUserData = useStore((state) => state.setUserData);
  const setPremisesData = useStore((state) => state.setPremisesData);
  const premisesData = useStore((state) => state.premisesData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    const docRef = doc(dbFS, "users", userID);
  
    try {
      // Set up a real-time listener
      onSnapshot(docRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          setUserData(data);
  
          // Check if premisesID exists
          if (data.premisesID) {
            fetchPremisesData(data.premisesID);
          }
        } else {
          console.log("Document does not exist here 2!");
        }
      });

      setLoading(false);
      
    } catch (error) {
      console.error("Error fetching document:", error);
      setLoading(false);
    }
  };
  
  
  const fetchPremisesData = async (premisesID) => {
    const docRef = doc(dbFS, "premises", premisesID);
  
    try {
      // Set up a real-time listener
      onSnapshot(docRef, (snapshot) => {
        if (snapshot.exists()) {
          const updatedData = snapshot.data();
          setPremisesData(updatedData);
        } else {
          console.log("Document does not exist here 1!");
        }
      });
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  };
  

  const handleGuest = () => {
    if(userData.premisesID) {
      navigation.navigate('AddGuestScreen')
    }
    else {
      Alert.alert(
        "Premises not setup",
        "Please go to your profile section to setup your premises now!",
        [{ text: "OK" }]
      );
    }
  }
  const handleMaangePass = () => {
    if(userData.premisesID) {
      navigation.navigate('ManageGuestPassScreen')
    }
    else {
      Alert.alert(
        "Premises not setup",
        "Please go to your profile section to setup your premises now!",
        [{ text: "OK" }]
      );
    }
  }



  const handleCamera = () => {
    if(userData.premisesID) {
      navigation.navigate("CameraScreen")
    }
    else {
      Alert.alert(
        "Premises not setup",
        "Please go to your profile section to setup your premises now!",
        [{ text: "OK" }]
      );
    }
  }


  const handleCameraUser = () => {
    if(userData.premisesID) {
      navigation.navigate("CameraScreen")
    }
    else {
      Alert.alert(
        "Premises ID not Linked",
        "Please go to your profile section and enter your premises ID!",
        [{ text: "OK" }]
      );
    }
  }
 

  if(loading){
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size={"large"} color={Theme.primaryColor} />
      </View>
    );
  }



    return (
      <View style={styles.container}>
        <Header
          subtitle="Welcome, Lets start!"
          title={"Dashboard"}
          rightIcon={"logout"}
          rightHandlePress={() => navigation.navigate("LogoutScreen")}
        />
        <View style={styles.body}>
          {userData ? (
            userData.userRole === "admin" ? (
              <ScrollView>
                <View style={{ paddingHorizontal: 20 }}>
                  {userData ? (
                    userData.premisesID ? (
                      <YourDoorCard color={Theme.blueGradient} />
                    ) : (
                      <YourDoorCard
                        premisesMode={true}
                        color={Theme.orangeGradient}
                      />
                    )
                  ) : (
                    <ActivityIndicator
                      size={"large"}
                      color={Theme.blueGradient}
                    />
                  )}
                </View>
                <Space space={25} />
                <View style={{ paddingHorizontal: 20 }}>
                  <Typo l style={{ marginLeft: 10 }}>
                    Unlock Doors
                  </Typo>
                  <Space space={15} />
                  <View style={styles.optionWrapper}>
                    <SquareCard
                      handlePress={() => handleCamera()}
                      icon={"scan1"}
                      label="Scan a"
                      title="QR Code"
                    />
                    <SquareCard icon={"shake"} label="Tap your" title="Phone" />
                    <SquareCard
                      icon={"addusergroup"}
                      label="Issue a new"
                      title="Guest Pass"
                      handlePress={() => handleGuest()}
                    />
                    <SquareCard
                      icon={"idcard"}
                      label="Manage your"
                      title="Guest Passes"
                      handlePress={() => handleMaangePass()}
                    />
                  </View>
                </View>
              </ScrollView>
            ) : (
              <>
                <View
                  style={[
                    styles.body,
                    { alignItems: "center", paddingTop: "25%" },
                  ]}
                >
                  <TouchableOpacity
                    style={{ alignItems: "center" }}
                    onPress={() => handleCameraUser()}
                  >
                    <MaterialIcons
                      name="qr-code-scanner"
                      size={125}
                      color={Theme.primaryColor}
                    />
                    <Typo style={{ color: Theme.primaryColor }} xl>
                      Tap to unlock
                    </Typo>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    position: "absolute",
                    width: "100%",
                    bottom: 25,
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    style={{ alignItems: "center" }}
                    onPress={() => alert("Implement the NFC HERE")}
                  >
                    <MaterialIcons
                      name="wifi-tethering"
                      size={45}
                      color="black"
                    />
                    <Typo>Or Tap</Typo>
                  </TouchableOpacity>
                </View>
              </>
            )
          ) : (
            <ActivityIndicator color={Theme.primaryColor} size={"large"} />
          )}
        </View>
      </View>
    );}

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.lightBackgroundColor,
  },
  body: {
    flex: 7,
    paddingTop: 25,
  },
  optionWrapper:{
    flexDirection:'row',
    flexWrap:'wrap',
    gap:20,
    justifyContent:'center'
  }
});