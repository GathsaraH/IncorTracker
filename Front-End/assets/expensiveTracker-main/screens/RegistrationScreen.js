import React,{Component} from 'react'
import {View, Text,Button,TextInput,StyleSheet,TouchableOpacity,KeyboardAvoidingView,TouchableWithoutFeedback,Keyboard  } from 'react-native'
import Heading from '../components/Heading';
import Input from '../components/Input';
import FilledButton from '../components/FilledButton';
import TextButton from '../components/TextButton';
import Error from '../components/Error';
import IconButton from '../components/IconButton';
import { AuthContext } from '../contexts/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UrlConfig from '../config/UrlConfig';
import * as Animatable from 'react-native-animatable';
export default class RegistrationScreen extends Component {

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


		fetch(`${UrlConfig.BASE_URL}/customer/register`, {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(userData)
		})
			.then((response) => response.text())
			.then(async (data) => {
				try {
					await AsyncStorage.setItem('token', data.token);
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


    }

    render() {
    return (
        // <View style ={styles.container}>
		    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
{/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
            <Heading style={styles.title}>SIGN UP</Heading>

            <IconButton name={'close-outline'}/>
            <Error error={''}></Error>

            <View style={styles.inputView}>
					<TextInput
						style={styles.inputText}
						placeholder="User Name"
						placeholderTextColor="#003f5c"
						onChangeText={(name) => this.setState({ name })}
						// onChangeText={text => this.setState({name: text})}
					/>
				</View>
                <View style={styles.inputView}>
					<TextInput
						style={styles.inputText}
						placeholder="Email"
						placeholderTextColor="#003f5c"
						onChangeText={(email) => this.setState({ email })}
						// onChangeText={text => this.setState({email: text})}
					/>
				</View>
				<View style={styles.inputView}>
					<TextInput
						style={styles.inputText}
						placeholder="Contact"
						placeholderTextColor="#003f5c"
						onChangeText={(pnumber) => this.setState({ pnumber })}
						// onChangeText={text => this.setState({pnumber: text})}
					/>
				</View>

				<View style={styles.inputView}>
					<TextInput
						secureTextEntry
						style={styles.inputText}
						placeholder="Password"
						placeholderTextColor="#003f5c"
						onChangeText={(password) => this.setState({ password })}
						// onChangeText={text => this.setState({password: text})}
					/>
				</View>
                <View style={styles.inputView}>
					<TextInput
						secureTextEntry
						style={styles.inputText}
						placeholder="Confirm Password"
						placeholderTextColor="#003f5c"
					
						// onChangeText={text => this.setState({password: text})}
					/>
				</View>

            {/* <FilledButton title={'Redirect'} style={styles.loginBtton} onPress={() =>}}/> */}
           
            {/* <FilledButton title={'SIGN UP'} style={styles.loginText1} 
            onPress={() =>{
               

                    // props.navigation.pop();

             }}/> */}
             <TouchableOpacity rounded style={styles.loginBtn} onPress={() =>{
                this.submitUserData();
				this.props.navigation.navigate('SignUp') 

              // this.props.navigation.navigate('SignInScreen') 
              }} >
            {/* // onPress={()=>{this.props.navigation.navigate('SignInScreen')}} */}

            <Text style={styles.loginText1} >SIGN UP</Text>

              </TouchableOpacity>
			  {/* </TouchableWithoutFeedback> */}
</KeyboardAvoidingView>
        // </View>
    )
}
}


const styles = StyleSheet.create({

    container:{
        flex:1,
        // paddingTop:120,
        padding:20,
        alignItems:'center',
    },
    title:{
        marginBottom:32,
    },
    loginBtn:{
        backgroundColor:'#5567FE',
        width:"50%",
        borderRadius:15,
        height:60,
        alignItems:"center",
        justifyContent:"center",
        marginTop:20,
        marginLeft:0,
        marginBottom:0
      },
    inputView:{
        width:"80%",
        backgroundColor:"#d1d8e0",
        borderRadius:15,
        height:60,
        marginBottom:20,
        marginLeft:0,
        justifyContent:"center",
        padding:30
      },
      inputText:{
        height:50,
        color:"white"
      },
    loginBtton:{
        marginVertical:10,
        position:'relative',
        bottom:20
    }

});
