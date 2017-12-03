import React, { Component } from "react";
import { View, Button, Text, Image } from "react-native";
import firebase from 'firebase';
import TitledInput from "./TitledInput";
import Spinner from './Spinner';
import SearchPage from './SearchPage';

export default class LoginForm extends Component<{}> {

  state = { email: '', password: '', error: '', loading: false, authenticated: false, user:'' };
  onLoginPress() {
    this.setState({ error: '', loading: true });

    const { email, password } = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((res) => {
        this.setState({ error: '', loading: false });
        this.props.navigator.push({
          title: 'NomniEats',
          component: SearchPage,
          passProps: {user: res}
        });
      })
      .catch(() => {
        //Login was not successful, let's create a new account
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then((res) => {
            this.setState({ error: '', loading: false });
            this.props.navigator.push({
              title: 'NomniEats',
              component: SearchPage,
              passProps: {user: this.state.user}
            });
          })
          .catch(() => {
            this.setState({ error: 'Authentication failed.', loading: false });
          });
      });
  }
  renderButtonOrSpinner() {
    if(this.state.loading) {
      return <Spinner />;
    }
    return <Button onPress={this.onLoginPress.bind(this)} title="Log in" />;
  }
  render() {
    return(
      <View style={styles.container}>
      <Text style={styles.description}>
        Search for recipes!
      </Text>
        <TitledInput
          label='Email Address'
          placeholder='you@domain.com'
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
        />
        <TitledInput
          label='Password'
          autoCorrect={false}
          placeholder='*******'
          secureTextEntry
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
        />
        <Text style={styles.errorTextStyle}>{this.state.error}</Text>
        {this.renderButtonOrSpinner()}
        <View style={styles.center}>
        <Image source={require('../Resources/hungry-cat.png')} style={styles.image} />
      </View>
      </View>
    );
  }
}
const styles ={
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    padding: 30,
    marginTop: 65,
    flex: 1,
  },
  image: {
    marginTop: 18,
    width: 217,
    height: 217,
  },
  center: {
    alignItems: 'center',
  },
  errorTextStyle: {
    color: '#E64A19',
    alignSelf: 'center',
    paddingTop: 10,
    paddingBottom: 10
  }
};