/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
} from 'react-native';

import MainController from './MainController';
import ArticleController from './ArticleController';
import ImageController from './ImageController';
import ChartWebView from './ChartWebView';
import PhotoController from './PhotoController';

class HackathonProject extends Component {
  renderScene(router, navigator) {
    var Component = null;
    this._navigator = navigator;
    switch (router.name) {
      case "Main":
        Component = MainController;
        break;
      case "ArticleController":
        Component = ArticleController;
        break;
      case "ImageController":
        Component = ImageController;
        break;
      case "ChartWebView":
        Component = ChartWebView;
        break;
      case "PhotoController":
        Component = PhotoController;
        break;
      default:
        Component = MainController;
    }
    return <Component {...router.params} navigator={navigator}/>
  }

  render() {
    return (
      <Navigator
        initialRoute={{name: 'Main', componnet: MainController}}
        configureScene={(route) => {
          return Navigator.SceneConfigs.FloatFromBottomAndroid;
        }}
        renderScene={this.renderScene}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#cccccc',
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#cccccc',
  },
  tabBar: {
  },
});

AppRegistry.registerComponent('HackathonProject', () => HackathonProject);
