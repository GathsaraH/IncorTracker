/* eslint-disable no-unreachable */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView, Text, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-community/async-storage';
import {Card} from 'react-native-shadow-cards';
import CardView from 'react-native-cardview';

import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
} from 'react-native-table-component';

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

const CONTENT = {
  tableHead: ['Column 0/Row 0', 'Column 1', 'Column 2', 'Column 3'],
  tableTitle: ['Row', 'Row 2', 'Row 3', 'Row 4'],
  tableData: [
    ['1', '2', '3'],
    ['a', 'b', 'c'],
    ['1', '2', '3'],
    ['a', 'b', 'c'],
  ],
};

const TableView = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(data);
  const [details, setDetails] = useState('');
  const [expense, setExpense] = useState('');
  const [income, setIncome] = useState('');

  const getUserData = async () => {
    const token = await AsyncStorage.getItem('token');
    fetch('https://incotracker.herokuapp.com', {
      headers: new Headers({
        Authorization: 'Test ' + token,
      }),
    })
      .then(res => res.text())
      .then(data => {
        fetch('https://incotracker.herokuapp.com/getIncomePerUser', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            email: data,
            month: value,
          }),
        })
          .then(response => response.json())
          .then(response => {
            console.log('Test');
            console.log(response);
            const array = response;
            for (const i of array) {
              const total = i.total;
              const expense = i.expense;
              const income = i.income;
              setDetails(total);
              setExpense(expense);
              setIncome(income);
              console.log(total);
            }
          })
          .catch(err => {
            console.log(err);
          });
      });
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <LinearGradient colors={['#FC466B', '#3F5EFB']} style={styles.container}>
      <Text style={styles.mainText}>Select Month : Check Income</Text>
      <Card style={styles.boxShadow}>
        <Image
          style={styles.mainImage}
          source={require('../assets/avataaars.png')}
        />
        <Text style={styles.myName}>Gathsara Umesh</Text>
        <Image
          style={styles.homeImg4}
          source={require('../assets/icons8-folder.gif')}
        />
        <Image
          style={styles.homeImg5}
          source={require('../assets/icons8-gmail.gif')}
        />
      </Card>
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
          getUserData();
        }}
      />
      <Card style={styles.boxShadow2}>
        <Text style={styles.tIcome}>Total Income</Text>
        <Image
          style={styles.homeImg3}
          source={require('../assets/incomeMoney.gif')}
        />
        <Text style={styles.mainData}>{income}</Text>
      </Card>
      <Card style={styles.boxShadow2}>
        <Text style={styles.tIcome}>Total Expense</Text>
        <Image
          style={styles.homeImg3}
          source={require('../assets/expense.gif')}
        />
        <Text style={styles.mainData}>{expense}</Text>
      </Card>
      <Card style={styles.boxShadow2}>
        <Text style={styles.tIcome}>Total Profit</Text>
        <Image
          style={styles.homeImg3}
          source={require('../assets/profit.gif')}
        />
        <Text style={styles.mainData}>{details}</Text>
      </Card>
      {/* <Table style={styles.tableMain} borderStyle={{borderWidth: 1}}>
        <Row
          data={CONTENT.tableHead}
          flexArr={[1, 2, 1, 1]}
          style={styles.head}
          textStyle={styles.text}
        />
        <TableWrapper style={styles.wrapper}>
          <Col
            data={CONTENT.tableTitle}
            style={styles.title}
            heightArr={[28, 28]}
            textStyle={styles.text}
          />
          <Rows
            data={CONTENT.tableData}
            flexArr={[2, 1, 1]}
            style={styles.row}
            textStyle={styles.text}
          />
        </TableWrapper>
      </Table> */}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
  },
  head: {height: 40, backgroundColor: 'orange'},
  wrapper: {flexDirection: 'row'},
  title: {flex: 1, backgroundColor: '#2ecc71'},
  row: {height: 28},
  text: {textAlign: 'center'},
  tableMain: {
    top: 120,
  },
  monthPicker: {
    top: 60,
    width: 150,
    left: 120,
  },
  tIcome: {
    textAlign: 'center',
    fontSize: 20,
  },
  mainImage: {
    width: 80,
    height: 80,
    alignItems: 'center',
    left: 85,
  },
  mainData: {
    textAlign: 'center',
    top: -20,
    fontSize: 20,
    color: '#2980b9',
  },
  homeImg3: {
    width: 25,
    height: 25,
    left: 173,
    top: -22,
  },
  boxShadow: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 10,
      height: 12,
    },
    shadowOpacity: 20,
    shadowRadius: 16.0,

    elevation: 24,
    top: 40,
    left: 70,
    height: 200,
    width: 250,
    borderRadius: 20,
  },
  boxShadow2: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 10,
      height: 12,
    },
    shadowOpacity: 20,
    shadowRadius: 16.0,

    elevation: 24,
    top: 120,
    left: 70,
    height: 60,
    width: 250,
    borderRadius: 10,
    margin: 10,
  },
  homeImg4: {
    width: 40,
    height: 40,
    left: 150,
    top: 15,
  },
  homeImg5: {
    width: 40,
    height: 40,
    left: 60,
    top: -28,
  },
  mainText: {
    textAlign: 'center',
    fontFamily: 'afterprint',
    fontSize: 35,
    bottom: -12,
    color: '#2c2c54',
    fontWeight: '400',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  myName: {
    textAlign: 'center',
    color: '#3c40c6',
    fontSize: 20,
  },
});

export default TableView;
