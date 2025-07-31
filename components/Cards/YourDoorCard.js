import React from "react";
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import {LinearGradient} from 'expo-linear-gradient'
import Typo from "../Typography/Typo";
import ThickLine from "../utils/ThickLine";
import Space from "../utils/Space";
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import Theme from "../../src/Theme";

function YourDoorCard({color,premisesMode}){
  const navigation = useNavigation();
    return (
      <View >
        {premisesMode ? (
          <LinearGradient
            style={styles.gradient}
            colors={color}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 1 }}
          >
            <Typo style={styles.title}>Setup Premises</Typo>
            <Typo light style={styles.subtitle}>
              You need to setup your premises before you see your linked doors
            </Typo>
            <Space space={15} />
            <ThickLine color={"white"} width={150} />
            <Space space={15} />
            <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")} style={{
              paddingHorizontal:15,
              paddingVertical:10,
              backgroundColor:'white',
              justifyContent:'center',alignItems:'center',
              maxWidth:150,
              borderRadius:5
            }}>
              <Typo s style={{color:Theme.orangeColor}}>Setup Now</Typo>
            </TouchableOpacity>
            <View style={styles.pos}>
              <FontAwesome5 name="door-open" size={45} color="white" />
            </View>
          </LinearGradient>
        ) : (
          <LinearGradient
            style={styles.gradient}
            colors={color}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 1 }}
          >
            <Typo style={styles.title}>Your Doors</Typo>
            <Typo light style={styles.subtitle}>
              Here you can see the doors you can access
            </Typo>
            <Space space={15} />
            <ThickLine color={"white"} width={150} />
            <Space space={15} />
            <TouchableOpacity onPress={() => navigation.navigate("DoorsScreen")} style={{
              paddingHorizontal:15,
              paddingVertical:10,
              backgroundColor:'white',
              justifyContent:'center',alignItems:'center',
              maxWidth:150,
              borderRadius:5
            }}>
              <Typo s >View Doors</Typo>
            </TouchableOpacity>
            <View style={styles.pos}>
              <FontAwesome5 name="door-open" size={45} color="white" />
            </View>
          </LinearGradient>
        )}
      </View>
    );}
export default YourDoorCard;

const styles = StyleSheet.create({
  gradient: {
    width: "100%",
    borderRadius: 25,
    padding: 20,
  },
  title: {
    color: "white",
    fontSize: 22,
  },
  subtitle: {
    color: "white",
    fontSize: 16,
    width: "80%",
  },
  pos:{
    position:'absolute',
    bottom:20,
    right:25
  }
});