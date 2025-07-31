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
import Lottie from 'lottie-react-native'
import FullButton from '../../components/Buttons/FullButton'
import InfoCard from "../../components/Cards/InfoCard";
import useStore from "../../store";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { dbFS } from "../../config/firebase";

function SetupPremisesScreen({navigation}){

  const [loading,setLoading] = useState(false)
  const userID = useStore((state) => state.userID);
  const userData = useStore((state) => state.userData);

  const createPremises = async () => {
    setLoading(true)
    try {
      const docRef = await addDoc(collection(dbFS, "premises"), {
        premisesOwner: userID,
        premisesOwnerEmail: userData.email,
        premisesOwnerName: userData.name,
      });
  
      const userREf = doc(dbFS, "users", userID);

      await updateDoc(userREf, {
        premisesID: docRef.id
      });
  
      // Assuming you're in a React Native environment
      Alert.alert("Successful", `Premises ID: ${docRef.id}`);
      navigation.replace('DashboardScreen')
      setLoading(false)
    } catch (error) {
      // Handle the error appropriately (e.g., log it or display an error message)
      console.error("Error creating premises:", error);
    }
  };
  
  

    return (
      <View style={styles.container}>
        <Header
          hasBackIcon={true}
          title={"Setup Premises"}
          subtitle={"Link a premises to your account"}
        />
        <View style={styles.body}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ overflow: "visible" }}
          >
            <InfoCard
              subtitle={"Setup in one click"}
              title={"You are about to setup your premises"}
            />
            <InfoCard
              subtitle={"Feature 1"}
              title={"You will get a unique generated premises ID"}
            />
            <InfoCard
              subtitle={"Feature 2"}
              title={"You can start to link doors to your account"}
            />
            <InfoCard
              subtitle={"Feature 3"}
              title={"Grants permission to manage users."}
            />
          </ScrollView>
          <View style={{ paddingBottom: 35 }}>
            <FullButton
              loading={loading}
              handlePress={() => createPremises()}
              btnColor={Theme.primaryColor}
              label={"One Click Create"}
            />
          </View>
        </View>
      </View>
    );}
export default SetupPremisesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.lightBackgroundColor,
  },
  body:{
    flex:7,
    paddingHorizontal:20,
    overflow:'visible'
  }
});