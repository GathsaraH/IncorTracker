import React,{useEffect,useState} from 'react';
import {StatusBar, Text, View, StyleSheet, Dimensions, Image,FlatList,SafeAreaView,ScrollView} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {PieChart} from 'react-native-chart-kit';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/colors';
import plants from '../consts/plants';
import Expen from './Expen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UrlConfig from '../config/UrlConfig';
import Income from './Income';
import {Card} from 'react-native-shadow-cards';
import DateTimePicker from '@react-native-community/datetimepicker';
// import { Card, ListItem, Button } from 'react-native-elements'
// const width = Dimensions.get('window').width / 2 - 30;

//pie chart data
const data = [
    {
        name: "Income",
        value: 50000,
        color: "#227093",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: "Expense",
        value: 30000,
        color: "#ffb142",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: "Balance",
        value: 20000,
        color: "#218c74",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    }
];

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
    backgroundGradientFrom: "#e55039",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
};




const HomeScreen = () => {
    
    // const [catergoryIndex, setCategoryIndex] = React.useState(0);
    // const categories = [];

    const [email,setEmail] = React.useState('')
    const [description,setDescription] = React.useState('')
    const [amount,setAmount] = React.useState('')
    const [test,setTest] =React.useState('');



    useEffect(async() =>{
      
      const token = await AsyncStorage.getItem('token');
      fetch(`${UrlConfig.BASE_URL}`, {
        headers: new Headers({
          Authorization: 'Test ' + token
        })
      })

      .then((res) => res.text())
			.then((data) => {
				fetch(`${UrlConfig.BASE_URL}/income/getIncomeD`, {
					method: 'post',
          headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						email: data,
					})
        })

        .then((response) => response.json())
        .then((response) => {
          console.log( "Get All Data",response);
          var fullIncomeTest = setTest(response[0].amount);
          console.log("Print Amount ",response[0].amount)
        })
          .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
             // ADD THIS THROW error
              throw error;
            });
			});

    })


    const [categorie, setcategorie] = useState('');
    const [outgoin, setOutGoin] = useState('');
    const [gigs, setGigs] = useState([{categorie, outgoin}]);
    const [total, setTotal] = useState(0);
    const [balance,setBalance] = useState(0);

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
  
  
    const [_id, set_id] = useState('');
    const [income, setIncome] = useState('');
    const [model, setModel] = useState(false);
    const [open, setOpen] = useState(false);
  
    
  
  
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
      console.log(currentDate)
    };
  
    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };
  
    const showDatepicker = () => {
      showMode('date');
    };
  
    const getUserData = async () => {
   
      setGigs([
        ...gigs,
        {
          outgoin:outgoin,
          categorie:categorie,
        },
      ]);
    
      setcategorie('');
      setOutGoin('');
    
  
      const token = await AsyncStorage.getItem('token');
      fetch(`${UrlConfig.BASE_URL}`, {
        headers: new Headers({
          Authorization: 'Test ' + token
        })
      })
        .then((res) => res.text())
        .then((data) => {
          console.log("Print What Data",data)
          fetch(`${UrlConfig.BASE_URL}/income/addIncome`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: data,
              month: date,
              income:income,
              text:categorie,
              amount:outgoin,
  
            })
          })
            .then((response) => response.json())
            .then((response) => {
              console.log(response);
              alert('Your Income Added');
  
  
  
            })
            .catch(function(error) {
              console.log('There has been a problem with your fetch operation: ' + error.message);
               // ADD THIS THROW error
                throw error;
              });
        });
    };
  
    useEffect(async() =>{
      setTotal(gigs.reduce((total,gig) => total + Number(gig.outgoin),0));
      setBalance(() =>{
        const FullIncome = parseInt(test)
        const fullExpense = parseInt(total)
    
        const fullBalance = (FullIncome - fullExpense)
    
        setBalance(fullBalance)
      })
    },[gigs])
  


    return (
      <SafeAreaView style={style.container}>
         <ScrollView style={style.scrollView}>
        {/* <View > */}
            <StatusBar backgroundColor='#E3E7F1' barStyle="dark-content"/>
            <Animatable.View style={style.HeaderMainContain} animation='fadeInUpBig'>
                <View style={style.monthlyOverviewContainer}>
                <View style={style.detailsContainer}>
                        <View style={style.monthlyExpenseContainer1}>
                        <Text style={style.expenseTitle1}>Income</Text>
                        <Text style={style.expenseValue1}>${test}</Text>
                        </View>
                    </View>
                    <View style={style.detailsContainer}>
                        <View style={style.monthlyExpenseContainer}>
                        <Text style={style.expenseTitle}>Balance</Text>
                        <Text style={style.expenseValue}>${balance}</Text>
                        </View>
                    </View>
                    <View style={style.detailsContainer}>
                        <View style={style.monthlyExpenseContainer2}>
                        <Text style={style.expenseTitle2}>Expense</Text>
                        <Text style={style.expenseValue2}>${total}</Text>
                        </View>
                    </View>
                </View>
            </Animatable.View>
            <Animatable.View style={style.headerContainer} animation='bounceIn' duration={1500}>
            <Text style={{fontSize: 25, fontWeight: 'bold', color: '#414754', left: 20,top:5}}>Overview</Text>
            <Text style={style.fullName}>User Name</Text>

                <PieChart style={style.pieChart}
                    data={data}
                    width={screenWidth}
                    height={200}
                    doughnut={true}
                    chartConfig={chartConfig}
                    accessor={"value"}
                    backgroundColor={"transparent"}
                    coverRadius={0.45}
                    coverFill={'#FFF'}
                    absolute
                />
            </Animatable.View>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#414754', left: 20,top:5}}>All Transactions</Text>
            {gigs &&
		gigs.map((gig,i,t) => (
      <Card style={{padding: 7,marginBottom:10,marginLeft:20,marginTop:5}}>
      <Text style ={{marginLeft:140}} key={i}>{gig.categorie} {gig.outgoin} </Text>
      </Card>
			
      
		))
		}

            <Animatable.View style={styles.HeaderMainContain} animation='zoomInUp'>

            <Text style={styles.logo}>Add Income</Text>
            
            <TouchableOpacity rounded style={styles.loginBtn1} onPress={showDatepicker} >
            <Text style={styles.loginText1} >Add Date</Text>

              </TouchableOpacity>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                  
                />
              )}
    
            <View style={styles.inputView} >
              <TextInput  
                style={styles.inputText}
                placeholder="Income" 
                placeholderTextColor="#353b48"
                label="Income"
                value={income}
                onChangeText={(text) => setIncome(text)}

                />

            </View>

            <View style={styles.inputView} >
              <TextInput  
               
                style={styles.inputText}
                placeholder="Amount" 
                label="Outgoing"
                value={outgoin}
                placeholderTextColor="#353b48"
                onChangeText={(text) => setOutGoin(text)}
     
                />

            </View>

            <View style={styles.inputView} >
              <TextInput  
                style={styles.inputText}
                placeholder="Category" 
                placeholderTextColor="#353b48"
                value ={categorie}
                onChangeText={(text) => setcategorie(text)}
               
                />

            </View>


            <TouchableOpacity rounded style={styles.loginBtn}onPress={() => {
						getUserData();
					}} >

            <Text style={styles.loginText1} >Add Expense</Text>

              </TouchableOpacity>
              <TouchableOpacity rounded style={styles.loginBtn}onPress={() => {
               setTimeout(() => {
                alert('Added Your Income')
                  }, 1500); 
					}} >


            <Text style={styles.loginText1} >Add Income</Text>

              </TouchableOpacity>
    
            </Animatable.View>

       

            {/* <Animatable.View style={style.cardAppMain}> */}
                {/* <CategoryList /> */}
      {/* <FlatList style={style.cardRender}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 10,
          paddingBottom: 50,
        }}
        numColumns={2}
        data={plants}
        renderItem={({item}) => {
          return <Card plant={item} />;
        }}
      /> */}

      {/* </Animatable.View> */}
        {/* </View> */}
      </ScrollView>
        </SafeAreaView>
    );
};

