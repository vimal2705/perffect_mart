import React, { useState } from 'react';
import {View,Text,StyleSheet,Image, TextInput, TouchableOpacity,Modal} from 'react-native';
import Header1 from './Header1';
import { StatusBar } from 'expo-status-bar';
import I18n from 'i18n-js';
import * as firebase from 'firebase';
const ForgotPassword=(props)=>{
    const [email,setEmail]=useState('');
    const [errormsg, seterrormsg] = useState('')
    const [modalVisible, setmodalVisible] = useState(false)
    var actionCodeSettings = {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be in the authorized domains list in the Firebase Console.
        url: 'https://www.example.com/finishSignUp?cartId=1234',
        // This must be true.
        handleCodeInApp: true,
        iOS: {
          bundleId: 'com.example.ios'
        },
        android: {
          packageName: 'com.example.android',
          installApp: true,
          minimumVersion: '12'
        },
        dynamicLinkDomain: 'example.page.link'
      };
    return (
        <View style={styles.container}>
                   <StatusBar backgroundColor="#005478" style={Platform.OS === "android" ? "light" : "dark"} />
          
            <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
         
         setmodalVisible(false)
        }}
        style={{alignSelf:'center',backgroundColor:"#fff"}}
      >
        <View style={styles.centeredView}>
  
          <View style={styles.modalView}>

            
              {errormsg === "checkemail" ?  
              <View style={{flex:1,flexWrap:"wrap",flexDirection:"row",justifyContent:"center",position:"absolute",left:30,top:30}}>
               <Text style={{fontSize:18,justifyContent:"flex-end",paddingTop:2 ,marginLeft:10}}>{I18n.t('linksend')}</Text>
               
          </View>
               : 
               <View style={{flex:1,flexWrap:"wrap",flexDirection:"row",justifyContent:"center",position:"absolute",left:30,top:30}}>
                        <Image  tintColor='#005478' source={require('../../assets/warning.png')} style={{height:35,width:35,justifyContent:"center"}}/>
                        <Text style={{fontSize:18,justifyContent:"flex-end",paddingTop:5 ,marginLeft:10}}>{I18n.t('invaildcredentails')}</Text>
                        </View>
              }

          <TouchableOpacity  style={{position:"absolute",right:10,top:10}} onPress={() =>   setmodalVisible(false)}>
          <Image source={require('../../assets/close.png')} style={{height:30,width:30}} />
          </TouchableOpacity>
          <View  style={{height:100}}>
    
     


                            
                          </View>
                          <View style={{alignContent:"center",alignItems:"center"}}>
                            {errormsg === "auth/invalid-email"? <Text style={{fontSize:13,marginTop:-40}}>{I18n.t('invaildemail')}</Text>:errormsg === "auth/user-not-found"? <Text style={{fontSize:13,marginTop:-40}}>{I18n.t('wrongemail')}</Text>:errormsg === "checkemail"?  <Text style={{fontSize:13,marginTop:-40}}>{I18n.t('pleasecheckyouremail')}</Text>:<Text style={{fontSize:13,marginTop:-40}}>{errormsg}</Text>}
                         
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() =>  setmodalVisible(false)}
             
             
            >
          <Text style={{color:"#fff"}}>{I18n.t('okay')}</Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
          <Header1 title={I18n.t('forgotPassword')}  backArrowInclude={true} optionsInclude={false}  goBack={props} navigation={props.navigation}/>
          <View style={styles.subContainer}>
            <Text style={styles.title}>{I18n.t('forgotPassword')}?</Text>
           <View style={{marginTop:20}}>
           <Text numberOfLines={2} style={styles.text}>{I18n.t('pleaseenteremailtoconfirm')}?</Text>
           {/* <Text style={styles.text}> code to set a new password.</Text> */}
           </View>
           <View style={styles.emailContainer}>
            <View>
             <Image style={styles.emailimgae} source={require('../../assets/email.png')}></Image>
            </View>
            <View>
             <TextInput placeholder={I18n.t('Email')} value={email} onChangeText={
                 (text)=>{
                     setEmail(text)
                 }
             }>
              
             </TextInput>
            </View>
           </View>
          <TouchableOpacity onPress={
              ()=>{
                firebase.auth().sendPasswordResetEmail(email)
                .then(function (user) {
                  
                  seterrormsg('checkemail')
                  setmodalVisible(true)
                  
                }).catch( (error) => 
            
                //  function(error) {
                    // Handle Errors here.
                
                      {
                    var errorCode = error.code;
                
                   seterrormsg(errorCode)
                    setmodalVisible(true)
                  }
                  

                )
                 
             
              }
          }>
          <View style={styles.confirmBox}>
          <Text style={styles.confirmText}>{I18n.t('confirmemail')}</Text>
         </View>
          </TouchableOpacity>
           </View>
        </View>
    )
}
const styles=StyleSheet.create({
    container:{
        height:'100%',
        backgroundColor:'white',
    },
    subContainer:{
        alignSelf:'center',
     
        justifyContent:'center',
        flex:1
      
    },
    title:{
        fontSize:20,
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
      }
})
export default ForgotPassword