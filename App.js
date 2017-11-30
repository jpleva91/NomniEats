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
  View
} from 'react-native';

import { SearchBar } from 'react-native-elements';


export default class App extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    // fetch(`https://api.edamam.com/search?q=tofu&app_id=${process.env.APP_ID}&app_key=${process.env.API_KEY}&from=0&to=3&calories=gte%20591,%20lte%20722&health=alcohol-free`)
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
  }

  render() {
    return (
      <View style={styles.container}>
        <SearchBar
          placeholder='Type Here...' />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  welcome: {
    fontSize: 60,
    textAlign: 'center',
    margin: 10,
    color: 'orange',
  },
});
