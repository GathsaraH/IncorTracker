/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import {Button, TextInput, FAB} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import {LineChart, ProgressChart, BarChart} from 'react-native-chart-kit';
import AsyncStorage from '@react-native-community/async-storage';
import {
  VictoryBar,
  VictoryChart,
  VictoryGroup,
  VictoryTheme,
} from 'victory-native';
import {fontSize, position} from 'styled-system';
export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      data: '',
      email: '',
      total: '',
    };
  }

  async componentDidMount() {
    const token = await AsyncStorage.getItem('token');
    fetch('https://incotracker.herokuapp.com', {
      headers: new Headers({
        Authorization: 'Test ' + token,
      }),
    })
      .then(res => res.text())
      .then(data => {
        console.log(data);
        fetch('https://incotracker.herokuapp.com/getDetails', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            email: data,
          }),
        })
          .then(response => response.json())
          .then(response => {
            const test = this.setState({total: response.total});
            console.log(response);
            console.log(test);
          });
      });
  }

  logoutUsers = () => {
    AsyncStorage.removeItem('token').then(() => {
      this.props.navigation.replace('Login');
    });
  };

  render() {
    return (
      <LinearGradient colors={['#009FFF', '#ec2F4B']} style={styles.container}>
        {/* <Text style={styles.mainText}>Your Monthly Income</Text> */}
        <Animatable.View
          style={styles.HeaderMainContain}
          animation="fadeInUpBig">
          <View style={styles.monthlyOverviewContainer}>
            <View style={styles.detailsContainer}>
              <View style={styles.monthlyExpenseContainer}>
                <Text style={styles.expenseTitle}>Balance</Text>
                <Text style={styles.expenseValue}>Rs:25000{this.state.total}</Text>
              </View>
            </View>
          </View>
        </Animatable.View>
        <Animatable.View animation="lightSpeedIn">
          <LineChart
            data={{
              labels: ['Jan', 'Feb', 'Mar', 'Apr'],
              datasets: [
                {
                  data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                  ],
                },
              ],
            }}
            width={Dimensions.get('window').width}
            height={320}
            yAxisSuffix="k"
            yAxisInterval={1}
            chartConfig={{
              backgroundColor: '#FFF',
              backgroundGradientFrom: '#FFF',
              backgroundGradientTo: '#FFF',
              decimalPlaces: 2,
              color: (opacity = 0) => `rgba(255,0,0, ${opacity})`,
              labelColor: (opacity = 0) => `rgba(0,0,0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: 'red',
              },
            }}
            bezier
            // eslint-disable-next-line react-native/no-inline-styles
            style={styles.chart1}
          />
        </Animatable.View>
        <Animatable.View animation="zoomInUp" style={styles.mainDetails2}>
          <Image
            style={styles.homeImg1}
            source={require('../assets/income4.png')}
          />
          <Text
            onPress={() => this.props.navigation.navigate('AddIncomeDetails')}
            style={styles.homeText1}>
            {' '}
            ADD INCOME
          </Text>
        </Animatable.View>

        <Animatable.View animation="zoomInDown" style={styles.mainDetails2}>
          <Image
            style={styles.homeImg2}
            source={require('../assets/icons8-budget-48.png')}
          />
          <Text
            onPress={() => this.props.navigation.navigate('AddIncomeDetails')}
            style={styles.homeText2}>
            {' '}
            ADD EXPENSES
          </Text>
        </Animatable.View>
        <Animatable.View animation="zoomInUp" style={styles.mainDetails2}>
          <Image
            style={styles.homeImg3}
            source={require('../assets/icons8-report-64.png')}
          />
          <Text style={styles.homeText3}> ALL TRANSACTION</Text>
        </Animatable.View>
        <Animatable.View animation="zoomInDown" style={styles.mainDetails2}>
          <Image
            style={styles.homeImg4}
            source={require('../assets/icons8-transaction-48.png')}
          />
          <Text style={styles.homeText4}> REPORTS</Text>
        </Animatable.View>
        <Button
          mode="contained"
          style={{
            marginLeft: 18,
            marginRight: 18,
            marginTop: 50,
            top: -220,
            position: 'relative',
          }}
          onPress={() => {
            this.logoutUsers();
          }}>
          logout
        </Button>
        {/* <FAB
          style={styles.fab}
          small={false}
          icon="plus"
          onPress={() => this.props.navigation.navigate('AddIncomeDetails')}
        /> */}
        {/* <BarChart
          data={{
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [
              {
                data: [20, 45, 28, 80, 99, 43],
              },
            ],
          }}
          width={Dimensions.get('window').width} // from react-native
          height={220}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
          style={{
            top: -300,
            marginVertical: 8,
            borderRadius: 30,
          }}
        /> */}
      </LinearGradient>
    );
  }
}
const {width, height} = Dimensions.get('screen');
const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 10,
    display: 'none',
  },
  homeImg1: {
    top: -2,
    left: 100,
  },
  homeImg2: {
    top: -2,
    left: 100,
    width: 40,
    height: 40,
  },
  homeImg3: {
    top: -2,
    left: 100,
    width: 40,
    height: 40,
  },
  homeImg4: {
    top: -2,
    left: 100,
  },
  homeText1: {
    textAlign: 'center',
    top: -35,
  },
  homeText2: {
    textAlign: 'center',
    top: -30,
  },
  homeText3: {
    textAlign: 'center',
    top: -30,
  },
  homeText4: {
    textAlign: 'center',
    top: -35,
  },
  mainDetails2: {
    backgroundColor: '#FFFFFF',
    width: 380,
    top: -180,
    left: -2,
    height: 40,
    shadowColor: '#FFFFFF',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    borderRadius: 10,
    margin: 10,
  },
  rootL: {
    flex: 1,
    backgroundColor: '#E3E0F3',
  },
  container: {
    flex: 1,
  },
  chart1: {
    width: 80,
    marginVertical: 10,
    borderRadius: 30,
    top: -199,
    shadowColor: '#4949a3',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  mainText: {
    justifyContent: 'center',
    fontSize: 20,
    alignContent: 'center',
    textAlign: 'center',
    color: '#0F2027',
  },
  button: {
    position: 'relative',
    bottom: 100,
  },
  HeaderMainContain: {
    width: width,
    height: 300,
    position: 'relative',
    top: -299,
  },
  monthlyOverviewContainer: {
    width: '100%',
    height: 120,
    backgroundColor: '#10ac84',
    alignItems: 'center',
    top: 293,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  detailsContainer: {
    position: 'absolute',
    width: '100%',
    height: 80,
    bottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  monthlyExpenseContainer: {
    width: 100,
    height: '60%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  expenseValue: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#323432',
  },
  expenseTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '100',
  },
});