const {width, height} = Dimensions.get('screen');

const style = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ecf0f1',
      alignItems: 'center',
      justifyContent: 'center',
      // paddingTop:,
    },
    cardAppMain:{
        backgroundColor: '#ffffff',
        width: 380,
        height: 400,
        marginTop: 350,
        bottom:330,
        borderRadius: 20,
        elevation: 5,
        shadowColor: '#4949a3',

        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        // marginBottom:10
    },
    headerContainer: {
        backgroundColor: '#ffffff',
        width: 380,
        height: 300,
        bottom:3,
        borderRadius: 30,
        elevation: 5,
        marginLeft:16,
        shadowColor: '#4949a3',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
    },
    userImage: {
        alignSelf: 'center',
        top: 20
    },
    fullName: {
        alignSelf: 'center',
        top: 20,
        fontWeight: 'bold',
        fontSize: 20,
        marginVertical:10
    },
    userName: {
        alignSelf: 'center',
        top: 20,
        color: 'grey',
        marginBottom:30
    },
    monthlyOverviewContainer: {
        width: '100%',
        height: 150,
        backgroundColor: '#10ac84',
        alignItems: 'center',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30
    },
    monthContainer: {
        width: '100%',
        height: 30,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    monthName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white'
    },
    detailsContainer: {
        position: 'absolute',
        width: '100%',
        height: 100,
        bottom: 30,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    monthlyIncomeContainer: {
        width: 100,
        height: '60%',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    incomeValue: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#f1c40f'
    },
    incomeTitle: {
        color: 'white',
        fontSize: 13,
        fontWeight: '100'
    },
    monthlyRevenueContainer: {
        width: 120,
        height: '80%',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    revenueValue: {
        fontWeight: 'bold',
        fontSize: 25,
        color: '#323432'
    },
    revenueTitle: {
        color: 'white',
        fontSize: 15,
    },
    monthlyExpenseContainer: {
        width: 100,
        height: '60%',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    monthlyExpenseContainer1: {
      width: 100,
      height: '60%',
     marginRight:250,
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      alignItems: 'center',
  },
  monthlyExpenseContainer2: {
    width: 100,
    height: '60%',
    marginLeft:250,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
},
    expenseValue: {
       
        fontWeight: 'bold',
        fontSize: 25,
        color: '#323432'
    },
    expenseValue1: {
       
      fontWeight: 'bold',
      fontSize: 20,
      color: '#323432'
  },
  expenseValue2: {
       
    fontWeight: 'bold',
    fontSize: 20,
    color: '#323432'
},
    expenseTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: '100'
    },
    expenseTitle1: {
      color: 'white',
      fontSize: 16,
      fontWeight: '100'
  },
  expenseTitle2: {
    color: 'white',
    fontSize: 16,
    fontWeight: '100'
},
    HeaderMainContain: {
        width: width,
        height: 120,
    },

      categoryTextSelected: {
        color: COLORS.green,
        paddingBottom: 5,
        borderBottomWidth: 2,
        borderColor: COLORS.green,
      },
      card: {
        height: 180,
        backgroundColor: COLORS.light,
        width:180,
        marginHorizontal: 2,
        borderRadius: 10,
        marginBottom: 20,
        padding: 15,
      },
      header: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      searchContainer: {
        height: 20,
        backgroundColor: COLORS.light,
        borderRadius: 10,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
      },
      input: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
        color: COLORS.dark,
      },
      scrollView: {
        backgroundColor: '#f5f6fa',
        // marginHorizontal: 20,
        width:"100%"
      },
 
});

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#ecf0f1',
      alignItems: 'center',
      justifyContent: 'center',

    },
    HeaderMainContain: {
      backgroundColor: '#ffffff',
      width: 412,
      height: 806,
      marginTop:0,
      bottom:0,
      borderRadius:15,
      // borderTopLeftRadius:80,
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
      marginBottom:20,
      marginTop:0,
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
    loginBtn1:{
      backgroundColor:'#d1d8e0',
      width:"80%",
      borderRadius:15,
      height:60,
      alignItems:"center",
      justifyContent:"center",
      marginTop:10,
      marginLeft:40,
      marginBottom:10
    },
})


const HomeStack = createStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator headerMode='none'>
      <HomeStack.Screen name='Home' component={HomeScreen} />
  </HomeStack.Navigator>
);

export default HomeStackScreen;