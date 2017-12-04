'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  ScrollView,
  View,
  Text,
  Button,
} from 'react-native';
import IngredientConverter from './IngredientConverter';
import RecipeWebView from './RecipeWebView';

export default class RecipeView extends Component<{}> {
  _onRecipePressed = () => {
    this.props.navigator.push({
      title: "Recipe Web View",
      component: RecipeWebView,
      passProps: {
        recipe: this.props.recipe.recipe,
        user: this.props.user
      }
    });
  };
  _onIngredientsPressed = () => {
    this.props.navigator.push({
      title: "Ingredient Converter",
      component: IngredientConverter,
      passProps: {
        recipe: this.props.recipe.recipe,
        user: this.props.user
      }
    });
  }
  
  render() {
    const recipe = this.props.recipe.recipe;
    let healthLabels = recipe.healthLabels.join(', ')
    let ingredients = recipe.ingredientLines.join('\n\n');
    return (
      <ScrollView>
        <Text style={styles.label}>{recipe.label}</Text>
        <Image style={styles.image}
          source={{url: recipe.image}} />     
        <View style={styles.heading}>
          <Text style={styles.healthLabels}>{healthLabels}</Text>
        </View>
          <Button
            onPress={this._onRecipePressed}
            color='#F9564F'
            title='View Recipe'
          />  
        <View style={styles.separator}/> 
        <Text style={styles.label}>Ingredients</Text>
        <Text style={styles.ingredients}>{ingredients}</Text>
        <View style={styles.separator}/> 
          <Button
            onPress={this._onIngredientsPressed}
            color='#F9564F'
            title='Convert Ingredients'
          />  
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 65
  },
  heading: {
    backgroundColor: '#F3C677'
  },
  separator: {
    height: 1,
    backgroundColor: '#F3C677'
  },
  image: {
    width: 420,
    height: 300
  },
  label: {
    fontSize: 25,
    fontWeight: 'bold',
    margin: 5,
    color: '#F9564F'
  },
  healthLabels: {
    fontSize: 18,
    margin: 5,
    color: '#0C0A3E'
  },
  ingredients: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 5,
    color: '#0C0A3E'
  }
});