/**
 * NomniEats
 * https://github.com/jpleva91/NomniEats
 * @flow
 */

import React, { Component } from 'react';
import {
  ActivityIndicator,
  ListView,
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList
} from 'react-native';

import { SearchBar, Button } from 'react-native-elements';


export default class App extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      text: '',
    }
  }

  componentDidMount() {
    // fetch(`https://api.edamam.com/search?q=tofu&app_id=${process.env.APP_ID}&app_key=${process.env.API_KEY}&from=0&to=3&calories=gte%20591,%20lte%20722&health=alcohol-free`)
  }

  render() {
    return (
      <View style={styles.container}>
        <SearchBar
          placeholder="Search for recipes"
          round
          multiline = {true}
          numberOfLines = {4}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}/>
        <Button
          onPress={() => {
            fetch(`https://nomnieats.firebaseio.com/.json`)
              .then((response) => response.json())
              .then((responseJson) => {
                let food = []
                // console.log(Object.keys(responseJson).length);
                for(i = 0; i < Object.keys(responseJson).length; i++){
                  food.push(responseJson[Object.keys(responseJson)[i]])
                }
                this.setState({
                  data: food[2].recipe.ingredients[2].text
                }, function() {
                  // do something with new state
                  console.log(this.state)
                });
              })
              .catch((error) => {
                console.error(error);
              });
          }}
          large
          icon={{name: 'cutlery', type: 'font-awesome'}}
          title='Search Recipes'
          buttonStyle={styles.buttonStyle}/>
        <Text style={styles.welcome}>
          {this.state.text}
          {this.state.data}
        </Text>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    position: 'relative',
    top: 24,
  },
  welcome: {
    fontSize: 60,
    textAlign: 'center',
    margin: 10,
    color: 'orange',
  },
  buttonStyle: {
    backgroundColor: 'orange',
    position: 'relative',
    top: 450,
  },
});
