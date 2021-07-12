import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import SignInScreen from './SignUp';
import SignUpScreen from './RegistrationScreen';
import SplashScreen from './DrawerContent'

const RootStackScreen = ({navigation}) => (
    <Stack.Navigator headerMode='none'>
        <Stack.Screen name="SignInScreen" component={SignInScreen}/>
        <Stack.Screen name="SignUpScreen" component={SignUpScreen}/>
        <Stack.Screen name="SplashScreen" component={SplashScreen}/>
    </Stack.Navigator>
);

export default RootStackScreen;
