

import React ,{Component} from 'react'
//import { Text, View, Button } from 'react-native'
//import ImagesExample from '../UI/Home.js'
//import {Image,ImageBackground } from 'react-native';  
import img1 from './img1.jpg'



        
        


    // return (
        
    //     // <Image source={require ('C:/Users/HP/Footprint/components/auth/img1.jpg')} />
        
    //     <View style={{ flex: 1, justifyContent: 'center' }}>
    //     <ImageBackground source = {{uri:'https://pro2-bar-s3-cdn-cf1.myportfolio.com/b6d65713c808988de7ebaa0056488b71/c8af92a2-ac81-4bbe-ac9e-d2642de70288_rw_1200.jpg?h=2778f7a31b892d7a2e7bffcce7b2d906'}}  
    //     style = {{ width: '100%', height: '100%' }}  >
               
    //     <Button
    //             title="Register"
    //             onPress={() => navigation.navigate("Register")} 
    //             style = {{ width: '10%', height: '10%'}}/>
    //         <Button
    //             title="Login"
    //             onPress={() => navigation.navigate("Login")} 
    //             style = {{ width: '10%', height: '10%' }}/>
    //       </ImageBackground>    
    //      </View>
    // )


// abc@gmail.com
// 1234KETKI


import {
  SafeAreaView,
  View,
  StatusBar,
  ScrollView,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import {Header, Text} from 'react-native-elements';
export default function Landing({ navigation }) {
    return (
      <SafeAreaView>
        <StatusBar
          
          hidden={false}
          backgroundColor="#9969D3"
          translucent={true}
        />
        <Header
          placement="left"
          backgroundColor="#9969D3"
          leftComponent={{color: '#fff'}}
          centerComponent={{
            text: 'Profile',
            style: {color: '#fff'},
          }}
          rightComponent={
            <TouchableOpacity onPress={() => {}}>
              <Text
                onPress={() => {
                  auth()
                    .signOut()
                    .then(() => console.log('User signed out!'));
                  this.props.navigation.navigate('Login');
                }}
                style={{fontWeight: 'bold', color: '#fff', marginRight: 10}}>
                Logout
              </Text>
            </TouchableOpacity>
          }
        />
        <ScrollView style={{marginTop: '2%'}}>
          <View>
            <View
              style={{
                flexDirection: 'row',
              }}></View>

            <View style={{margin: '5%', marginTop: '8%'}}>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1}}>
                  <Image
                    
                  />
                </View>
                <View style={{flex: 3}}>
                  
              
                </View>
              </View>
              <View style={{marginTop: 35, textAlign: 'center'}}></View>
            </View>
            <Text
              style={{paddingLeft: 20, marginBottom: 10, fontWeight: 'bold'}}>
              Today's Schedule
            </Text>
           

           
            <Text
              style={{
                paddingLeft: 20,
                marginTop: 30,
                marginBottom: 20,
                fontWeight: 'bold',
              }}>
              Follow Up Schedule
            </Text>
          
           
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

}