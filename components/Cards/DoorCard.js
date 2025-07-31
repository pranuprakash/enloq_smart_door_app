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
import { AntDesign , MaterialCommunityIcons} from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import Theme from "../../src/Theme";

function DoorCard({
  doorID,
  doorName,
  doorItem,
  addedOn,
  displayMode,
  handlePress,
  isSelected,
}) {

  const navigation = useNavigation();

  const press = () => {

      navigation.navigate("DoorDetailsScreen", {
        doorID: doorID,
        doorName: doorName,
        doorItem,
        addedOn,
      });

  };

  return (
    <TouchableOpacity
      onPress={displayMode ? handlePress : press}
      style={[styles.container, styles.shadowProp]}
    >
      <View style={styles.iconHolder}>
        <Image source={assets.smartdoor} style={styles.door} />
      </View>
      <View style={styles.contentHolder}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Typo l>{doorName}</Typo>
            <Space space={2} />
            <Typo grey light s>
              {doorID}
            </Typo>
          </View>
          {displayMode ? (
            <MaterialCommunityIcons
              name={
                isSelected
                  ? "checkbox-marked-circle"
                  : "checkbox-blank-circle-outline"
              }
              size={24}
              color={isSelected ? Theme.orangeColor : "gray"}
            />
          ) : (
            <AntDesign name="arrowright" size={17} color="black" />
          )}
        </View>
        <Space space={8} />
        <ThickLine color={"#e3e3e3"} />
      </View>
    </TouchableOpacity>
  );
}
export default DoorCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 15,
    borderRadius: 15,
    backgroundColor: "white",
    flexDirection:'row',
    marginVertical:7.5
  },
  shadowProp: {
    shadowColor: "#e7e7e7",
    shadowOffset: { width: -2, height: 15 },
    shadowOpacity: 0.8,
    shadowRadius: 25,
  },
  iconHolder:{
    width:'15%',
  },
  contentHolder:{
    width:'85%',
    paddingLeft:15,
  },
  door:{
    height:60,
    width:60,
    resizeMode:'contain',
  }
});