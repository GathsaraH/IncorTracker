import React,{useEffect,useState} from 'react';
import { View,Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList
} from '@react-navigation/drawer';

import { NavigationContainer } from '@react-navigation/native';

import{ AuthContext } from '../contexts/AuthContext'
import HomeStackScreen from './HomeScreen';
import UrlConfig from '../config/UrlConfig';
import Income1 from './Income';
function Home() {
    return (
      <HomeStackScreen></HomeStackScreen>
    );
  }
  
  function Income() {
    return (
      <Income1></Income1>
    );
  }
  function Expense() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Expense Screen</Text>
      </View>
    );
  }
  
  function CustomDrawerContent(props) {

    const [email,setEmail] = useState('loading');
    const Boiler = async ()=>{
       const token = await AsyncStorage.getItem('token');
     fetch(`${UrlConfig.BASE_URL}`,{
     headers:new Headers({
       Authorization:'Test ' + token,
     }),
     }).then(res=>res.text())
     .then(data=>{
       console.log(data);
       setEmail(data.email);
     }
     ).catch((err)=>{
       console.log(err);
     });
    };
 useEffect(()=>{
    Boiler();
 },[]);
 
    const logout = (props)=>{
       AsyncStorage.removeItem('token').then(()=>{
         props.navigation.replace('SignUp');
       });
    };

    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem style ={styles.bottomDrawerSection} label="Sign Out" onPress={() => logout(props)} />
      </DrawerContentScrollView>
    );
  }
  
  const Drawer = createDrawerNavigator();
  
  function MyDrawer() {
    return (
      <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
     
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Income" component={Income} />
        <Drawer.Screen name="Expense" component={Expense} />
   
      </Drawer.Navigator>
    );
  }



export default function DrawerContent() {

    

 return(

 
      <MyDrawer/>


 )
}

const styles = StyleSheet.create({
    bottomDrawerSection: {
        marginBottom: 65,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    }
});