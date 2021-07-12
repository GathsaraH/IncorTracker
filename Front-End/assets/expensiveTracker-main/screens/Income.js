import React,{useState,useEffect,useContext} from 'react'
import {Button, StyleSheet, Text, View, TextInput, TouchableOpacity,Alert,Image} from 'react-native';
import * as Animatable from 'react-native-animatable';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UrlConfig from '../config/UrlConfig';

import { TransactionContext } from "../contexts/TransactionContext"

export default function Income() {

  // const [description, setDescription] = useState('');
	// const [amount, setAmount] = useState('');

  const [categorie, setcategorie] = useState('');
  const [outgoin, setOutGoin] = useState('');
	const [gigs, setGigs] = useState([{categorie, outgoin}]);
	const [total, setTotal] = useState(0);
  const [fullIncome,setFullIncome] = useState(0);

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);


  const [_id, set_id] = useState('');
	const [income, setIncome] = useState('');
	const [model, setModel] = useState(false);
	const [open, setOpen] = useState(false);

	


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    console.log(currentDate)
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const getUserData = async () => {
 
    setGigs([
      ...gigs,
      {
        outgoin:outgoin,
        categorie:categorie,
      },
    ]);
  
    setcategorie('');
    setOutGoin('');
  

		const token = await AsyncStorage.getItem('token');
		fetch(`${UrlConfig.BASE_URL}`, {
			headers: new Headers({
				Authorization: 'Test ' + token
			})
		})
			.then((res) => res.text())
			.then((data) => {
        console.log("Print What Data",data)
				fetch(`${UrlConfig.BASE_URL}/income/addIncome`, {
					method: 'post',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						email: data,
						month: date,
            income:income,
            text:categorie,
						amount:outgoin,

					})
				})
					.then((response) => response.json())
					.then((response) => {
						console.log(response);
						alert('Your Income Added');



					})
          .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
             // ADD THIS THROW error
              throw error;
            });
			});
	};
const setTotalOncome = async () => {


}
	useEffect(() =>{
		setTotal(gigs.reduce((total,gig) => total + Number(gig.outgoin),0));
    setFullIncome(gigs.reduce((fullIncome,gig) => fullIncome - Number(gig.outgoin),0))
	},[gigs])



    return (
        <View style={styles.container}>
            <Animatable.View animation='zoomInUp'>

            </Animatable.View>

            <Animatable.View style={styles.HeaderMainContain} animation='zoomInUp'>

            <Text style={styles.logo}>Add Income</Text>
            <Text>Income : $ {total}</Text>
            <Text>Expense : $ {fullIncome}</Text>
            <TouchableOpacity rounded style={styles.loginBtn1} onPress={showDatepicker} >
            <Text style={styles.loginText1} >Add Date</Text>

              </TouchableOpacity>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                  
                />
              )}
    
            <View style={styles.inputView} >
              <TextInput  
                style={styles.inputText}
                placeholder="Income" 
                placeholderTextColor="#353b48"
                label="Income"
                value={income}
                onChangeText={(text) => setIncome(text)}

                />

            </View>

            <View style={styles.inputView} >
              <TextInput  
               
                style={styles.inputText}
                placeholder="Amount" 
                label="Outgoing"
                value={outgoin}
                placeholderTextColor="#353b48"
                onChangeText={(text) => setOutGoin(text)}
     
                />

            </View>

            <View style={styles.inputView} >
              <TextInput  
                style={styles.inputText}
                placeholder="Category" 
                placeholderTextColor="#353b48"
                value ={categorie}
                onChangeText={(text) => setcategorie(text)}
               
                />

            </View>


            <TouchableOpacity rounded style={styles.loginBtn}onPress={() => {
						getUserData();
					}} >

            <Text style={styles.loginText1} >Add Income</Text>

              </TouchableOpacity>

              <TouchableOpacity rounded style={styles.loginBtn}onPress={() => {
						getUserData();
					}} >

            <Text style={styles.loginText1} >Add Expense</Text>

              </TouchableOpacity>{gigs &&
		gigs.map((gig,i) => (
			<View key={i}>
				<Text key={i}>{gig.categorie} {gig.outgoin}</Text>
			</View>
		))
		}
    
            </Animatable.View>

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
        alignItems: 'center',
        justifyContent: 'center',
  
      },
      HeaderMainContain: {
        backgroundColor: '#ffffff',
        width: 412,
        height: 806,
        marginTop:0,
        bottom:0,
        borderRadius:15,
        // borderTopLeftRadius:80,
        elevation: 5,
        shadowColor: '#4949a3',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
    },
      logo:{
        fontWeight:"bold",
        fontSize:25,
        color:"#2c3e50",
        marginBottom:40,
        marginTop:40,
        marginLeft:43
      },
      inputView:{
        width:"80%",
        backgroundColor:"#d1d8e0",
        borderRadius:15,
        height:60,
        marginBottom:20,
        marginLeft:40,
        justifyContent:"center",
        padding:30
      },
      inputText:{
        height:50,
        color:"white"
      },
      loginBtn:{
        backgroundColor:'#5567FE',
        width:"50%",
        borderRadius:15,
        height:60,
        alignItems:"center",
        justifyContent:"center",
        marginTop:10,
        marginLeft:90,
        marginBottom:10
      },
      loginBtn1:{
        backgroundColor:'#d1d8e0',
        width:"80%",
        borderRadius:15,
        height:60,
        alignItems:"center",
        justifyContent:"center",
        marginTop:10,
        marginLeft:40,
        marginBottom:10
      },
})
