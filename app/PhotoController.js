
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableOpacity,
  Platform,
  Image,
  Alert,
} from 'react-native';

import ImagePicker from 'react-native-image-picker';

export default class PhotoController extends Component {

  constructor(props) {
    super(props)
    this.state={
      avatarSource: "",
    };
  }

  onPickPressed() {
    var options = {
      title: 'Select Avatar',
      customButtons: [
        {name: 'fb', title: 'Choose Photo from Facebook'},
      ],
      quality: 0.2,
      maxWidth: 200,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      }
    };
    ImagePicker.launchCamera(options, (response)  => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
      // You can display the image using either data...
        const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

        // or a reference to the platform specific asset location
        if (Platform.OS === 'ios') {
          const source = {uri: response.uri.replace('file://', ''), isStatic: true};
        } else {
          const source = {uri: response.uri, isStatic: true};
        }

        this.setState({
          avatarSource: source
        });
      }
    });
  }

  onBackPressed() {
    this.props.navigator.pop();
  }

  onNextPressed() {
    fetch("http://apicn.faceplusplus.com/v2/detection/detect?api_key=70c9cfe7344af128272e43e48f998993&api_secret=cVccypb24j6VuXfspNKgpFwNWcP8J6cX&img="+this.state.avatarSource.uri, {
      method: 'POST',
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.text())
    .then(
      (responseData) => {
        Alert.alert(
          '完成评测',
          '将根据您的心情推荐数据',
          [{text: '好的', onPress: () => {this.onBackPressed()}},]
        );
      }
    )
    .catch((error) => {
      console.log(error);
    })
    .done();
    // this.props.navigator.pop();
  }

  render() {
    return (
      <View>
        <View style={{flexDirection:'row', justifyContent:'center',height:66,backgroundColor:'#1185fe'}}>
          <View style={{marginTop:22, flex:1, flexDirection:'row', marginLeft: 12, marginRight: 12}}>
            <TouchableOpacity onPress={()=>this.onBackPressed()} style={{justifyContent:'center'}}>
              <Text style={{color: '#FFFFFF'}}>
                返回
              </Text>
            </TouchableOpacity>
            <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
              <Text style={{color:'#FFFFFF', fontSize:17}}>眨眨眼</Text>
            </View>
            <TouchableOpacity onPress={()=>this.onNextPressed()} style={{justifyContent:'center'}}>
              <Text style={{color: '#FFFFFF'}}>
                下一步
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.rect}>
            <Image
              style={styles.avatarImage}
              source={this.state.avatarSource}
            />
          </View>
          <TouchableOpacity onPress={()=>this.onPickPressed()} style={{justifyContent:'center'}}>
            <View style={{height: 50, backgroundColor: 'white'}}>
            </View>
            <Text style={{color: '#5555ff', fontSize: 20}}>
              拍照
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    width: 250,
    height: 250,
  },
  backBox: {

  },
  backText: {
    fontSize: 17,
    color: "#0000ff",
  },
  rect: {
    width: 250,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#000000",
  },

});
