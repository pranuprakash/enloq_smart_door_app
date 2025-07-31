import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, Alert, ActivityIndicator } from "react-native";
import Theme from "../Theme";
import Typo from "../../components/Typography/Typo";
import Space from "../../components/utils/Space";
import FullButton from "../../components/Buttons/FullButton";
import useStore from "../../store";
import { collection, doc, getDoc, addDoc, serverTimestamp } from "firebase/firestore";
import { dbFS } from "../../config/firebase";
import assets from '../../assets/assets'

// Function to log the access event in the accessLog collection
const logAccessEvent = async (userData, doorID, accessGranted) => {
  try {
    const accessLogRef = collection(
      dbFS,
      "premises",
      userData.premisesID,
      "accessLog"
    );

    await addDoc(accessLogRef, {
      userID: userData.userID,
      doorID,
      timestamp: serverTimestamp(),
      accessGranted,
    });
  } catch (error) {
    console.log(error);
  }
};

function ResultScreen({ route, navigation }) {
  const [loading, setLoading] = useState(true);
  const { scannedBarcode } = route.params;
  const userData = useStore((state) => state.userData);
  const [permissionGranted, setPermissionGranted] = useState(null);
  const [doorFound, setDoorFound] = useState(true);

  useEffect(() => {
    const checkAccessPermission = async () => {
      try {
        const linkedDoorsRef = collection(
          dbFS,
          "premises",
          userData.premisesID,
          "linkedDoors"
        );
        const linkedDoorDocRef = doc(linkedDoorsRef, scannedBarcode);
        const linkedDoorDocSnap = await getDoc(linkedDoorDocRef);

        if (linkedDoorDocSnap.exists()) {
          const accessibleBy = linkedDoorDocSnap.data().accessibleBy;

          const hasAccess = accessibleBy.some(
            (guest) =>
              guest.guestEmail === userData.email && guest.active === true
          );

          if (hasAccess) {
            setPermissionGranted(true);
            logAccessEvent(userData, scannedBarcode, true); // Log access event for granted access
          } else {
            setPermissionGranted(false);
            logAccessEvent(userData, scannedBarcode, false); // Log access event for denied access
          }
        } else {
          setDoorFound(false);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // Set loading state to false after fetching the data
      }
    };

    if (scannedBarcode) {
      checkAccessPermission();
    }
  }, [scannedBarcode, userData.email]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Theme.primaryColor} />
      </View>
    );
  }

  if (!doorFound) {
    return (
      <View style={styles.container}>
        <Image style={styles.art} source={assets.error} />
        <Typo xl>No doors found</Typo>
        <Space space={15} />
          <FullButton
            handlePress={() => navigation.navigate("CameraScreen")}
            label={"Scan Again"}
            btnColor={Theme.primaryColor}
          />
      </View>
    );
  }


  if(permissionGranted){
    return (
      <View style={styles.container}>
          <Image style={styles.art} source={assets.door} />
          <Typo xl>Access Granted</Typo>
          <Typo light grey>{scannedBarcode}</Typo>
          <Space space={15} />
          <FullButton
            handlePress={() => navigation.navigate("DashboardScreen")}
            label={"Done"}
            btnColor={"#1abd7c"}
          />
    </View>
    )
  }

  
  if(!permissionGranted){
    return (
      <View style={styles.container}>
          <Image style={styles.art} source={assets.warn} />
        <Typo xl>Access Denied</Typo>
        <Typo light grey>
          {scannedBarcode}
        </Typo>
        <Space space={15} />
        <FullButton
          handlePress={() => navigation.navigate("DashboardScreen")}
          label={"Go Back"}
          btnColor={Theme.orangeColor}
        />
      </View>
    );
  }



  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Theme.primaryColor} />
    </View>
  );
}

export default ResultScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.backgroundColor,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 35,
  },
  art:{
    height:225,
    width:225,
    resizeMode:'contain'
  }
});
