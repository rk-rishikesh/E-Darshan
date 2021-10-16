import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image, FlatList, Button } from 'react-native'
import ImagePicker from 'react-native-image-picker';
import { 
    TouchableOpacity, 
    TextInput,
    Platform,
    ScrollView,
    StatusBar,
    ImageBackground ,
    Dimensions,
    RefreshControl,
    ActivityIndicator,
    TouchableNativeFeedback
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import firebase from 'firebase'
require('firebase/firestore')
import { connect } from 'react-redux'


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    containerInfo: {
            margin: 20
    },
    containerimg: {
        flex: 1,
        flexDirection: 'row',
    },
    containerGallery: {
        flex: 1
    },
    containerImage: {
        flex: 1,
        paddingBottom:'5%',
        paddingTop:'5%',
        paddingLeft:'5%',
        paddingRight:'5%',

    },
    image: {
        flex: 1,
        aspectRatio: 1 / 1,
        
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
        paddingHorizontal: 20,
        paddingVertical: 30,
        alignContent: 'flex-start'
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 40
    },
        containerInfo: {
        margin: 20
    },
    text_footer: {
        color: '#05375a',
        fontSize: 13,
        marginLeft: 10
    },
    action: {
        flexDirection: 'column',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    button: {
        marginTop: 20,
       
    }
  });

function Profile(props) {
    const [userPosts, setUserPosts] = useState([]);
    const [user, setUser] = useState(null);
    const [following, setFollowing] = useState(false)

    useEffect(() => {
        const { currentUser, posts } = props;

        if (props.route.params.uid === firebase.auth().currentUser.uid) {
            setUser(currentUser)
            setUserPosts(posts)               
                 
        }
        else {
            firebase.firestore()
                .collection("users")
                .doc(props.route.params.uid)
                .get()
                .then((snapshot) => {
                    if (snapshot.exists) {
                        {console.log(snapshot)} 
                        setUser(snapshot.data());
                      //  const uid = snapshot.docs[0].ref.path.split('/')[1];
                       // const user = getState().usersState.users.find(el => el.uid === uid);
        
        
                        // let posts = snapshot.docs.map(doc => {
                        //     const data = doc.data();
                        //     const id = doc.id;
                        //     return { id, ...data, user }
                        // })
                    }
                    else {
                        console.log('does not exist')
                    }
                })
            firebase.firestore()
                .collection("posts")
                .doc(props.route.params.uid)
                .collection("userPosts")
                .orderBy("creation", "asc")
                .get()
                .then((snapshot) => {
                    let posts = snapshot.docs.map(doc => {
                        const data = doc.data();
                        const id = doc.id;
                        return { id, ...data }
                    })
                    setUserPosts(posts)
                })
        }

        if (props.following.indexOf(props.route.params.uid) > -1) {
            setFollowing(true);
        } else {
            setFollowing(false);
        }

    }, [props.route.params.uid, props.following])

    const onFollow = () => {
        firebase.firestore()
            .collection("following")
            .doc(firebase.auth().currentUser.uid)
            .collection("userFollowing")
            .doc(props.route.params.uid)
            .set({})
    }
    const onUnfollow = () => {
        firebase.firestore()
            .collection("following")
            .doc(firebase.auth().currentUser.uid)
            .collection("userFollowing")
            .doc(props.route.params.uid)
            .delete()
    }

    const onLogout = () => {
        firebase.auth().signOut();
    }

    if (user === null) {
        return <View />
    }
    return (
        <ScrollView>
        <View>
        <View style={styles.container}>
            <View style={styles.containerInfo}>
                <View style= {{flexDirection:'row'}}>
                                <FontAwesome 
                                name="user-circle"
                                color="#05375a"
                                size={50}
                                />
                <Text style={styles.text_footer}>{user.name}</Text>
                </View>
                <View style= {{flexDirection:'column', marginLeft: 50 , marginTop:-30}}>
                <Text style={styles.text_footer}>{user.email}</Text>
                </View>
                
                {/* <Text>Images</Text> */}

                {props.route.params.uid !== firebase.auth().currentUser.uid ? (
                    <View style = {{marginTop:'10%', marginLeft: '0%'}}>
                        {following ? (
                            <Button
                                title="Following"
                                onPress={() => onUnfollow()}
                            />
                        ) :
                            (
                                <Button
                                    title="Follow"
                                    onPress={() => onFollow()}
                                    color="#2f4f4f"
                                />
                            )}
                    </View>
                ) :
                <View style= {styles.button}>
                    <Button 
                        title="Logout"
                        onPress={() => onLogout()}
                        color="#2f4f4f"
                    />
                    </View>}
            </View>

            <View style={styles.containerGallery}>
            {/* <Text>Imagesfeed</Text> */}
                <FlatList
                    numColumns={1}
                    horizontal={false}
                    data={userPosts}
                    renderItem={({ item }) =>
                    (
                        <View style={styles.containerImage}>
                            {console.log(item,"Itms")}

                            <Image
                                style={{width: '100%', height: 200,resizeMode : 'stretch' }}
                                source={{ uri: item.downloadURL}}
                            />
                        </View>

                    )}

                />
            </View>
        </View>
        </View> 
        </ScrollView>
          
    )
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     containerInfo: {
//         margin: 20
//     },
//     containerGallery: {
//         flex: 1
//     },
//     containerImage: {
//         flex: 1 / 3

//     },
//     image: {
//         flex: 1,
//         aspectRatio: 1 / 1
//     }
// })
const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    posts: store.userState.posts,
    following: store.userState.following
})
export default connect(mapStateToProps, null)(Profile);