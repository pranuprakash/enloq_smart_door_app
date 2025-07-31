import React, { useEffect, useState } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Image,
    ActivityIndicator
} from "react-native";
import Typo from "../Typography/Typo";
import Space from "../utils/Space";
import ThickLine from "../utils/ThickLine";
import Theme from "../../src/Theme";
import { AntDesign ,MaterialCommunityIcons} from '@expo/vector-icons';
import assets from "../../assets/assets";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { dbFS } from "../../config/firebase";
import useStore from "../../store";

function GuestPassCard({
  label,
  title,
  icon,
  handlePress,
  expiry,
  status,
  permanent,
  accessibleDoors,
}) {


  const expiryDate = expiry ? expiry.toDate() : null;
  const formattedExpiry = expiryDate ? expiryDate.toLocaleDateString() : "";
  const finalDate =
    formattedExpiry === null || formattedExpiry === ""
      ? "Permanent"
      : formattedExpiry;


      const userData = useStore((state) => state.userData);
      const [doorData, setDoorData] = useState([]);

  
      useEffect(() => {
        const fetchPassData = async () => {
          const linkedDoorsRef = collection(dbFS, 'premises', userData.premisesID, 'linkedDoors');
          const linkedDoorsSnapshot = await getDocs(linkedDoorsRef);
    
          const fetchedDoorData = [];
          linkedDoorsSnapshot.forEach((doc) => {
            const doorID = doc.id;
            const doorNickname = doc.data().doorNickname;
            fetchedDoorData.push({ doorID, doorNickname });
          });
    
          setDoorData(fetchedDoorData);
        };
    
        fetchPassData();
      }, [userData.premisesID]);

      const filteredDoorData = doorData.filter((door) => accessibleDoors.includes(door.doorID));
     

  return (
    <View onPress={handlePress} style={[styles.container, styles.shadowProp]}>
      <View style={{ flexDirection: "row", width: "100%" }}>
        <View style={styles.wrapper}>
          <AntDesign name={icon} size={20} color={Theme.primaryColor} />
        </View>
        <View style={{ paddingLeft: 15, maxWidth: "80%" }}>
          <Typo>{title}</Typo>
          <Typo s light>
            {label}
          </Typo>
        </View>
        <View style={styles.actionWrapper}>
          <MaterialCommunityIcons name="camera-timer" size={15} color="grey" />
          <Typo grey style={{ marginLeft: 5 }} xs>
            {finalDate}
          </Typo>
        </View>
      </View>
      <Space space={2} />
      <ThickLine color={"#e5e5e5"} width={"100%"} />
      <Space space={10} />
      <View style={styles.bottomWrapper}>
        <Typo grey light s>
          {status ? "Active" : "Not Active"}
        </Typo>
        <Typo grey light s>
          {permanent ? "Permanent" : "Temporary"}
        </Typo>
        <Typo grey light s>
          {accessibleDoors.length} Doors
        </Typo>
      </View>
      <Space space={10} />
      <ThickLine color={"#e5e5e5"} width={"100%"} />
      <Space space={2} />

      {filteredDoorData ? (
        filteredDoorData.map((item, index) => {
          return (
            <View key={index} style={styles.asccessWrapper}>
              <View style={{ width: "15%" }}>
                <Image source={assets.smartdoor} style={styles.door} />
              </View>
              <View style={{ width: "85%" }}>
                <Typo s>
                  {item.doorNickname}
                </Typo>
                <Typo xs light grey>
                  {item.doorID}
                </Typo>
              </View>
            </View>
          );
        })
      ) : (
        <ActivityIndicator size={"large"} color={Theme.primaryColor} />
      )}
    </View>
  );
}
export default GuestPassCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 15,
    borderRadius: 15,
    backgroundColor: "white",
    marginBottom:20
  },
  shadowProp: {
    shadowColor: "#e7e7e7",
    shadowOffset: { width: -2, height: 15 },
    shadowOpacity: 0.8,
    shadowRadius: 25,
  },
  wrapper: {
    backgroundColor: "#f0f5ff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    minWidth: "15%",
  },
  actionWrapper: {
    flexDirection: "row",
    position: "absolute",
    right: 10,
    top: 15,
  },
  bottomWrapper: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  asccessWrapper:{
    width:'100%',
    flexDirection:'row',
    paddingVertical:15,
    borderBottomWidth:1,
    borderBottomColor:'#e5e5e5',
    alignItems:'center'
  },
  door:{
    height:45,
    width:45,
    resizeMode:'contain',
  }
});