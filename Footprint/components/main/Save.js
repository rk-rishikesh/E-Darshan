import React, { useState } from 'react'
import { View, TextInput, Image} from 'react-native'
import Geolocation from '@react-native-community/geolocation';
import firebase from 'firebase'
import { NavigationContainer } from '@react-navigation/native'
import {  
    Text,
    TouchableOpacity, 
    Dimensions,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar,
    Button,
  } from 'react-native';
  import * as Animatable from 'react-native-animatable';
import { color } from 'react-native-reanimated';

  const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#808080',

      },
    
        cameraContainer: {
          flex: 1,
          flexDirection: 'row'
        },
        fixedRatio: {
          flex: 1,
          aspectRatio: 1
        },
      
        header: {
            flex: 1,
            justifyContent: 'center',
            paddingHorizontal: 20,
            paddingBottom: 50
        },
        footer: {
          backgroundColor: '#fff',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingHorizontal: 100,
          paddingVertical: 70,
          marginLeft: 34,
          alignContent: 'flex-end',
          marginTop:300,
      },
        text_header: {
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 40,
            marginLeft: 100,
        },
        action: {
            flexDirection: 'row',
            marginTop: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#f2f2f2',
            paddingBottom: 5,
            backgroundColor:'black',
        },
        textInput: {
            flex: 1,
            paddingLeft: 10,
            color: '#808080',
            fontSize:40,
            height: 60,
            borderWidth:0,
            marginTop:20,
        },
        button: {
            alignItems: 'center',
            marginTop: 50
        },
  });



require("firebase/firestore")
require("firebase/firebase-storage")

var latitude;
var longitude;

export default function Save(props) {
    const [caption, setCaption] = useState("")
    const [Latitude, setLatitude] = useState(0);
    const [Longitude, setLongitude] = useState(0);
    
    const uploadImage = async () => {
        const uri = props.route.params.image;
        const childPath = `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`;
        console.log(childPath)

        const response = await fetch(uri);
        const blob = await response.blob();
       

        const task = firebase
            .storage()
            .ref()
            .child(childPath)
            .put(blob);

        const taskProgress = snapshot => {
            console.log(`transferred: ${snapshot.bytesTransferred}`)
        }

        const taskCompleted = () => {
            task.snapshot.ref.getDownloadURL().then((snapshot) => {
                savePostData(snapshot);
                console.log(snapshot)
            })
        }

        const taskError = snapshot => {
            console.log(snapshot)
        }

        task.on("state_changed", taskProgress, taskError, taskCompleted);
    }

    const savePostData = (downloadURL) => {

        firebase.firestore()
            .collection('posts')
            .doc(firebase.auth().currentUser.uid)
            .collection("userPosts")
            .add({
                downloadURL,
                caption,
                likesCount: 0,
                Latitude,
                Longitude,
                creation: firebase.firestore.FieldValue.serverTimestamp()
            }).then((function () {
                props.navigation.popToTop()
            }))
    }

    navigator.geolocation.getCurrentPosition((position) => 
    {
        latitude = position.coords.latitude
        longitude = position.coords.longitude
        console.log("position f:",longitude,"lg:",latitude)
});

    return (
        <View style={{backgroundColor:'black', height: '100%'}}> 
            <Image source={{ uri: props.route.params.image }} />
            <View style={{backgroundColor:'black'}}>
                <Text style={{color:'white', fontSize:'300%', fontWeight:'bold'}}> Caption ! </Text>
            <TextInput
                style={styles.textInput}
                placeholder="Write a Caption... "
                onChangeText={(caption) => setCaption(caption)}
            />
            </View>
            <View style={styles.action}>
            <Animatable.View 
            animation="fadeInUpBig"
            style={styles.footer}
            >
            <Button title=" Get Latitude " onPress={() => setLatitude(Latitude+latitude)} color="#d2b48c"/> <br></br>
            <Button title=" Get Longitude " onPress={() => setLongitude(Longitude+longitude)} color="#d2b48c"/> <br></br>
            <Button title="Save" onPress={() => uploadImage()} color="#d2b48c"/>
            </Animatable.View>
            
           </View>
        </View>
    )
}







// function getPos(latitude, longitude){

//     console.log("pos: lat ",latitude,"long: ",longitude)
//     Latitude= latitude;
//     Longitude = longitude;
//     const x=5
//     console.log("Lat ",Latitude,"Long: ",Longitude)
//     return Latitude, Longitude
// }

// function getLocation() {
//    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
//     }

//     var geoSuccess = function (position) {
//         Latitude = position.coords.latitude;
//         Longitude = position.coords.longitude;
//         console.log("pos: lat ",Latitude,"long: ",Longitude)
//         setLatitude(Latitude)
//         setLongitude(Longitude)
        
//        //Latitude,Longitude= getPos(Latitude,Longitude)
//         //return latitude,longitude
//     }

    
//     function geoError() {
//         alert("Geocoder failed.");
//     }

  

    //   Geolocation.getCurrentPosition((info) => {
    //     console.log(info.coords.latitude,info.coords.longitude )
    //     setLatitude(latitude + info.coords.latitude)
    //     setLongitude(longitude + info.coords.longitude)
    //     console.log(longitude,latitude)
        
    // });

   
      // console.log("Position",Latitude,Longitude)
       // getLocation();
       // latitude= geoSuccess.latitude
        //longitude= geoSuccess.longitude
