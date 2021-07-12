/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const forgetPassword = () => {
  return (
    <LinearGradient colors={['#009FFF', '#ec2F4B']} style={styles.container}>
      <View>
        <Text style={styles.mainText}>forgetPassWord</Text>
      </View>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Password..."
          placeholderTextColor="#003f5c"
          onChangeText={text => this.setState({password: text})}
        />
      </View>
      <TouchableOpacity
        // onPress={() => {
        //   this.userLogin();
        // }}
        style={styles.loginBtn}>
        <Text style={styles.loginText}>Rest Your Password</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainText: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 21,
  },
  inputText: {
    height: 50,
    color: 'white',
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#203A43',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
  },
  inputView: {
    width: '80%',
    backgroundColor: '#465881',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
});

export default forgetPassword;
