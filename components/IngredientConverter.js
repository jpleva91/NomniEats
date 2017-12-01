'use strict'

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableHighlight,
    Text,
    Button,
    Image
} from 'react-native';

export default class IngredientConverter extends Component <{}> {
  _onVeganPressed = () => {
    console.log("Vegan Recipe Button Pressed");
    console.log(this.props.recipe);
  };
  _onVegetarianPressed = () => {
    console.log("Vegetarian Recipe Button Pressed");
    console.log(this.props.recipe);
  };
  _onGlutenFreePressed = () => {
    console.log("Gluten Free Recipe Button Pressed");
    console.log(this.props.recipe);
  };

  render() {
    const recipe = this.props.recipe;
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{recipe.label}</Text>
        <Image style={styles.image}
          source={{url: recipe.image}} /> 
        <Text style={styles.title}>Make this recipe: </Text>
        <View style={styles.separator}/>
        <View style={styles.rowContainer}>
          <Button
              onPress={this._onVeganPressed}
              color='#48BBEC'
              title='Vegan'
            />
        </View>
        <View style={styles.separator}/>
        <View style={styles.rowContainer}>
          <Button
              onPress={this._onVegetarianPressed}
              color='#48BBEC'
              title='Vegetarian'
            />
        </View>
        <View style={styles.separator}/>
        <View style={styles.rowContainer}>
          <Button
              onPress={this._onGlutenFreePressed}
              color='#48BBEC'
              title='Gluten-Free'
            />
        </View>
        <View style={styles.separator}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 65,
  },
  heading: {
    backgroundColor: '#F8F8F8'
  },
  separator: {
    height: 1,
    backgroundColor: '#DDDDDD'
  },
  image: {
    width: 400,
    height: 300
  },
  label: {
    fontSize: 25,
    fontWeight: 'bold',
    margin: 5,
    color: '#48BBEC'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 5,
    color: '#656565'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 18,
    justifyContent: 'center',
    alignItems: 'center'
  },
});