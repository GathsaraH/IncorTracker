// // /* eslint-disable prettier/prettier */
// // import React, {useEffect, useState} from 'react';
// // import {Button, TextInput} from 'react-native-paper';
// // import {ActivityIndicator, Text} from 'react-native';
// // import AsyncStorage from '@react-native-community/async-storage';

// // const HomePage = (props) => {
// //   const [email, setEmail] = useState('loading');
// //   // const Boiler = async () => {
// //   //   const token = await AsyncStorage.getItem('token');
// //   //   fetch('http://10.0.2.2:3000/', {
// //   //     headers: new Headers({
// //   //       Authorization: 'Bearer ' + token,
// //   //     }),
// //   //   })
// //   //     .then(res => res.json())
// //   //     .then(data => {
// //   //       console.log(data);
// //   //       setEmail(data.email);
// //   //     });
// //   // };
// //   // useEffect(() => {
// //   //   Boiler();
// //   // }, []);

// //   const logout = () => {
// //     AsyncStorage.removeItem('token').then(() => {
// //         this.props.navigation.navigate('Login');
// //     });
// //   };

// //   return (
// //     <>
// //       <Text style={{fontSize: 18}}>your email is {email}</Text>
// //       <Button
// //         mode="contained"
// //         style={{marginLeft: 18, marginRight: 18, marginTop: 18}}
// //         onPress={() => logout(props)}>
// //         logout
// //       </Button>
// //     </>
// //   );
// // };

// // export default HomePage;

// /* eslint-disable prettier/prettier */
// import React, { Component } from 'react';
// import { View, Text } from 'react-native';
// import { Button, TextInput } from 'react-native-paper';
// import AsyncStorage from '@react-native-community/async-storage';

// class HomePage extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			token: ''
// 		};
// 	}

// 	// fetchToken = async () => {
// 	// 	const token2 = await AsyncStorage.getItem('token');
// 	// 	this.state.token = token2;
// 	// };

// 	async componentDidMount() {
// 		const token = await AsyncStorage.getItem('token');
// 		fetch('https://9b842786288e.ngrok.io', {
//       headers:new Headers({
//         Authorization:'Test '+token
//       })
// 		})
// 			.then((res) => res.json())
// 			.then((data) => {
// 				console.log(data);
// 			});
// 	}

// 	logoutUsers = () => {
// 		AsyncStorage.removeItem('token').then(() => {
// 			this.props.navigation.replace('Login');
// 		});
// 	};

// 	render() {
// 		return (
// 			<View>
// 				<Text style={{ fontSize: 18 }}>your email is </Text>
// 				<Button
// 					mode="contained"
// 					style={{ marginLeft: 18, marginRight: 18, marginTop: 18 }}
// 					onPress={() => {
// 						this.logoutUsers();
// 					}}
// 				>
// 					logout
// 				</Button>
// 			</View>
// 		);
// 	}
// }

// export default HomePage;

/* eslint-disable prettier/prettier */
import React,{useEffect,useState} from 'react';
import { Button ,TextInput} from 'react-native-paper';
import {
  ActivityIndicator,
  Text,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const HomePage = (props) => {
   const [email,setEmail] = useState('loading');
   const Boiler = async ()=>{
      const token = await AsyncStorage.getItem('token');
    fetch('https://d971631a597f.ngrok.io',{
    headers:new Headers({
      Authorization:'Test ' + token,
    }),
    }).then(res=>res.json())
    .then(data=>{
      console.log(data);
      setEmail(data.email);
    }
    ).catch((err)=>{
      console.log(err);
    });
   };
useEffect(()=>{
   Boiler();
},[]);

   const logout = (props)=>{
      AsyncStorage.removeItem('token').then(()=>{
        props.navigation.replace('Login');
      });
   };

  return (
   <>
    <Text style={{fontSize:18}}>your email is {email}</Text>
    <Button
        mode="contained"
        style={{marginLeft:18,marginRight:18,marginTop:18}}
         onPress={() => logout(props)}>
        logout
      </Button>
   </>
  );
};



export default HomePage;
