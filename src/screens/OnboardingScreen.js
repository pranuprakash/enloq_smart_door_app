import React from "react";
import { 
    View,
    StyleSheet
} from "react-native";
import Typo from '../../components/Typography/Typo'
import Space from '../../components/utils/Space'
import FullButton from '../../components/Buttons/FullButton'
import Theme from "../Theme";
import Lottie from "lottie-react-native";

function OnboardingScreen({navigation}){
    return (
      <View style={styles.container}>
        <View style={styles.onBoardingHolder}>
          <Lottie
            style={{ height: 355, width: 355 }}
            source={require("../../assets/onboarder.json")}
            autoPlay
            loop
          />
        </View>
        <View style={styles.footer}>
          <Typo xl>Secure Access</Typo>
          <Space space={10} />
          <Typo grey m>
            Unlock your office door with ease, keep track of your access points
            and add guest passes
          </Typo>
          <Space space={25} />
          <FullButton
            btnColor={Theme.primaryColor}
            handlePress={()=>navigation.navigate('SignupScreen')}
            label={"Start Unlocking Now"}
          />
        </View>
      </View>
    );}

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:Theme.backgroundColor
  },
  onBoardingHolder: {
    flex: 2,
    justifyContent:'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    paddingHorizontal:25
  },
});