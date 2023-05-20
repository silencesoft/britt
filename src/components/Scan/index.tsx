import { useNavigation } from '@react-navigation/native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { AutoFocus, BarCodeScanningResult, Camera, CameraType, FlashMode } from 'expo-camera';
import * as Clipboard from 'expo-clipboard';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { IconButton } from 'react-native-paper';

import { RootStackParamList } from 'src/constants/RootStackParamList';

type Props = {};

const Scan = (props: Props) => {
  const navigation = useNavigation<RootStackParamList>();
  const [cameraFlash, setCameraFlash] = useState(FlashMode.off);
  const [invoice, setInvoice] = useState('');

  const handleCodeScanned = async ({ data }: BarCodeScanningResult) => {
    const invoice = data.replace('lightning:', '');

    setInvoice(invoice);
  };

  const handlePaste = async () => {
    try {
      // const { state } =
      //   Platform.OS === 'web'
      //     ? await navigator.permissions.query({
      //         name: 'clipboard-write',
      //       })
      //     : { state: 'granted' };
      // if (state == 'granted' || state == 'prompt') {

      const text = await Clipboard.getStringAsync();

      setInvoice(text.replace('lightning:', ''));
      // }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (invoice) {
      navigation.navigate('Pay', { invoice: invoice });
    }
  }, [invoice]);

  return (
    <View style={styles.container}>
      <Camera
        autoFocus={AutoFocus.on}
        style={{ flex: 1, width: '100%' }}
        type={CameraType.back}
        flashMode={cameraFlash}
        ratio="16:9"
        onBarCodeScanned={(scanningResult: BarCodeScanningResult) => handleCodeScanned(scanningResult)}
        barCodeScannerSettings={{ barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr] }}
      >
        <View style={{ position: 'absolute', right: 30, bottom: 40, flexDirection: 'column' }}>
          <TouchableOpacity
            onPress={() => setCameraFlash(cameraFlash === FlashMode.off ? FlashMode.torch : FlashMode.off)}
            style={{ padding: 16 }}
          >
            <IconButton icon="flash" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePaste} style={{ padding: 16 }}>
            <IconButton icon="content-paste" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ padding: 16 }}>
            <IconButton icon="close" />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

export default Scan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
});
