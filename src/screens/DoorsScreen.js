import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Text,
} from "react-native";

import Header from "../../components/utils/Header";
import Theme from "../Theme";
import DoorCard from "../../components/Cards/DoorCard";
import useStore from "../../store";
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import { dbFS } from "../../config/firebase";
import Typo from "../../components/Typography/Typo";
import Space from "../../components/utils/Space";

function DoorsScreen({ navigation }) {
  const userData = useStore((state) => state.userData);
  const setDoorData = useStore((state) => state.setDoorData);
  const doorData = useStore((state) => state.doorData);
  const [loading, setLoading] = useState(true);

  const handleAdd = () => {
    if (userData.premisesID) {
      navigation.navigate("AddDoorScreen");
    } else {
      Alert.alert("No premises found", "Please setup a premises before you start linking doors.", [
        { text: "OK" },
      ]);
    }
  };

  useEffect(() => {
   fetchDoorData();
  }, []);

  const fetchDoorData = () => {
    if (userData.premisesID) {
      const linkedDoorsRef = collection(
        dbFS,
        "premises",
        userData.premisesID,
        "linkedDoors"
      );

      return onSnapshot(linkedDoorsRef, (snapshot) => {
        const doorData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDoorData(doorData);
        setLoading(false);
      });
    } else {
      console.log("userData.premisesID is undefined");
      setLoading(false)
      return null; // Return null if premisesID is undefined
    }
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size={"large"} color={Theme.primaryColor} />
      </View>
    );
  }

  if (!userData.premisesID) {
    return (
      <View style={styles.container}>
        <Header
          rightHandlePress={() => handleAdd()}
          rightIcon={"add"}
          subtitle="Manage doors of your premises"
          title={"Your Doors"}
        />
        <View style={styles.body}>
          <Text style={styles.noPremisesText}>
            You haven't set up a premises yet. Please go to the profile and set it up.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header
        rightHandlePress={() => handleAdd()}
        rightIcon={"add"}
        subtitle="Manage doors of your premises"
        title={"Your Doors"}
      />
      <View style={styles.body}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ overflow: "visible" }}
        >
          {doorData ? (
            doorData.length === 0 ? (
              <View style={{ alignItems: "center" }}>
                <Space space={25} />
                <Typo xl>No doors linked yet</Typo>
              </View>
            ) : (
              doorData.map((item) => (
                <DoorCard
                  key={item.id}
                  doorName={item.doorNickname}
                  doorID={item.doorID}
                  addedOn={item.timestamp}
                  doorItem={item}
                />
              ))
            )
          ) : (
            <ActivityIndicator size={"large"} color={Theme.primaryColor} />
          )}
        </ScrollView>
      </View>
    </View>
  );
}

export default DoorsScreen;

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
  noPremisesText: {
    textAlign: "center",
    marginTop: 25,
    fontSize: 16,
    fontWeight: "bold",
  },
  optionWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
    justifyContent: "center",
  },
});
