import React, { useState,useEffect} from 'react';
import {View,Text,StyleSheet,Image, TextInput, TouchableOpacity,Modal,Keyboard,KeyboardAvoidingView} from 'react-native';
import Header1 from './Header1';
import { StatusBar } from 'expo-status-bar';
import I18n from 'i18n-js';
import NetInfo from "@react-native-community/netinfo";
import * as firebase from 'firebase';
import syncStorage from 'sync-storage';

const address = (props) => {
    const [address,setaddress]=useState('');
    const [errormsg, seterrormsg] = useState('')
    const [link, setLink] = useState('Link')
    const [dialogContent, setDialogContent] = useState('')
    const [profile, setProfile] = useState('')
    const [modal, setModal] = useState(false)
    const [Height, setHeight] = useState(0);
    const [internet, setInternet] = useState(false)
    const [toggal, settoggal] = useState(false)
   
    const [keyboardStatus, setKeyboardStatus] = useState('Keyboard Hidden');
    const [modalVisible, setmodalVisible] = useState(false)

    useEffect(() => {
      const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
        setKeyboardStatus("Keyboard Shown");
      });
      const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
        setKeyboardStatus("Keyboard Hidden");
      });
        const unsubscribe = props.navigation.addListener('focus', () => {
           
          syncStorage.set('isBasket', false)
        
        //    setproduct(props.route.params.product) 
        //    setsimilarProducts(props.route.params.similarProducts)
        firebase.
        firestore()
       .collection('users_list')
       .doc(syncStorage.get('user_id'))
       .get()
       .then((data)=>{
           setaddress(data.data().addressofShop)
       
       })
       .catch(error=>alert(error))
      
     

   
   
           
    
    
          //  useScreens('ProductScreen');
       
          
        });
        const unsubscribeinternet = NetInfo.addEventListener(state => {
            console.log("Connection type____", state.type);
            
            console.log("Is connected___?", state.isConnected);
           setInternet(state.isConnected) 
          
          });
          return ()=>{
            unsubscribe
            unsubscribeinternet
            showSubscription.remove();
            hideSubscription.remove();
        }   
      }, [props.navigation]);
    
    return (
      <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      >
        <View style={styles.container}>
        {
                Platform.OS === 'android' && keyboardStatus === 'Keyboard Hidden' ?
            
            <View style={{ backgroundColor: '#005478', borderWidth: 5, borderColor: '#fff', borderRadius: 100, height: 50, width: 50, justifyContent: 'center', bottom:"-3.7%",position:"absolute", zIndex: 1,alignSelf:"center", elevation: 9}}>
           <TouchableOpacity onPress={() => this.props.navigation.navigate('Search')}   activeOpacity={1.0}>
            <Image style={{ height: 25, width: 25, alignSelf: 'center' }} source={require('../../assets/searchIcon.png')}></Image>
            </TouchableOpacity>
            </View>: null
}
                       <StatusBar backgroundColor="#005478" style={Platform.OS === "android" ? "light" : "dark"} />
                <View style={styles.section1}>

                <View style={{ alignSelf:'center', flexDirection: 'row'}}>
             <TouchableOpacity onPress={
                    () => {
                        props.navigation.goBack();
                    }
                }>
                    <View style={{ marginLeft: 20}}>
                    <Image style={{  height:30,width:30 }} source={require('../../assets/backArrow.png')}></Image>
                    </View>
                </TouchableOpacity>
             
                <View style={{ justifyContent:'center',alignItems:'center',alignContent:"center"}}>
             <Text style={{ fontSize: 21, width: 260, fontFamily: 'Montserrat'}}> {I18n.t('ShippingAddress')} </Text>   
          </View>
          </View>
            </View>
          
          
      <View style={styles.subContainer}>
<Text style={styles.title}> {I18n.t('addressavailable')}</Text>

{
           <View>
         
            <View style={{...styles.input,height:100}}>
                  <View style={{margin:8,width:'10%'}}>
                    <Image style={{height:20,width:20}}  source={require('../../assets/locationli.png')} />
                  </View>
                  <View style={{marginTop:7 , marginVertical: 10,width:'80%'}}>
             <TextInput  autoFocus = {true} style={{width:"100%"}}  multiline={true} numberOfLines={2}  placeholder={I18n.t('Address')} value={address} onChangeText={
                 (text)=>{
                     setaddress(text)
                 }
             }>
              
             </TextInput>
            </View>
          
            
           </View>
           <TouchableOpacity onPress={
  () => {
    firebase.
    firestore()
   .collection('users_list')
   .doc(syncStorage.get('user_id'))
   .update({
    addressofShop: address})
    .then(
      
        settoggal(false)
      
    )
   .catch(error=>alert(error))
  }
  }>
  <View style={styles.editButton}>
    <Text style={styles.editButtonText}>{I18n.t('saveaddress')}</Text>
  </View>
</TouchableOpacity>
                </View>
}
           </View>
        </View>
        </KeyboardAvoidingView>
    )
}

export default address


const styles=StyleSheet.create({
    container:{
        height:'100%',
        backgroundColor:'white',
    },
    subContainer:{
        alignSelf:'center',
     
  
        flex:1
      
    },
    title:{
        fontSize:15,
        alignSelf:'center',
        fontWeight:'bold',
        fontFamily:'Montserrat',
    },
    text:{
        alignSelf:'center',
        fontFamily:'Montserrat',
        fontSize:15,
        marginHorizontal:40
    },
    emailContainer:{
        flexDirection:'row',
        backgroundColor:'#F1F1F1',
        marginHorizontal:'15%',
        height:40,
        padding:10,
        marginTop:20,
        borderRadius:4
    },
    emailimgae:{
      marginRight:10  ,
      height:20,width:20
    },
    confirmBox:{
        backgroundColor:'#005478',
        marginHorizontal:'15%',
        marginTop:20,
        height:40,
        borderRadius:4,
        justifyContent:'center'
    }, input: {
        flexDirection: 'row',
    alignSelf:"center",
        backgroundColor: '#F1F1F1',
    width:"85%",
       
        borderRadius: 5,
        marginTop: 20,
    
      },
    confirmText:{
        color:'white',
        fontFamily:'Montserrat',
        alignSelf:'center',
        fontWeight:'bold'
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",

      position: 'absolute',
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      backgroundColor: 'rgba(100,100,100, 0.9)',
      padding: 20,

    },
    modalView: {
      height: 180,
      width:"85%",
      backgroundColor: "white",
      borderRadius: 20,
      paddingTop: 30,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
    
      height:30,
      width:80,
      borderRadius: 20,
      padding: 4,
      elevation: 2,
      alignContent:"center",
      alignItems:"center",
      marginTop:20,
      marginBottom:20
    
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#005478",
      width:70,
    },
    textStyle: {
      color: "white",
     
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },
    blurView:{
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
      },
      section1: {
        height: 70,
     
        marginTop: 25,
        alignItems:"center",
        flexDirection: 'row'
    
      },
      editButton: {
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#005478',
        height: 40,
        width: 170,
        borderRadius: 4,
        marginTop:40
      }, containernew: {
        height: '100%',
    
        justifyContent: 'center'
      },
      editButtonText: {
        justifyContent: 'center',
        alignSelf: 'center',
        color: 'white',
        fontFamily: 'Montserrat',
      },
})

