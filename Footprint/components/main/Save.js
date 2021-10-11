import React, { useState } from 'react'
import { View, TextInput, Image, Button } from 'react-native'
import Geolocation from '@react-native-community/geolocation';
import firebase from 'firebase'
import { NavigationContainer } from '@react-navigation/native'
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
        <View style={{ flex: 1 }}>
            <Image source={{ uri: props.route.params.image }} />
            <TextInput
                placeholder="Write a Caption . . ."
                onChangeText={(caption) => setCaption(caption)}
            />
            <Button title=" Get Latitude " onPress={() => setLatitude(Latitude+latitude)} />
            <Button title=" Get Longitude " onPress={() => setLongitude(Longitude+longitude)} />
            <Button title="Save" onPress={() => uploadImage()} />

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
