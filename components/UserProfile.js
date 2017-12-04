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
import UserRecipes from './UserRecipes';

export default class UserProfile extends Component<{}> {
 constructor(props) {
   super(props);
   this.state = {
     isLoading: false,
     message: '',
   };
 }
 _executeQuery = (uid) => {
  this.setState({ isLoading: true });
  fetch(`https://nomnieats.firebaseio.com/${uid}/.json`)
    .then(response => response.json())
    .then(json => this._handleResponse(json))
    .catch(error =>
      this.setState({
        isLoading: false,
        message: 'No recipes found, please save a recipe!'
      }));
 };
 _onGoPressed = () => {
   let uid = this.props.user.uid;
   this._executeQuery(uid);
 };
 _handleResponse = (response) => {
   this.setState({ isLoading: false, message: '' })
   if (response) {
     let userRecipes = [];
     for(let i = 0; i < Object.keys(response.recipes).length; i++){
      let recipe = {
        ref: Object.keys(response.recipes)[i],
        recipe: response.recipes[Object.keys(response.recipes)[i]]
      }
      userRecipes.push(recipe);
     }
     this.props.navigator.push({
       title: 'Your Recipes',
       component: UserRecipes,
       passProps: {
         recipes: userRecipes,
         user: this.props.user
       }
     });
   } else {
     this.setState({ message: 'No recipes found.'});
   };
 }

 render() {
   const spinner = this.state.isLoading ?
   <ActivityIndicator size ='large' /> : null;
   return (
     <View style={styles.container}>
       <Text style={styles.label}>
         Welcome {this.props.user.email}!
       </Text>
        <Text style={styles.description}>
         View your saved recipes.
        </Text>
        <Button
           onPress={this._onGoPressed}
           color='#F9564F'
           title='Go'
        />
       <Image source={require('../Resources/happy-cat.png')} style={styles.image} />
       {spinner}
       <Text style={styles.description}>{this.state.message}</Text>
     </View>
   );
 }
}


const styles = StyleSheet.create({
  label: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#F9564F',
    textAlign: 'center',
    paddingBottom: 30,
  },
 description: {
   marginBottom: 20,
   fontSize: 18,
   textAlign: 'center',
   color: '#0C0A3E'
 },
 container: {
   padding: 30,
   marginTop: 65,
   alignItems: 'center',
 },
 image: {
   marginTop: 18,
   width: 217,
   height: 217,
 },
 separator: {
  height: 1,
  backgroundColor: '#F3C677'
},
});