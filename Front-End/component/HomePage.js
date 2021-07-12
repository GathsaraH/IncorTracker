/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import {Button, TextInput, FAB} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import {Card} from 'react-native-shadow-cards';
import GradientHeader from 'react-native-gradient-header';
import {LineChart, ProgressChart, PieChart} from 'react-native-chart-kit';
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
      profit: '',
      expense: '',
      income: '',
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
            console.log(response);
            const array = response;
            for (const i of array) {
              const profit = i.total;
              const expense = i.expense;
              const income = i.income;
              this.setState({profit: profit});
              this.setState({expense: expense});
              this.setState({income: income});
              console.log(profit);
            }

            // console.log();
          });
      });
  }

  logoutUsers = () => {
    AsyncStorage.removeItem('token').then(() => {
      this.props.navigation.replace('Login');
    });
  };

  render() {
    // const data = [
    //   {
    //     name: 'Income',
    //     value: this.state.income,
    //     color: '#227093',
    //     legendFontColor: '#7F7F7F',
    //     legendFontSize: 15,
    //   },
    //   {
    //     name: 'Expense',
    //     value: this.state.expense,
    //     color: '#ffb142',
    //     legendFontColor: '#7F7F7F',
    //     legendFontSize: 15,
    //   },
    //   {
    //     name: 'Others',
    //     value: 30000,
    //     color: '#c0392b',
    //     legendFontColor: '#7F7F7F',
    //     legendFontSize: 15,
    //   },
    //   {
    //     name: 'Balance',
    //     value: this.state.profit,
    //     color: '#218c74',
    //     legendFontColor: '#7F7F7F',
    //     legendFontSize: 15,
    //   },
    // ];

    const data = [
      {
        name: 'Income',
        value: 50000,
        color: '#227093',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
      {
        name: 'Expense',
        value: 30000,
        color: '#ffb142',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
      {
        name: 'Balance',
        value: 20000,
        color: '#218c74',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
      {
        name: 'Others',
        value: 30000,
        color: '#c0392b',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
    ];

    const screenWidth = Dimensions.get('window').width;

    const chartConfig = {
      backgroundGradientFrom: '#e55039',
      backgroundGradientFromOpacity: 0,
      backgroundGradientTo: '#08130D',
      backgroundGradientToOpacity: 0.5,
      color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
      strokeWidth: 2, // optional, default 3
      barPercentage: 0.5,
      useShadowColorFromDataset: false, // optional
    };

    return (
      <LinearGradient colors={['#FFF', '#FFF']} style={styles.container}>
        <GradientHeader
          title="Welcome"
          subtitle="Gathsara Umesh"
          gradientColors={['#fc00ff', '#00dbde']}
          imageSource={require('../assets/avataaars.png')}
        />

        <Animatable.View animation="lightSpeedIn">
          <Card style={styles.boxShadow}>
            <PieChart
              style={styles.pieChart}
              data={data}
              width={screenWidth}
              height={200}
              doughnut={true}
              chartConfig={chartConfig}
              accessor={'value'}
              backgroundColor={'transparent'}
              coverRadius={0.45}
              coverFill={'#FFF'}
              absolute
            />
          </Card>
        </Animatable.View>
        {/* <Animatable.View animation="lightSpeedIn"> */}
        {/* <LineChart
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
          /> */}
        {/* </Animatable.View> */}
        <Animatable.View animation="zoomInUp" style={styles.mainDetails2}>
          <Image
            style={styles.homeImg1}
            source={require('../assets/income.gif')}
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
            source={require('../assets/login.gif')}
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
            source={require('../assets/reports.gif')}
          />
          <Text
            style={styles.homeText3}
            onPress={() => this.props.navigation.navigate('TableView')}>
            {' '}
            REPORTS
          </Text>
        </Animatable.View>
        <Button
          mode="contained"
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            marginLeft: 18,
            marginRight: 18,
            marginTop: 50,
            top: 180,
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
  pieChart: {
    top: 0,
    left: 0,
  },
  homeImg: {
    width: 100,
    height: 100,
    left: 120,
    top: 5,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 10,
    display: 'none',
  },
  homeImg1: {
    top: 1,
    left: 70,
    height: 30,
    width: 40,
  },
  homeImg2: {
    top: 1.5,
    left: 70,
    width: 40,
    height: 30,
  },
  homeImg3: {
    top: 0,
    left: 70,
    width: 40,
    height: 40,
  },
  homeImg4: {
    top: -2,
    left: 70,
  },
  homeText1: {
    textAlign: 'center',
    top: -21,
  },
  homeText2: {
    textAlign: 'center',
    top: -20,
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
    width: 320,
    top: 180,
    left: 30,
    height: 40,
    shadowColor: '#000000',
    shadowOffset: {
      width: 10,
      height: 12,
    },
    shadowOpacity: 20,
    shadowRadius: 16.0,
    elevation: 24,
    borderRadius: 20,
    margin: 15,
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
    height: 200,
    position: 'relative',
    top: -299,
  },
  monthlyOverviewContainer: {
    width: '100%',
    height: 120,
    // backgroundColor: '#10ac84',
    alignItems: 'center',
    top: 293,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 100,
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
    fontSize: 15,
    color: '#323432',
    left: -120,
  },
  expenseTitle: {
    color: 'white',
    fontSize: 30,
    fontWeight: '100',
    left: -120,
  },

  //Shadow Start
  boxShadow: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 10,
      height: 12,
    },
    shadowOpacity: 20,
    shadowRadius: 16.0,
    elevation: 24,
    borderRadius: 20,

    //Shadow End

    top: 170,
    left: 12,
    height: 230,
    width: 370,
  },
});
