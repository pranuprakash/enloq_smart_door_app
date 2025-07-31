import React from "react";
import { 
    View,
    Image,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import assets from '../../assets/assets'
import Typo from "../Typography/Typo";
import Space from "../utils/Space";
import ThickLine from "../utils/ThickLine";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import Theme from "../../src/Theme";

function InfoCard({subtitle,title,img}){
    

    const navigation = useNavigation();
    
    return (
      <View style={[styles.container, styles.shadowProp]}>
        <View style={styles.contentHolder}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Typo style={{color:Theme.primaryColor}} s>
                {subtitle}
              </Typo>
              <Space space={2} />
              <Typo grey l>{title}</Typo>
            </View>
          </View>
          <Space space={8} />
          <ThickLine color={'#e6e6e6'} />
        </View>
      </View>
    );}
export default InfoCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 15,
    borderRadius: 15,
    backgroundColor: "white",
    flexDirection:'row',
    marginBottom:15,
    paddingHorizontal:20
  },
  shadowProp: {
    shadowColor: "#e7e7e7",
    shadowOffset: { width: -2, height: 15 },
    shadowOpacity: 0.8,
    shadowRadius: 25,
  },
  contentHolder:{
    width:'100%',
  },
  door:{
    height:60,
    width:60,
    resizeMode:'contain',
  }
});