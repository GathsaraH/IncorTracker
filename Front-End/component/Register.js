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
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import CardView from 'react-native-cardview';
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      pnumber: '',
      email: '',
      password: '',
    };
  }

  submitUserData = async props => {
    const userData = {
      name: this.state.name,
      pnumber: this.state.pnumber,
      email: this.state.email,
      password: this.state.password,
    };

    // const {name, pnumber, email, password} = this.state;
    // fetch('https://incotracker.herokuapp.com/register', {
    fetch('https://incotracker.herokuapp.com/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(userData),
    })
      .then(response => response.json())
      .then(async data => {
        try {
          await AsyncStorage.setItem('token', data.token);
          this.props.navigation.navigate('Login');
        } catch (e) {
          console.log('error ', e);
        }
        alert('success Registerd');
        console.log(userData);
      })
      .catch(error => {
        console.log(error);
        alert('Registerdtion Failed');
        console.log(userData);
      });
  };

  render() {
    return (
      <LinearGradient colors={['#FFF', '#FFF']} style={styles.container}>
        <Text style={styles.logo}>Create Account</Text>

        <Image style={styles.homeImg1} source={require('../assets/main.gif')} />
        <CardView
          style={styles.cardStyle}
          cardElevation={50}
          cardMaxElevation={50}
          cornerRadius={50}>
          <TextInput
            underlineColorAndroid="transparent"
            style={styles.signupInput1}
            placeholder="Name..."
            placeholderTextColor="#000000"
            onChangeText={name => this.setState({name})}
          />
        </CardView>

        <CardView
          style={styles.cardStyle1}
          cardElevation={50}
          cardMaxElevation={50}
          cornerRadius={50}>
          <TextInput
            underlineColorAndroid="transparent"
            style={styles.signupInput2}
            placeholder="Number..."
            keyboardType="numeric"
            placeholderTextColor="#000000"
            onChangeText={pnumber => this.setState({pnumber})}
          />
        </CardView>

        <CardView
          style={styles.cardStyle}
          cardElevation={50}
          cardMaxElevation={50}
          cornerRadius={50}>
          <TextInput
            underlineColorAndroid="transparent"
            style={styles.signupInput3}
            placeholder="Email..."
            placeholderTextColor="#000000"
            onChangeText={email => this.setState({email})}
            // onChangeText={text => this.setState({email: text})}
          />
        </CardView>

        <CardView
          style={styles.cardStyle}
          cardElevation={50}
          cardMaxElevation={50}
          cornerRadius={50}>
          <TextInput
            underlineColorAndroid="transparent"
            style={styles.signupInput4}
            placeholder="Password..."
            placeholderTextColor="#000000"
            onChangeText={password => this.setState({password})}
            // onChangeText={text => this.setState({password: text})}
          />
        </CardView>
        {/* <TouchableOpacity>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => {
            this.submitUserData();
          }}>
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
    // backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardStyle: {
    margin: 15,
  },
  signupInput1: {
    color: '#000000',
    width: 320,
  },
  signupInput2: {
    color: '#000000',
    width: 320,
  },
  signupInput3: {
    color: '#000000',
    width: 320,
  },
  signupInput4: {
    color: '#000000',
    width: 320,
  },
    homeImg1: {
    width: 60,
    height: 60,
    top: -20,
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    marginBottom: 40,
    textAlign: 'center',
    fontFamily: 'afterprint',
    bottom: -12,
    color: '#000000',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    top: 5,
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
    shadowColor: '#ffffff',
  },
  inputText: {
    height: 50,
    color: 'white',
  },
  forgot: {
    color: 'white',
    fontSize: 11,
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#5ED8E4',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
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
    color: '#000000',
  },
});
