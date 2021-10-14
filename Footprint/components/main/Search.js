import React, { useState } from 'react'
//import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native'

import firebase from 'firebase';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
require('firebase/firestore');

import { 
    View, 
    Text, 
    Button, 
    TouchableOpacity, 
    FlatList,
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar
} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center'
    },
    container: {
        flex: 1, 
        backgroundColor: '#9932cc'
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
        paddingHorizontal: 40,
        paddingVertical: 40,
        marginLeft: 54,
        alignContent: 'flex-start'
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
          paddingBottom: 5
      },
      textInput: {
          flex: 1,
          marginTop: -12,
          paddingLeft: 10,
          color: '#9932cc',
          fontSize:20
      },
      button: {
          alignItems: 'center',
          marginTop: 50
      },
  });

export default function Search(props) {
    const [users, setUsers] = useState([])

    const fetchUsers = (search) => {
        firebase.firestore()
            .collection('users')
            .where('name', '>=', search)
            .get()
            .then((snapshot) => {
                let users = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data }
                });
                setUsers(users);
            })
    }
    return (
        <View style={styles.container}>
             <StatusBar backgroundColor='#009387' barStyle="light-content"/>
                    <View style={styles.header}>
                    <Text style={styles.text_header}>Search!</Text>
                    </View>
            <View style={styles.action}>
            <Animatable.View 
            animation="fadeInUpBig"
            style={styles.footer}
        >
             <FontAwesome 
                name="search"
                color="#05375a"
                size={20}
             /> <br></br>
            <TextInput
                style={styles.textInput}
                placeholder="    Type Here..."
                onChangeText={(search) => fetchUsers(search)} />

            <FlatList
                numColumns={1}
                horizontal={false}
                data={users}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate("Profile", {uid: item.id})}>
                        <Text>{item.name}</Text>
                    </TouchableOpacity>

                )}
            />
        </Animatable.View>
        </View>
        
           
        </View>
    )
}