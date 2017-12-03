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
  Image
} from 'react-native';

import Config from 'react-native-config';
import firebase from 'firebase';

import LoginForm from './components/LoginForm';
import SearchPage from './components/SearchPage';
import RecipeView from './components/RecipeView';

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
      <View style={styles.container}>
        <Text style={styles.description}>
          Search for recipes!
        </Text>
        <LoginForm />
        <View style={styles.center}>
          <Image source={require('./Resources/hungry-cat.png')} style={styles.image} />
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
    description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    padding: 30,
    marginTop: 65,
    flex: 1,
  },
  image: {
    marginTop: 18,
    width: 217,
    height: 217,
  },
  center: {
    alignItems: 'center',
  }
});
