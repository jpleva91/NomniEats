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
  NavigatorIOS
} from 'react-native';

import SearchPage from './components/SearchPage';
import RecipeView from './components/RecipeView';

export default class App extends Component<{}> {

  render() {
    return (
        <NavigatorIOS
          style={styles.container}
          initialRoute={{
            title: 'NomniEats',
            component: RecipeView,
          }}/>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
