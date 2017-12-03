/**
 * NomniEats
 * https://github.com/jpleva91/NomniEats
 * @flow
 */

'use strict'
 
import React, { Component } from 'react';

import {
  Platform,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  TabBarIOS,
} from 'react-native';

import Config from 'react-native-config';
import firebase from 'firebase';

import LoginForm from './components/LoginForm';
import SearchPage from './components/SearchPage';
import RecipeView from './components/RecipeView';
import TabBar from './components/TabBar';

export default class App extends Component<{}> {
  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyBE_rUEl_MJbEwG5I99YnLdtV_EzV4HTFY",
      authDomain: "nomnieats.firebaseapp.com",
      databaseURL: "https://nomnieats.firebaseio.com",
      projectId: "nomnieats",
      storageBucket: "nomnieats.appspot.com",
      messagingSenderId: "281534724298"
    });
  }

  render() {
    return (
        <NavigatorIOS
          style={styles.container}
          initialRoute={{
           title: 'Login',
           component: LoginForm,
        }}
        navigationBarHidden={true} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});