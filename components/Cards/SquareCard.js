import React from "react";
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import Typo from "../Typography/Typo";
import Space from "../utils/Space";
import ThickLine from "../utils/ThickLine";
import Theme from "../../src/Theme";
import { AntDesign } from '@expo/vector-icons';

function SquareCard({label,title,icon,handlePress}){

    const lightPastelColors = [
        "#FFD1D8", // Light Pastel Pink
        "#FFE8F5", // Light Pastel Magenta
        "#FFF9DB", // Light Pastel Yellow
        "#D8F4FF", // Light Pastel Blue
        "#EFD8FF", // Light Pastel Purple
        "#FFF0FF", // Light Pastel Lavender
      ];


  // Select a random color from the array
  const randomColor = lightPastelColors[Math.floor(Math.random() * lightPastelColors.length)];


    return(
    <TouchableOpacity onPress={handlePress} style={[styles.container,styles.shadowProp]}>
        <View style={styles.wrapper}>
        <AntDesign name={icon} size={30} color={Theme.primaryColor} />
        </View>
        <Typo light>{label}</Typo>
        <Typo l>{title}</Typo>
        <Space space={15}/>
        <ThickLine color={randomColor} width={'50%'} />
    </TouchableOpacity>
    )}
export default SquareCard;

const styles = StyleSheet.create({
  container: {
    width: "45%",
    padding: 15,
    borderRadius: 15,
    backgroundColor: "white",
  },
  shadowProp: {
    shadowColor: "#e7e7e7",
    shadowOffset: { width: -2, height: 15 },
    shadowOpacity: 0.8,
    shadowRadius: 25,
  },
  wrapper:{
    backgroundColor:'#f0f5ff',
    padding:15,
    borderRadius:10,
    marginBottom:10,
    justifyContent:'center',
    alignItems:'center'
  }
});