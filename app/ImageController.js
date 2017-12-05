import React, { Component, } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
} from 'react-native'
import Gallery from 'react-native-gallery'

var contentHeight = Dimensions.get('window').height-66;

class ImageController extends Component {

  static propTypes = {

  }

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {
      imgArray: this.props.imgArray,
    }
  }

  componentDidMount() {
    console.log(this.state.imgArray[0]);
  }

  onBackPressed() {
    this.props.navigator.pop();
  }

  render() {

    return (
      <Gallery
        style={{flex:1, backgroundColor: 'black'}}
        images={this.state.imgArray}
        onSingleTapConfirmed={() => this.onBackPressed()}
      />
    )
  }

}

export default ImageController;
