import React, { Component } from "react";
import { View, ActivityIndicator } from "react-native";

export default class Spinner extends Component<{}> {
  
  render() {
    return(
      <View>
        <ActivityIndicator size='small' />
      </View>
    );
  }
}