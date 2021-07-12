// import React, { useState, useEffect,useContext,createContext } from 'react';
// import { View, StyleSheet, Image, TouchableOpacity, Text, KeyboardAvoidingView,Button } from 'react-native';
// import { TextInput } from 'react-native-paper';
// import DropDownPicker from 'react-native-dropdown-picker';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {AppContext}  from '../contexts/AppContext';


// const Expen = (props) => {
//     var context = providerType._context;
// 	const {dispatch} = useContext(AppContext);

// 	const [name, setName] = useState('');
// 	const [cost, setCost] = useState('');

// 	const onSubmit = (event) => {
// 		event.preventDefault();
// 		const expense = {
// 			id: uuidv4(),
// 			name,
// 			cost: parseInt(cost),
// 		};

// 		dispatch({
// 			type: 'ADD_EXPENSE',
// 			payload: expense,
// 		});

// 		setName('');
// 		setCost('');
// 	};

// 	return(

//         <AppContext>
// 	<View style={styles.container}>
// 		<Text>Income Manger</Text>

// 		 <TextInput  
               
// 			   style={styles.inputText}
// 			   placeholder="description" 
// 			   placeholderTextColor="#353b48"
//                value={name}
// 						onChange={(text) => setName(text)}
	
// 			   />
// 		 <TextInput  
               
// 			   style={styles.inputText}
// 			   placeholder="Amount" 
// 			   placeholderTextColor="#353b48"
//                value={cost}
// 						onChange={(text) => setCost(text)}
	
// 			   />
		
// 		<Button title="Add Gig"
// 		onPress={onSubmit}
// 		// disabled={!amount && !description}
// 		></Button>
// 		{gigs &&
// 		gigs.map((gig,i) => (
// 			<View key={i}>
// 				<Text key={i}>{gig.description}</Text>
// 				<Text >{gig.amount}</Text>
// 			</View>
// 		))
// 		}
// 	</View>
//     </AppContext>
// 	)
// }
	
// const styles =StyleSheet.create({
// 	container:{
// 	flex:1
// 	},
// 	inputText:{
// 			borderColor:'red',
// 			padding:10
// 	}
// });
// export default Expen;
