import React, { useState } from "react";
import { 
    View,
    ScrollView,
    StyleSheet,
    ActivityIndicator,
    Image
} from "react-native";

import InputBox from '../../components/utils/InputBox'
import LineBar from '../../components/utils/LineBar'
import Lottie from "lottie-react-native";
import Header from '../../components/utils/Header'
import Space from '../../components/utils/Space'
import FullButton from "../../components/Buttons/FullButton";
import Theme from "../Theme";
import Typo from "../../components/Typography/Typo";
import FullButtonStroke from "../../components/Buttons/FullButtonStroke";
import useStore from "../../store";
import { collection, doc, setDoc } from "firebase/firestore";
import { dbFS,auth } from "../../config/firebase";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import assets from "../../assets/assets";


function SignupScreen({navigation}){

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const [isLoading, setIsLoading] = useState(false);
  const setIsLoggedIn = useStore((state) => state.setIsLoggedIn);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const setUserID = useStore((state) => state.setUserID);

  const handleSubmit = async () => {
    if(password === confirmPassword){
      if (email && password && name && password) {
        setIsLoading(true);
        try {
          // Sign up the user with email and password
          const { user } = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
  
          await sendEmailVerification(user);
           
          const usersRef= collection(dbFS,"users")
          const userID = user.uid
          const userRole = "user"
          const userDoc = { name, email, userID, userRole };

          await setDoc(doc(usersRef, user.uid), userDoc);
          setUserID(user.uid);
          setSignupSuccess(true); 
          console.log("Sign up successful, Please verify email",user.uid);
      
        } catch (err) {
          setError(err.message);
        }
        setIsLoading(false);
      }
      else{
        setError("Please check all your fields")
      }
    }
    else {
      alert('Passwords Dont Match')
    }
  };


  if (signupSuccess) {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View
          style={[
            styles.body,
            { justifyContent: "center", alignItems: "center", flex: 1 },
          ]}
        >
          <Image
            source={assets.bluetick}
            style={{
              height: 150,
              width: 150,
              resizeMode: "contain",
              marginBottom: 25,
            }}
          />
          <Typo xl>Signup Successful</Typo>
          <Typo light m style={styles.label}>
            You need to verify your account, we have sent you an email.Once you
            verify, you can login to your account.
          </Typo>
          <Space space={25} />
          <FullButton
            handlePress={() => navigation.navigate("LoginScreen")}
            label={"Take me to Login!"}
            btnColor={Theme.primaryColor}
          />
        </View>
      </View>
    );
  }

    return (
      <View style={styles.container}>
        <Header
          subtitle="Signup to the app now"
          hasBackIcon={true}
          title={"Sign up"}
        />
        <LineBar />
        <View style={styles.body}>
          <ScrollView>
            <View style={styles.anim}>
              <Lottie
                style={{ height: 200, width: 200 }}
                source={require("../../assets/lock.json")}
                autoPlay
                loop
              />
            </View>
            <InputBox
              value={name}
              onChangeText={(text) => setName(text)}
              leftIcon={"user"}
              placeholder={"Full name"}
            />
            <Space space={15} />
            <InputBox
              value={email}
              onChangeText={(text) => setEmail(text)}
              leftIcon={"mail"}
              placeholder={"Email Address"}
            />
            <Space space={15} />
            <InputBox
              value={password}
              onChangeText={(text) => setPassword(text )}
              secureTextEntry={true}
              leftIcon={"lock"}
              placeholder={"Password"}
            />
            <Space space={15} />
            <InputBox
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
              secureTextEntry={true}
              leftIcon={"lock"}
              placeholder={"Confirm Password"}
            />
            <Space space={35} />
            {error && (
              <View style={styles.errorWrapper}>
                <Typo style={styles.errorText}>{error}</Typo>
              </View>
            )}
            <FullButton
              btnColor={Theme.primaryColor}
              handlePress={() => handleSubmit()}
              label={"Start Unlocking Now"}
            />
            <Typo grey light style={styles.or}>
              Already have an account?
            </Typo>
            <FullButtonStroke
              btnColor={Theme.orangeColor}
              handlePress={() => navigation.navigate("LoginScreen")}
              label={"Login"}
            />
            {isLoading === true ? (
              <View style={styles.overlay}>
                <ActivityIndicator size="large" color="black" />
              </View>
            ) : null}
          </ScrollView>
        </View>
      </View>
    );}

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.backgroundColor,
  },
  onBoardingHolder: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 1,
    paddingHorizontal: 25,
  },
  body: {
    flex: 7,
    paddingHorizontal: 20,
    paddingTop: 25,
  },
  or: {
    textAlign: "center",
    marginVertical: 15,
  },
  anim: {
    width: "100%",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    position: "absolute",
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  errorWrapper: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginBottom: 15,
    borderWidth:1,
    borderColor:'red',
    borderRadius:5
  },
  errorText: {
    fontFamily: Theme.SpaceBold,
    fontSize: 14,
    textAlign: "justify",
    color:'red'
  },
  label:{
    textAlign:'center',
    marginTop:10
  }
});