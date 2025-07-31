import React from "react";
import { 
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView
} from "react-native";
import Theme from "../Theme";
import Header from "../../components/utils/Header";
import assets from "../../assets/assets";
import Typo from "../../components/Typography/Typo";
import ThickLine from "../../components/utils/ThickLine";
import Space from "../../components/utils/Space";
import GuestItem from "../../components/Cards/GuestItem";
import FullButtonStroke from "../../components/Buttons/FullButtonStroke";

function DoorDetailsScreen({route,navigation}){

    const { doorID, doorName, doorItem, addedOn } = route.params;

    const date = addedOn ? addedOn.toDate().toLocaleDateString() : "";
  
    return (
      <View style={styles.container}>
        <Header
          hasBackIcon={true}
          subtitle={`Door ID : ${doorID}`}
          title={`${doorName}`}
        />
        <View style={styles.body}>
          <ScrollView>
            <View style={styles.cardWrapper}>
              <View style={[styles.squareCard, styles.shadowProp]}>
                <Image
                  source={assets.smartdoorBlack}
                  style={styles.smartdoor}
                />
              </View>
              <View style={[styles.squareCard, styles.shadowProp]}>
                <Typo s light grey>
                  Added On
                </Typo>
                <Typo l>{date}</Typo>
                <Space space={5} />
                <ThickLine color={"#e3e3e3"} />
                <Space space={5} />
                <Typo s light grey>
                  Open Using
                </Typo>
                <Typo l>NFC / QR</Typo>
                <Space space={5} />
                <ThickLine color={"#e3e3e3"} />
              </View>
            </View>

            <View style={styles.cardFull}>
              <Typo>Allowed Guests</Typo>
              <Space space={10} />
              <ThickLine color={"#e5e5e5"} />
              <Space space={10} />
              {doorItem.accessibleBy && doorItem.accessibleBy.length > 0 ? (
                doorItem.accessibleBy.map((item, key) => (
                  <GuestItem
                    name={item.guestName}
                    email={item.guestEmail}
                    key={key}
                    expiry={item.expiryDate}
                  />
                ))
              ) : (
                <>
                <Typo grey xl>No guests allowed</Typo>
                <Space space={15}/>
                <FullButtonStroke 
                handlePress={()=>navigation.navigate('AddGuestScreen')}
                btnColor={Theme.primaryColor}
                label={'Issue a guest Pass'}
                />
                </>
              )}
            </View>
          </ScrollView>
        </View>
      </View>
    );}
export default DoorDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.lightBackgroundColor,
  },
  body: {
    flex: 7,
    paddingTop: 25,
    paddingHorizontal: 20,
  },
  smartdoor: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    resizeMode:'contain'
  },
  squareCard: {
    padding: 15,
    borderRadius: 15,
    backgroundColor: "white",
    width: "48%",
    height: 150,
    padding: 12,
    justifyContent: "space-evenly",
  },
  shadowProp: {
    shadowColor: "#e7e7e7",
    shadowOffset: { width: -2, height: 15 },
    shadowOpacity: 0.8,
    shadowRadius: 25,
  },
  cardWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardFull:{
    width:'100%',
    backgroundColor:'white',
    marginTop:15,
    padding: 15,
    borderRadius: 15,
  }
});