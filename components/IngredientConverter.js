'use strict'

import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    TouchableHighlight,
    Text,
    Button,
    Image
} from 'react-native';

export default class IngredientConverter extends Component <{}> {
  constructor(props) {
    super(props);
    this.state = {
        ingredientLine: this.props.recipe.ingredientLines.join('\n\n'),
    }
}
  _onVeganPressed = () => {
    let vegan = this.props.recipe;
    let isVegan = false;
    vegan.healthLabels.forEach(label => {
      if(label.toUpperCase() == 'VEGAN') {
        isVegan = true;
      }
    });
    isVegan ? console.log("This is already vegan") : console.log("Oh snap! This has animal products...");
  };
  _onVegetarianPressed = () => {
    let vegetarian = this.props.recipe;
    let isVegetarian = false;
    vegetarian.healthLabels.forEach(label => {
      if(label.toUpperCase() == 'VEGETARIAN') {
        isVegetarian = true;
      }
    });
    isVegetarian ? console.log("This is already vegetarian") : this.convertVegetarian(vegetarian);
  };
  convertVegetarian(vegetarian) {
    let chickenSubs = ['Tofu','Portabella Mushroom','Bell Pepper'];
    let beefSubs = ['Portabella Mushroom','Seitan','Black Bean Burger'];
    let newRecipe = [];
    vegetarian.ingredientLines.forEach(ingredientLine => {
     ingredientLine.split(' ').forEach(word => {
       if(word.toUpperCase() === "BONELESS" || word.toUpperCase() === "(BONELESS)" || word.toUpperCase() === "SKINLESS"|| word.toUpperCase() === "BREAST"|| word.toUpperCase() === "BONE-IN" || word.toUpperCase() === "THIGHS" || word.toUpperCase() === "WINGS" || word.toUpperCase() === "AND" || word.toUpperCase() === "SKIN-ON"|| word.toUpperCase() === "FILLETED"|| word.toUpperCase() === "LEGS") {
         word = "";
       }
       if(word.toUpperCase() === "CHICKEN" || word.toUpperCase() === "CHICKEN,") {
         word = chickenSubs[
          Math.floor(Math.random() * (chickenSubs.length))
         ];
       }
       if (word.toUpperCase() === "BEEF" || word.toUpperCase() === "BEEF," || word.toUpperCase() === "STEAK" || word.toUpperCase() === "STEAK,") {
        word = chickenSubs[
          Math.floor(Math.random() * (beefSubs.length))
         ];
       }
       newRecipe.push(word);
       newRecipe.push(' ');
     })
     newRecipe.push('\n\n');
    })
    newRecipe.join('');
    console.log(newRecipe);
    this.setState({
      ingredientLine: newRecipe
    })
  }
  _onGlutenFreePressed = () => {
    let glutenFree = this.props.recipe;
    let isGlutenFree = false;
    glutenFree.healthLabels.forEach(label => {
      if(label.toUpperCase() === 'GLUTEN-FREE') {
        isGlutenFree = true;
      }
    })
    isGlutenFree ? console.log("This is already gluten-free") : this.convertGlutenFree(glutenFree);
  };
  convertGlutenFree(glutenFree) {
    let hasBread = false;
    glutenFree.ingredientLines.forEach(ingredientLine => {
     ingredientLine.split(' ').forEach(word => {
       if(word.toUpperCase() === "BREAD" || word.toUpperCase === "BREAD,") {
         hasBread = true;
       }
     })
    })
    hasBread ? console.log("Bread is in this...") : console.log("Bread free!");
  }

  render() {
    const recipe = this.props.recipe;
    return (
      <ScrollView>
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
        <Text style={styles.ingredients}>{this.state.ingredientLine}</Text>
      </ScrollView>
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
  ingredients: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 5,
    color: '#656565'
  }
});