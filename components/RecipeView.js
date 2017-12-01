'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  ScrollView,
  View,
  Text,
  LinkingIOS,
  Button
} from 'react-native';

export default class RecipeView extends Component<{}> {
  _onRecipePressed = () => {
    console.log("Recipe Button Pressed");
  };
  _onIngredientsPressed = () => {
    console.log("Ingredient Button Pressed");
  }
  
  render() {
    const recipe = {
      "uri": "http://www.edamam.com/ontologies/edamam.owl#recipe_5c16802dd815e76ce94487b567073877",
      "label": "Creamy Tofu Sauce Recipe",
      "image": "https://www.edamam.com/web-img/d50/d5015f52972ebbf2746ae592d477dc4d.jpg",
      "source": "Serious Eats",
      "url": "http://www.seriouseats.com/recipes/2011/02/creamy-tofu-sauce-recipe.html",
      "shareAs": "http://www.edamam.com/recipe/creamy-tofu-sauce-recipe-5c16802dd815e76ce94487b567073877/tofu",
      "yield": 2,
      "dietLabels": [
          "Low-Carb"
      ],
      "healthLabels": [
          "Sugar-Conscious",
          "Vegan",
          "Vegetarian",
          "Peanut-Free",
          "Tree-Nut-Free",
          "Alcohol-Free"
      ],
      "cautions": [
          "Gluten",
          "Wheat"
      ],
      "tags": [
          "Asian",
          "mirin",
          "miso",
          "salad dressings",
          "tofu"
      ],
      "ingredientLines": [
          "1/4 to 1/3 large block silken or firm tofu, about 4 ounces",
          "2 teaspoons sweet, light miso, preferably Saikyo miso",
          "Pinch of salt",
          "Drop of mirin"
      ],
      "ingredients": [
          {
              "text": "1/4 to 1/3 large block silken or firm tofu, about 4 ounces",
              "weight": 118.125
          },
          {
              "text": "2 teaspoons sweet, light miso, preferably Saikyo miso",
              "weight": 11.623570442199707
          },
          {
              "text": "Pinch of salt",
              "weight": 0.75
          },
          {
              "text": "Drop of mirin",
              "weight": 0.061499252915382385
          }
      ]
}
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
            color='#48BBEC'
            title='View Recipe'
          />  
        <View style={styles.separator}/> 
        <Text style={styles.label}>Ingredients</Text>
        <Text style={styles.ingredients}>{ingredients}</Text>
          <Button
            onPress={this._onIngredientsPressed}
            color='#48BBEC'
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