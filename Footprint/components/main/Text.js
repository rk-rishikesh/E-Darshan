import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

class Text extends Component {
    state = {
       title: '',
       content: ''
    }
    handleTitle = (text) => {
       this.setState({ title: text })
    }
    handleContent = (text) => {
       this.setState({ content: text })
    }
    onSubmit = (title, content) => {
       //alert('Title: ' + title + ' content: ' + content)
    }
    render() {
       return (
          <View style = {styles.container}>
             <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Title"
                placeholderTextColor = 'lightgrey'
                autoCapitalize = "none"
                onChangeText = {this.handleTitle}/>
             
             <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Content"
                placeholderTextColor = 'lightgrey'
                autoCapitalize = "none"
                onChangeText = {this.handleContent}/>
             
             <TouchableOpacity
                style = {styles.submitButton}
                onPress = {
                   () => this.onSubmit(this.state.title, this.state.content)
                }>
                <Text style = {styles.submitButtonText}> Submit </Text>
             </TouchableOpacity>
          </View>
       )
    }
 }
 export default Text
 
 const styles = StyleSheet.create({
    container: {
       paddingTop: 23
    },
    input: {
       margin: 15,
       height: 40,
       borderColor: '#7a42f4',
       borderWidth: 1
    },
    submitButton: {
       backgroundColor: '#7a42f4',
       padding: 10,
       margin: 15,
       height: 40,
    },
    submitButtonText:{
       color: 'white'
    }
 })