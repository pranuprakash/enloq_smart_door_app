import 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import CustomView from './components/utils/CustomView'
import MasterRoute from './route/MasterRoute';
import { StatusBar } from 'expo-status-bar';

export default function App() {

  let [fontsLoaded] = useFonts({
    SpaceBold: require('./assets/fonts/SpaceGrotesk-Bold.ttf'),
    SpaceLight: require('./assets/fonts/SpaceGrotesk-Regular.ttf'),
  });


  if (!fontsLoaded) {
    return null;
  } 

  else {
    return (
      <CustomView>
        <StatusBar style='dark' />
        <MasterRoute/>
      </CustomView>
    );
  }
}
