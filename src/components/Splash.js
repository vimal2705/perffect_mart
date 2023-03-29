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



class Splash extends React.Component {
    // create a helper function to load the font 
       constructor(){
        super()
        this.state={
            connnection:false,
            fontsLoaded: false,
        }
      
    
       

        // i18n.locale = 'gu';

        // // When a value is missing from a language it'll fallback to another language with the key present.

        // i18n.fallbacks = true;
       

      
    }
  
    getData = async () => {
      
          const value = await AsyncStorage.getItem('@storage_Key')
          console.log("DEF: ",value);
          if(value === 'hi') {
            i18n.locale = 'hi';
    
            i18n.translations = library;
          }
          else if (value === 'gu') {
            i18n.locale = 'gu';
            i18n.translations = library;
          }
          else{
            i18n.locale = 'en';
            i18n.translations = library;
          }
      

        
      }
   
  //  async loadFonts() {
       
  //       await Font.loadAsync({
  //         // Load a font `Montserrat` from a static resource

  //   'Montserrat': require('../../assets/font/Poppins-Bold.otf'),
    
  //         // Any string can be used as the fontFamily name. Here we use an object to provide more control

  //        } )
  //        this.setState({ fontsLoaded: true });
  //     }
  componentDidMount() {
  
    
    firebase.auth().onAuthStateChanged(user => {
    if (user !== null){
        syncStorage.set('user_id', user.uid)
        firebase.firestore()
        .collection('users_list')
        .doc(syncStorage.get('user_id'))
        .get()
        .then((snapShot) => {
         syncStorage.set("userName",snapShot.data().userName)
        })
     
    }
    this.props.navigation.replace(user ? 'TabBarNavigation' : 'SignIn')


})


}
    
    render() {


 
          // from the custom App we return the component we assigned to RootApp.
          return (
            //   <Text style={{marginTop:300,fontFamily:'Montserrat'}}>HEllodfhihdfhgdfhg7haaaaaaaaaaaaaaaaaaaa</Text>
           <View style={{height:'100%',backgroundColor:'white',alignContent:"center",justifyContent:"center"}}>
             
                {/* <Image style={{height:100,width:100,alignSelf:"center"}} source={require('./../../assets/loader.gif')}/> */}
                 <Text style={{alignSelf:'center'}}></Text>
           {/* <View style={styles.container}>
           
           <View style={{flex:0.8,marginTop:200,alignSelf:'center',}}>
      
           <SvgComponent  style={{alignSelf:'center',marginTop:'100%'}} />
           </View>
          <View >
          <Text style={{alignSelf:'center',fontFamily:'Montserrat'}}>Powered By</Text>
          <Text style={{alignSelf:'center',fontFamily:'Montserrat'}} >Perffect Digital Mart</Text>
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
export default Splash