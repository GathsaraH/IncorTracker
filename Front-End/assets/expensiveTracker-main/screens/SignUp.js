import React, { Component,useContext } from 'react'
import {Button, StyleSheet, Text, View, TextInput, TouchableOpacity,Alert,Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';
import UrlConfig from '../config/UrlConfig'

// import Users from '../model/users';


export default class  SignUp  extends Component  {


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

		fetch(`${UrlConfig.BASE_URL}/customer/sign-in`, {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(userData)
			
		})
			.then((response) => response.json())
			.then(async (data) => {
				try {
					await AsyncStorage.setItem('token', data.token);
          this.props.navigation.navigate('DrawerContent')
				} catch (e) {
					console.log('error ', e);
          alert('Login Erorr');
				}

				
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
        <View style={styles.container}>
        <Animatable.View>
          <Image
          style={styles.tinyLogo}
          source={require('../assets/fingerprint.png')}
          />
        </Animatable.View>
        <Animatable.View style={styles.HeaderMainContain} animation='fadeInUpBig'>
        <Text style={styles.logo}>Welcome</Text>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Email" 
            placeholderTextColor="#353b48"
            // autoCapitalize="none"
            onChangeText={(text) => this.setState({ email: text })}

            />

        </View>
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Password" 
            placeholderTextColor="#353b48"
            // autoCapitalize="none"
            onChangeText={(text) => this.setState({ password: text })}
 
/>

        </View>
        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity rounded style={styles.loginBtn} onPress={() =>{
          this.userLogin();
          // this.props.navigation.navigate('SignInScreen') 
          }} >
        {/* // onPress={()=>{this.props.navigation.navigate('SignInScreen')}} */}

        <Text style={styles.loginText1} >Sign In</Text>

          </TouchableOpacity>

        <TouchableOpacity onPress={()=> this.props.navigation.navigate('RegistrationScreen')}>

          <Text style={styles.LoginMain}>Don't Have An Account ?</Text>
          <Text style={styles.loginText} >Signup</Text>
        </TouchableOpacity>

        </Animatable.View>
  
      </View>
    )
    }
}
  // const [data, setData] = React.useState({
  //   username: '',
  //   password: '',
  //   check_textInputChange: false,
  //   secureTextEntry: true,
  //   isValidUser: true,
  //   isValidPassword: true,
  // });

  // const  {signIn} = React.useContext(AuthContext);

//   const textInputChange = (val) => {
//     if( val.trim().length >= 4 ) {
//         setData({
//             ...data,
//             username: val,
//             check_textInputChange: true,
//             isValidUser: true
//         });
//     } else {
//         setData({
//             ...data,
//             username: val,
//             check_textInputChange: false,
//             isValidUser: false
//         });
//     }
// }

// const handlePasswordChange = (val) => {
//   if( val.trim().length >= 8 ) {
//       setData({
//           ...data,
//           password: val,
//           isValidPassword: true
//       });
//   } else {
//       setData({
//           ...data,
//           password: val,
//           isValidPassword: false
//       });
//   }
// }


// const updateSecureTextEntry = () => {
//   setData({
//       ...data,
//       secureTextEntry: !data.secureTextEntry
//   });
// }

// const handleValidUser = (val) => {
//   if( val.trim().length >= 4 ) {
//       setData({
//           ...data,
//           isValidUser: true
//       });
//   } else {
//       setData({
//           ...data,
//           isValidUser: false
//       });
//   }
// }

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#2f3640',
      alignItems: 'center',
      justifyContent: 'center',

    },
    tinyLogo: {
      position:'relative',
      top:100,
      width: 90,
      height:90
    },
    HeaderMainContain: {
      backgroundColor: '#ffffff',
      width: 412,
      height: 550,
      marginTop:186,
      bottom:0,
      borderTopLeftRadius:80,
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
    forgot:{
      color:'#1e272e',
      fontSize:11,
      marginLeft:266,
      marginBottom:90,
      marginTop:20
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
    loginText:{
      color:'#192a56',
      width:60,
      position:'relative',
      left:260,
      bottom:21,
      // fontSize:20

    },
    LoginMain:{

      marginLeft:80,
      marginTop:20

    },
    loginText1:{
      color:'white'
    }
  });
  
