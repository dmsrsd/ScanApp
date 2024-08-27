import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';

export default function ScannerScreen() {

  const [ValScan, setValScan] = useState('tidak ada data');
  const [cameraActive, setCameraActive] = useState(false);

  const device = useCameraDevice('back');
  if (!device) {
    return <Text>Tidak Ada Kamera</Text>;
  }

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      console.log(`Scanned ${codes[0].value} codes!`);
      setValScan(codes[0].value);
      if (codes[0].value === 'https://www.the-qrcode-generator.com/') {
        setCameraActive(false);
      }
    },
  });

  return (
    <View style={styles.container}>
      {cameraActive ? (
        <Camera
          device={device && device}
          isActive={true}
          style={styles.camera}
          codeScanner={codeScanner}
        />
      ) : (
        <TouchableOpacity
          onPress={() => setCameraActive(true)}
          style={styles.btnScan}>
          <Text>Buka Kamera</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.textScan}>{ValScan}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    width: 400,
    height: 400,
    borderColor: 'black',
    borderWidth: 1,
  },
  textScan: {
    color: 'red',
    fontSize: 20,
  },
  btnScan: {
    backgroundColor: 'green',
  },
});
