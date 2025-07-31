import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import {StyleSheet,Platform, ActivityIndicator,View} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

//importing screens
import OnboardingScreen from '../src/screens/OnboardingScreen';
import SignupScreen from '../src/screens/SignupScreen';
import LoginScreen from '../src/screens/LoginScreen';
import DashboardScreen from '../src/screens/DashboardScreen';
import Theme from '../src/Theme';
import LogoutScreen from '../src/screens/LogoutScreen';
import DoorsScreen from '../src/screens/DoorsScreen';
import StoreScreen from '../src/screens/StoreScreen';
import ProfileScreen from '../src/screens/ProfileScreen';
import useStore from '../store';
import { useEffect, useState } from 'react';
import DoorDetailsScreen from '../src/screens/DoorDetailsScreen';
import CameraScreen from '../src/screens/CameraScreen';
import ResultScreen from '../src/screens/ResultScreen';
import SetupPremisesScreen from '../src/screens/SetupPremisesScreen';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { dbFS } from '../config/firebase';
import AddDoorScreen from '../src/screens/AddDoorScreen';
import AddGuestScreen from '../src/screens/AddGuestScreen';
import ManageGuestPassScreen from '../src/screens/ManageGuestPassScreen';


//initializing navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


//colors
const activeIconColor = Theme.primaryColor;
const inactiveIconColor = '#7c7c7c';

//the main router 
export default function MasterRoute() {

  const setIsLoggedIn = useStore((state) => state.setIsLoggedIn);
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const setUserID = useStore((state) => state.setUserID);
  const userID = useStore((state) => state.userID);
  const [loading,setLoading] = useState(true)  
  
  const setUserData = useStore((state) => state.setUserData);

  const checkLoggedIn = async () => {

    const isLoggedInString = await AsyncStorage.getItem('isLoggedIn');
    const storeUserId = await AsyncStorage.getItem('userID');

    if (isLoggedInString === 'true') {
      setIsLoggedIn(true);
      console.log('Login :',isLoggedIn)
    }

    if (storeUserId !== null ){ 
      setUserID(storeUserId)
      console.log('UID :',storeUserId)
    }

    setLoading(false)
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);



  if(loading){
    return(
      <View style={{flex:1,backgroundColor:'white',justifyContent: 'center',alignItems:'center'}}>
        <ActivityIndicator size={'large'} color={Theme.primaryColor} />
      </View>
    )
  }

    return (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown:false}}>
            {!isLoggedIn ? <Stack.Screen name='OnboardingScreen' component={OnboardingScreen} /> : <Stack.Screen name='DashboardScreen' component={AdminRoute} />}
              <Stack.Screen name='SignupScreen' component={SignupScreen} />
              <Stack.Screen name='LoginScreen' component={LoginScreen} />
              <Stack.Screen name='LogoutScreen' component={LogoutScreen} />
              <Stack.Screen name='DoorDetailsScreen' component={DoorDetailsScreen} />
              <Stack.Screen name='CameraScreen' component={CameraScreen} />
              <Stack.Screen name='ResultScreen' component={ResultScreen} />
              <Stack.Screen name='SetupPremisesScreen' component={SetupPremisesScreen} />
              <Stack.Screen name='AddDoorScreen' component={AddDoorScreen} />
              <Stack.Screen name='AddGuestScreen' component={AddGuestScreen} />
              <Stack.Screen name='ManageGuestPassScreen' component={ManageGuestPassScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );
}


function AdminRoute() {
  const userData = useStore((state) => state.userData);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconSource;
          let iconColor;

          switch (route.name) {
            case "Dashboard":
              iconSource = "home";
              break;
            case "DoorsScreen":
              iconSource = "grid";
              break;
            case "StoreScreen":
              iconSource = "shopping-cart";
              break;
            case "ProfileScreen":
              iconSource = "user";
              break;
          }

          if (focused) {
            iconColor = activeIconColor;
          } else {
            iconColor = inactiveIconColor;
          }

          return <Feather name={iconSource} size={24} color={iconColor} />;
        },
        tabBarStyle: [styles.tabbarstyle],
        tabBarActiveTintColor: Theme.primaryColor,
        headerShown: false,
        tabBarInactiveTintColor: "#7c7c7c",
        tabBarLabel: () => {
          null;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      {userData ? (
        userData.userRole === "admin" ? (
          <Tab.Screen name="DoorsScreen" component={DoorsScreen} />
        ) : null
      ) : null}
      <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles= StyleSheet.create({
  tabbarstyle:{
  height: Platform.OS === 'ios' ? 95 : 75, // set the height based on the platform
  borderTopWidth: 0, // add a border to the top of the tab bar
  borderTopColor: '#E0E0E0',
  backgroundColor: '#FFFFFF', // set a background color for the tab bar
  paddingVertical: Platform.OS === 'ios' ? 20 : 0 // add extra padding for iOS to account for the notch
  },
})