import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { RNCamera } from 'react-native-camera';
// components
import Label from 'smartchef/src/components/Label';

const WrapperButton = styled.TouchableOpacity`
  display: flex;
  padding-top: 26px;
  padding-horizontal: 20;
  padding-bottom: 12px;
  right: 0px;
  top: 0px;
  z-index: 1000;
`;

const CaptureButtonView = styled.View`
  position: absolute;
  display: flex;
  width: 100%;
  bottom: 1px;
  flex-direction: row;
  justify-content: center;
`;

export default class CameraView extends PureComponent {
  state = {
    SmartPhone: null
  };

  // componentDidMount() {
  //   this._handleButtonPress();
  // }
  // _handleButtonPress = () => {
  //   CameraRoll.getPhotos({
  //     first: 20,
  //     assetType: 'Photos',
  //   })
  //     .then(r => {
  //       console.log("photo", r.edges)
  //       this.setState({ photos: r.edges });
  //     })
  //     .catch((err) => {
  //       //Error Loading Images
  //     });
  // };

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      this.setState({ SmartPhone: data });
      console.log(data);
    }
  };

  renderCamera() {
    // const { SmartPhone } = this.state;
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes);
          }}
        />
        <CaptureButtonView>
          <TouchableOpacity
            onPress={this.takePicture.bind(this)}
            style={styles.capture}
          >
            <View />
          </TouchableOpacity>
        </CaptureButtonView>
      </View>
    );
  }

  renderImage() {
    const { actionClose, onAddPhoto } = this.props;
    const { SmartPhone } = this.state;
    console.log("la img SmartPhone", SmartPhone);
    return (
      <View style={{ flex: 1 }}>
        <Image source={{ uri: `${SmartPhone.uri}` }} style={styles.preview} />
        <CaptureButtonView>
          <WrapperButton
            onPress={() => {
              this.setState({ SmartPhone: null });
              actionClose();
            }}
          >
            <Label color={"#ffff"} weight={600} size="17px">
              Cancel
            </Label>
          </WrapperButton>
          <WrapperButton
            onPress={() => {
              this.setState({ SmartPhone: null });
              onAddPhoto(SmartPhone);
              actionClose();
            }}
          >
            <Label color={"#ffff"} weight={600} size="17px">
              Add
            </Label>
          </WrapperButton>
        </CaptureButtonView>
      </View>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.SmartPhone ? this.renderImage() : this.renderCamera()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  smartphoneImage: {
    width: 50,
    resizeMode: 'contain',
    backgroundColor: 'blue'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  capture: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 5,
    borderColor: '#FFF',
    marginBottom: 15,
  },
  cancel: {
    fontWeight: '600',
    fontSize: 17,
  }

});
