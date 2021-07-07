/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
export default class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			pnumber: '',
			email: '',
			password: ''
		};
	}

	submitUserData = async (props) => {
		const userData = {
			name: this.state.name,
			pnumber: this.state.pnumber,
			email: this.state.email,
			password: this.state.password
		};

		// const {name, pnumber, email, password} = this.state;
		// fetch('https://incotracker.herokuapp.com/register', {
		fetch('https://incotracker.herokuapp.com/register', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(userData)
		})
			.then((response) => response.json())
			.then(async (data) => {
				try {
					await AsyncStorage.setItem('token', data.token);
					this.props.navigation.navigate('Login');
				} catch (e) {
					console.log('error ', e);
				}

				alert('success Registerd');
				console.log(userData);
			})
			.catch((error) => {
				console.log(error);
				alert('Registerdtion Failed');
				console.log(userData);
			});
	};

	render() {
		return (
			<LinearGradient colors={['#2980B9', '#6DD5FA', '#5D26C1']} style={styles.container}>
				<Text style={styles.logo}>Create Account</Text>
				<View style={styles.inputView}>
					<TextInput
						style={styles.inputText}
						placeholder="Name..."
						placeholderTextColor="#003f5c"
						onChangeText={(name) => this.setState({ name })}
						// onChangeText={text => this.setState({name: text})}
					/>
				</View>
				<View style={styles.inputView}>
					<TextInput
						style={styles.inputText}
						placeholder="Number..."
						placeholderTextColor="#003f5c"
						keyboardType="numeric"
						onChangeText={(pnumber) => this.setState({ pnumber })}
						// onChangeText={text => this.setState({pnumber: text})}
					/>
				</View>
				<View style={styles.inputView}>
					<TextInput
						style={styles.inputText}
						placeholder="Email..."
						placeholderTextColor="#003f5c"
						onChangeText={(email) => this.setState({ email })}
						// onChangeText={text => this.setState({email: text})}
					/>
				</View>
				<View style={styles.inputView}>
					<TextInput
						secureTextEntry
						style={styles.inputText}
						placeholder="Password..."
						placeholderTextColor="#003f5c"
						onChangeText={(password) => this.setState({ password })}
						// onChangeText={text => this.setState({password: text})}
					/>
				</View>
				{/* <TouchableOpacity>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity> */}
				<TouchableOpacity
					style={styles.loginBtn}
					onPress={() => {
						this.submitUserData();
					}}
				>
					<Text style={styles.loginText}>Register</Text>
				</TouchableOpacity>
				{/* <TouchableOpacity>
          <Text style={styles.loginText}>Register</Text>
        </TouchableOpacity> */}
			</LinearGradient>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		alignItems: 'center',
		justifyContent: 'center'
	},
	logo: {
		fontWeight: 'bold',
		fontSize: 50,
		color: '#FFFFFF',
		marginBottom: 40
	},
	inputView: {
		width: '80%',
		backgroundColor: '#465881',
		borderRadius: 25,
		height: 50,
		marginBottom: 20,
		justifyContent: 'center',
		padding: 20,
		shadowRadius: 20,
		shadowColor: '#ffffff'
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
		backgroundColor: '#5ED8E4',
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
