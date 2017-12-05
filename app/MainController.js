import React, { Component, } from 'react'
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
} from 'react-native'
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import NewsList from './NewsList';
import WeeklyReport from './WeeklyReport';

class MainController extends Component {

  componentDidMount() {
    this.props.navigator.push({name:"PhotoController", params:{}});
  }

  render() {
    return (
      <View>
        <StatusBar barStyle="light-content"/>
        <View style={{flexDirection:'row', justifyContent:'center',height:66,backgroundColor:'#1185fe'}}>
          <View style={{flex:1, marginTop:22, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
            <View style={{backgroundColor: '#1185fe', overflow: 'hidden', borderRadius: 6}}>
              <Text style={{marginLeft: 2, marginRight: 2, marginBottom: 3, marginTop: 3, color: '#fefefe', fontSize:22}}>
                知
              </Text>
            </View>
            <View style={{marginLeft: 4}}>
              <Text style={{color:'#FFFFFF', fontSize:17}}></Text>
            </View>
          </View>
        </View>
        <ScrollableTabView
          tabBarBackgroundColor='#1185fe'
          tabBarUnderlineColor='#FFFFFF'
          tabBarActiveTextColor='#FFFFFF'
          tabBarInactiveTextColor='#BBBBBB'
          tabBarTextStyle={{fontSize: 15}}
          renderTabBar={() => <ScrollableTabBar/>}>
          <NewsList
            tabLabel='个'
            navigator={this.props.navigator}
            id='5572a109b3cdc86cf39001db'
          />
          <NewsList
            tabLabel='大'
            navigator={this.props.navigator}
            id='5572a109b3cdc86cf39001de'
          />
          <NewsList
            tabLabel='新'
            navigator={this.props.navigator}
            id='5572a10bb3cdc86cf39001f8'
          />
          <NewsList
            tabLabel='闻'
            navigator={this.props.navigator}
            id='5572a10ab3cdc86cf39001eb'
          />
          <WeeklyReport
            tabLabel='周报'
            navigator={this.props.navigator}
            id='00000'
          />
          <NewsList
            tabLabel='毛衣'
            navigator={this.props.navigator}
            id='5572a10ab3cdc86cf39001eb'
          />
        </ScrollableTabView>
      </View>
    )
  }
}

export default MainController
