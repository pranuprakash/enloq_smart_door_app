import React from "react";
import { 
    View,
    Text,
    StyleSheet,
    Platform,
    TouchableOpacity,
    SafeAreaView
} from "react-native";
import { Feather } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from '@expo/vector-icons';
import Theme from "../../src/Theme";

function Header({title,hasBackIcon,rightHandlePress,rightIcon,subtitle}){
    const navigation = useNavigation()
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={{ alignItems: "center", flexDirection: "row" }}>
            {hasBackIcon ? (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Feather
                  style={{ marginRight: 15 }}
                  name="chevron-left"
                  size={28}
                  color="black"
                />
              </TouchableOpacity>
            ) : null}
            <View>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.subtitle}>{subtitle}</Text>
            </View>
          </View>
          <View>
            {rightIcon ? (
              <TouchableOpacity onPress={rightHandlePress}>
                <MaterialIcons name={rightIcon} size={24} color="black" />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </SafeAreaView>
    );}
export default Header;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 25,
    justifyContent: "space-between",
    paddingTop:Platform.OS === 'android' ? 25 : 0,
  },
  title: {
    color: Theme.textColor,
    fontFamily: Theme.SpaceBold,
    fontSize: 25,
    textTransform: "capitalize",
  },
  subtitle: {
    color: Theme.textColor,
    fontFamily: Theme.SpaceLight,
    fontSize: 16,
    textTransform: "capitalize",
    opacity:0.6
  },
});