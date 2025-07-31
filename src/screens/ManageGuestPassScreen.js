import React, { useEffect } from "react";
import { 
    View,
    Text,
    StyleSheet,
    ScrollView,
    ActivityIndicator
} from "react-native";
import Header from "../../components/utils/Header";
import GuestPassCard from "../../components/Cards/GuestPassCard";
import Theme from "../Theme";
import useStore from "../../store";
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import { dbFS } from "../../config/firebase";
import Space from "../../components/utils/Space";
import Typo from "../../components/Typography/Typo";

function ManageGuestPassScreen({navigation}){

  const passData = useStore((state) => state.passData);
  const setPassData = useStore((state) => state.setPassData);
  const userData = useStore((state) => state.userData);


  useEffect(() => {
    const fetchPassData = async () => {
      const accessPassRef = collection(dbFS, 'premises', userData.premisesID, 'accessPass');
      
      const unsubscribe = onSnapshot(accessPassRef, (snapshot) => {
        const passData = [];
        snapshot.forEach((doc) => {
          passData.push(doc.data());
        });

        setPassData(passData);
      });

      // Cleanup function
      return () => {
        unsubscribe(); // Unsubscribe from the snapshot listener
      };
    };

    fetchPassData();
  }, []);


    return (
      <View style={styles.container}>
        <Header
          hasBackIcon={true}
          subtitle="Manage guest passess here"
          title={"Guest Pass"}
        />
        <View style={styles.body}>
          <ScrollView>
            {passData ? (
              passData.length === 0 ? (
                <View style={{ alignItems: "center" }}>
                  <Space space={25} />
                  <Typo l>No Guest Passes Issued Yet</Typo>
                </View>
              ) : (
                passData.map((item, index) => {
                  return (
                    <GuestPassCard
                      key={index}
                      label={item.guestEmail}
                      title={item.guestName}
                      icon={"user"}
                      expiry={item.expiryDate}
                      status={item.active}
                      permanent={item.permanentAccess}
                      accessibleDoors={item.accessibleDoors}
                    />
                  );
                })
              )
            ) : (
              <ActivityIndicator size={"large"} color={Theme.primaryColor} />
            )}
          </ScrollView>
        </View>
      </View>
    );}

export default ManageGuestPassScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:Theme.lightBackgroundColor
    },
    body:{
        flex:7,
        paddingHorizontal:25
    }
});