/* eslint-disable prettier/prettier */
import React, { Component, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BouncingPreloader from 'react-native-bouncing-preloader';

const LoadingScreen = (props) => {
	// class LoadingScreen extends Component {
	// 	constructor(props) {
	// 		super(props);
	// 		this.state = {};
	// 	}
	const detectLogin = async () => {
		const token = await AsyncStorage.getItem('token');
		if (token) {
			props.navigation.replace('DrawerContent');
		} else {
			props.navigation.replace('SignUp');
		}
	};

	useEffect(() => {
		detectLogin();
	}, []);
		
	<BouncingPreloader
	icons={[
	  'https://www.shareicon.net/data/256x256/2016/05/04/759946_bar_512x512.png',
	  
	]}
	leftRotation="-680deg"
	rightRotation="360deg"
	leftDistance={-180}
	rightDistance={-250}
	speed={1200} />

	return (

		<View style={styles.loading}>


			<ActivityIndicator size="large" color="green" />
		</View>
	);
};

const styles = StyleSheet.create({
	loading: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor:'#ecf0f1'
	}
});

export default LoadingScreen;
