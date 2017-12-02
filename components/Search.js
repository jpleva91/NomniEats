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
    Image
} from 'react-native';
import {
    SearchBar, Button, Card
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
            recipes: [],
            label: '',
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            })
        }
    }

componentDidMount() {
    console.log("Search Component Works")
    console.log(api,app)
    this.setState({
    dataSource: this.state.dataSource.cloneWithRows(this.state.recipes),
    });
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
        <Button
          onPress={() => {
            fetch(`https://api.edamam.com/search?q=${this.state.text}&app_id=${app}&app_key=${api}&from=0&to=30`)
              .then((response) => response.json())
              .then((responseJson) => {
                let recipes = [];
                for(let i = 0; i < responseJson.hits.length; i++) {
                    recipes.push(responseJson.hits[i].recipe);
                }
                this.setState({
                    data: recipes
                }, function() {
                  // do something with new state
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
                            label: post[i].label,
                            image: post[i].image,
                            preparation: post[i].url
                        })
                      })
                      this.state.recipes.push({
                        healthLabels: post[i].healthLabels,
                        cautions: post[i].cautions,
                        ingredients: post[i].ingredientLines,
                        label: post[i].label,
                        image: post[i].image,
                        preparation: post[i].url
                      })
                    console.log(this.state.recipes)
                      this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(this.state.recipes),
                      });
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
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRecipe}
        style={styles.listView}
      />
      </View>
    );
  }
  renderRecipe(recipe){
      return(
        <Card containerStyle={{padding: 0}} >
            <Image
                source={{url: recipe.image}}
                style={styles.thumbnail}
            />
            <View style={styles.rightContainer}>
                <Text style={styles.title}>{recipe.label}</Text>
            </View>
        </Card>
      );
  }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
      },
    welcome: {
        fontSize: 24,
        textAlign: 'center',
        margin: 10,
        color: 'orange',
    },
    buttonStyle: {
        backgroundColor: '#9A031E',
        position: 'relative',
        top: 16,
    },
    rightContainer: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        margin: 8,
        color: '#CB793A'
    },
    listView: {
        backgroundColor: '#321325',
        position: 'relative',
        top: 30,
    },
    thumbnail: {
        width: 100,
        height: 100,
    },
});
