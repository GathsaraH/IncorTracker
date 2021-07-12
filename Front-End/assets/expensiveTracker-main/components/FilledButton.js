import React from 'react'
import { Button, ButtonGroup,NativeBaseProvider } from 'native-base';
import {View, Text,TextInput,StyleSheet} from 'react-native'
import { width } from 'styled-system';


function FilledButton({title,style,onPress}) {
    return (
        <NativeBaseProvider>
        <Button
        size="lg"
        colorScheme="secondary"
        variant="outline"
        onPress={onPress}  style ={styles.text}>
        {title.toUpperCase()}

       
      </Button>
      </NativeBaseProvider>
    )
}
const styles = StyleSheet.create({
    text:{
        marginVertical:30,
        width:180
    },
})
export default FilledButton
