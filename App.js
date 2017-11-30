/**
 * NomniEats
 * https://github.com/jpleva91/NomniEats
 * @flow
 */

import React, { Component } from 'react';
import {
  ActivityIndicator,
  ListView,
  Platform,
  StyleSheet,
  Text,
  View,
	Dimensions,
} from 'react-native';

import Search from './components/Search';

import { SearchBar, Button } from 'react-native-elements';


export default class App extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    console.groupCollapsed
  }

  render() {
    return (
      <View style={styles.container}>
        <Search />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    position: 'relative',
    top: 24,
  },
});
