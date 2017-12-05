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
        editLabel: false,
        recipeLabel: this.props.recipe.label,
        ingredientLine: this.props.recipe.ingredientLines.join('\n\n'),
    }
  }
  _onSavePressed = () => {
    fetch(`https://nomnieats.firebaseio.com/${this.props.user.uid}/recipes/.json`, {  
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          title: this.state.recipeLabel,
          healthLabels: this.props.recipe.healthLabels,
          ingredients: this.state.ingredientLine,
          image: this.props.recipe.image,
          url: this.props.recipe.url
      })
    })
    this.props.navigator.popN(2);
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
    let chickenSubs = ['Piece(s) of Tofu','Large Portabella Mushroom(s)','Bell Pepper(s)','Piece(s) of Tempeh','Piece(s) of Seitan','Piece(s) of Eggplant', 'Potato(s)', 'Cauliflower Steak(s)'];
    let beefSubs = ['Portabella Mushroom(s)','Seitan','Black Bean Burger(s)', 'Jack Fruit'];
    let newRecipe = [];
    vegetarian.ingredientLines.forEach(ingredientLine => {
     ingredientLine.split(' ').forEach(word => {
       if(word.toUpperCase() === "EGG" || word.toUpperCase() === "EGGS") 
       {
        word = "vegetarian egg replacer"
       }
       if(word.toUpperCase() === "GROUND") 
       {
         word = "chopped"
       }
       if(word.toUpperCase() === "STOCK")
       {
         word = "vegetable stock"
       }
       if(word.toUpperCase() === "1")
       {
         word = "One"
       }
       if(word.toUpperCase() === "POUND")
       {
         word= "large"
       }
       if(word.toUpperCase() === "OF")
       {
         word= "or"
       }
       if(word.toUpperCase() === "HARD-BOILED" || word.toUpperCase() === "CENTER-CUT" || word.toUpperCase() === "BUTCHER" || word.toUpperCase() === "YOUR" || word.toUpperCase() === "TENDERLOIN" || word.toUpperCase() === "LEAN" || word.toUpperCase() === "SHELL" || word.toUpperCase() === "FLANK" || word.toUpperCase() === "RIB-EYE" || word.toUpperCase() === "SKIRT" || word.toUpperCase() === "LOIN" || word.toUpperCase() === "TOP" || word.toUpperCase() === "YORK" || word.toUpperCase() === "NEW" || word.toUpperCase() === "STRIP" || word.toUpperCase() === "TIPS" || word.toUpperCase() === "BONELESS)," || word.toUpperCase() === "(BONE-IN" || word.toUpperCase() === "ROUND" || word.toUpperCase() === "EYE" || word.toUpperCase() === "TIED" || word.toUpperCase() === "PRIME" || word.toUpperCase() === "ROAST)" || word.toUpperCase() === "(CHUCK" || word.toUpperCase() === "CHUCK" || word.toUpperCase() === "POT" || word.toUpperCase() === "BONES" || word.toUpperCase() === "MEAT" || word.toUpperCase() === "THIGH" || word.toUpperCase() === "CUTLETS" || word.toUpperCase() === "REMOVED" || word.toUpperCase() === "BONE" || word.toUpperCase() === "1/2-TO-4-LB." || word.toUpperCase() === "4-LB" || word.toUpperCase() === "DRUMSTICKS" || word.toUpperCase() === "(900G)" || word.toUpperCase() === "2-POUNDS" || word.toUpperCase() === "1-POUND" || word.toUpperCase() === "DRUMSTICKS" || word.toUpperCase() === "QUARTERED" || word.toUpperCase() === "HALVES," || word.toUpperCase() === "TENDERS" || word.toUpperCase() === "BONELESS)" || word.toUpperCase() === "POUNDS" || word.toUpperCase() === "POUND" || word.toUpperCase() === "HALVES" || word.toUpperCase() === "BONE-IN" || word.toUpperCase() === "PIECES" || word.toUpperCase() === "BONELESS," || word.toUpperCase() === "SKIN" || word.toUpperCase() === "BREASTS," || word.toUpperCase() === "THIGHS," || word.toUpperCase() === "(THIGHS" || word.toUpperCase() === "WHOLE" || word.toUpperCase() === "BREASTS" || word.toUpperCase() === "BONELESS" || word.toUpperCase() === "(BONELESS)" || word.toUpperCase() === "SKINLESS"|| word.toUpperCase() === "BREAST" || word.toUpperCase() === "BONE-IN" || word.toUpperCase() === "THIGHS" || word.toUpperCase() === "WINGS," || word.toUpperCase() === "WINGS" || word.toUpperCase() === "AND" || word.toUpperCase() === "SKIN-ON"|| word.toUpperCase() === "SKIN-ON,"||word.toUpperCase() === "FILLETS" || word.toUpperCase() === "FILLETED" || word.toUpperCase() === "FILET"||  word.toUpperCase() === "FILLET" || word.toUpperCase() === "LEGS" || word.toUpperCase() === "LEGS)")
       {
         word = "";
       }
       if(word.toUpperCase() === "CHICKEN"  || word.toUpperCase() === "CHICKEN,"|| word.toUpperCase() === "CHICKENS," || word.toUpperCase() === "CHICKENS")
       {
         word = chickenSubs[
          Math.floor(Math.random() * (chickenSubs.length))
         ];
       }
       if (word.toUpperCase() === "BRISKET" || word.toUpperCase() === "STEAKS" || word.toUpperCase() === "SIRLOIN" || word.toUpperCase() === "ROAST," ||word.toUpperCase() === "ROAST" || word.toUpperCase() === "BEEF" || word.toUpperCase() === "BEEF," || word.toUpperCase() === "STEAK" || word.toUpperCase() === "STEAK," || word.toUpperCase() === "MIGNON")
       {
        word = beefSubs[
          Math.floor(Math.random() * (beefSubs.length))
         ];
       }
       newRecipe.push(word);
       newRecipe.push(' ');
     })
     newRecipe.push('\n\n');
    })
    newRecipe.join('');
    if(!this.state.editLabel) {
      this.state.editLabel = true;
      this.state.recipeLabel = "(Vegetarian) " + this.state.recipeLabel;
    }
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
              color='#7B1E7A'
              title='Vegan'
            />
        </View>
        <View style={styles.separator}/>
        <View style={styles.rowContainer}>
          <Button
              onPress={this._onVegetarianPressed}
              color='#7B1E7A'
              title='Vegetarian'
            />
        </View>
        <View style={styles.separator}/>
        <View style={styles.rowContainer}>
          <Button
              onPress={this._onGlutenFreePressed}
              color='#7B1E7A'
              title='Gluten-Free'
            />
        </View>
        <View style={styles.separator}/>
        <Text style={styles.label}>Ingredients</Text>
        <Text style={styles.ingredients}>{this.state.ingredientLine}</Text>
        <View style={styles.separator}/>
        <Button
              onPress={this._onSavePressed}
              color='#F9564F'
              title='Save Recipe'
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 65,
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 5,
    color: '#F9564F'
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
    color: '#0C0A3E'
  }
});