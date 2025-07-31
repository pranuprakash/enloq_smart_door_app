import React, { useState } from "react";
import { 
    View,
    ScrollView,
    StyleSheet,
    ActivityIndicator
} from "react-native";
import InputBox from '../../components/utils/InputBox'
import LineBar from '../../components/utils/LineBar'
import Header from '../../components/utils/Header'
import Space from '../../components/utils/Space'
import FullButton from "../../components/Buttons/FullButton";
import Theme from "../Theme";
import Typo from "../../components/Typography/Typo";
import FullButtonStroke from "../../components/Buttons/FullButtonStroke";
import Lottie from "lottie-react-native";
import useStore from "../../store";
import { sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';

function LoginScreen({navigation}){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setIsLoggedIn = useStore((state) => state.setIsLoggedIn);
  const setUserID = useStore((state) => state.setUserID);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  const handleResendVerificationEmail = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        await sendEmailVerification(user);
        console.log("Verification email sent");
        alert("Verification email sent")
      } else {
        setError("User not found");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogin = async () => {
    if (email && password) {
      setIsLoading(true);
      try {
        const { user } = await signInWithEmailAndPassword(auth, email, password);
  
        if (user && user.emailVerified) {
          console.log("Login successful",user.uid);
          await AsyncStorage.setItem("userID", user.uid); 
          await AsyncStorage.setItem("isLoggedIn", "true");
          setIsLoggedIn(true)
          setUserID(user.uid);
          navigation.replace('DashboardScreen')
        } else {
          setError("Please verify your email before logging in");
        }
      } catch (err) { 
        setError(err.message);
      }
      setIsLoading(false);
    }
    else{
      setError("Please check your email and password")
  }
    setTimeout(() => {
      setError(null);
    }, 6000);
  };


    return (
      <View style={styles.container}>
        <Header
          subtitle="Login to the app now"
          hasBackIcon={true}
          title={"Login"}
        />
        <LineBar />
        <View style={styles.body}>
          <ScrollView>
            <View style={styles.anim}>
              <Lottie
                style={{ height: 200, width: 255 }}
                source={require("../../assets/cardlogin.json")}
                autoPlay
                loop
              />
            </View>
            <InputBox
              value={email}
              onChangeText={(text) => setEmail(text)}
              leftIcon={"mail"}
              placeholder={"Email Address"}
            />
            <Space space={25} />
            <InputBox
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              leftIcon={"lock"}
              placeholder={"Password"}
            />
            <Space space={35} />
            {error && (
              <View style={styles.errorWrapper}>
                <Typo style={styles.errorText}>{error}</Typo>
              </View>
            )}
            {error === "Please verify your email before logging in" ? (
              <View style={{marginBottom:15}}>
                <FullButtonStroke
                  handlePress={handleResendVerificationEmail}
                  color={Theme.orangeColor}
                  label={"Resend Email Verification Email"}
                />
              </View>
            ) : null}
            <FullButton
              btnColor={Theme.primaryColor}
              handlePress={() => handleLogin()}
              label={"Login"}
            />
            <Typo grey light style={styles.or}>
              Don't have an account?
            </Typo>
            <FullButtonStroke
              btnColor={Theme.orangeColor}
              handlePress={() => navigation.navigate("SignupScreen")}
              label={"Sign up"}
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

export default LoginScreen;

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
});