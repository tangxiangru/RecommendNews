import React, { Component, } from 'react'
import {
  View,
  Navigator,
  Text,
  Image,
  StyleSheet,
  WebView,
  Dimensions,
  TouchableOpacity,
  RefreshControl,
  ActionSheetIOS,
} from 'react-native';
import ArticleController from './ArticleController';
import Spinner from 'react-native-spinkit';

var contentHeight = Dimensions.get('window').height-116;
var contentWidth = Dimensions.get('window').width;

class ChartWebView extends Component {

  PropTypes:{
    id:React.PropTypes.string,
  }

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {
      loaded: true,
      id: this.props.id,
      spinkitSize: 50,
      isRefreshing: false,
      url: this.props.url,
    };
    this.pressRow = this.pressRow.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this._onRefresh = this._onRefresh.bind(this);
    this.onBackPressed = this.onBackPressed.bind(this);
    this.onSharePressed = this.onSharePressed.bind(this);
  }

  componentDidMount() {

  }

  fetchData() {

  }

  renderLoadingView() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: contentHeight/2-this.state.spinkitSize}}>
        <Spinner
          size={this.state.spinkitSize}
          color='#474c51'
          type='Wave'
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        />
      </View>
    );
  }

  pressRow(allList, title, source, url, imgList) {
    this.props.navigator.push({name:'ArticleController', component: ArticleController, params: { dataList: allList, title: title, origin: source, url: url, imgList: imgList}});
  }

  renderRow(data) {
    var thumbnail = require('./img/rn_placeholder.png');

    if (data.imageurls.length) {
      thumbnail = {uri: data.imageurls[0].url};
    }

    return (
      <TouchableHighlight style={{backgroundColor: '#FFFFFF'}} underlayColor={'#CCCCCC'} onPress={ () => this.pressRow(data.allList, data.title, data.source, data.link, data.imageurls) }>
        <View style={styles.cell}>
          <Image style={styles.thumbnail} source={thumbnail}/>
          <View style={styles.rightContainer}>
            <Text style={{fontSize:17}} numberOfLines={2}>{data.title}</Text>
            <View style={{marginTop: 8, flex:1, flexDirection:'row', alignItems:'stretch', justifyContent: 'space-between'}}>
              <Text style={{fontSize: 13}} numberOfLines={1}>{data.pubDate}</Text>
              <Text style={{fontSize: 13}}>{data.source}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  _onRefresh() {
    this.setState({
      isRefreshing: true,
      loaded: false,
    });
    this.fetchData();
  }

  onBackPressed() {
    this.props.navigator.pop();
  }

  onSharePressed() {
    var BUTTONS = [
      '新浪微博',
      '微信好友',
      '朋友圈',
      'QQ好友',
      'QQ空间',
      '取消分享',
    ];

    ActionSheetIOS.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: BUTTONS.length-1,
      tintColor: '#364c62',
    },
    (buttonIndex) => {
      switch (BUTTONS[buttonIndex]) {
        case '新浪微博':
          console.log("weibo");
          var shareItem;

          if (this.state.imgList.length !== 0) {
            shareItem = {
              type: 'image',
              text: this.state.title + " - 原文：" + this.state.url + "- 来自ReactNews",
              imageUrl: this.state.imgList[0].url,
            };
          } else {
            shareItem = {
              type: 'text',
              text: this.state.title + " - 原文：" + this.state.url + " - 来自ReactNews",
            }
          }
          WeiboAPI.share(shareItem);
          break;
        case '微信好友':
          console.log("friends");
          WechatAPI.shareToSession({
            type: 'news',
            title: this.state.title + " - ReactNews新闻分享",
            description: 'ReactNews新闻分享',
            webpageUrl: this.state.url,
            imageUrl: this.state.imgList.length !== 0 ? this.state.imgList[0].url : "http://7xr4ds.com1.z0.glb.clouddn.com/temp-storage/rnlogo.png",
          });
          break;
        case '朋友圈':
          console.log("moment");
          WechatAPI.shareToTimeline({
            type: 'news',
            title: this.state.title + ' - ReactNews新闻分享',
            description: 'ReactNews新闻分享',
            webpageUrl: this.state.url,
            imageUrl: this.state.imgList.length !== 0 ? this.state.imgList[0].url : "http://7xr4ds.com1.z0.glb.clouddn.com/temp-storage/rnlogo.png",
          });
          break;

        case 'QQ好友':
          console.log("qqfriends");
          QQAPI.shareToQQ({
            type: 'news',
            title: this.state.title,
            description: 'ReactNews新闻分享',
            webpageUrl: this.state.url,
            imageUrl: this.state.imgList.length !== 0 ? this.state.imgList[0].url : "http://7xr4ds.com1.z0.glb.clouddn.com/temp-storage/rnlogo.png",
          });
          break;
        case 'QQ空间':
          console.log("qzone");
          QQAPI.shareToQzone({
            type: 'news',
            title: this.state.title,
            description: 'ReactNews新闻分享',
            webpageUrl: this.state.url,
            imageUrl: this.state.imgList.length !== 0 ? this.state.imgList[0].url : "http://7xr4ds.com1.z0.glb.clouddn.com/temp-storage/rnlogo.png",
          });
          break;
        default:
          console.log("cancel");
      }
    });
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

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
              <Text style={{color:'#fefefe', fontSize:22}}>知周报</Text>
            </View>
            <TouchableOpacity onPress={()=>this.onSharePressed()} style={{justifyContent:'center'}}>
              <Text style={{color: '#FFFFFF'}}>
                分享
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <WebView
          ref={"webview"}
          automaticallyAdjustContentInsets={false}
          style={styles.webView}
          source={{uri: this.state.url}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          decelerationRate="normal"
          startInLoadingState={true}
          onError={()=>{console.log("error")}}
          onLoad={()=>{console.log("load")}}
          onLoadEnd={()=>{console.log("loadend")}}
          onLoadStart={()=>{console.log("loadstart")}}
        />
      </View>

    )
  }
}

var styles = StyleSheet.create({
  webView: {
    backgroundColor: "#000000",
    height: Dimensions.get("window").height-64,
  },
  cell: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightContainer: {
    flex: 1,
    marginTop: 8,
    marginLeft: 8,
    marginRight: 8,
  },
  thumbnail: {
    width: 100,
    height: 80,
  },
});

export default ChartWebView;
