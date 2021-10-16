import React ,{Component} from 'react'
import img1 from './img1.jpg'

// abc@gmail.com
// 1234KETKI


import {
  SafeAreaView,
  View,
  Image,
  ImageBackground ,
} 
from 'react-native';
import {Header, Text} from 'react-native-elements';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function Landing({ navigation }) {
    return (
     <View style = {{ width: '100%', height: '100%' }}>
        <ImageBackground source = {{uri:'https://pro2-bar-s3-cdn-cf1.myportfolio.com/b6d65713c808988de7ebaa0056488b71/c8af92a2-ac81-4bbe-ac9e-d2642de70288_rw_1200.jpg?h=2778f7a31b892d7a2e7bffcce7b2d906'}}  
            style = {{ width: '100%', height: '100%' }}  >
            
            {/* <View style = {{marginTop:'90%',marginLeft: '25%'}}>
            <Button
             icon={
                <Icon
                  name="user-circle"
                  size={15}
                  color="white"
                />
              }
              
                title=" Register"
                onPress={() => navigation.navigate("Register"), console.log("fcrfc")} 
                style = {{width:'35%', height: '10%', marginLeft: 59}}/>
            </View> */}
            <View style = {{marginTop:'100%', marginLeft: '30%'}}>
            <Button
            icon={
                <Icon
                  name="user-circle"
                  size={30}
                  color="white"
                />
              }
                title="  Register"
                onPress={() => navigation.navigate("Register")} 
                style = {{width:'60%', height: '50%'}}/>
            </View>

            <View style = {{marginTop:'0%', marginLeft: '30%'}}>
            <Button
            icon={
                <Icon
                  name="unlock-alt"
                  size={30}
                  color="white"
                />
              }
                title="  Login"
                onPress={() => navigation.navigate("Login")} 
                style = {{width:'60%', height: '50%', marginTop: 60 }}/>
            </View>
        </ImageBackground>
         </View>         
    );
}