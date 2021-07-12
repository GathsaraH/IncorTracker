import React from 'react'
import {View, Text,Button,TextInput,StyleSheet,KeyboardAvoidingView} from 'react-native'

function Input({style,...props}) {
    return (

        
        <TextInput  {...props} style={[style,styles.input]}></TextInput>
      
    )
}

const styles = StyleSheet.create({
    input:{

        backgroundColor:'#ccc',
        width:'100%',
        height:60,
        borderRadius:8,

    },
})

export default Input
 