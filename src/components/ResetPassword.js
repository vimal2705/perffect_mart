import React,{useState} from 'react';
import {View,Text,StyleSheet,Image,TextInput,TouchableOpacity} from 'react-native';
import Header1 from './Header1';
const ResetPassowd=(props)=>{
    const [password,setPassword]=useState('');
    const [confirmPassword,setconfirmPassword]=useState('');
   
    return (
        
        <View style={styles.container}>
        <Header1 title={'Forgot Passwod'}  backArrowInclude={true} optionsInclude={false}  goBack={props}/>
        <View style={styles.subContainer}>
          <Text style={styles.title}>New Password</Text>
         <View style={{marginTop:20}}>
         <Text style={styles.text}>Please Select New Password</Text>
         
         </View>
         <View style={styles.emailContainer}>
          <View>
           <Image style={styles.emailimgae} source={require('../../assets/locklite.png')}></Image>
          </View>
          <View>
           <TextInput secureTextEntry={true} placeholder={'Password'} value={password} onChangeText={
               (text)=>{
                   setPassword(text)
               }
           }>
        
           </TextInput>
           

          </View>
        
         </View>
         <View style={styles.emailContainer}>
         <View>
          <Image style={styles.emailimgae} source={require('../../assets/locklite.png')}></Image>
         </View>
         <View>
          <TextInput placeholder={'Confirm Password'} value={confirmPassword} onChangeText={
              (text)=>{
                  setconfirmPassword(text)
              }
          }>
           
          </TextInput>
         </View>
        </View>
    
     
         <TouchableOpacity onPress={
            ()=>{
               
                props.navigation.navigate('ResetPassword');
            }
        }>
        <View style={styles.confirmBox}>
        <Text style={styles.confirmText}>Change Password</Text>
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
        fontSize:15,
        fontFamily:'Montserrat',
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
      marginRight:10  
    },
    confirmBox:{
        backgroundColor:'#444444',
        marginHorizontal:'15%',
        marginTop:20,
        height:40,
        borderRadius:4,
        justifyContent:'center'
    },
    confirmText:{
        color:'white',
        alignSelf:'center',
        fontWeight:'bold',
        fontFamily:'Montserrat',
    }
})
export default ResetPassowd