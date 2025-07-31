import React, { useState } from "react";
import { 
    View,
    ScrollView,
    StyleSheet,
} from "react-native";

import Header from '../../components/utils/Header'
import Theme from "../Theme";

function StoreScreen({navigation}){

    return (
      <View style={styles.container}>
        <Header
          subtitle="Get latest products here!"
          title={"Store"}
        />
        <View style={styles.body}>
          <ScrollView>
           
          </ScrollView>
        </View>
      </View>
    );}

export default StoreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.lightBackgroundColor,
  },
  body: {
    flex: 7,
    paddingTop: 25,
  },
  optionWrapper:{
    flexDirection:'row',
    flexWrap:'wrap',
    gap:20,
    justifyContent:'center'
  }
});