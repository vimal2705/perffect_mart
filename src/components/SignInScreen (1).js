import React, { useState } from 'react'
import {Text,StyleSheet,View,Image, TextInput, Button, TouchableOpacity,Touchable, ScrollView,ActivityIndicator,SafeAreaView,Dimensions,wind} from 'react-native';
import * as firebase from 'firebase';
import {connect} from "react-redux";
import {verifyUser} from "../actions/userActions";
import NetInfo from "@react-native-community/netinfo";
import syncStorage from 'sync-storage';
import { StatusBar } from 'expo-status-bar';

// const SignInScreen = () => {
//   const [email, setemail] = useState('')
//   const [password, setpassword] = useState('')
//   const [country] = useState('India')
//   const [eye, seteye] = useState(false)
//   const [internet,setInternet]=useState(false);
//   const [error, seterror] = useState('')
//   const [isLoading, setisLoading] = useState(false)
// }
const windowsheight = Dimensions.get('window').height
class SignInScreen extends React.Component{
  constructor(){
    super();
    this.state={
      email:'',
      country:'India',
      password:'',
      eye:false,
      internet:false,
      error:'',
      isLoading:false
    } 
  }
componentDidMount(){
  this.unsubscribe = NetInfo.addEventListener(state => {
    console.log("Connection type____", state.type);
    this.setState({internet:state.isConnected})
    console.log("Is connected___?", state.isConnected);
  
    
    
  });
}
componentWillUnmount(){
  this.unsubscribe()
}
  render(){
    return (
  
       <View style={{flex:1,height:Dimensions.get('window').height,width:Dimensions.get('window').width}}>
          <ScrollView style={{flex:1,height:Dimensions.get('window').height,width:Dimensions.get('window').width}}>
       {
         this.state.isLoading?<ActivityIndicator
         style={{
           height:'100%',
             justifyContent: 'center',
             alignItems: 'center',
         }}
         visible={this.state.isLoading}
         animating={this.state.isLoading}
         color="black"
         size="large"
     />:
     <View style={{backgroundColor:'white',height:Dimensions.get('screen').height,width:Dimensions.get('window').width}}>
       
            <StatusBar backgroundColor="#005478" style="light" />
       <ScrollView contentContainerStyle={{ flex: 1 }} >
        
            <View style={{ height:windowsheight/20,borderBottomLeftRadius:10,borderBottomRightRadius:10, backgroundColor: '#005478' }}>
              </View>
           <View style={{justifyContent:'center'}}>
          
               <View style={{justifyContent:'center'}}  >
                
               <View style={{height:80,width:250,alignSelf:'center',marginTop:"20%"}}>
                 <Image  style= {styles.logo} source={require('../../assets/logo.png')}/> 
               </View>
                 <View style={styles.centerContainer }>
                   <View 
                   style={{flexDirection:'row'}}>
                   
                    <View style={styles.underLineActive}>
                    <Text style={styles.titleTextActive}>Sign In</Text>
                   </View>
                  <TouchableOpacity style={styles.underLineInactive} onPress={
                    ()=>{
                      this.props.navigation.navigate('SignUp')
                    }
                  }>
                  <View >
                  <Text style={styles.titleTextInActive}> Sign Up</Text>
                  </View>
                  </TouchableOpacity>
                    
                   </View>
                   
                   <View style={styles.input}>
                   <View style={styles.inputIconcontainer}>
                      <Image style={{height:20,width:20}} source={require('../../assets/email.png')}/>
                   </View>
                   <View style ={styles.textImput}>
                      <TextInput keyboardType={'email-address'}  style={{fontSize:12,color:'#444444',width:'100%'}} maxLength={60} placeholder={'Email'}  value={this.state.email} onChangeText={(text)=>{
                       
                       this.setState({
                         email:text
                        })
                      }}></TextInput>
                   </View>
                 </View>
            
               
                 <View style={styles.input}>
                 <View style={styles.inputIconcontainer}>
                    <Image style={{height:20,width:20}}  source={require('../../assets/profile.png')}/>
                 </View>
                 <View style={{flexDirection:'row'}}>
                 <View style={styles.textImput}>
                 <TextInput secureTextEntry={!this.state.eye?true:false}  style={{fontSize:12,color:'#444444'}} placeholder={'Password'} maxLength={40} value={this.state.password} onChangeText={(text)=>{
                  
                  this.setState({
                    password:text
                   })
                 }}></TextInput>
              </View>
               <View>
                <TouchableOpacity onPress={()=>{
                        
                 this.setState({eye:!this.state.eye})
                 
               }}>
               <Image style={{height:20,width:20,marginTop:'50%'}} source={this.state.eye?require('../../assets/openEye.png'):require('../../assets/closeEye.png')}></Image>
                </TouchableOpacity>
               </View>
                 </View>
               </View>
          
              {
                this.state.error===''?null:<View>
                 <Text style={{fontFamily:'Montserrat',alignSelf:'center',color:'red',marginTop:"20%"}}>{this.state.error}</Text>
                </View>
              }
              <View>
              
                 <TouchableOpacity style={styles.submitButton}   onPress={
              ()=>{
               
                if(this.state.email===''){
                  this.setState({error:"Please Enter Email"})
                  
                }
                else if(this.state.password===''){1
                  this.setState({error:'Please Enter Password'})
                }
                else if(!this.state.internet){
                  alert('No Internet Connection \n Please Try Again later')
                }
                else
                  this.setState({isLoading:true})
                  this.props.dispatch(verifyUser([this.state,this.props.navigation]))
              
              }
            }>
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
               </View>     
             
             </View>
             
            <View style={{flex:1,alignSelf:"flex-end",marginRight:40}}>
          <TouchableOpacity onPress={() =>  this.props.navigation.navigate('ForgetPassword')}>
            <Text>
              Forget Password?
            </Text>
          </TouchableOpacity>
              </View>
      
            
              
              
            
               </View>
            
                 <View>
              
                 </View>
                 
              </View>
         
        
          
              </ScrollView>
              <View style={{justifyContent:'center',flexDirection:'row',marginBottom:10}}>
                <Text style={{fontFamily:'Montserrat',fontSize:10}}>
                 Don't Have Account ?
                </Text>
             
               <TouchableOpacity onPress={
                 ()=>{
   
                   this.props.navigation.replace('SignUp')
                 
                 }
               } style={{borderBottomWidth:1,borderBottomColor:'#005478'}}>
               <Text style={{fontFamily:'MontserratSemiBold',color:'#005478',fontWeight:'bold',fontSize:10}}>
               Sign Up
              </Text>
               </TouchableOpacity>
               </View>  
              <View style={{ height: "8%",borderTopLeftRadius:10,borderTopRightRadius:10, backgroundColor: '#005478',marginBottom:-19}}>
              </View>
        </View>
         
       }
       
       </ScrollView>
   </View>
   

     )
  }
}
const styles=StyleSheet.create({
     top:{
         height:'7%',
         width:'100%',
         backgroundColor:'#333333',
         borderBottomRightRadius:10,
         borderBottomLeftRadius:10,
         alignSelf:'flex-start'
     },
     bottom:{
        height:'7%',
        width:'100%',
        backgroundColor:'#333333',
        borderTopRightRadius:10,
        borderTopLeftRadius:10,
        justifyContent:'flex-end'  
     },
     logo:{
       flex:1,
       width:null,
       height:null,
       resizeMode:'contain'
     },
     centerContainer:{
     
         width:'80%',
         
         alignSelf:'center',
      
         paddingHorizontal:40,
         paddingVertical:20,
         borderRadius:10,
         backgroundColor:'#fff',
      shadowColor: "#2222",
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation:15,
      shadowOffset: {
        height: 1,
        width: 1
      },
         marginBottom:10,
     
     },
     centerContainerTitle:{
       justifyContent:'space-between',
       
         
     },
     titleTextActive:{
         fontSize:20,
         color:'#005478',
         padding:10,
         
         fontFamily:'MontserratBold'
         
     },
     titleTextInActive:{
        fontSize:20,
        color:'#BABABA',
        marginLeft:15,
    marginTop:10,
        fontFamily:'MontserratBold'
        
    },
     underLineActive:{
        borderBottomColor:'#005478',borderBottomWidth:3,width:'50%',fontFamily:'Montserrat',
     }
     ,underLineInactive:{
        borderBottomColor:'#BABABA',borderBottomWidth:3,width:'50%',fontFamily:'Montserrat',
     },
     inputIconcontainer:{
       width:'10%',
      justifyContent:'center',
      margin:5
     },
     input:{
       flexDirection:'row',
       
       backgroundColor:'#F1F1F1',
      
       height:42,
       borderRadius:5,
       marginTop:20
      },
      textImput:{
        marginVertical:10,
        justifyContent:'center',
        width:'80%',
        
        
        
      },
      submitButton:{
        height:42,
        backgroundColor:'#005478',
        marginTop:20,
        borderRadius:5,
        justifyContent:'center'
      },
      buttonText:{
        color:'white',
        fontSize:15,
        alignSelf:'center',
        fontFamily:'Montserrat',
      }
    
})
export default connect()(SignInScreen)