/* eslint-disable no-unreachable */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {backgroundColor, height, left} from 'styled-system';
import LinearGradient from 'react-native-linear-gradient';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-community/async-storage';

const data = [
  {label: 'January', value: 'January'},
  {label: 'February', value: 'February'},
  {label: 'March', value: 'March'},
  {label: 'April', value: 'April'},
  {label: 'May', value: 'May'},
  {label: 'June', value: 'June'},
  {label: 'July', value: 'July'},
  {label: 'August', value: 'August'},
  {label: 'September', value: 'September'},
  {label: 'October', value: 'October'},
  {label: 'November', value: 'November'},
  {label: 'December', value: 'December'},
];

const AddIncomeDetails = () => {
  const [_id, set_id] = useState('');
  const [income, setIncome] = useState('');
  const [outgoin, setOutGoin] = useState('');
  const [model, setModel] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(data);
  const [email, setEmail] = useState('');
  const [month, setMonth] = useState('');

  const getUserData = async () => {
    const token = await AsyncStorage.getItem('token');
    fetch('https://incotracker.herokuapp.com', {
      headers: new Headers({
        Authorization: 'Test ' + token,
      }),
    })
      .then(res => res.text())
      .then(data => {
        fetch('https://incotracker.herokuapp.com/income', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            email: data,
            month: value,
            income,
            outgoin,
          }),
        })
          .then(response => response.json())
          .then(response => {
            console.log(response);
            alert('Your Income  Has Recorded');
          })
          .catch(err => {
            console.log(err);
            alert('There Is An Error');
          });
      });
  };

  useEffect(() => {
    // getUserData();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <LinearGradient colors={['#FFF', '#FFF']} style={styles.container}>
        <Text style={styles.logo}>Add Youe Income And Expense</Text>
        <Image
          style={styles.incomePic}
          source={require('../assets/money.gif')}
        />

        <DropDownPicker
          style={styles.monthPicker}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          onChangeValue={value => {
            setValue(value);
            console.log('selected', value);
          }}
        />
        <TextInput
          style={styles.inputText}
          label="Income"
          value={income}
          theme={theme}
          keyboardType="numeric"
          mode="outlined"
          onChangeText={text => setIncome(text)}
        />
        <TextInput
          style={styles.inputText}
          label="Food Expense"
          theme={theme}
          keyboardType="numeric"
          mode="outlined"
          // onChangeText={text => setOutGoin(text)}
        />
        <TextInput
          style={styles.inputText}
          label="Health Expense"
          theme={theme}
          keyboardType="numeric"
          mode="outlined"
          // onChangeText={text => setOutGoin(text)}
        />
        <TextInput
          style={styles.inputText}
          label="Others"
          value={outgoin}
          theme={theme}
          keyboardType="numeric"
          mode="outlined"
          onChangeText={text => setOutGoin(text)}
        />
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => {
            getUserData();
          }}>
          <Text style={styles.loginText}>Add Your Data</Text>
        </TouchableOpacity>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const theme = {
  colors: {
    primary: 'red',
  },
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  inputText: {
    margin: 10,
    marginBottom: 10,
  },
  incomePic: {
    width: 100,
    height: 100,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    left: 130,
  },
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
  },
  monthPicker: {
    margin: 5,
    width: 380,
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    fontFamily: 'afterprint',
    bottom: -12,
    color: '#2c2c54',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    top: 6,
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
    left: 50,
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

export default AddIncomeDetails;
