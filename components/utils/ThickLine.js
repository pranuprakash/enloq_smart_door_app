import React from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

function ThickLine({width,color}){
    return(
    <View style={[styles.container,{width:width,backgroundColor:color}]}>
    </View>
    )}
export default ThickLine;

const styles = StyleSheet.create({
    container: {
        height:5,
        borderRadius:2
    }
});