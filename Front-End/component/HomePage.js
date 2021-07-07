/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Button, TextInput, FAB } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import { LineChart, ProgressChart, BarChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-community/async-storage';
import { VictoryBar, VictoryChart, VictoryGroup, VictoryTheme } from 'victory-native';
import { fontSize, position } from 'styled-system';
export default class HomePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			token: '',
			data: '',
			email: ''
		};
	}

	async componentDidMount() {
		const token = await AsyncStorage.getItem('token');
		fetch('https://incotracker.herokuapp.com', {
			headers: new Headers({
				Authorization: 'Test ' + token
			})
		})
			.then((res) => res.text())
			.then((data) => {
				console.log(data);
				fetch('https://incotracker.herokuapp.com/getDetails', {
					method: 'post',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						email: data
					})
				})
					.then((response) => response.json())
					.then((response) => {
						console.log(response);
					});
			});
	}

	logoutUsers = () => {
		AsyncStorage.removeItem('token').then(() => {
			this.props.navigation.replace('Login');
		});
	};

	render() {
		return (
			<LinearGradient colors={['#009FFF', '#ec2F4B']} style={styles.container}>
				<Text style={styles.mainText}>Your Monthly Income</Text>
				<BarChart
					data={{
						labels: ['January', 'February', 'March', 'April', 'May', 'June'],
						datasets: [
							{
								data: [20, 45, 28, 80, 99, 43]
							}
						]
					}}
					width={Dimensions.get('window').width} // from react-native
					height={220}
					yAxisLabel="$"
					yAxisSuffix="k"
					yAxisInterval={1} // optional, defaults to 1
					chartConfig={{
						backgroundColor: '#e26a00',
						backgroundGradientFrom: '#fb8c00',
						backgroundGradientTo: '#ffa726',
						decimalPlaces: 2, // optional, defaults to 2dp
						color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
						labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
						style: {
							borderRadius: 16
						},
						propsForDots: {
							r: '6',
							strokeWidth: '2',
							stroke: '#ffa726'
						}
					}}
					bezier
					style={{
						marginVertical: 8,
						borderRadius: 16
					}}
				/>
				<LineChart
					data={{
						labels: ['Jan', 'Feb', 'Mar', 'Apr'],
						datasets: [
							{
								data: [
									Math.random() * 100,
									Math.random() * 100,
									Math.random() * 100,
									Math.random() * 100
								]
							}
						]
					}}
					width={Dimensions.get('window').width}
					height={320}
					yAxisSuffix="k"
					yAxisInterval={1}
					chartConfig={{
						backgroundColor: '#FFF',
						backgroundGradientFrom: '#FFF',
						backgroundGradientTo: '#FFF',
						decimalPlaces: 2,
						color: (opacity = 0) => `rgba(255,0,0, ${opacity})`,
						labelColor: (opacity = 0) => `rgba(0,0,0, ${opacity})`,
						style: {
							borderRadius: 16
						},
						propsForDots: {
							r: '6',
							strokeWidth: '2',
							stroke: 'red'
						}
					}}
					bezier
					// eslint-disable-next-line react-native/no-inline-styles
					style={styles.chart1}
				/>

				<Button
					mode="contained"
					style={{ marginLeft: 18, marginRight: 18, marginTop: 50 }}
					onPress={() => {
						this.logoutUsers();
					}}
				>
					logout
				</Button>
				<FAB
					style={styles.fab}
					small
					icon="plus"
					onPress={() => this.props.navigation.navigate('AddIncomeDetails')}
				/>
			</LinearGradient>
		);
	}
}
const styles = StyleSheet.create({
	fab: {
		position: 'absolute',
		margin: 16,
		right: 0,
		bottom: 10
	},
	rootL: {
		flex: 1,
		backgroundColor: '#E3E0F3'
	},
	container: {
		flex: 1
	},
	chart1: {
		width: 100,
		marginVertical: 8,
		borderRadius: 16
	},
	mainText: {
		justifyContent: 'center',
		fontSize: 20,
		alignContent: 'center',
		textAlign: 'center',
		color: '#0F2027'
	},
	button: {
		position: 'relative',
		bottom: 100
	}
});
