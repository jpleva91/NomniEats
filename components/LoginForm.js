import React, { Component } from "react";
import { View, Button, Text, Image } from "react-native";
import firebase from 'firebase';
import TitledInput from "./TitledInput";
import Spinner from './Spinner';
import SearchPage from './SearchPage';
import TabBar from "./TabBar";

export default class LoginForm extends Component<{}> {

  state = { email: '', password: '', error: '', loading: false, authenticated: false, user:'' };
  onLoginPress() {
    this.setState({ error: '', loading: true });

    const { email, password } = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log(res);
        this.setState({ error: '', loading: false });
        this.props.navigator.push({
          title: 'Home',
          component: TabBar,
          passProps: {user: res}
        });
      })
      .catch(() => {
        //Login was not successful, let's create a new account
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then((res) => {
            let user = res.uid;
            this.setState({ error: '', loading: false, user: res });
            fetch(`https://nomnieats.firebaseio.com/${res.uid}/.json/`, {  
              method: 'PUT',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: res.email
              })
            })
            .then((res)=> {
              console.log(this.state.user);
              this.props.navigator.push({
                title: 'Home',
                component: TabBar,
                passProps: {user: this.state.user}
              });
            })
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
      <Text style={styles.label}>
        NomniEats
      </Text>
        <TitledInput
          label='Email Address'
          placeholder='YourEmailHere@Domain.com'
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
        />
        <TitledInput
          label='Password'
          autoCorrect={false}
          placeholder='**********'
          secureTextEntry
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
        />
        <Text style={styles.errorTextStyle}>{this.state.error}</Text>
        {this.renderButtonOrSpinner()}
        <View style={styles.center}>
        <Image source={require('../Resources/cooking.png')} style={styles.image} />
      </View>
      </View>
    );
  }
}
const styles ={
  label: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#48BBEC',
    textAlign: 'center',
    paddingBottom: 30,
  },
  container: {
    padding: 30,
    marginTop: 65,
    flex: 1,
  },
  image: {
    marginTop: 18,
    width: 380,
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