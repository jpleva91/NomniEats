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
import { API_KEY, APP_ID } from 'react-native-dotenv';
import SearchResults from './SearchResults';
import TabBar from './TabBar';

let api = API_KEY;
let app = APP_ID;

function urlForQueryAndPage(key, value) {
  const data = {
    app_id: app,
    app_key: api,
    from: 0,
    to: 30
  };
  data[key] = value;

  const querystring = Object.keys(data)
    .map(key => key + '=' + encodeURIComponent(data[key]))
    .join('&');

  return 'https://api.edamam.com/search?' + querystring;
}

export default class SearchPage extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
      isLoading: false,
      message: '',
    };
  }
  _onSearchTextChanged = (event) => {
    this.setState({ searchString: event.nativeEvent.text });
  };
  _executeQuery = (query) => {
    this.setState({ isLoading: true });
    fetch(query)
      .then(response => response.json())
      .then(json => this._handleResponse(json))
      .catch(error =>
        this.setState({
          isLoading: false,
          message: 'Something bad happened ' + error
        }));
  };
  _onSearchPressed = () => {
    const query = urlForQueryAndPage('q', this.state.searchString);
    this._executeQuery(query);
  };
  _handleResponse = (response) => {
    this.setState({ isLoading: false, message: '' })
    if (response.count > 1) {
      this.props.navigator.push({
        title: 'Results',
        component: SearchResults,
        passProps: {
          recipes: response.hits,
          user: this.props.user
        }
      });
    } else {
      this.setState({ message: 'Input not recognized; please try again.'});
    };
  }

  render() {
    const spinner = this.state.isLoading ?
    <ActivityIndicator size ='large' /> : null;
    return (
      <View style={styles.container}>
        <Text style={styles.label}>
          Search for recipes!
        </Text>
        <Text style={styles.description}>
          Search by food name or style.
        </Text>
        <View style={styles.flowRight}>
          <TextInput
            style={styles.searchInput}
            value={this.state.searchString}
            onChange={this._onSearchTextChanged}
            placeholder='Search via food name or style' />
          <View style={styles.separator}/>
          <Button
            onPress={this._onSearchPressed}
            color='#F9564F'
            title='Go'
          />
        </View>
        <Image source={require('../Resources/hungry-cat.png')} style={styles.image} />
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
    borderColor: '#F9564F',
    borderRadius: 8,
    color: '#0C0A3E',
  },
  image: {
    marginTop: 48,
    width: 217,
    height: 217,
  },
});