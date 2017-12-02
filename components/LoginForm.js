import React, { Component } from "react";
import { View, Button } from "react-native";
import { TitledInput } from "./TitledInput";

class LoginForm extends Component {
  state = { email: '', password: '' };

  render() {
    return(
      <View>
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
        <Button title="Log in" />
      </View>
    )
  }
}

export default LoginForm;