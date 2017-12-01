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
            recipes: [
                // {
                //     "healthLabels": [
                //         "Vegan",
                //         "Vegetarian",
                //         "Peanut-Free",
                //         "Tree-Nut-Free",
                //         "Alcohol-Free"
                //     ],
                //     "image": "https://www.edamam.com/web-img/011/011e89b0cbb9c4c20b765bd02b6c8525.jpg",
                //     "ingredients": [
                //         "1 can Coke (12 ounces)",
                //         "1 inch chunk ginger, peeled and thinly sliced",
                //         "1/2 lemon, sliced into rounds"
                //     ],
                //     "label": "Boiled Coke with Ginger and Lemon Recipe",
                //     "preparation": "http://www.seriouseats.com/recipes/2013/04/boiled-coke-ginger-lemon-hong-kong-recipe.html"
                // },
                // {
                //     "healthLabels": [
                //         "Vegan",
                //         "Vegetarian",
                //         "Peanut-Free",
                //         "Tree-Nut-Free"
                //     ],
                //     "image": "https://www.edamam.com/web-img/a09/a09c8f81de6240ef58bdcb70e83827de.jpg",
                //     "ingredients": [
                //         "3 cups Coca-Cola",
                //         "3 tbsp. Fernet Branca",
                //         "3 tbsp. fresh orange juice",
                //         "Sliced oranges, for serving"
                //     ],
                //     "label": "Fernet And Coke Granita",
                //     "preparation": "http://www.saveur.com/article/Recipes/Fernet-And-Coke-Granita"
                // },
                // {
                //     "healthLabels": [
                //         "Peanut-Free",
                //         "Tree-Nut-Free",
                //         "Alcohol-Free"
                //     ],
                //     "image": "https://www.edamam.com/web-img/3aa/3aa2da863d7316f12a74a47477a567f7.jpg",
                //     "ingredients": [
                //         "2-3 lbs slab of smoked bacon with skin",
                //         "3 Tbs cherry jam",
                //         "1/4 C dried cherries",
                //         "1 vanilla bean split in half lengthwise",
                //         "15 whole cloves",
                //         "2 liter bottle of Coke",
                //         "1 Granny Smith apple peeled and sliced",
                //         "1 small head of cabbage cored and shredded"
                //     ],
                //     "label": "Cherry Coke Braised Bacon",
                //     "preparation": "http://norecipes.com/blog/2008/03/23/cherry-coke-braised-bacon/"
                // },
                // {
                //     "healthLabels": [
                //         "Vegan",
                //         "Vegetarian",
                //         "Peanut-Free",
                //         "Tree-Nut-Free",
                //         "Alcohol-Free"
                //     ],
                //     "image": "https://www.edamam.com/web-img/011/011e89b0cbb9c4c20b765bd02b6c8525.jpg",
                //     "ingredients": [
                //         "1 can Coke (12 ounces)",
                //         "1 inch chunk ginger, peeled and thinly sliced",
                //         "1/2 lemon, sliced into rounds"
                //     ],
                //     "label": "Boiled Coke with Ginger and Lemon Recipe",
                //     "preparation": "http://www.seriouseats.com/recipes/2013/04/boiled-coke-ginger-lemon-hong-kong-recipe.html"
                // },
                // {
                //     "healthLabels": [
                //         "Vegan",
                //         "Vegetarian",
                //         "Peanut-Free",
                //         "Tree-Nut-Free"
                //     ],
                //     "image": "https://www.edamam.com/web-img/a09/a09c8f81de6240ef58bdcb70e83827de.jpg",
                //     "ingredients": [
                //         "3 cups Coca-Cola",
                //         "3 tbsp. Fernet Branca",
                //         "3 tbsp. fresh orange juice",
                //         "Sliced oranges, for serving"
                //     ],
                //     "label": "Fernet And Coke Granita",
                //     "preparation": "http://www.saveur.com/article/Recipes/Fernet-And-Coke-Granita"
                // },
                // {
                //     "healthLabels": [
                //         "Peanut-Free",
                //         "Tree-Nut-Free",
                //         "Alcohol-Free"
                //     ],
                //     "image": "https://www.edamam.com/web-img/3aa/3aa2da863d7316f12a74a47477a567f7.jpg",
                //     "ingredients": [
                //         "2-3 lbs slab of smoked bacon with skin",
                //         "3 Tbs cherry jam",
                //         "1/4 C dried cherries",
                //         "1 vanilla bean split in half lengthwise",
                //         "15 whole cloves",
                //         "2 liter bottle of Coke",
                //         "1 Granny Smith apple peeled and sliced",
                //         "1 small head of cabbage cored and shredded"
                //     ],
                //     "label": "Cherry Coke Braised Bacon",
                //     "preparation": "http://norecipes.com/blog/2008/03/23/cherry-coke-braised-bacon/"
                // },
                // {
                //     "healthLabels": [
                //         "Vegan",
                //         "Vegetarian",
                //         "Peanut-Free",
                //         "Tree-Nut-Free",
                //         "Alcohol-Free"
                //     ],
                //     "image": "https://www.edamam.com/web-img/011/011e89b0cbb9c4c20b765bd02b6c8525.jpg",
                //     "ingredients": [
                //         "1 can Coke (12 ounces)",
                //         "1 inch chunk ginger, peeled and thinly sliced",
                //         "1/2 lemon, sliced into rounds"
                //     ],
                //     "label": "Boiled Coke with Ginger and Lemon Recipe",
                //     "preparation": "http://www.seriouseats.com/recipes/2013/04/boiled-coke-ginger-lemon-hong-kong-recipe.html"
                // },
                // {
                //     "healthLabels": [
                //         "Vegan",
                //         "Vegetarian",
                //         "Peanut-Free",
                //         "Tree-Nut-Free"
                //     ],
                //     "image": "https://www.edamam.com/web-img/a09/a09c8f81de6240ef58bdcb70e83827de.jpg",
                //     "ingredients": [
                //         "3 cups Coca-Cola",
                //         "3 tbsp. Fernet Branca",
                //         "3 tbsp. fresh orange juice",
                //         "Sliced oranges, for serving"
                //     ],
                //     "label": "Fernet And Coke Granita",
                //     "preparation": "http://www.saveur.com/article/Recipes/Fernet-And-Coke-Granita"
                // },
                // {
                //     "healthLabels": [
                //         "Peanut-Free",
                //         "Tree-Nut-Free",
                //         "Alcohol-Free"
                //     ],
                //     "image": "https://www.edamam.com/web-img/3aa/3aa2da863d7316f12a74a47477a567f7.jpg",
                //     "ingredients": [
                //         "2-3 lbs slab of smoked bacon with skin",
                //         "3 Tbs cherry jam",
                //         "1/4 C dried cherries",
                //         "1 vanilla bean split in half lengthwise",
                //         "15 whole cloves",
                //         "2 liter bottle of Coke",
                //         "1 Granny Smith apple peeled and sliced",
                //         "1 small head of cabbage cored and shredded"
                //     ],
                //     "label": "Cherry Coke Braised Bacon",
                //     "preparation": "http://norecipes.com/blog/2008/03/23/cherry-coke-braised-bacon/"
                // },
                // {
                //     "healthLabels": [
                //         "Vegan",
                //         "Vegetarian",
                //         "Peanut-Free",
                //         "Tree-Nut-Free",
                //         "Alcohol-Free"
                //     ],
                //     "image": "https://www.edamam.com/web-img/011/011e89b0cbb9c4c20b765bd02b6c8525.jpg",
                //     "ingredients": [
                //         "1 can Coke (12 ounces)",
                //         "1 inch chunk ginger, peeled and thinly sliced",
                //         "1/2 lemon, sliced into rounds"
                //     ],
                //     "label": "Boiled Coke with Ginger and Lemon Recipe",
                //     "preparation": "http://www.seriouseats.com/recipes/2013/04/boiled-coke-ginger-lemon-hong-kong-recipe.html"
                // },
                // {
                //     "healthLabels": [
                //         "Peanut-Free",
                //         "Tree-Nut-Free",
                //         "Alcohol-Free"
                //     ],
                //     "image": "https://www.edamam.com/web-img/3aa/3aa2da863d7316f12a74a47477a567f7.jpg",
                //     "ingredients": [
                //         "2-3 lbs slab of smoked bacon with skin",
                //         "3 Tbs cherry jam",
                //         "1/4 C dried cherries",
                //         "1 vanilla bean split in half lengthwise",
                //         "15 whole cloves",
                //         "2 liter bottle of Coke",
                //         "1 Granny Smith apple peeled and sliced",
                //         "1 small head of cabbage cored and shredded"
                //     ],
                //     "label": "Cherry Coke Braised Bacon",
                //     "preparation": "http://norecipes.com/blog/2008/03/23/cherry-coke-braised-bacon/"
                // },
                // {
                //     "healthLabels": [
                //         "Vegan",
                //         "Vegetarian",
                //         "Peanut-Free",
                //         "Tree-Nut-Free",
                //         "Alcohol-Free"
                //     ],
                //     "image": "https://www.edamam.com/web-img/011/011e89b0cbb9c4c20b765bd02b6c8525.jpg",
                //     "ingredients": [
                //         "1 can Coke (12 ounces)",
                //         "1 inch chunk ginger, peeled and thinly sliced",
                //         "1/2 lemon, sliced into rounds"
                //     ],
                //     "label": "Boiled Coke with Ginger and Lemon Recipe",
                //     "preparation": "http://www.seriouseats.com/recipes/2013/04/boiled-coke-ginger-lemon-hong-kong-recipe.html"
                // },
                // {
                //     "healthLabels": [
                //         "Peanut-Free",
                //         "Tree-Nut-Free",
                //         "Alcohol-Free"
                //     ],
                //     "image": "https://www.edamam.com/web-img/3aa/3aa2da863d7316f12a74a47477a567f7.jpg",
                //     "ingredients": [
                //         "2-3 lbs slab of smoked bacon with skin",
                //         "3 Tbs cherry jam",
                //         "1/4 C dried cherries",
                //         "1 vanilla bean split in half lengthwise",
                //         "15 whole cloves",
                //         "2 liter bottle of Coke",
                //         "1 Granny Smith apple peeled and sliced",
                //         "1 small head of cabbage cored and shredded"
                //     ],
                //     "label": "Cherry Coke Braised Bacon",
                //     "preparation": "http://norecipes.com/blog/2008/03/23/cherry-coke-braised-bacon/"
                // },
                // {
                //     "healthLabels": [
                //         "Vegan",
                //         "Vegetarian",
                //         "Peanut-Free",
                //         "Tree-Nut-Free",
                //         "Alcohol-Free"
                //     ],
                //     "image": "https://www.edamam.com/web-img/011/011e89b0cbb9c4c20b765bd02b6c8525.jpg",
                //     "ingredients": [
                //         "1 can Coke (12 ounces)",
                //         "1 inch chunk ginger, peeled and thinly sliced",
                //         "1/2 lemon, sliced into rounds"
                //     ],
                //     "label": "Boiled Coke with Ginger and Lemon Recipe",
                //     "preparation": "http://www.seriouseats.com/recipes/2013/04/boiled-coke-ginger-lemon-hong-kong-recipe.html"
                // },
                // {
                //     "healthLabels": [
                //         "Peanut-Free",
                //         "Tree-Nut-Free",
                //         "Alcohol-Free"
                //     ],
                //     "image": "https://www.edamam.com/web-img/3aa/3aa2da863d7316f12a74a47477a567f7.jpg",
                //     "ingredients": [
                //         "2-3 lbs slab of smoked bacon with skin",
                //         "3 Tbs cherry jam",
                //         "1/4 C dried cherries",
                //         "1 vanilla bean split in half lengthwise",
                //         "15 whole cloves",
                //         "2 liter bottle of Coke",
                //         "1 Granny Smith apple peeled and sliced",
                //         "1 small head of cabbage cored and shredded"
                //     ],
                //     "label": "Cherry Coke Braised Bacon",
                //     "preparation": "http://norecipes.com/blog/2008/03/23/cherry-coke-braised-bacon/"
                // },
                // {
                //     "healthLabels": [
                //         "Vegan",
                //         "Vegetarian",
                //         "Peanut-Free",
                //         "Tree-Nut-Free",
                //         "Alcohol-Free"
                //     ],
                //     "image": "https://www.edamam.com/web-img/011/011e89b0cbb9c4c20b765bd02b6c8525.jpg",
                //     "ingredients": [
                //         "1 can Coke (12 ounces)",
                //         "1 inch chunk ginger, peeled and thinly sliced",
                //         "1/2 lemon, sliced into rounds"
                //     ],
                //     "label": "Boiled Coke with Ginger and Lemon Recipe",
                //     "preparation": "http://www.seriouseats.com/recipes/2013/04/boiled-coke-ginger-lemon-hong-kong-recipe.html"
                // },
                // {
                //     "healthLabels": [
                //         "Peanut-Free",
                //         "Tree-Nut-Free",
                //         "Alcohol-Free"
                //     ],
                //     "image": "https://www.edamam.com/web-img/3aa/3aa2da863d7316f12a74a47477a567f7.jpg",
                //     "ingredients": [
                //         "2-3 lbs slab of smoked bacon with skin",
                //         "3 Tbs cherry jam",
                //         "1/4 C dried cherries",
                //         "1 vanilla bean split in half lengthwise",
                //         "15 whole cloves",
                //         "2 liter bottle of Coke",
                //         "1 Granny Smith apple peeled and sliced",
                //         "1 small head of cabbage cored and shredded"
                //     ],
                //     "label": "Cherry Coke Braised Bacon",
                //     "preparation": "http://norecipes.com/blog/2008/03/23/cherry-coke-braised-bacon/"
                // }
            ],
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
