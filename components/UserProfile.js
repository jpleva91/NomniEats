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
        message: 'Something bad happened ' + error
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
      userRecipes.push(response.recipes[Object.keys(response.recipes)[i]])
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
       <Text style={styles.description}>
         Welcome {this.props.user.email}!
       </Text>
       <Text style={styles.description}>
         View your saved recipes.
       </Text>
         <Button
           onPress={this._onGoPressed}
           color='#48BBEC'
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
 description: {
   marginBottom: 20,
   fontSize: 18,
   textAlign: 'center',
   color: '#656565'
 },
 container: {
   padding: 30,
   marginTop: 65,
   alignItems: 'center',
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
   marginTop: 18,
   width: 217,
   height: 217,
 },
});