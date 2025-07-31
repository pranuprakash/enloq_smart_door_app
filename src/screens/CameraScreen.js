import { BarCodeScanner } from 'expo-barcode-scanner';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as Linking from 'expo-linking';

export default function CameraScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scannedBarcode, setScannedBarcode] = useState(null);


  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarcodeScan = ({ type, data }) => {
    setScannedBarcode(data);
    navigation.navigate('ResultScreen',{scannedBarcode: scannedBarcode})
  };

  const requestCameraPermission = () => {
    Linking.openSettings();
  };

  
  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>Camera permission not granted</Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestCameraPermission}>
          <Text style={styles.buttonText}>Request Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }
  

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={handleBarcodeScan}
        style={styles.camera}
      >
        <View style={styles.overlay}>
          <View style={styles.scanLine} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.goBack()}
          >
            <Feather name="x" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </BarCodeScanner>
    </View>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: '30%',
    alignSelf: 'center',
    borderWidth: 5,
    borderRadius: 20,
    borderColor: 'white',
    width: '70%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  scanLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 32,
    alignSelf: 'center',
    zIndex: 1,
  },
  button: {
    borderColor:'white',
    padding:15,
    borderRadius:15,
    borderWidth:2
  },
  closeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  permissionButton: {
    marginTop: 16,
    alignSelf: 'center',
    padding: 10,
    backgroundColor: '#62B1F6',
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});


