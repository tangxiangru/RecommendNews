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
import ArticleController from './ArticleController'
import Spinner from 'react-native-spinkit'

var contentHeight = Dimensions.get('window').height-116;
var contentWidth = Dimensions.get('window').width;

class NewsList extends Component {

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
      loaded: false,
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
    this.fetchData();
  }

  fetchData() {
    fetch("http://sakuraneko.oss-cn-shanghai.aliyuncs.com/ANSWER_TABLE.json", {
      method: 'GET',
    })
    .then((response) => response.json())
    .then(
      (responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.RECORDS),
          loaded: true,
          isRefreshing: false,
        });
      }
    )
    .catch((error) => {

    })
    .done();
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

  pressRow(content, author, title, questionID) {
    this.props.navigator.push({name:'ArticleController', component: ArticleController, params: { content: content, author: author, title: title, questionID: questionID}});
  }

  renderRow(data) {
    var thumbnail = require('./img/noimg.jpg');

    // if (data.imageurls.length) {
    //   thumbnail = {uri: data.imageurls[0].url};
    // }

    return (
      <TouchableHighlight style={{backgroundColor: '#FFFFFF'}} underlayColor={'#CCCCCC'} onPress={ () => this.pressRow(data.A_CONTENT, data.A_AUTHOR, data.A_QUESTION_TITLE, data.A_QUESTION_ID) }>
        <View style={styles.cell}>

          <View style={styles.rightContainer}>
            <Text style={{fontSize:19, marginTop: 12}} numberOfLines={2}>{data.A_QUESTION_TITLE}</Text>
            <View style={{marginTop: 8, marginBottom: 12, flex:1, flexDirection:'row', alignItems:'stretch', justifyContent: 'space-between'}}>
              <Text style={{fontSize: 15, color: '#444488'}} numberOfLines={1}>读完需要{data.A_CONTENT.length/400}分钟</Text>
              <Text style={{fontSize: 15}}>{data.A_AUTHOR}</Text>
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
          renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={{height: 1, marginLeft: 12, width: contentWidth-12 , backgroundColor: '#DDDDDD',}} />}
          style = {styles.listView}
          refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this._onRefresh}
          />}
        />
      </View>

    )
  }
}

var styles = StyleSheet.create({
  listView: {
    height: contentHeight,
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
    marginLeft: 16,
    marginRight: 16,
  },
  thumbnail: {
    width: 100,
    height: 80,
    backgroundColor: "#fdfdff",
  },
  thumbnailImage: {
    width: 100,
    height: 80,
  },
});

export default NewsList
