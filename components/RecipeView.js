'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text
} from 'react-native';

export default class RecipeView extends Component<{}> {
  render() {
    const recipe = this.props.recipe.recipe;
    console.log(recipe);
    return (
      <View style={styles.container}>
        <Image style={styles.image}
          source={{url: recipe.image}} />
        <View style={styles.heading}>
          <Text style={styles.label}>{recipe.label}</Text>
          <Text style={styles.healthLabels}>{recipe.healthLabels}</Text>
          <View style={styles.separator}/>
        </View>
        <Text style={styles.ingredients}>{recipe.ingredientLines}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 65
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
  healthLabels: {
    fontSize: 20,
    margin: 5,
    color: '#656565'
  },
  ingredients: {
    fontSize: 18,
    margin: 5,
    color: '#656565'
  }
});