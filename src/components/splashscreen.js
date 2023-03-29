import React from 'react';
import { View, Text, StyleSheet, Image,Platform ,ActivityIndicator} from 'react-native';
import * as firebase from 'firebase';
import syncStorage from 'sync-storage';
import * as Font from "expo-font";
import SvgComponent from "../assets/svgComponents"


import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18n-js';
import library from './library';



class splashscreen extends React.Component {
 
    
   
 
    
    render() {


 
          // from the custom App we return the component we assigned to RootApp.
          return (
            //   <Text style={{marginTop:300,fontFamily:'Montserrat'}}>HEllodfhihdfhgdfhg7haaaaaaaaaaaaaaaaaaaa</Text>
            <View style={{height:'100%',backgroundColor:'white',alignContent:"center",justifyContent:"center"}}>
                 <Image style={{height:100,width:100,alignSelf:"center"}} source={require('./../../assets/loader.gif')}/>
                 <Text style={{alignSelf:'center'}}>loading</Text>
           {/* <View style={styles.container}>
           
           <View style={{flex:0.8,marginTop:186,alignSelf:'center',}}>
      
           <SvgComponent  style={{alignSelf:'center',marginTop:'100%'}} />
           </View>
          <View >
          <Text style={{alignSelf:'center'}}>Powered By</Text>
          <Text style={{alignSelf:'center'}} >Perffect Digital Mart</Text>
          </View>

       </View> */}
        
       
           </View>
           
        )
        
      }
    }

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'white',
       
        
        
    }
})
export default splashscreen