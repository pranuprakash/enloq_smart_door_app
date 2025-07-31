import React from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import Header from "../../components/utils/Header";

import { auth } from '../../config/firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';
import FullButton from "../../components/Buttons/FullButton";
import Theme from "../../src/Theme";
import Lottie from "lottie-react-native";
import Space from "../../components/utils/Space";
import useStore from "../../store";
import FullButtonStroke from "../../components/Buttons/FullButtonStroke";
import Typo from "../../components/Typography/Typo";


function LogoutScreen({ navigation }) {

  const setIsLoggedIn = useStore((state) => state.setIsLoggedIn);
  const isLoggedIn = useStore((state) => state.isLoggedIn);


  const handleLogout = async () => {
    try {
      await auth.signOut();
      await AsyncStorage.setItem("isLoggedIn", "false");
      const isLoggedInString = await AsyncStorage.getItem('isLoggedIn');
    
     if(isLoggedInString === 'false'){
      setIsLoggedIn(false); 
      navigation.replace("OnboardingScreen");
      console.log("Logged Out Successfully" , isLoggedIn)
     }
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <SafeAreaView style={styles.container}>
      <Header title={"Log Out"} subtitle={"Logout of your account"} />
      <View style={styles.body}>
        <ScrollView contentContainerStyle={{alignItems:'center'}} showsVerticalScrollIndicator={false}>
          <Lottie
            style={{ width: 200 }}
            source={require("../../assets/logout.json")}
            autoPlay
            loop
          />
          <Typo xl>Logging Out</Typo>
          <Space space={10}/>
          <Typo grey l >Are you sure you want to logout?</Typo>
          <Space space={25}/>
          <FullButton
            handlePress={handleLogout}
            btnColor={Theme.primaryColor}
            label={"Logout"}
          />
          <Space space={15} />
          <FullButtonStroke
            handlePress={()=>navigation.goBack()}
            color={"black"}
            label={"Cancel"}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
export default LogoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.backgroundColor,
  },
  body: {
    flex: 7,
    padding: 20,
  },
  errorWrapper: {
    width: "100%",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fc035e",
    paddingVertical: 10,
    marginTop:20
  },
  errorText: {
    fontFamily: Theme.FSMedium,
    color: Theme.textColor,
    fontSize: 16,
  },
  success: {
    fontSize: 25,
    fontFamily: Theme.Rubik,
    color: Theme.textColor,
    marginBottom: 35,
    marginTop: 25,
    textAlign:'center'
  },
});