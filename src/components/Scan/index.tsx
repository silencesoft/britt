import { useNavigation } from "@react-navigation/native";
import {
  CameraView,
  CameraType,
  useCameraPermissions,
  BarcodeScanningResult,
} from "expo-camera";
import * as Clipboard from "expo-clipboard";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { Button, IconButton } from "react-native-paper";
import { Platform } from "expo-modules-core";

import { RootStackParamList } from "src/constants/RootStackParamList";

type Props = {};

const Scan = (props: Props) => {
  const navigation = useNavigation<RootStackParamList>();
  const [cameraFlash, setCameraFlash] = useState("off");
  const [invoice, setInvoice] = useState("");
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>("back");

  const handleCodeScanned = async ({ data }: BarcodeScanningResult) => {
    const invoice = data.replace("lightning:", "");

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

      setInvoice(text.replace("lightning:", ""));
      // }
    } catch (err) {
      console.log(err);
    }
  };

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  useEffect(() => {
    if (invoice) {
      navigation.navigate("Pay", { invoice: invoice });
    }
  }, [invoice]);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={{ flex: 1, width: "100%" }}>
        <Text>We need your permission to show the camera</Text>
        <Button onPress={requestPermission}>
          <IconButton icon="refresh" size={48} />
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={{ flex: 1, width: "100%" }}
        facing={facing}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        onBarcodeScanned={handleCodeScanned}
      >
        <View
          style={{
            position: "absolute",
            right: 30,
            bottom: 40,
            flexDirection: "column",
          }}
        >
          <TouchableOpacity
            style={{ padding: 16 }}
            onPress={toggleCameraFacing}
          >
            <IconButton icon="flash" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              setCameraFlash(cameraFlash === "off" ? "torch" : "off")
            }
            style={{ padding: 16 }}
          >
            <IconButton icon="flash" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePaste} style={{ padding: 16 }}>
            <IconButton icon="content-paste" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            style={{ padding: 16 }}
          >
            <IconButton icon="close" />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
};

export default Scan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
});
