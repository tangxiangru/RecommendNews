import React, { Component, } from 'react'
import {
  View,
  Navigator,
  Text,
  Image,
  StyleSheet,
  ListView,
  Dimensions,
  TouchableHighlight,
  RefreshControl,
} from 'react-native'
import ArticleController from './ArticleController';
import Spinner from 'react-native-spinkit';
import ChartWebView from './ChartWebView';

var contentHeight = Dimensions.get('window').height-116;
var contentWidth = Dimensions.get('window').width;

class WeeklyReport extends Component {

  PropTypes:{
    id:React.PropTypes.string,
  }

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: true,
      id: this.props.id,
      spinkitSize: 50,
      isRefreshing: false,
    };
    this.pressRow = this.pressRow.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this._onRefresh = this._onRefresh.bind(this);
  }

  componentDidMount() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(["地图", "直方图", "雷达图"]),
    });

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

  pressRow(data) {
    var url = "";
    switch (data) {
      case "地图":
        url = "http://120.25.238.137:3001/map";
        break;
      case "直方图":
        url = "http://120.25.238.137:3001/bar";
        break;
      case "雷达图":
        url = "http://120.25.238.137:3001/radar";
        break;
      default:
    }
    this.props.navigator.push({name:'ChartWebView', component: ChartWebView, params: { url: url }});
  }

  renderRow(data) {
    var icon = require('./img/rn_placeholder.png');
    switch (data) {
      case "地图":
        icon = require('./img/earth.png');
        break;
      case "直方图":
        icon = require('./img/line.png');
        break;
      case "雷达图":
        icon = require('./img/radar.png');
        break;
      default:

    }
    return (
      <TouchableHighlight style={{backgroundColor: '#FFFFFF'}} underlayColor={'#CCCCCC'} onPress={ () => this.pressRow(data) }>
        <View style={styles.cell}>
          <Image
            source={icon}
            style={styles.icon}
          />
          <Text style={styles.text}>
            {data}
          </Text>
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

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <View>
        <ListView
          contentInset = {{top: 0, left: 0, bottom: 0, right: 0}}
          dataSource = {this.state.dataSource}
          renderRow = {this.renderRow}
          renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={{height: 0.5, width: contentWidth , backgroundColor: '#DDDDDD',}} />}
          style = {styles.listView}
        />
      </View>

    )
  }
}

var styles = StyleSheet.create({
  icon: {
    marginLeft: 16,
    height: 30,
    width: 30,
  },
  listView: {
    height: contentHeight,
  },
  text: {
    fontSize: 18,
    marginLeft: 12,
  },
  cell: {
    height: 64,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
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

export default WeeklyReport;
