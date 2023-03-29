import React, { useState } from 'react'
import {Text,StyleSheet,View,Image, TextInput,  TouchableOpacity, KeyboardAvoidingView,ScrollView,ActivityIndicator,Dimensions,Modal, Platform, PixelRatio } from 'react-native';
import * as firebase from 'firebase';
// import { connect } from "react-redux";
import { verifyUser } from "../actions/userActions";
import NetInfo from "@react-native-community/netinfo";
import syncStorage from 'sync-storage';
import { StatusBar } from 'expo-status-bar';
import i18n from 'i18n-js';
import SvgComponent from "../assets/svgComponents"
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
class SignInScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      country: 'India',
      password: '',
      eye: false,
      internet: false,
      error: '',
      errormsg:"",
      modalVisible:false,
      isLoading: false,
      loader: '1'
    }
  }
  componentDidMount() {
  
    this._focusa = this.props.navigation.addListener('focus', () => {
      firebase.auth().onAuthStateChanged(user => {
        if (user !== null){
      
          this.setState({loader:'1'})
          this.props.navigation.replace('TabBarNavigation')
          console.log('user',user);
            syncStorage.set('user_id', user.uid)
            firebase.firestore()
            .collection('users_list')
            .doc(syncStorage.get('user_id'))
            .get()
            .then((snapShot) => {
             syncStorage.set("userName",snapShot.data().userName)
             
            })
        }
        else{
        this.setState({loader:'2'})
        }
       
      })
    });
   

    this.unsubscribe = NetInfo.addEventListener(state => {
      console.log("Connection type____", state.type);
      this.setState({ internet: state.isConnected })
      console.log("Is connected___?", state.isConnected);



    });
  }
  componentWillUnmount() {
    // this._focusa()
    this.unsubscribe()

    
  }
  render() {
    if (this.state.loader !== '1') {
        return (
      
      <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      >
      <View style={{ flex: 1, height: Dimensions.get('window').height, width: Dimensions.get('window').width }}>
        <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
         
          this.props.navigation.replace('SignIn')
        }}
        style={{alignSelf:'center',backgroundColor:"#fff"}}
      >
        <View style={styles.centeredView}>
  
          <View style={styles.modalView}>

            <View style={{flex:1,flexWrap:"wrap",flexDirection:"row",justifyContent:"center",position:"absolute",left:30,top:30}}>
          <Image  tintColor='#005478' source={require('../../assets/warning.png')} style={{height:35,width:35,justifyContent:"center"}}/>
          <Text style={{fontSize:18,justifyContent:"flex-end",paddingTop:5 ,marginLeft:10}}>{i18n.t('invaildcredentails')}</Text>
          </View>
          <TouchableOpacity  style={{position:"absolute",right:10,top:10}} onPress={() =>  this.props.navigation.replace('SignIn')}>
          <Image source={require('../../assets/close.png')} style={{height:30,width:30}} />
          </TouchableOpacity>
          <View  style={{height:100}}>
    
                          </View>
                          <View style={{alignContent:"center",alignItems:"center"}}>
                            {this.state.errormsg === "auth/wrong-password"? <Text style={{fontSize:13,marginTop:-40}}>{i18n.t('wrongpassword')}</Text>:this.state.errormsg === "auth/user-not-found"? <Text style={{fontSize:13,marginTop:-40}}>{i18n.t('wrongemail')}</Text>: <Text style={{fontSize:13,marginTop:-40}}>{this.state.errormsg}</Text>}
                         
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() =>  this.props.navigation.replace('SignIn')}
             
             
            >
          <Text style={{color:"#fff"}}>{i18n.t('okay')}</Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
         {
            this.state.isLoading ? <ActivityIndicator
              style={{
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              visible={this.state.isLoading}
              animating={this.state.isLoading}
              color="black"
              size="large"
            /> :null}
        <ScrollView style={{ flex: 1, height: Dimensions.get('window').height, width: Dimensions.get('window').width }}>
         
              <View style={{ backgroundColor: 'white', height: Dimensions.get('screen').height, width: Dimensions.get('window').width }}>

              <StatusBar backgroundColor="#005478" style={Platform.OS === "android" ? "light" : "dark"} />
                <ScrollView contentContainerStyle={{ flex: 1 }} >

                  <View style={{ height: windowsheight / 20, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, backgroundColor: '#005478' }}>
                  </View>
                  <View style={{ justifyContent: 'center' }}>

                    <View style={{ justifyContent: 'center' }}  >


                      <View style={{ height: 80, width: 250, alignSelf: 'center', marginTop: "12%" ,marginLeft:-40}}>
                      <SvgComponent />
                      </View>
                      <View style={styles.centerContainer}>
                        <View
                          style={{ flexDirection: 'row' }}>

                          <View style={styles.underLineActive}>
                            <Text style={styles.titleTextActive}>{i18n.t('signin')}</Text>
                          </View>
                          <TouchableOpacity style={styles.underLineInactive} onPress={
                            () => {
                              this.props.navigation.navigate('SignUp')
                            }
                          }>
                            <View >
                              <Text style={styles.titleTextInActive}> {i18n.t('signup')}</Text>
                            </View>
                          </TouchableOpacity>

                        </View>

                        <View style={styles.input}>
                          <View style={styles.inputIconcontainer}>
                            <Image style={{ height: 20, width: 20 }} source={require('../../assets/email.png')} />
                          </View>
                          <View style={styles.textImput}>
                            <TextInput keyboardType={'email-address'} style={{ fontSize: 12, color: '#444444', width: '100%' }} maxLength={60} placeholder={i18n.t('Email')} value={this.state.email} onChangeText={(text) => {

                              this.setState({
                                email: text
                              })
                            }}></TextInput>
                          </View>
                        </View>


                        <View style={styles.input}>
                          <View style={styles.inputIconcontainer}>
                            <Image style={{ height: 20, width: 20 }} source={require('../../assets/profile.png')} />
                          </View>
                          <View style={{ flexDirection: 'row' }}>
                            <View style={styles.textImput}>
                              <TextInput secureTextEntry={!this.state.eye ? true : false} style={{ fontSize: 12, color: '#444444' }} placeholder={i18n.t('password')} maxLength={40} value={this.state.password} onChangeText={(text) => {

                                this.setState({
                                  password: text
                                })
                              }}></TextInput>
                            </View>
                            <View>
                              <TouchableOpacity onPress={() => {

                                this.setState({ eye: !this.state.eye })

                              }}>
                                <Image style={{ height: 20, width: 20, marginTop: '50%' }} source={this.state.eye ? require('../../assets/openEye.png') : require('../../assets/closeEye.png')}></Image>
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>

                        {
                          this.state.error === '' ? null : <View>
                            <Text style={{ fontFamily: 'Montserrat', alignSelf: 'center', color: 'red', marginTop: "10%" }}>{this.state.error}</Text>
                          </View>
                        }
                        <View>

                          <TouchableOpacity style={styles.submitButton} onPress={
                            () => {
                              const regemail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

                              if(this.state.email === '')
                              {
                                this.setState({ error: i18n.t('pleaseenterEmail') })
                              }
                              
                             else if (regemail.test(this.state.email) === false) {
                                this.setState({ error: i18n.t('pleaseentervaildEmail') })
                              }
                          
                              else if (this.state.password === '') {
                                
                                this.setState({ error:  i18n.t('pleaseenterpassword') })
                              }
                              else if (!this.state.internet) {
                                alert(`${i18n.t('NoInternetConnection')} \n${i18n.t('PleaseTryAgainLaters')}`)
                              }
                              else{
                                this.setState({ isLoading: true })
                                firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password)
                                .then(
                                  (user) => {
                                    syncStorage.set('user_id', user.user.uid);
                                    this.props.navigation.replace('TabBarNavigation')
                                  }
                                )
                                .catch(   (error) => 
            
                                //  function(error) {
                                    // Handle Errors here.
                                
                                      {
                                    var errorCode = error.code;
                                    var errorMessage = error.message;
                                    this.setState({errormsg:errorCode})
                                    this.setState({modalVisible:true})}
                                
                                )}
                              // this.props.dispatch(verifyUser([this.state, this.props.navigation]))
                              // this.setState({ error:  'in valid user'})
                            }
                          }>
                            <Text style={styles.buttonText}>{i18n.t('signin')}</Text>
                          </TouchableOpacity>
                        </View>

                      </View>

                  
                        {/* <TouchableOpacity style={{ flex: 1, alignSelf: "flex-end", marginRight: 40 }} onPress={() => this.props.navigation.navigate('ForgotPassword')}>
                          <Text>
                            Forget Password?
            </Text>
                        </TouchableOpacity> */}
                    





                    </View>

                    <View>

                    </View>
                    <TouchableOpacity style={{ flex: 1, position:"absolute",right:30,bottom:-25 }} onPress={() => this.props.navigation.navigate('ForgotPassword')}>
                          <Text>
                          {i18n.t('forgotpassword')}
            </Text>
                        </TouchableOpacity>
                  </View>


                 

                </ScrollView>
                <View style={{ justifyContent: 'center', flexDirection: 'row', marginBottom: 10 }}>
                  <Text style={{ fontFamily: 'Montserrat', fontSize: 13 }}>
                  {i18n.t('donthaveaccount')}
                </Text>

                  <TouchableOpacity onPress={
                    () => {

                      this.props.navigation.replace('SignUp')

                    }
                  } style={{ borderBottomWidth: 1, borderBottomColor: '#005478' }}>
                    <Text style={{ fontFamily: 'MontserratSemiBold', color: '#005478', fontWeight: 'bold', fontSize: 13 }}>
                    {i18n.t('signUP')}
              </Text>
                  </TouchableOpacity>
                </View>
                <View style={{ height: "8%", borderTopLeftRadius: 10, borderTopRightRadius: 10, backgroundColor: '#005478', marginBottom: -19 }}>
                </View>
              </View>

          

        </ScrollView>
      </View>
      </KeyboardAvoidingView>


    )
     
    }
    else
    {
      return(

        <View style={{height:'100%',backgroundColor:'white',alignContent:"center",justifyContent:"center"}}>
        <Image style={{height:100,width:100,alignSelf:"center"}} source={require('./../../assets/loader.gif')}/>
         <Text style={{alignSelf:'center'}}>Loading</Text>

   </View>
      )
  }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  top: {
    height: '7%',
    width: '100%',
    backgroundColor: '#333333',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    alignSelf: 'flex-start'
  },
  bottom: {
    height: '7%',
    width: '100%',
    backgroundColor: '#333333',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    justifyContent: 'flex-end'
  },
  logo: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain'
  },
  centerContainer: {

    width: '80%',

    alignSelf: 'center',

    paddingHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: "#2222",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 15,
    shadowOffset: {
      height: 1,
      width: 1
    },
    marginBottom: 10,

  },
  centerContainerTitle: {
    justifyContent: 'space-between',


  },
  titleTextActive: {
    fontSize: 20,
    color: '#005478',
    padding: 10,

    fontFamily: 'MontserratBold'

  },
  titleTextInActive: {
    fontSize: 20,
    color: '#BABABA',
    marginLeft: 15,
    marginTop: 10,
    fontFamily: 'MontserratBold'

  },
  underLineActive: {
    borderBottomColor: '#005478', borderBottomWidth: 3, width: '50%', fontFamily: 'Montserrat',
  }
  , underLineInactive: {
    borderBottomColor: '#BABABA', borderBottomWidth: 3, width: '50%', fontFamily: 'Montserrat',
  },
  inputIconcontainer: {
    width: '10%',
    justifyContent: 'center',
    margin: 5
  },
  input: {
    flexDirection: 'row',

    backgroundColor: '#F1F1F1',

    height: 42,
    borderRadius: 5,
    marginTop: 20
  },
  textImput: {
    marginVertical: 10,
    justifyContent: 'center',
    width: '80%',



  },
  submitButton: {
    height: 42,
    backgroundColor: '#005478',
    marginTop: 20,
    borderRadius: 5,
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    alignSelf: 'center',
    fontFamily: 'Montserrat',
  },
  

  section1: {
      flexDirection: 'row',
      paddingTop: 20,
      justifyContent: 'space-between',
      paddingHorizontal: 20
  },
  section2: {
      width: '100%',
      paddingHorizontal: 20,
      paddingVertical: 20
  },
  section3: {
      width: '100%',
      marginTop:-10,
      marginBottom:20
  },
  containernew: {
      height: '100%',

      justifyContent: 'center'
  },
  box: {
      height: 150,
      width: 100,

      marginRight: 15
  },
  text: {
      alignSelf: 'center',
      fontWeight: '400',
      fontFamily: 'Montserrat'

  },
  innerBox: {
      height: 100,
      borderRadius: 12,
      backgroundColor: '#F7F8F9',
      justifyContent: 'center',
      marginBottom: 10
  },
  section4: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      display: 'flex',
      padding: 10,
      justifyContent: 'center'


  },
//     ModalContainer :{



//   backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     opacity:0.9,
// },
  fadingContainer: {
      padding: 10,
      backgroundColor: "#f7f7f7",
        borderRadius:25,
         position:"absolute",
          bottom:55,
          alignSelf:"center",
          shadowColor: "#2222",
          shadowOpacity: 0.8,
          shadowRadius: 2,
          elevation:15,
          shadowOffset: {
            height: 1,
            width: 1
          },
    },
    fadingText: {
      fontSize: 15
    },
  newArrival: {
      width: '32%',
      borderWidth: 1,
      borderColor: '#E9E9E9',
    margin:2,
      marginTop: 10
  },
  heart: {
      alignSelf: 'flex-end',
      marginRight: 4,
      marginTop: 4
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

export default SignInScreen