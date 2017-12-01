'use strict'
 
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ActivityIndicator,
  Image,
} from 'react-native';

export default class SearchPage extends Component<{}> {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          Search for recipes!
        </Text>
        <Text style={styles.description}>
          Search by food name or style.
        </Text>
        <View style={styles.flowRight}>
          <TextInput
            style={styles.searchInput}
            placeholder='Search via food name or style' />
          <Button
            onPress={() => {}}
            color='#48BBEC'
            title='Go'
          />
        </View>
        <Image source={require('../Resources/cooking.png')} style={styles.image} />
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
    alignItems: 'center'
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flexGrow: 1,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC',
  },
  image: {
    marginTop: 36,
    width: 434,
    height: 276,
  },
});