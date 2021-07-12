import React from 'react'
import {Text,View,StyleSheet} from 'react-native';



function Error({error}) {
    return (

        <View style={styles.container}>
        <Text style={styles.text}>{error}</Text>
        </View>


    )
}

const styles = StyleSheet.create({

    container:{
        
        paddingVertical:5
    },
    text:{
        fontSize:12,
        color:'red',
        fontWeight:'bold'
    }
})

export default Error
