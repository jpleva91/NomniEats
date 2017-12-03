'use strict'

import React, { Component } from 'react';
import {
 StyleSheet,
 Text,
 View,
 WebView,
 Linking,
 Image
} from 'react-native';

export default class RecipeWebView extends Component<{}> {
  render() {
    const uri = this.props.recipe.url;
    return (
    <View style={styles.container}>
      <Text style={styles.description}>
        Taking you to the recipe via your browser!
      </Text>
      <Image source={require('../Resources/happy-cat.png')} style={styles.image} />
      <WebView
        ref={(ref) => { this.webview = ref; }}
        source={{ uri }}
        onNavigationStateChange={(event) => {
          if (event.url !== uri) {
            this.webview.stopLoading();
            Linking.openURL(event.url);
          }
        }}
      />
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center',
  },
  image: {
    marginTop: 36,
    width: 217,
    height: 217,
  },
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
});