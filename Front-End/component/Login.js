/* eslint-disable no-alert */
/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import firebase from 'firebase';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import {Card} from 'react-native-shadow-cards';
import CardView from 'react-native-cardview';
import AsyncStorage from '@react-native-community/async-storage';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  userLogin = async () => {
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    fetch('https://incotracker.herokuapp.com/sign-in', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(userData),
    })
      .then(response => response.json())
      .then(async data => {
        try {
          await AsyncStorage.setItem('token', data.token);
          this.props.navigation.replace('HomePage');
        } catch (e) {
          console.log('error ', e);
        }

        alert('success Login');
        console.log(userData);
      })
      .catch(error => {
        console.log(error);
        alert('Login Failed');
        console.log(userData);
      });
  };

  render() {
    return (
      <LinearGradient colors={['#FFF', '#FFF']} style={styles.container}>
        <Text style={styles.logoMain}>IncoTracker</Text>
        <Animatable.View animation="zoomInUp" style={styles.mainDetails2}>
          <Image
            style={styles.homeImg1}
            source={require('../assets/main2.gif')}
          />
          <Text
            onPress={() => this.props.navigation.navigate('AddIncomeDetails')}
            style={styles.homeText1}>
            {' '}
            {/* ADD INCOME */}
          </Text>
        </Animatable.View>

        <Text style={styles.logo}>Hello</Text>
        <Text style={styles.logo2}>Sign in to your IncoTracker </Text>
        <CardView
          style={styles.cardStyle}
          cardElevation={50}
          cardMaxElevation={50}
          cornerRadius={50}>
          <TextInput
            underlineColorAndroid="transparent"
            style={styles.signupInput}
            placeholder="Email..."
            placeholderTextColor="#000000"
            onChangeText={text => this.setState({email: text})}
          />
        </CardView>
        <CardView
          style={styles.cardStyle2}
          cardElevation={50}
          cardMaxElevation={50}
          cornerRadius={50}>
          <TextInput
            underlineColorAndroid="transparent"
            style={styles.signupInput}
            placeholder="Password..."
            secureTextEntry={true}
            placeholderTextColor="#000000"
            onChangeText={text => this.setState({password: text})}
          />
        </CardView>
        {/* <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Email..."
            placeholderTextColor="#000000"
            onChangeText={text => this.setState({email: text})}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..."
            placeholderTextColor="#000000"
            onChangeText={text => this.setState({password: text})}
          />
        </View> */}
        <TouchableOpacity>
          <Text
            onPress={() => {
              this.props.navigation.navigate('forgetPassword');
            }}
            style={styles.forgot}>
            Forgot Password?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.userLogin();
          }}
          style={styles.loginBtn}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={styles.signUpText}
            onPress={() => {
              this.props.navigation.navigate('Register');
              console.log("Test");
            }}>
            Signup
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  signupInput: {
    color: '#000000',
    width: 320,
  },
  cardStyle2: {
    margin: 30,
  },
  homeImg1: {
    width: 60,
    height: 60,
    top: -20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    marginBottom: 40,
    textAlign: 'center',
    fontFamily: 'afterprint',
    bottom: -12,
    color: '#2c2c54',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    top: -10,
  },
  logoMain: {
    fontWeight: 'bold',
    fontSize: 60,
    marginBottom: 40,
    textAlign: 'center',
    fontFamily: 'afterprint',
    bottom: -12,
    color: '#c471ed',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    top: 5,
  },
  logo2: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    top: -30,
    color: '#000000',
  },
  inputView: {
    width: '80%',
    backgroundColor: '#FFF',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: '#FFF',
    shadowColor: '#000000',
    shadowOffset: {
      width: 10,
      height: 12,
    },
    shadowOpacity: 20,
    shadowRadius: 16.0,
    elevation: 24,
    borderRadius: 20,
  },
  forgot: {
    color: 'white',
    fontSize: 11,
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#203A43',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    top: -20,
    marginBottom: 10,
    shadowOffset: {
      width: 10,
      height: 12,
    },
    shadowOpacity: 20,
    shadowRadius: 16.0,
    elevation: 24,
  },
  loginText: {
    color: '#FFF',
  },
  signUpText: {
    color: '#000000',
    top: 0,
    fontSize: 20,
  },
});
