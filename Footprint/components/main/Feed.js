import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image, FlatList, Button } from 'react-native'

import firebase from 'firebase'
require('firebase/firestore')
import { connect } from 'react-redux'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
var current_latitude;
var current_longitude;

function Feed(props) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (props.usersFollowingLoaded == props.following.length && props.following.length !== 0) {
            props.feed.sort(function (x, y) {
                return x.creation - y.creation;
            })

            setPosts(props.feed);
        }
        console.log(posts)

    }, [props.usersFollowingLoaded, props.feed])



    navigator.geolocation.getCurrentPosition((position) => 
    {
        current_latitude = position.coords.latitude
        current_longitude = position.coords.longitude
        console.log("current position lo:",current_latitude,"lg:",current_longitude)
});


    return (
        
        <View style={styles.container}>
            <View style={styles.containerGallery}>
            
                <FlatList
                    numColumns={1}
                    horizontal={false}
                    data={posts}
                    renderItem={({ item }) => (
                    // if(item.Longitude === current_latitude  && item.Latitude === current_longitude){ 
                    //     return (
                        <View style={styles.containerImage}>
                            <View style= {{flexDirection:'row'}}>
                                <FontAwesome 
                                name="user-circle"
                                color="#05375a"
                                size={15}
                                />
                            <Text style={styles.text_footer} >  {item.user.name}</Text>
                            </View>
                            {/* <Text style={styles.text_footer}>Latitude={item.Latitude}</Text> */}
                            <Image
                                style={{width: '100%', height: 200,resizeMode : 'stretch' }}
                                source={{ uri: item.downloadURL }}
                            />
                            
                        

                            {/*                             
                            <Text
                                onPress={() => props.navigation.navigate('Comment', { postId: item.id, uid: item.user.uid })}>
                                View Comments...
                                </Text> */}
                                <br></br>
                        </View>
                        //   )  }
                     ) }

                />
            </View>
        </View>

    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    containerInfo: {
        margin: 20
    },
    containerGallery: {
        flex: 1
    },
    containerImage: {
        flex: 1 / 3,
        padding: 10

    },
    image: {
        flex: 1,
        aspectRatio: 1 / 1
    },
    text_footer: {
        color: '#2f4f4f',
        fontSize: 15,
        flexDirection:'column'
    },
})
const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    following: store.userState.following,
    feed: store.usersState.feed,
    usersFollowingLoaded: store.usersState.usersFollowingLoaded,
    // package: store.useState.package,


})
export default connect(mapStateToProps, null)(Feed);




    // const onLikePress = (userId, postId) => {
    //     firebase.firestore()
    //         .collection("posts")
    //         .doc(userId)
    //         .collection("userPosts")
    //         .doc(postId)
    //         .collection("likes")
    //         .doc(firebase.auth().currentUser.uid)
    //         .set({})
    // }
    // const onDislikePress = (userId, postId) => {
    //     firebase.firestore()
    //         .collection("posts")
    //         .doc(userId)
    //         .collection("userPosts")
    //         .doc(postId)
    //         .collection("likes")
    //         .doc(firebase.auth().currentUser.uid)
    //         .delete()
    // }