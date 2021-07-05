/* eslint-disable prettier/prettier */
import React, { Component, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const LoadingScreen = (props) => {
	// class LoadingScreen extends Component {
	// 	constructor(props) {
	// 		super(props);
	// 		this.state = {};
	// 	}
	const detectLogin = async () => {
		const token = await AsyncStorage.getItem('token');
		if (token) {
			props.navigation.replace('HomePage');
		} else {
			props.navigation.replace('Login');
		}
	};

	useEffect(() => {
		detectLogin();
	}, []);

	return (
		<View style={styles.loading}>
			<ActivityIndicator size="large" color="blue" />
		</View>
	);
};

const styles = StyleSheet.create({
	loading: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default LoadingScreen;
