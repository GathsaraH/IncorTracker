/* eslint-disable no-alert */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: ''
		};
	}

	userLogin = async () => {
		const userData = {
			email: this.state.email,
			password: this.state.password
		};

		fetch('https://d971631a597f.ngrok.io/sign-in', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(userData)
		})
			.then((response) => response.json())
			.then(async (data) => {
				try {
					await AsyncStorage.setItem('token', data.token);
					this.props.navigation.replace('HomePage');
				} catch (e) {
					console.log('error ', e);
				}

				alert('success Login');
				console.log(userData);
			})
			.catch((error) => {
				console.log(error);
				alert('Login Failed');
				console.log(userData);
			});
	};

	render() {
		return (
			<LinearGradient colors={['#c31432', '#240b36']} style={styles.container}>
				<Text style={styles.logo}>Hello</Text>
				<Text style={styles.logo2}>Sign in to your account</Text>
				<View style={styles.inputView}>
					<TextInput
						style={styles.inputText}
						placeholder="Email..."
						placeholderTextColor="#003f5c"
						onChangeText={(text) => this.setState({ email: text })}
					/>
				</View>
				<View style={styles.inputView}>
					<TextInput
						secureTextEntry
						style={styles.inputText}
						placeholder="Password..."
						placeholderTextColor="#003f5c"
						onChangeText={(text) => this.setState({ password: text })}
					/>
				</View>
				<TouchableOpacity>
					<Text style={styles.forgot}>Forgot Password?</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						this.userLogin();
					}}
					style={styles.loginBtn}
				>
					<Text style={styles.loginText}>LOGIN</Text>
				</TouchableOpacity>
				<TouchableOpacity>
					<Text
						style={styles.loginText}
						onPress={() => {
							this.props.navigation.navigate('Register');
						}}
					>
						Signup
					</Text>
				</TouchableOpacity>
			</LinearGradient>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#003f5c',
		alignItems: 'center',
		justifyContent: 'center'
	},
	logo: {
		fontWeight: 'bold',
		fontSize: 50,
		color: '#FFFFFF',
		marginBottom: 40
	},
	logo2: {
		fontWeight: '400',
		fontSize: 16,
		lineHeight: 24,
		top: -30
	},
	inputView: {
		width: '80%',
		backgroundColor: '#465881',
		borderRadius: 25,
		height: 50,
		marginBottom: 20,
		justifyContent: 'center',
		padding: 20
	},
	inputText: {
		height: 50,
		color: 'white'
	},
	forgot: {
		color: 'white',
		fontSize: 11
	},
	loginBtn: {
		width: '80%',
		backgroundColor: '#fb5b5a',
		borderRadius: 25,
		height: 50,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 40,
		marginBottom: 10
	},
	loginText: {
		color: 'white'
	}
});
