'use strict'

import React, { Component } from 'react';
import {
  StyleSheet,
  TabBarIOS,
  View,
  Text,
  NavigatorIOS
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import SearchPage from './SearchPage';
import LoginForm from './LoginForm';
import UserRecipes from './UserRecipes';
import UserProfile from './UserProfile';

export default class TabBar extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'searchPage'
    };
  }

  render() {
    return (
      <TabBarIOS selectedTab={this.state.selectedTab}>
        <Icon.TabBarItemIOS
          iconName="search" size={30} color="#900"
          selected={this.state.selectedTab === 'searchPage'}
          onPress={() => {
            this.setState({
              selectedTab: 'searchPage',
            })
          }}>
        <NavigatorIOS
          style={styles.container}
          initialRoute={{
           title: 'Search',
           component: SearchPage,
           passProps: {user: this.props.user}
        }}/>
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          iconName="user" size={30} color="#900"
          selected={this.state.selectedTab === 'loginForm'}
          onPress={() => {
            this.setState({
              selectedTab: 'loginForm',
            });
          }}>
          <NavigatorIOS
            style={styles.container}
            initialRoute={{
              title: 'Welcome',
              component: UserProfile,
              passProps: {user: this.props.user}
          }}/>
        </Icon.TabBarItemIOS>
      </TabBarIOS>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});