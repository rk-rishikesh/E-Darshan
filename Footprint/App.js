import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';

import { View, Text } from 'react-native'
import firebase from 'firebase'
import { Icon } from '@mdi/react'
import { mdiShoePrint } from '@mdi/js';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'
const store = createStore(rootReducer, applyMiddleware(thunk))


console.reportErrorsAsExceptions = false;
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIvwDKsgRxZ7pzXFPmWs5DaZqykmxIBe0",
  authDomain: "e-yatra-3cdd1.firebaseapp.com",
  projectId: "e-yatra-3cdd1",
  storageBucket: "e-yatra-3cdd1.appspot.com",
  messagingSenderId: "967756712722",
  appId: "1:967756712722:web:3437899afc6f804fcbc1cb",
  measurementId: "G-G1W3NHZGDP"
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
import CommentScreen from './components/main/Comment'
import PackageScreen from './components/main/AddPackage'
import SavePackageScreen from './components/main/SavePackage'
import { TextInput } from 'react-native-gesture-handler';


const Stack = createStackNavigator();


export class App extends Component {
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
          <View style= {{flexDirection:'row'}}>       
          
        {/* <Text style={{}}>Footprints</Text> */}
       </View>
        <NavigationContainer >
            <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Footprint" component={MainScreen}  options={{title: 'Footprint', headerStyle:{
              backgroundColor: '#f0f8ff',
            },
            headerTitleStyle:{
              fontWeight: 'bold',
            },
            headerLeft:() =>(
              <Icon path={mdiShoePrint}size={2}
              horizontal
              vertical
              rotate={90}
              color="black"
              spin/>
            ) ,
            }}/>
            <Stack.Screen name="Add" component={AddScreen} navigation={this.props.navigation}/>
            <Stack.Screen name="Save" component={SaveScreen} navigation={this.props.navigation}/>
            <Stack.Screen name="Comment" component={CommentScreen} navigation={this.props.navigation}/>
            <Stack.Screen name="AddPackage" component={PackageScreen} navigation={this.props.navigation}/>
            <Stack.Screen name="SavePackage" component={SavePackageScreen} navigation={this.props.navigation}/>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}

export default App


//EMAIL- fadnaviskv@gmail.com pass- 12345KETKI  ritul11@gmail.com pass- 1234RITUL