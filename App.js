
import React,{useEffect} from 'react';
import { StyleSheet, Text, View, Image, Platform, ActivityIndicator } from 'react-native';
import { getFocusedRouteNameFromRoute, NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import SignUpScreen from './src/components/SignUpScreen';
import SignInScreen from './src/components/SignInScreen';
import OtpScreen from './src/components/OtpScreen';
import RegisterTemporaryScreen from './src/components/RegisterTemporaryFile';
import Dashboard from './src/components/DashboardScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WishList from './src/components/WishList';
import BasketScreen from './src/components/BasketScreen';
import Profile from './src/components/Profile';
import searchScreen from './src/components/SearchScreen';
import AllCategoriesScreen from './src/components/AllCategoriesScreen';
import AllProductsScreen from './src/components/AllProductsScreen';
import ProductScreen from './src/components/ProductScreen';
import OrderSummary from './src/components/OrderSummary';
import OrderConfirmScreen from "./src/components/orderConfirmScreen";
import Splash from "./src/components/Splash";
import { Provider } from 'react-redux';
import configureStore from './src/store/configStore';
import configStore from './src/store/configStore';
import EditProfile from './src/components/EditProfile';
import privacy from './src/components/privacy';
import OngoingOrder from './src/components/OngoingOrder';
import tempCodeRunnerFile from './src/components/PastOrder';
import * as firebase from 'firebase';
import DeliverStatus from './src/components/DeliveryStatus';
import ForgotPassword from './src/components/ForgotPassword';
import PastOrder from './src/components/PastOrder';
import ResetPassowd from './src/components/ResetPassword';
import syncStorage from 'sync-storage';
import OrderDetailes from './src/components/orderDetailes';
import status from "./src/components/status"
import OrderStausOptions from './src/components/deliverStatusOptions';
import { useFonts } from 'expo-font';

import Notifications from './src/components/notifications';
import ChangeLanguage from './src/components/changeLanguage';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import termofuse from './src/components/termofuse';
import FAQs from './src/components/FAQs';
import { DrawerContent } from './src/components/drawerContent';
import { TouchableOpacity } from 'react-native';
import I18n from 'i18n-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import library from './src/components/library';

import { AppLoading } from "expo";
import { enableScreens } from 'react-native-screens';
import address from './src/components/address';
import Splashscreen from './src/components/splashscreen';
import splashscreen from './src/components/splashscreen';

const firebaseConfig = {
  apiKey: "AIzaSyD_2NIuxDoVnCxWTOrP8pq16MFho4Nl6VM",
  authDomain: "perfect-mart.firebaseapp.com",
  projectId: "perfect-mart",
  storageBucket: "perfect-mart.appspot.com",
  messagingSenderId: "68570693732",
  appId: "1:68570693732:web:a0077602bee94cd6a3df71",
  measurementId: "G-9N3RJV08V5"
};



if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {

  firebase.app(); // if already initialized, use that one
}
function getTab() {

  return tabNavigator
}


function ProductStack() {


  return (
   
    <Stack.Navigator
      initialRouteName="Dashboard" detachInactiveScreens>
      <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }}  />
      <Stack.Screen name="AllcategoriesScreen" component={AllCategoriesScreen} options={{ headerShown: false }} />
      <Stack.Screen name="AllProductsScreen" component={AllProductsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ProductScreen" component={ProductScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Notifications" component={Notifications} options={{ headerShown: false }} />
      <Stack.Screen name="OrderDetailes" component={OrderDetailes} options={{ headerShown: false }} />
      <Stack.Screen name="status" component={status} options={{ headerShown: false }} />
      <Stack.Screen name="OrderHistory" component={orderHistory} options={{ headerShown: false }} />

    </Stack.Navigator>

  )
}
function basketStack() {


  return (
    <Stack.Navigator
      initialRouteName={'BasketScreen'}>
      <Stack.Screen name="BasketScreen" component={BasketScreen} options={{ headerShown: false }} />
      <Stack.Screen name="OrderSummary" component={OrderSummary} options={{ headerShown: false }} />
      <Stack.Screen name="OrderConfirmScreen" component={OrderConfirmScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}
function profileStack() {
  return (
    <Stack.Navigator
      initialRouteName={'Profile'}>
      <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
      <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />
      <Stack.Screen name="OrderDetailes" component={OrderDetailes} options={{ headerShown: false }} />
      <Stack.Screen name="DeliverStatus" component={DeliverStatus} options={{ headerShown: false }} />
      <Stack.Screen name="ProductScreen" component={ProductScreen} options={{ headerShown: false }} />
      <Stack.Screen name="OrderStatusOptions" component={OrderStausOptions} options={{ headerShown: false }} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
      <Stack.Screen name="ResetPassword" component={ResetPassowd} options={{ headerShown: false }} />
<Stack.Screen name="address" component={address} options={{headerShown:false}}/>
    </Stack.Navigator>
  )
}


function orderHistory() {
  return (
    <Stack.Navigator  >
      <Stack.Screen name={I18n.t('orderhistory')} component={toptabs} options={{ headerTransparent: true,headerTitleAlign:"left" }} />
      <Stack.Screen name="OrderDetailes" component={OrderDetailes} options={{ headerShown: false }} />
      <Stack.Screen name="status" component={status} options={{ headerShown: false }} />

    </Stack.Navigator>
  )
}
function searchscr() {
  return (
    <Stack.Navigator  
     >
      <Stack.Screen name="Search" component={searchScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ProductScreen" component={ProductScreen} options={{ headerShown: false }} />


    </Stack.Navigator>
  )
}
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const TopTab = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();
function drawer() {
  return (
    <Drawer.Navigator drawerPosition="right" drawerStyle={{ width: "70%" }} drawerContent={props => <DrawerContent {...props} />} >
      <Drawer.Screen name="drawer" component={getTab} />
      <Drawer.Screen name="AllCategoriesScreen" component={AllCategoriesScreen} />
      <Drawer.Screen name="yourorder" component={toptabs} />
      <Drawer.Screen name="EditProfile" component={EditProfile} />
      <Drawer.Screen name="privacy" component={privacy} />
      <Drawer.Screen name="termofuse" component={termofuse} />
      <Drawer.Screen name="FAQs" component={FAQs} />
      <Drawer.Screen name="ChangeLanguage " component={ChangeLanguage} />
      {/* <Drawer.Screen name=" " component={} />
    <Drawer.Screen name=" " component={} /> */}
    </Drawer.Navigator>
  )
}
function toptabs() {
  return (

    <TopTab.Navigator tabBarOptions={{
      labelStyle: {
        marginTop: 80
      },
    }} >
      <TopTab.Screen name={I18n.t('ongoingorder')} component={OngoingOrder}  />
      <TopTab.Screen name={I18n.t('pastorder')} component={PastOrder} />
    </TopTab.Navigator>
  );
}

let tabNavigator = (
 

  <Tab.Navigator
    initialRouteName="Dashboard"

  
    tabBarOptions={

      {

    tabBarHideOnKeyboard:true,
keyboardHidesTabBar:true,
        showLabel: false, 
        
        style: Platform.OS === 'ios' ? {
          height: "7%",
          display: 'flex',
          backgroundColor: '#005478',
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,



        } : {
        
          height: "7%",
          display:"flex",

            backgroundColor: '#005478',
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
        
            elevation:19,
            zIndex:1
        
          }
           
      }
    }
  >
    <Tab.Screen
  
      name='Dashboard'
      component={ProductStack}
      options={{
        
        tabBarVisible: true,
        tabBarIcon: ({ focused, color, size }) =>
          <View>
            <Image style={{ height: 30, width: 30, marginTop: 10 }} source={require('./assets/homeIcon.png')}></Image>
          </View>

      }}
    />
    <Tab.Screen
      name='WishList'

      component={WishList}
      options={{
        tabBarIcon: ({ focused, color, size }) =>
          <View>
            <Image style={{ height: 30, width: 30, alignSelf: 'center', marginTop: 10 ,}} source={require('./assets/WishListIcon.png')}></Image>
          </View>
          

      }}
    />
    <Tab.Screen
      name='Search'
    
      component={searchscr}
      options={{
        keyboardHidesTabBar: true ,
         tabBarIcon :
        
        // ({forced}) => (
        //   <Image style={{ height: 25, width: 25, alignSelf: 'center' }} source={require('./assets/searchIcon.png')}></Image>
        // ),
        
      
        // tabBarButton:
        // (props) =>(
        //   <Custombutton {...props} />
        // )
        (navi) => {
          const nav = { navigator }
          const result = syncStorage.get('isBasket')
          console.log('---ffa>',syncStorage.get('isBasket'));
          return (
        

            <View style={result === true?  {backgroundColor: '#005478', borderWidth: 5, borderColor: '#fff', borderRadius: 100, height: 50, width: 50, justifyContent: 'center', top: 50,position:"absolute"}: { backgroundColor: '#005478', borderWidth: 5, borderColor: '#fff', borderRadius: 100, height: 50, width: 50, justifyContent: 'center',top:-25, 
            elevation: 9,zIndex:1000,
            
            }}>
              <Image style={{ height: 25, width: 25, alignSelf: 'center' }} source={require('./assets/searchIcon.png')}></Image>
            </View>
          )
        }
      }}
    />
    <Tab.Screen
      name='BasketScreen'
      component={basketStack}
      
      options={{

        tabBarVisible: false,
        
        
        tabBarIcon: ({ focused, color, size }) =>
          <View>
            <Image style={{ height: 30, width: 30, marginTop: 10 }} source={require('./assets/basketIcon.png')}></Image>
          </View>
      }}
    />
    <Tab.Screen
      name='Profile'
      component={profileStack}
      options={{
        tabBarIcon: ({ focused, color, size }) =>
          <View>
            <Image style={{ height: 30, width: 30, marginTop: 10 }} source={require('./assets/bottomprofile.png')}></Image>
          </View>

      }}
    />
  </Tab.Navigator>
)


const store = configStore()
//  const state=store.getState()
//  console.log("storeData",state)

// const customFonts = [{
//   Montserrat: require('./assets/font/Poppins-Regular.ttf'),
//   MontserratBold: require('./assets/font/Poppins-Bold.ttf'),
//   MontserratSemiBold: require('./assets/font/Poppins-SemiBold.ttf'),
// }];

const App = (props) => {
// export default function App (props) {
  // syncStorage.set('isBasket', false)
  // getData()
var usser = ''
  
 const getData = async () => {
      
    const value = await AsyncStorage.getItem('@storage_Key')
    console.log("DEF: ",value);
    if(value === 'hi') {
      I18n.locale = 'hi';

      I18n.translations = library;
    }
    else if (value === 'gu') {
      I18n.locale = 'gu';
      I18n.translations = library;
    }
    else{
      I18n.locale = 'en';
      I18n.translations = library;
    }


  
}
  useEffect(() => {
 getData()
 syncStorage.set('isBasket', false)
 console.log('bg',loaded);

  // auth()  
// console.log('sss',syncStorage.get('user_id'));
// const usser = syncStorage.get('user_id')
  }, [])

enableScreens()


const [loaded] = useFonts({
  Montserrat: require('./assets/font/Poppins-Regular.ttf'),
  MontserratBold: require('./assets/font/Poppins-Bold.ttf'),
  MontserratSemiBold: require('./assets/font/Poppins-SemiBold.ttf'),

});

    // this.props.navigation.replace(user ? 'TabBarNavigation' : 'SignIn')



  //    async loadFonts() {

//         await Font.loadAsync({
//           // Load a font `Montserrat` from a static resource
//      Montserrat: require('../../assets/font/Poppins-Bold.ttf'),
    
//           // Any string can be used as the fontFamily name. Here we use an object to provide more control

//          } )
//         //  this.setState({ fontsLoaded: true });
//       }


  if (!loaded) {
    return <Splashscreen/>
  }


  return (

   
    // <Text style={{marginTop:400,fontFamily:'Montserrat'}}> Dhruv Patel Here...</Text>  

    <NavigationContainer >
 
      <Stack.Navigator >
           <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
         <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
         <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
    <Stack.Screen name="TabBarNavigation" component={drawer} options={{ headerShown: false }}  />
        <Stack.Screen name="ChangeLanguage" component={ChangeLanguage} options={{ headerShown: false }} />
        <Stack.Screen name="RegisterTemporaryScreen" component={RegisterTemporaryScreen} options={{ headerShown: false }} />
           </Stack.Navigator>
       
        {/* <Stack.Navigator  >
          
      {!loaded && usser === 'null' ? 
        <Stack.Screen name='Splash' component={Splash} options={{ headerShown: false }} />:
        <>
       
         <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
           <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
           <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
          
          <Stack.Screen name="TabBarNavigation" component={drawer} options={{ headerShown: false }}  />
          <Stack.Screen name="ChangeLanguage" component={ChangeLanguage} options={{ headerShown: false }} />
          <Stack.Screen name="RegisterTemporaryScreen" component={RegisterTemporaryScreen} options={{ headerShown: false }} />
          </>
      }
        </Stack.Navigator> */}


    </NavigationContainer>


  );

}
export default  App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  bottomBarStyle: {


  }
});