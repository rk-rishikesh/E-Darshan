import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

//import { View, Text } from 'react-native'

import firebase from 'firebase'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'
const store = createStore(rootReducer, applyMiddleware(thunk))



// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0CoMDpAnmvx7WZQxhIO7i-qYxtAa111Q",
  authDomain: "instagram-dev-bb563.firebaseapp.com",
  projectId: "instagram-dev-bb563",
  storageBucket: "instagram-dev-bb563.appspot.com",
  messagingSenderId: "1011414425667",
  appId: "1:1011414425667:web:cde1ff6b6048cc2df234f6",
  measurementId: "G-RZ5LX5B5EV"
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from './components/auth/Landing'
import RegisterScreen from './components/auth/Register'
import LoginScreen from './components/auth/Login'
import MainScreen from './components/Main'
import AddScreen from './components/main/Add'
import SaveScreen from './components/main/Save'
//import CommentScreen from './components/main/Comment'


const Stack = createStackNavigator();


export class App extends React.Component {
  constructor(props) {
    super()
    this.state = {
      loaded: false,
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }
  render() {
    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text>Loading</Text>
        </View>
      )
    }

    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

    return (
      <Provider store={store}>
        <NavigationContainer >
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Main" component={MainScreen} />
            <Stack.Screen name="Add" component={AddScreen} navigation={this.props.navigation}/>
            <Stack.Screen name="Save" component={SaveScreen} navigation={this.props.navigation}/>
            {/* //<Stack.Screen name="Comment" component={CommentScreen} navigation={this.props.navigation}/> */}
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}
export default App