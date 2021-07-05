// /* eslint-disable prettier/prettier */
// import React, { Component, useEffect } from 'react';
// import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import Login from './component/Login';
// import Register from './component/Register';
// import firebase from 'firebase';
// import HomePage from './component/HomePage';

// firebase.initializeApp({
// 	apiKey: 'AIzaSyBduj4gXbZNyhbpLn6Q6i9eep2BlIOO-yY ',
// 	authDomain: 'incotracker-9ca44.firebaseio.com/',
// 	databaseURL: 'https://incotracker-9ca44-default-rtdb.firebaseio.com/',
// 	storageBucket: 'incotracker-9ca44.appspot.com'
// });

// const Stack = createStackNavigator();

// export default class App extends Component {
// 	render() {
// 		useEffect(() => {

//     });

// 		return (
// 			<NavigationContainer>
// 				<Stack.Navigator>
// 					<Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
// 					<Stack.Screen options={{ headerShown: false }} name="Register" component={Register} />
// 					<Stack.Screen options={{ headerShown: false }} name="HomePage" component={HomePage} />
// 				</Stack.Navigator>
// 			</NavigationContainer>
// 		);
// 	}
// }

/* eslint-disable prettier/prettier */
import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './component/Login';
import Register from './component/Register';
import firebase from 'firebase';
import HomePage from './component/HomePage';
import LoadingScreen from './component/LoadingScreen';
import AsyncStorage from '@react-native-community/async-storage';
// firebase.initializeApp({
// 	apiKey: 'AIzaSyBduj4gXbZNyhbpLn6Q6i9eep2BlIOO-yY ',
// 	authDomain: 'incotracker-9ca44.firebaseio.com/',
// 	databaseURL: 'https://incotracker-9ca44-default-rtdb.firebaseio.com/',
// 	storageBucket: 'incotracker-9ca44.appspot.com'
// });

const Stack = createStackNavigator();

const App = () => {
	const [IsLoggedIn, setLogged] = useState(null);
	const detectLogin = async () => {
		const token = await AsyncStorage.getItem('token');
		if (token) {
			setLogged(true);
		} else {
			setLogged(false);
		}
	};
	useEffect(() => {
		detectLogin();
	}, []);

	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen options={{ headerShown: false }} name="LoadingScreen" component={LoadingScreen} />
				<Stack.Screen options={{ headerShown: false }} name="HomePage" component={HomePage} />
				<Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
				<Stack.Screen options={{ headerShown: false }} name="Register" component={Register} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default App;
