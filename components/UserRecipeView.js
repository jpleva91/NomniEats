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
        user: this.props.user,
        recipe: this.props.recipe
      }
    });
  };
  _executeQuery = (uid,ref) => {
    this.setState({ isLoading: true });
    fetch(`https://nomnieats.firebaseio.com/${uid}/recipes/${ref}.json`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    this.props.navigator.popN(2);
   };
  _onDeletePressed = () => {
    console.log("Deleting",this.props.user.uid,this.props.recipe.ref)
    this._executeQuery(this.props.user.uid, this.props.recipe.ref);
  }
  
  render() {
    const recipe = this.props.recipe.recipe;
    let healthLabels = recipe.healthLabels.join(', ')
    return (
      <ScrollView>
        <Text style={styles.label}>{recipe.title}</Text>
        <Image style={styles.image}
          source={{url: recipe.image}} />     
        <View style={styles.heading}>
          <Text style={styles.healthLabels}>{healthLabels}</Text>
        </View>
          <Button
            onPress={this._onRecipePressed}
            color='#48BBEC'
            title='View Recipe'
          />  
        <View style={styles.separator}/> 
        <Text style={styles.label}>Ingredients</Text>
        <Text style={styles.ingredients}>{recipe.ingredients}</Text>
        <View style={styles.separator}/> 
        <Button
            onPress={this._onDeletePressed}
            color='red'
            title='Delete Recipe'
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
    backgroundColor: '#F8F8F8'
  },
  separator: {
    height: 1,
    backgroundColor: '#DDDDDD'
  },
  image: {
    width: 420,
    height: 300
  },
  label: {
    fontSize: 25,
    fontWeight: 'bold',
    margin: 5,
    color: '#48BBEC'
  },
  healthLabels: {
    fontSize: 18,
    margin: 5,
    color: '#656565'
  },
  ingredients: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 5,
    color: '#656565'
  }
});