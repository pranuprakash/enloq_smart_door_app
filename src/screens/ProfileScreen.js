import React, { useEffect, useRef, useState } from "react";
import { 
    View,
    Text,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
    Alert
} from "react-native";

import { auth, dbFS } from '../../config/firebase'
import useStore from "../../store";
import RBSheet from "react-native-raw-bottom-sheet";
import Theme from "../../src/Theme";
import Space from "../../components/utils/Space";
import FullButtonStroke from "../../components/Buttons/FullButtonStroke";
import FullButton from "../../components/Buttons/FullButton";
import { sendPasswordResetEmail } from "firebase/auth";
import Header from "../../components/utils/Header";
import Typo from "../../components/Typography/Typo";
import ThickLine from "../../components/utils/ThickLine";
import { MaterialIcons } from '@expo/vector-icons';
import InputBox from "../../components/utils/InputBox";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";


function ProfileScreen({navigation}){

  const userData = useStore((state) => state.userData);
  const userID = useStore((state) => state.userID);
  const [enteredPremisesId,setEnteredPremisesId] = useState('')
  const sheet = useRef();
  const sheetEditPremises = useRef();
 const [loading,setLoading] = useState(false)

  const handleSave = async () => {
    if (enteredPremisesId) {
      setLoading(true);
      try {
        const linkedDoorsRef = collection(dbFS, "premises");
        const linkedDoorDocRef = doc(linkedDoorsRef, enteredPremisesId);
        const linkedDoorDocSnap = await getDoc(linkedDoorDocRef);

        if (linkedDoorDocSnap.exists()) {
          const userRef = collection(dbFS, "users");
          const userDocRef = doc(userRef, userID);

          // update the premisesID here
          await updateDoc(userDocRef, { premisesID: enteredPremisesId });
          setLoading(false);
          sheetEditPremises.current.close()
          Alert.alert("Successfully updated Premises ID", "", [{ text: "OK" }]);
        } else {
          Alert.alert(
            "Invalid Premises ID",
            "Please make sure you enter a valid premises id, don't include any extra spaces.",
            [{ text: "OK" }]
          );
        }
      } catch (e) {
        console.log(e);
      }
      finally{
        setLoading(false);
      }
    } else {
      Alert.alert("ID cannot be empty.", "", [{ text: "OK" }]);
    }
  };

  const handleResetPassword = async () => {
    try {
      const email = userData.email;
      console.log(email);
      await sendPasswordResetEmail(auth, email);
      console.log("Password reset email sent successfully");
      alert("Password reset email sent successfully,make sure to check your spam folder!");
      sheet.current.close();
    } catch (error) {
      console.error("Error sending password reset email:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title={"User Profile"}
        subtitle={"Manage your User Profile Here."}
        rightIcon={"logout"}
        rightHandlePress={() => navigation.navigate("LogoutScreen")}
      />
      <View style={styles.body}>
        {userData ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}
            contentContainerStyle={{ alignItems: "center" }}
          >
            {userData.userRole === "admin" ? (
              userData.premisesID ? (
                <View style={[styles.emailContainer, styles.shadowProp]}>
                  <Typo style={styles.label}>Premises ID</Typo>
                  <Typo style={[styles.val, { marginTop: 5 }]}>
                    {userData.premisesID}
                  </Typo>
                  <Space space={10} />
                  <ThickLine color={"#f7f7f7"} />
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() => navigation.navigate("SetupPremisesScreen")}
                  style={[
                    styles.bannerContainer,
                    styles.shadowProp,
                    { paddingVertical: 25 },
                  ]}
                >
                  <Typo style={{ color: "#FFF" }}>No premises setup</Typo>
                  <Typo
                    l
                    style={[
                      {
                        color: "#FFF",
                        textTransform: "capitalize",
                      },
                    ]}
                  >
                    Setup your premises now!
                  </Typo>
                  <View style={styles.arrow}>
                    <MaterialIcons
                      name="keyboard-arrow-right"
                      size={35}
                      color="white"
                    />
                  </View>
                </TouchableOpacity>
              )
            ) : null}

            {userData && userData.userRole === "user" ? (
              <View style={[styles.emailContainer, styles.shadowProp]}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Typo style={styles.label}>Premises ID</Typo>
                    <Typo style={[styles.val, { marginTop: 5 }]}>
                      {userData.premisesID}
                    </Typo>
                  </View>
                  {userData.premisesID ? (
                    <TouchableOpacity
                      onPress={() => sheetEditPremises.current.open()}
                    >
                      <Typo style={styles.reset}>Edit</Typo>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => sheetEditPremises.current.open()}
                    >
                      <Typo style={styles.reset}>Add</Typo>
                    </TouchableOpacity>
                  )}
                </View>
                <Space space={10} />
                <ThickLine color={"#f7f7f7"} />
              </View>
            ) : null}

            <View style={[styles.emailContainer, styles.shadowProp]}>
              <Typo style={styles.label}>Your Name</Typo>
              <Typo style={[styles.val, { marginTop: 5 }]}>
                {userData.name}
              </Typo>
              <Space space={10} />
              <ThickLine color={"#f7f7f7"} />
            </View>

            <View style={[styles.emailContainer, styles.shadowProp]}>
              <Typo style={styles.label}>Your Registered Email:</Typo>
              <Typo style={[{ marginTop: 5 }]}>{userData.email}</Typo>
              <Space space={10} />
              <ThickLine color={"#f7f7f7"} />
            </View>

            <View style={[styles.emailContainer, styles.shadowProp]}>
              <Typo style={styles.label}>Your Role:</Typo>
              <Typo style={[styles.val, { marginTop: 5 }]}>
                {userData.userRole}
              </Typo>
              <Space space={10} />
              <ThickLine color={"#f7f7f7"} />
            </View>

            <View style={[styles.emailContainer, styles.shadowProp]}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Typo style={styles.label}>Your Password:</Typo>
                  <Typo style={[styles.val, { marginTop: 5 }]}>******</Typo>
                </View>
                <TouchableOpacity onPress={() => sheet.current.open()}>
                  <Typo style={styles.reset}>Reset</Typo>
                </TouchableOpacity>
              </View>
              <Space space={10} />
              <ThickLine color={"#f7f7f7"} />
            </View>
            <Space space={25} />
            {/* <View style={{ width: "90%" }}>
              <FullButtonStroke
                btnColor={Theme.primaryColor}
                handlePress={() => navigation.navigate("DeleteAccount")}
                label={"Delete Account"}
              />
            </View> */}
          </ScrollView>
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator color={"black"} size={"large"} />
          </View>
        )}
      </View>

      <RBSheet
        height={280}
        closeOnPressMask={true}
        closeOnPressBack={true}
        ref={sheet}
        closeOnDragDown={true}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0, 0, 0,0.9)",
          },
          container: {
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            backgroundColor: Theme.backgroundColor,
          },
          draggableIcon: {
            height: 0,
            width: 0,
          },
        }}
      >
        <View style={styles.confirmdelete}>
          <Typo xl>Reset Password</Typo>
          <Typo light grey style={styles.conftext}>
            A Password Reset link will be sent to your regsistered email!
          </Typo>
          <View style={{ width: "100%", marginTop: 25 }}>
            <FullButton
              handlePress={() => handleResetPassword()}
              btnColor={Theme.primaryColor}
              label={"Send Link"}
            />
            <Space space={10} />
            <FullButtonStroke
              handlePress={() => sheet.current.close()}
              btnColor={Theme.orangeColor}
              label={"Cancel"}
            />
          </View>
        </View>
      </RBSheet>

      <RBSheet
        height={350}
        closeOnPressMask={true}
        closeOnPressBack={true}
        ref={sheetEditPremises}
        closeOnDragDown={true}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0, 0, 0,0.9)",
          },
          container: {
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            backgroundColor: Theme.backgroundColor,
            paddingHorizontal: 20,
            alignItems: "center",
            justifyContent: "space-evenly",
            paddingBottom: 45,
          },
          draggableIcon: {
            height: 0,
            width: 0,
          },
        }}
      >
        <Typo xl>Link Premises ID</Typo>
        <Space space={25} />
        <InputBox
          value={enteredPremisesId}
          onChangeText={(text) => setEnteredPremisesId(text)}
          placeholder={"Enter Premises ID"}
          leftIcon={"user"}
        />
        <View style={{ width: "100%", marginTop: 25 }}>
          <FullButton
            loading={loading}
            handlePress={() => handleSave()}
            btnColor={Theme.primaryColor}
            label={"Save"}
          />
          <Space space={10} />
          <FullButtonStroke
            handlePress={() => sheetEditPremises.current.close()}
            btnColor={Theme.orangeColor}
            label={"Cancel"}
          />
        </View>
      </RBSheet>
    </View>
  );
}
export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.lightBackgroundColor,
  },
  body: {
    flex: 7,
  },
  label: {
    fontSize: 16,
    opacity: 0.4,
  },
  emailContainer: {
    width: "90%",
    borderRadius: 15,
    paddingVertical: 15,
    marginTop: 15,
    paddingHorizontal: 5,
    backgroundColor: "#ffff",
    paddingHorizontal:15
  },
  bannerContainer: {
    width: "90%",
    borderRadius: 15,
    paddingVertical: 15,
    marginTop: 15,
    paddingHorizontal: 5,
    backgroundColor:Theme.primaryColor,
    paddingHorizontal:15
  },
  shadowProp: {
    shadowColor: "#e7e7e7",
    shadowOffset: { width: -2, height: 15 },
    shadowOpacity: 0.8,
    shadowRadius: 25,
  },
  val: {
    color: "black",
    fontSize: 16,
    textTransform:'capitalize'
  },
  confirmdelete: {
    flex: 1,
    paddingHorizontal: 25,
    alignItems: "center",
    paddingBottom: 15,
  },
  conftext: {
    fontSize: 17,
    textAlign: "center",
    marginTop: 5,
  },
  reset: {
    fontSize: 14,
    textDecorationLine:'underline',
    marginTop:5
  },
  arrow:{
    position:'absolute',
    top:25,
    right:15
  }
});