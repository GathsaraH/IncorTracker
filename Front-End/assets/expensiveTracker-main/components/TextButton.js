import React from 'react'
import { Button, ButtonGroup,NativeBaseProvider } from 'native-base';
import {View, Text,TextInput,StyleSheet} from 'react-native'
import { border } from 'styled-system';


function TextButton({style,onPress}) {
    return (
        <NativeBaseProvider>
        <Button
        size="lg"
        colorScheme="secondary"
        variant="outline"
        onPress={onPress}  style ={styles.text}>
        <Text style={styles.title}>
        Have U an Account ? Create One
        </Text>
      </Button>
      </NativeBaseProvider>
    )
}
const styles = StyleSheet.create({
    text:{
        marginVertical:-20,
        borderColor:'white',
    },
    title:{
        fontSize:14,
        color:'purple',
       
    }
})
export default TextButton
