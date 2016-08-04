/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
 "use strict";

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View
} from 'react-native';

import RootNavigation from "./Views/RootNavigation";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0
  }
});






class sociall777 extends Component {
  render() {
    return (
      <View style={styles.container}>
        <RootNavigation ref="rootNavigation" />
      </View>
    );
  }
}

AppRegistry.registerComponent('sociall777', () => sociall777);
