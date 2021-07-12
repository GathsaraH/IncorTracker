import React from 'react'
import {Button, ButtonGroup,NativeBaseProvider } from 'native-base';
import {View, Text,TextInput,StyleSheet,TouchableOpacity} from 'react-native'
import { border } from 'styled-system';
import Icon from 'react-native-ionicons';




function IconButton({name,style,onPress}) {
    return (

        <TouchableOpacity style={[styles.container,style]} onPress={onPress}>
         <Icon name={name}></Icon>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({

})
export default IconButton
