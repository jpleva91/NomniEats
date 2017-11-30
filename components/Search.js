import React, {
    Component
} from 'react';
import {
    ActivityIndicator,
    ListView,
    Platform,
    StyleSheet,
    Text,
    View,
    Dimensions,
} from 'react-native';
import {
    SearchBar, Button
} from 'react-native-elements';

import { API_KEY, APP_ID } from 'react-native-dotenv';

let api = API_KEY;
let app = APP_ID;

export default class Search extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            text: '',
        }
    }

componentDidMount() {
    console.log("Search Component Works")
    console.log(api,app)
}

render() {
    return (
      <View>
        <SearchBar
          placeholder="Search for recipes"
          round
          multiline = {true}
          numberOfLines = {4}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}/>
        <Text style={styles.welcome}>
          {this.state.text}
        </Text>
        <Button
          onPress={() => {
            fetch(`https://api.edamam.com/search?q=${this.state.text}&app_id=${app}&app_key=${api}&from=0&to=10`)
              .then((response) => response.json())
              .then((responseJson) => {
                let recipes = [];
                console.log(responseJson);
                console.log('Query:',responseJson.q)
                console.log('Hits:',responseJson.hits)
                for(let i = 0; i < responseJson.hits.length; i++) {
                    recipes.push(responseJson.hits[i].recipe);
                }
                this.setState({
                    data: recipes
                }, function() {
                  // do something with new state
                  console.log(this.state.data)
                  let post = this.state.data
                  for(let i = 0; i < post.length; i++) {
                    fetch('https://nomnieats.firebaseio.com/.json/', {  
                        method: 'POST',
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            healthLabels: post[i].healthLabels,
                            cautions: post[i].cautions,
                            ingredients: post[i].ingredientLines,
                            label: post[i].label
                        })
                      })
                  }
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
    welcome: {
        fontSize: 60,
        textAlign: 'center',
        margin: 10,
        color: 'orange',
    },
    buttonStyle: {
        backgroundColor: 'orange',
        position: 'relative',
        top: 400,
    },
});
