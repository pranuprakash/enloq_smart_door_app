import React from "react";
import { 
    StyleSheet,
    Image
} from "react-native";
import assets from "../../assets/assets";

function Logo({size}){
    return(
    <Image source={assets.logo} style={[styles.container,{
        width:size
    }]}/>
    )}
export default Logo;

const styles = StyleSheet.create({
    container: {
        height:80,
        resizeMode:'contain'
    }
});