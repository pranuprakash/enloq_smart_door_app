import React from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";
import Typo from "../Typography/Typo";
import { TH } from "@expo/html-elements";
import Theme from "../../src/Theme";
import { MaterialCommunityIcons } from '@expo/vector-icons';

function GuestItem({name,email,expiry}){


      // Convert Firebase Timestamp to JavaScript Date object
      const expiryDate = expiry ? expiry.toDate() : null;

      // Format the expiry date as a string
      const formattedExpiry = expiryDate ? expiryDate.toLocaleDateString() : "";

      const finalDate = formattedExpiry === null || formattedExpiry === '' ? "Permanent" : formattedExpiry
  
    return (
      <View style={styles.container}>
        <View style={styles.dpWrapper}>
          <View style={styles.dp}>
          <Typo style={{color:Theme.primaryColor}}>{name.charAt(0)}</Typo>
          </View>
        </View>
        <View style={styles.contentWrapper}>
          <Typo s>{name}</Typo>
          <Typo grey light xs>
            {email}
          </Typo>
        </View>
        <View style={styles.actionWrapper}>
        <MaterialCommunityIcons name="camera-timer" size={15} color="grey" />
          <Typo grey style={{marginLeft:5}} xs>
          {finalDate}
          </Typo>
        </View>
      </View>
    );}
export default GuestItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical:15,
    borderBottomWidth:1,
    borderBottomColor:'#e5e5e5',
    alignItems:'center'
  },
  dpWrapper: {
    width: "15%",
  },
  contentWrapper: {
    width: "60%",
  },
  actionWrapper: {
    width: "20%",
    flexDirection:'row',
    alignItems:'center'
  },
  dp:{
    height:35,
    width:35,
    backgroundColor:'#f2fcff',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:100,
    borderWidth:1,
    borderColor:Theme.primaryColor
  }
});