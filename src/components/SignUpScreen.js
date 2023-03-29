
import React, { useState } from 'react'
import { Text,Permission,KeyboardAvoidingView, StyleSheet, View, Image, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator,Modal } from 'react-native';
import I18n from 'i18n-js';
import { connect } from "react-redux";
import { addExpense, addImage } from "../actions/userActions";
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import Dialog from 'react-native-popup-dialog';
import * as Permissions from 'expo-permissions';
import * as firebase from 'firebase'
import syncStorage from 'sync-storage';
import App from '../../App';
import DialogTitle from 'react-native-dialog/lib/Title';
import NetInfo from "@react-native-community/netinfo";
import SvgComponent from "../assets/svgComponents"
import { StatusBar } from 'expo-status-bar';
import { invalid } from 'moment';

class SignUpScreen extends React.Component {


  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      shopName: '',
      userName: '',
      time:new Date().getTime(),
      phone: '',
      referencepersonName: '',
      referencepersonCode: '',
      referencepersonPhone: '',
      addressofShop: '',
      imageOfShop: '',
      visibleDialog: false,
      dialoogActionName: 'BusinessCard',
      businessCard: [],
      hasPermission: '',
      Permission:"",
      adharCard: '',
      imageName: '',
      confirmPassword: '',
      userDetailes: [],
      invoice_count:0,
      shopuri: '',
      adharuri: '',
      imagesArray: [],
      temparray:[],
      eye: true,
      ceye: true,
      isLoading: false,
      internet:false,
      modalVisible:false,
      errormsg:'',
      // email: 'vimal@gmail.com',
      // password: '123456',
      // shopName: 'hjklasd',
      // userName: 'asdffg',
      // time:new Date().getTime(),
      // phone: '1234567890',
      // referencepersonName: 'qwertyu',
      // referencepersonCode: '',
      // referencepersonPhone: '1234567899',
      // addressofShop: 'asdfhkjl kljajka',
      // imageOfShop: 'https://firebasestorage.googleapis.com/v0/b/perfect-mart.appspot.com/o/sales_img%2FowSibbGGTCS2oObbTzs6?alt=media&token=49dd488a-88d7-45c4-b5a3-98f68ac2b950',
      // visibleDialog: false,
      // dialoogActionName: 'BusinessCard',
      // businessCard: ['https://firebasestorage.googleapis.com/v0/b/perfect-mart.appspot.com/o/sales_img%2FowSibbGGTCS2oObbTzs6?alt=media&token=49dd488a-88d7-45c4-b5a3-98f68ac2b950'],
      // hasPermission: '',
      // adharCard: '',
      // imageName: 'https://firebasestorage.googleapis.com/v0/b/perfect-mart.appspot.com/o/sales_img%2FowSibbGGTCS2oObbTzs6?alt=media&token=49dd488a-88d7-45c4-b5a3-98f68ac2b950',
      // confirmPassword: '123456',
      // userDetailes: [],
      // invoice_count:0,
      // shopuri: 'https://firebasestorage.googleapis.com/v0/b/perfect-mart.appspot.com/o/sales_img%2FowSibbGGTCS2oObbTzs6?alt=media&token=49dd488a-88d7-45c4-b5a3-98f68ac2b950',
      // adharuri: 'https://firebasestorage.googleapis.com/v0/b/perfect-mart.appspot.com/o/sales_img%2FowSibbGGTCS2oObbTzs6?alt=media&token=49dd488a-88d7-45c4-b5a3-98f68ac2b950',
      // imagesArray: [],
      // temparray:[],
      // eye: true,
      // ceye: true,
      // isLoading: false,
      // internet:false
     
     
    }


  }
  async getPermissioncam() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ Permission: status === 'granted' });
  }

  async getPermission() {
    const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    this.setState({ Permission: status === 'granted' });
  }
  async componentDidMount() {
    this.getPermissioncam()
    this.getPermission()
    this.unsubscribe = NetInfo.addEventListener(state => {
      console.log("Connection type____", state.type);
      this.setState({internet:state.isConnected})
      console.log("Is connected___?", state.isConnected);
      
      
    });
  }
  componentWillUnmount(){
    this.unsubscribe()
  }
  async frontSideImg() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      saveToPhotos: true,
      base64: true
    });




            
           
            
    
    if (!result.cancelled) {

      if (this.state.imageName === 'adharCard') {
        this.setState({ adharCard: result.uri });
        this.setState({ visibleDialog: false })
        const base64Value = result.base64;

        console.log("adhar card base 64", base64Value)
        // this.uploadImage(result.uri, "i_Image")

      }
      else if (this.state.imageName === 'shop') {
        this.setState({ imageOfShop: result.uri });
        this.setState({ visibleDialog: false })
        console.log("Shop ", this.state.imageOfShop)
        // this.uploadImage(resultCamera.uri,"i_Image")


      }
      else if (this.state.imageName === 'businessCard') {
        this.setState({ businessCard: [...this.state.businessCard, result.uri] });
        this.setState({ visibleDialog: false })
        console.log(this.state.businessCard)
        // this.uploadImage(resultCamera.uri,"i_Image")

      }
      // this.setState({ businessCard:[ ...this.state.businessCard,result.uri] });
      // this.setState({ visibleDialog: false })
      // console.log(this.state.businessCard)
    }

  }
  async frontSideImgCam() {
    if (this.state.Permission) {
      let resultCamera = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.2,
        saveToPhotos: true,
        base64: true
      });
      if (!resultCamera.cancelled) {

        if (this.state.imageName === 'adharCard') {
          this.setState({ adharCard: resultCamera.uri });
          this.setState({ visibleDialog: false })
            // this.uploadImage(resultCamera.uri, "front_Image")

            // this.uploadImage(resultCamera.uri,"i_Image")
            .then(() => {
              console.log("adhar card", this.state.adharCard)
            })
            .catch((error) => {
              alert(error)
            })
        }
        else if (this.state.imageName === 'shop') {
          this.setState({ imageOfShop: resultCamera.uri });
          this.setState({ visibleDialog: false })

            // this.uploadImage(resultCamera.uri,"i_Image")
            .then(() => {
              console.log("Shop ", this.state.imageOfShop)
            })
            .catch((error) => {
              alert(error)
            })

        }
        else if (this.state.imageName === 'businessCard') {
          this.setState({ businessCard: [...this.state.businessCard, resultCamera.uri] });
          this.setState({ visibleDialog: false })

            // this.uploadImage(resultCamera.uri,"i_Image")
            .then(() => {
              console.log(this.state.businessCard)
            })
            .catch((error) => {
              alert(error)
            })
        }


      }
      this.getPermission()
      this.getPermissioncam()
    }


  }

  uploadImageAadharCard() {
    alert(this.state.adharCard)

  }
  // coderef=()=>{
  
  //         }

  //         signup=()=>{
  //           this.coderef();
            
  //         }
         


  //[START] UPLOAD IMG DO NOT DELETE
  async uploadImage(uri, uid, name) {
    const response = await fetch(uri)
    const blobSol = await response.blob();
    var user_id = uid;
    var db = firebase.firestore().collection('users_list').doc(user_id)
  
    var ref = firebase.storage().ref(`userDetailes/${user_id}/${name}/`)
  
    // return ref.put(response)
    const uploadTask = ref.put(blobSol);
    console.log("upload task : " + JSON.stringify(uploadTask));
  
  
    uploadTask.on('state_changed', function (snapshot) {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
  
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
      }
    }, function (error) {
      console.log(error);
  
    }, function () {
  
      uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
  
  
        if (name === 'adharCard') {
  
          db.update({
            adharCard: downloadURL
          })
        }
        else if (name == 'imageOfShop') {
  
          db.update({
            shopImage: downloadURL
          })
        }
        else if (name === 'BusinessCard') {
          db.update({
            BusinessCard: downloadURL
          })
        }
  
      })
  
    })
  
  
  }

  // const uploadImage = async (uri, name) => {
  //   const response = await fetch(uri)
  //   const blobSol = await response.blob();
  //   var user_id = firebase.auth().currentUser.uid;
  //   var db = firebase.firestore().collection('users_list').doc(user_id)
  //   alert(user_id)
  //   var ref = firebase.storage().ref(`userDetailes/${user_id}/${name}/`)

  //   // return ref.put(response)
  //   const uploadTask = ref.put(blobSol);
  //   console.log("upload task : " + JSON.stringify(uploadTask));


  //   uploadTask.on('state_changed', function (snapshot) {
  //     // Observe state change events such as progress, pause, and resume
  //     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  //     var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //     console.log('Upload is ' + progress + '% done');

  //     switch (snapshot.state) {
  //       case firebase.storage.TaskState.PAUSED: // or 'paused'
  //         console.log('Upload is paused');
  //         break;
  //       case firebase.storage.TaskState.RUNNING: // or 'running'
  //         console.log('Upload is running');
  //         break;
  //     }
  //   }, function (error) {
  //     console.log(error);

  //   }, function () {

  //     uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {


  //       if (name === 'adharCard') {

  //         db.update({
  //           adharCard: downloadURL
  //         })
  //       }
  //       else if (name == 'imageOfShop') {
  //         db.update({
  //           shopImage: downloadURL
  //         })
  //       }

  //     })

  //   })


  // }


  //[END] UPLOAD IMG DO NOT DELETE

  setshopImage = (url) => {
    firebase.firestore()
      .collection('users_list')
      .doc(syncStorage.get('user_id'))
      .set({
        ...this.state.userDetailes,
        shopImage: url
      })
  }
  getuser = () => {
    // firebase.firestore()
    // .collection('users_list')
    // .doc(syncStorage.get('user_id'))
    // .get()
    // .then((snapShot)=>{
    //   this.setState({userDetailes:snapShot.data()})
    // })
  }
  setData = () => {
    firebase.firestore()
      .collection('users_list')
      .doc(syncStorage.get('user_id'))
      .set({
        ...this.state.userDetailes,
        adharCard: syncStorage.get('adharImage'),
        shopImage: syncStorage.get('shopImage')


      }).then(() => {

      }).catch(error => alert(error))
  }
  render() {

    return (
      <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={{ backgroundColor: 'white', }}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                 
                  this.setState({modalVisible:!modalVisible})
                }}
                style={{alignSelf:'center',backgroundColor:"#fff"}}
              >
                <View style={styles.centeredView}>
          
                  <View style={styles.modalView}>
        
                    <View style={{flex:1,flexWrap:"wrap",flexDirection:"row",justifyContent:"center",position:"absolute",left:30,top:30}}>
                  <Image  tintColor='#005478' source={require('../../assets/warning.png')} style={{height:35,width:35,justifyContent:"center"}}/>
                  <Text style={{fontSize:18,justifyContent:"flex-end",paddingTop:5 ,marginLeft:10}}>{I18n.t('invaildcredentails')}</Text>
                  </View>
                  <TouchableOpacity  style={{position:"absolute",right:10,top:10}} onPress={() => this.setState({modalVisible:false})}>
                  <Image source={require('../../assets/close.png')} style={{height:30,width:30}} />
                  </TouchableOpacity>
                  <View  style={{height:100}}>
            
             
        
        
                                    
                                  </View>
                                  <View style={{alignContent:"center",alignItems:"center"}}>
                                    {this.state.errormsg === "auth/weak-password" ?<Text style={{fontSize:13,marginTop:-40}}>{I18n.t('weakpassword')}</Text> : this.state.errormsg === "auth/email-already-in-use" ?<Text style={{fontSize:13,marginTop:-40}}>{I18n.t('emailalreadyexist')}</Text>: this.state.errormsg === "referencepeCode" ?<Text style={{fontSize:13,marginTop:-40}}>{I18n.t('referencecodeerror')}</Text>:<Text style={{fontSize:13,marginTop:-40}}>{this.state.errormsg}</Text> }
                                  
                    <TouchableOpacity
                      style={[styles.button, styles.buttonClose]}
                      onPress={() =>  this.setState({modalVisible:false})}
                     
                     
                    >
                  <Text style={{color:"#fff"}}>{I18n.t('okay')}</Text>
                    </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
              <StatusBar backgroundColor="#005478" style={Platform.OS === "android" ? "light" : "dark"} />

        <View style={{ height: '100%' }}>
          <View >
            <ScrollView >
            <View style={{ height: 40,borderBottomLeftRadius:10,borderBottomRightRadius:10, backgroundColor: '#005478', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
              </View>
             <View style={{marginTop:'10%',height:80,width:250, alignSelf: 'center',marginLeft:-40}}>
             <SvgComponent />
             </View>
              <View style={styles.centerContainer}>
                <View
                  style={{ flexDirection: 'row' }}>
                  <TouchableOpacity style={styles.underLineInactive} onPress={
                    () => {
                      this.props.navigation.navigate('SignIn')
                    }
                  }>
                    <View >
                      <Text style={styles.titleTextInActive}>{I18n.t('signin')}</Text>
                    </View>
                  </TouchableOpacity>
                  <View style={styles.underLineActive}>
                    <Text style={styles.titleTextActive}>{I18n.t('signup')}</Text>
                  </View>
                </View>
                <Dialog
                  visible={this.state.visibleDialog}
                  onTouchOutside={() => {
                    this.setState({ visibleDialog: false });
                  }}
                 
                  // footer={
                    
                  //   <DialogFooter>
                  //     <DialogButton
                  //     textStyle={{color:'white'}}
                  //       text="Cancle"
                  //       style={{marginHorizontal:30,backgroundColor:'#444444',borderRadius:4,height:50,marginBottom:20}}
                  //       onPress={() => { this.setState({ visibleDialog: false }) }}
                  //     />

                  //   </DialogFooter>
                  // }
                >
                <DialogTitle style={{marginTop:10,alignSelf:"center"}}>
                {I18n.t('selectyourfile')}
                </DialogTitle>
                  <View style={{paddingHorizontal:30}}>
                    {this.state.dialoogActionName === "BusinessCard" ? <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                      <View >
                        <TouchableOpacity onPress={
                          () => {
                            this.frontSideImgCam()
                          }
                        }>
                          <View style={{padding:20}}>
                            <Image style={styles.dialogBoxImage} source={require('../../assets/camara.png')}></Image>
                            <Text style={styles.dialogText}>{I18n.t('camera')}</Text>
                          </View>
                         

                        </TouchableOpacity>
                      </View> 
                      <View>
                        <TouchableOpacity onPress={
                          () => {

                            this.frontSideImg()

                          }
                        }>
                          <View style={{padding:20,paddingLeft:0}}>
                            <Image style={styles.dialogBoxImage} source={require('../../assets/gallery.jpg')}></Image>
                            <Text style={{ fontFamily:'Montserrat',alignSelf: 'center', marginHorizontal: 10 }}>{I18n.t('gallery')}</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                     
                    </View> : true}
                  </View>
                  <TouchableOpacity onPress={
                    () => { this.setState({ visibleDialog: false }) }
                  }>
                  <View style={{justifyContent:'center',marginHorizontal:30,backgroundColor:'#005478',borderRadius:4,height:50,marginBottom:20}}
                  >
                    <Text style={{color:'white',alignSelf:'center',alignSelf:'center',fontSize:20}}>{I18n.t('cancel')}</Text>
                  </View>
                  </TouchableOpacity>
                </Dialog>
                <View style={styles.input}>
                  <View style={styles.inputIconcontainer}>
                    <Image style={{height:20,width:20}}  source={require('../../assets/shop.png')} />
                  </View>
                  <View style={styles.textImput}>
                    <TextInput keyboardType={'email-address'} style={{ fontSize: 12, color: '#444444' }} placeholder={I18n.t('Email')} maxLength={30} value={this.state.email} onChangeText={(text) => {
                      this.setState({
                        email: text
                      })
                    }}></TextInput>
                  </View>
                </View>

                <View style={styles.input}>
                  <View style={styles.inputIconcontainer}>
                    <Image style={{height:20,width:20}}  source={require('../../assets/locklite.png')} />
                  </View>
                  <View style={{ flexDirection: 'row' }}>

                    <View style={styles.textImput}>
                      <TextInput secureTextEntry={this.state.eye ? true : false} style={{ fontSize: 12, color: '#444444' }} placeholder={I18n.t('password')} maxLength={20} value={this.state.password} onChangeText={(text) => {
                        this.setState({
                          password: text
                        })
                      }}></TextInput>
                    </View>
                    <View>
                      <TouchableOpacity onPress={() => {

                        this.setState({ eye: !this.state.eye })

                      }}>
                        <Image style={{ height: 20, width: 20, marginTop: '50%'}} source={!this.state.eye ? require('../../assets/openEye.png') : require('../../assets/closeEye.png')}></Image>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>


                <View style={styles.input}>
                  <View style={styles.inputIconcontainer}>
                    <Image  style={{height:20,width:20}}  source={require('../../assets/locklite.png')} />
                  </View>
                  <View style={{ flexDirection: 'row' }}>

                    <View style={styles.textImput}>
                      <TextInput secureTextEntry={this.state.ceye ? true : false} style={{ fontSize: 12, color: '#444444' }} placeholder={I18n.t('confirmpassword')} maxLength={30} value={this.state.confirmPassword} onChangeText={(text) => {
                        this.setState({
                          confirmPassword: text
                        })
                      }}></TextInput>
                    </View>
                    <View>
                      <TouchableOpacity onPress={() => {

                        this.setState({ ceye: !this.state.ceye })

                      }}>
                        <Image style={{ height: 20, width: 20, marginTop: '50%' }} source={!this.state.ceye ? require('../../assets/openEye.png') : require('../../assets/closeEye.png')}></Image>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>










                <View style={{ marginTop: 40, marginBottom: -5 }}>
                  <Text style={{fontFamily:'Montserrat',}}>{I18n.t('shopdetails')}</Text>
                </View>

                <View style={styles.input}>
                  <View style={styles.inputIconcontainer}>
                    <Image style={{height:20,width:20}}  source={require('../../assets/shop.png')} />
                  </View>
                  <View style={styles.textImput}>
                    <TextInput style={{ fontSize: 12, color: '#444444' }} placeholder={I18n.t('shopname')} maxLength={30} value={this.state.shopName} onChangeText={(text) => {
                      this.setState({
                        shopName: text
                      })
                    }}></TextInput>
                  </View>
                </View>
                <View style={styles.input}>
                  <View style={styles.inputIconcontainer}>
                    <Image style={{height:20,width:20}}  source={require('../../assets/profile.png')} />
                  </View>
                  <View style={styles.textImput}>
                    <TextInput style={{ fontSize: 12, color: '#444444' }} placeholder={I18n.t('nameofuser')} maxLength={30} value={this.state.userName} onChangeText={(text) => {

                      this.setState({
                        userName: text
                      })
                    }}></TextInput>
                  </View>
                </View>



                <View style={{...styles.input,height:150}}>
                  <View style={{margin:5,width:'10%',marginTop:10}}>
                    <Image style={{height:20,width:20}}  source={require('../../assets/shop.png')} />
                  </View>
                  <View style={{marginTop:7 , marginVertical: 10,width:'80%'}}>
                    <TextInput multiline={true} style={{ fontSize: 12, color: '#444444' }} placeholder={I18n.t('addressofshop')} maxLength={200} value={this.state.addressofShop} onChangeText={(text) => {
                      this.setState({
                        addressofShop: text
                      })
                    }}></TextInput>
                  </View>
                </View>



              


                <View style={styles.input}>
                  <View style={styles.inputIconcontainer}>
                    <Image style={{height:20,width:20}} source={require('../../assets/phone.png')} />
                  </View>
                  <View style={styles.textImput}>
                    <TextInput keyboardType={'number-pad'} style={{ fontSize: 12, color: '#444444' }} placeholder={I18n.t('phonenumber')} maxLength={10} value={this.state.phone} onChangeText={(text) => {
                      this.setState({
                        phone: text
                      })
                    }}></TextInput>
                  </View>
                </View>


                <View style={styles.input}>
                  <View style={styles.inputIconcontainer}>
                    <Image style={{height:20,width:20}}  source={require('../../assets/shop.png')} />
                  </View>
                  <View style={styles.textImput}>
                    <TouchableOpacity onPress={
                      () => {
                          if(this.state.imageOfShop===''){
                            this.setState({ imageName: 'shop' })
                        this.setState({ visibleDialog: true })
                          }
                      }
                    }>
                      <Text style={{ fontFamily:'Montserrat',color: 'lightgrey' }}>{I18n.t('imageofshop')}</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={{ justifyContent: 'center', flex: 1 }}>
                    <Text style={{fontFamily:'Montserrat', flex: 1, flexDirection: 'column', alignSelf: 'center', margin: 10 }}>{
                      this.state.imageOfShop !== '' ? <View style={{ flexDirection: 'row' }}>

                        <View style={{ marginLeft: 5 }}>
                          <TouchableOpacity onPress={
                            () => {
                              this.setState({ imageOfShop: '' })
                            }
                          }>
                            <Image style={{ height: 20, width: 20, marginTop: 5 }} source={require('../../assets/remove.png')} />
                          </TouchableOpacity>
                        </View>
                      </View> : null
                    }</Text>
                  </View>


                </View>
                {
                  this.state.imageOfShop !== '' ? <View style={styles.businessCardContainer}>
                    {
                      <Image style={styles.businessCardImage} source={{ uri: this.state.imageOfShop }} />
                    }


                  </View> : null
                }

<View style={styles.input}>
                  <View style={styles.inputIconcontainer}>
                    <Image style={{height:20,width:20}}  source={require('../../assets/businessCard.png')} />
                  </View>
                  <View style={styles.textImput}>
                    <TouchableOpacity onPress={
                      () => {
                          if(this.state.adharCard==='')
                          {
                            this.setState({ imageName: 'adharCard' })
                            this.setState({ visibleDialog: true })
                          }
                      }
                    }>
                      <Text style={{ fontFamily:'Montserrat',color: 'lightgrey' }}>{I18n.t('adharcard')}</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={{ justifyContent: 'center', flex: 1 }}>
                    <Text style={{ fontFamily:'Montserrat',flex: 1, flexDirection: 'column', alignSelf: 'center', margin: 10 }}>{
                      this.state.adharCard !== '' ? <View style={{ flexDirection: 'row' }}>

                        <View style={{ marginLeft: 5,height:25,width:25 }}>
                          <TouchableOpacity onPress={
                            () => {
                              this.setState({ adharCard: '' })
                            }
                          }>
                            <Image style={{ height: 20, width: 20, marginTop: 5 }} source={require('../../assets/remove.png')} />
                          </TouchableOpacity>
                        </View>
                      </View> : null
                    }</Text>
                  </View>
                </View>
                {
                  this.state.adharCard !== '' ? <View style={styles.businessCardContainer}>
                    {
                      <Image style={styles.businessCardImage} source={{ uri: this.state.adharCard }} />
                    }


                  </View> : null
                }

                <View style={styles.input}>
                  <View style={styles.inputIconcontainer}>
                    <Image style={{height:20,width:20}}  source={require('../../assets/businessCard.png')} />
                  </View>
                  <View style={styles.textImput}>
                    <TouchableOpacity
                      disabled={this.state.businessCard.length != 0}
                      onPress={() => {
                       if(this.state.businessCard.length===0){
                        this.setState({ imageName: 'businessCard' })
                        this.setState({ visibleDialog: true })
                       }
                      }}>
                      <Text style={this.state.businessCard.length != 0 ? {fontFamily:'Montserrat', color: 'lightgrey' } : { fontFamily:'Montserrat',color: 'lightgrey' }}>{I18n.t('businesscard')}</Text>
                    </TouchableOpacity>
                  </View>


                  <View style={{ justifyContent: 'center', flex: 1 }}>
                    <Text style={{fontFamily:'Montserrat', flex: 1, flexDirection: 'column', alignSelf: 'center', margin: 10 }}>{
                      this.state.businessCard.length !== 0 ? <View style={{ flexDirection: 'row' }}>

                        <View style={{ marginLeft: 5 }}>
                          <TouchableOpacity onPress={
                            () => {
                              this.setState({ businessCard: [] })
                            }
                          }>
                            <Image style={{ height: 20, width: 20, marginTop: 5 }} source={require('../../assets/remove.png')} />
                          </TouchableOpacity>
                        </View>
                      </View> : null
                    }</Text>
                  </View>


                </View>


                {
                  this.state.businessCard.length !== 0 ? <View style={styles.businessCardContainer}>
                    {
                      this.state.businessCard.map(image => <Image style={styles.businessCardImage} source={{ uri: image }} />)
                    }


                  </View> : null
                }

                <View>
                  <Text style={{fontFamily:'Montserrat', marginTop: 40, marginBottom: -10 }}>{I18n.t('salesorreference')}</Text>
                  <View style={styles.input}>
                    <View style={styles.inputIconcontainer}>
                      <Image style={{height:20,width:20}} source={require('../../assets/profile.png')} />
                    </View>
                    <View style={styles.textImput}>
                      <TextInput style={{ fontSize: 12, color: '#444444' }} placeholder={I18n.t('referencecode')} maxLength={40} value={this.state.referencepersonCode} onChangeText={(text) => {
                        this.setState({
                          referencepersonCode: text
                        })
                        // if(text >= 0)
                        // {
                        // this.coderef(text)
                        // }
                      }}></TextInput>
                    </View>
                  </View>
                  {/* <View style={styles.input}>
                    <View style={styles.inputIconcontainer}>
                      <Image style={{height:20,width:20}} source={require('../../assets/profile.png')} />
                    </View>
                    <View style={styles.textImput}>
                      <TextInput style={{ fontSize: 12, color: '#444444' }} placeholder={'Referance Person Name'} maxLength={40} value={this.state.referencepersonName} onChangeText={(text) => {
                        this.setState({
                          referencepersonName: text
                        })
                      }}></TextInput>
                    </View>
                  </View>
              
                  <View style={styles.input}>
                    <View style={styles.inputIconcontainer}>
                      <Image style={{height:20,width:20}} source={require('../../assets/phone.png')} />
                    </View>
                    <View style={styles.textImput}>
                      <TextInput keyboardType={'number-pad'} style={{ fontSize: 12, color: '#444444' }} placeholder={'ReferancePhone'} maxLength={10} value={this.state.referencepersonPhone} onChangeText={(text) => {
                        this.setState({
                          referencepersonPhone: text
                        })
                      }}></TextInput>
                    </View>
                  </View> */}
                  {
                    this.state.isLoading ? <ActivityIndicator
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1000,
                        marginTop: 20
                      }}
                      visible={this.state.isLoading}
                      animating={this.state.isLoading}
                      
                      color="black"
                      size="large"
                    /> : null
                  }

                  <View style={{ justifyContent: 'center', marginTop: 10 }}>
                    <Text style={{ fontFamily:'Montserrat',alignSelf: 'center', color: 'red' }}>{this.state.error}</Text>
                  </View>
                  <TouchableOpacity style={styles.submitButton} onPress={
                    () => {
                      var arrayOfImg = []
                      arrayOfImg.push(this.state.addressofShop)
                      arrayOfImg.push(this.state.imageOfShop)
                      arrayOfImg.push(this.state.adharCard)

                      const regemail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                      //this.handleSignUp()
                      if(this.state.email === '')
                      {
                        this.setState({ error: I18n.t('pleaseenterEmail') })
                      }
                      
                     else if (regemail.test(this.state.email) === false) {
                        this.setState({ error: I18n.t('pleaseentervaildEmail') })
                      }
                      else if (this.state.password !== this.state.confirmPassword) {
                        this.setState({ error: I18n.t('passworandconfirmpassword')  })
                      }
                      else if (this.state.shopName === '') {
                        this.setState({ error: I18n.t('pleaseentershopname') })
                      }
                      else if (this.state.userName === '') {
                        this.setState({ error: I18n.t('pleaseenterusername') })
                      } 
                      else if(this.state.addressofShop === ''){
                        this.setState({ error:I18n.t('') })
                      }
                      else if (this.state.phone === '') {
                        this.setState({ error:I18n.t('pleaseenterphonenumber')})
                      }
                      else if ((!isNaN(this.state.phone) === false)) {
                        this.setState({ error:I18n.t('pleaseentervaildphonenumber') })
                      }
                      else if (this.state.phone.length < 10) {
                        this.setState({ error: I18n.t('pleaseentervaildphonenumber') })
                      }
                    
                   
                      // else if (this.state.imageOfShop === '') {
                      //   this.setState({ error: I18n.t('pleaseinsertshopimage') })
                      // }
                      // else if (this.state.businessCard === []) {
                      //   this.setState({ error:I18n.t('pleaseinsertbuisnesscard') })
                      // }
                      else if(!this.state.internet){
                       alert(`${I18n.t('NoInternetConnection')} \n${I18n.t('PleaseTryAgainLaters')}`)
                      }
                      else {
                      
                        this.setState({ isLoading: true })
                        // this.props.dispatch(addExpense([this.state, this.props.navigation]))
                         firebase.firestore()
      .collection('sales_person_details')
      .where("per_code","==",parseInt(this.state.referencepersonCode, 10))
          .get()
          
          .then((snapshot) => {
            var array = []
          
            var size = snapshot.size;



            var array = []
            console.log('User exists: ', size);
            if(this.state.referencepersonCode == '')
            {
              firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password)
              .then(
               
                      
                (result) => {
                  console.log(result)
                  console.log("uid", result.user.uid)
                  firebase.firestore()
                    .collection('users_list')
                    .doc(result.user.uid)
                    .set({
                      uid: result.user.uid,
                      email: this.state.email,
                      shopName: this.state.shopName,
                      userName: this.state.userName,
                      phone: this.state.phone,
                      time_stamp : this.state.time,
                      referencepersonName: this.state.referencepersonName,
                      referencepersonPhone:this.state.referencepersonPhone,
                      referencepersonCode:this.state.referencepersonCode,
                      addressofShop: this.state.addressofShop,
                      hasPermission: false,
                      invoice_count: 0
                      
      
                    })   
                    .then(() => {
                      syncStorage.set('user_id', result.user.uid)
                      var i = 0;
                      this.uploadImage(this.state.adharCard, result.user.uid, 'adharCard')
                      this.uploadImage(this.state.imageOfShop, result.user.uid, 'imageOfShop')
                      this.uploadImage(this.state.imageOfShop, result.user.uid, 'BusinessCard')
                      alert('congratulations \n You have Sucessfully Register \n Your Request is Under Review')
      
                        
      
      
                    })
                   
                    .catch((error) => 
                      
                      Alert.alert(
                        "Alert Title",
                        
                        [
                          {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                          },
                          { text: "OK", onPress: () => console.log("OK Pressed") }
                        ]
                      )
                      
                      )
                }
              )
             
              .catch(
                (error) => 
            
            //  function(error) {
                // Handle Errors here.
            
                  {
                var errorCode = error.code;
                var errorMessage = error.message;
                this.setState({errormsg:errorCode})
                this.setState({modalVisible:true})}
                
            
             
             
         
              )
            
            }
           
           else if(size >= 1)
            {
            // if (documentSnapshot.exists) {
            //   console.log('User data: ', documentSnapshot.data());
            // }
            // if (condition) {
            //   // RUN
            // }else{
            //   // ERROR
            // }
           
            snapshot.forEach((Snapshot) => {
            
          
                array.push(
                  {
                  Id:Snapshot.id,
                  no_of_seller:Snapshot.data().no_of_seller,
                  per_code:Snapshot.data().per_code,
                  per_contact:Snapshot.data().per_contac,
                  img_uri:Snapshot.data().img,
                  per_name:Snapshot.data().per_name
                }
                )
  
                console.log('person--->',array);

                // this.setState({temparray:array})
                // this.setState({referencepersonPhone:Snapshot.data().per_contac,referencepersonName:Snapshot.data().per_name})
     
             
                if(!Snapshot.data().no_of_seller)
                {
             firebase.firestore()
      .collection('sales_person_details')
      .doc(Snapshot.id)
      .update(
        {
          no_of_seller:1
        }
      ) 
      .then(
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(
         
                
          (result) => {
            console.log(result)
            console.log("uid", result.user.uid)
            firebase.firestore()
              .collection('users_list')
              .doc(result.user.uid)
              .set({
                uid: result.user.uid,
                email: this.state.email,
                shopName: this.state.shopName,
                userName: this.state.userName,
                phone: this.state.phone,
                time_stamp : this.state.time,
                referencepersonName: Snapshot.data().per_name,
                referencepersonPhone: Snapshot.data().per_contac,
                referencepersonCode:this.state.referencepersonCode,
                addressofShop: this.state.addressofShop,
                hasPermission: false,
                invoice_count: 0
                

              })   
              .then(() => {
                syncStorage.set('user_id', result.user.uid)
                var i = 0;
                this.uploadImage(this.state.adharCard, result.user.uid, 'adharCard')
                this.uploadImage(this.state.imageOfShop, result.user.uid, 'imageOfShop')
                this.uploadImage(this.state.imageOfShop, result.user.uid, 'BusinessCard')
                alert(`${I18n.t('congratulations')} \n ${I18n.t('sucessfullregister')} \n ${I18n.t('requestunderreview')} `)

               


              })
              .then(() => {
                firebase.firestore()
        .collection('sales_person_details')
        .doc(Snapshot.id)
        .collection('User_list')
        .doc(result.user.uid)
        .set({
        email: this.state.email,
        shopName: this.state.shopName,
        userName: this.state.userName,
        phone: this.state.phone,
        time_stamp : this.state.time,
        uid:result.user.uid,
        phone: this.state.phone,
        
        })
              
          }  )  
              .catch(error => alert(error))
          }
        )
       
        .catch(error => alert(error))
      )

                }
                else
                {
                  firebase.firestore()
                  .collection('sales_person_details')
                  .doc(Snapshot.id)
                  .update(
                    {
                      no_of_seller: Snapshot.data().no_of_seller + 1
                    }
                     
              
                  ) 
                  .then(
                    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
                    .then(
                     
                            
                      (result) => {
                        console.log(result)
                        console.log("uid", result.user.uid)
                        firebase.firestore()
                          .collection('users_list')
                          .doc(result.user.uid)
                          .set({
                            uid: result.user.uid,
                            email: this.state.email,
                            shopName: this.state.shopName,
                            userName: this.state.userName,
                            phone: this.state.phone,
                            time_stamp : this.state.time,
                            referencepersonName: Snapshot.data().per_name,
                            referencepersonPhone: Snapshot.data().per_contac,
                            referencepersonCode:this.state.referencepersonCode,
                            addressofShop: this.state.addressofShop,
                            hasPermission: false,
                            invoice_count: 0
                            
            
                          })   
                          .then(() => {
                            syncStorage.set('user_id', result.user.uid)
                            var i = 0;
                            this.uploadImage(this.state.adharCard, result.user.uid, 'adharCard')
                            this.uploadImage(this.state.imageOfShop, result.user.uid, 'imageOfShop')
                            this.uploadImage(this.state.imageOfShop, result.user.uid, 'BusinessCard')
                            alert('congratulations \n You have Sucessfully Register \n Your Request is Under Review')
            
                           
            
            
                          })
                          .then(() => {
                            firebase.firestore()
                    .collection('sales_person_details')
                    .doc(Snapshot.id)
                    .collection('User_list')
                    .doc(result.user.uid)
                    .set({
                    email: this.state.email,
                    shopName: this.state.shopName,
                    userName: this.state.userName,
                    phone: this.state.phone,
                    time_stamp : this.state.time,
                    uid:result.user.uid,
                    phone: this.state.phone,
                    
                    
                    })
                          
                      }  )  
                          .catch(error => alert(error))
                      }
                    )
        //             .then((result) => {
        //               firebase.firestore()
        //   .collection('sales_person_details')
        //   .doc(snapshot.id)
        //   .collection('User_list')
        //   .doc(result.user.uid)
        //  .set({
        //   email: this.state.email,
        //   shopName: this.state.shopName,
        //   userName: this.state.userName,
        //   phone: this.state.phone,
        //   time_stamp : this.state.time,
        //  uid:result.user.uid,
        //  phone: this.state.phone,
      
    
        //  })
                    
        //   }  )  
                    .catch(error => alert(error))
                  )
              }
            
            }
            
            )
          }else{
         
            
         
            
                this.setState({errormsg:"referencepeCode"})
                this.setState({modalVisible:true})}
          
      
           
        }
        )
        .catch((error) =>{
          console.log("ERROR: ",error);
        }
      );
                        this.setState({ isLoading: false })
                      }

                    }
                  }>
                    <Text style={styles.buttonText}>{I18n.t('signup')}</Text>
                  </TouchableOpacity>
                </View>

              </View>
              <View style={{ justifyContent: 'center', flexDirection: 'row', marginVertical: 20, marginBottom: 10,borderBottomColor:'#005478' }}>
                <Text style={{fontFamily:'Montserrat',fontSize:13}} >
                {I18n.t('alreadyhaveaccount')}
             </Text>
                <TouchableOpacity onPress={() => {
                  this.props.navigation.replace('SignIn')
                }}>
                  <View style={{ borderBottomWidth: 1,borderBottomColor:'#005478' }}>
                    <Text style={{ marginLeft:4,fontFamily:'MontserratBold',color:'#005478', fontWeight: 'bold',fontSize:13 }}>
                    {I18n.t('signIn')}
           </Text>
                  </View>
                </TouchableOpacity>

              </View>
              <View style={{ height: 40,borderTopLeftRadius:10,borderTopRightRadius:10, backgroundColor: '#005478', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
              </View>
            </ScrollView>
   
          </View>

          <View>

          </View>
        </View>
     


      </View>
      </KeyboardAvoidingView>
    )
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
    backgroundColor:'#fff',
      shadowColor: "#2222",
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation:15,
      shadowOffset: {
        height: 1,
        width: 1
      },
    marginBottom: 10
  },
  centerContainerTitle: {
    justifyContent: 'space-between'

  },
  titleTextActive: {
    fontSize: 20,
    color: '#005478',
    marginLeft:15,
    marginTop:10,
    fontFamily:'MontserratBold'

  },
  titleTextInActive: {
    fontSize: 20,
    color: '#BABABA',
    padding: 10,
    fontFamily:'MontserratBold'
  },
  underLineActive: {
    borderBottomColor: '#005478', borderBottomWidth: 3, width: '50%',
  }
  , underLineInactive: {
    borderBottomColor: '#BABABA', borderBottomWidth: 3, width: '50%',
  },
  inputIconcontainer: {
    width: '10%',
    justifyContent: 'center',
    margin: 5
  },
  img: {
    width: '100%',
    height: "100%",
  },
  input: {
    flexDirection: 'row',

    backgroundColor: '#F1F1F1',

    height: 42,
    borderRadius: 5,
    marginTop: 20,

  },
  textImput: {
    marginVertical: 10,
    
    justifyContent: 'center',
    width: '80%'
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
    fontFamily:'Montserrat',
  },
  dialogBoxImage: {
    height: 40,
    width: 40,
    marginVertical: 10,
    marginHorizontal: 20
  },
  dialogText: {
    alignSelf: 'center',
    marginHorizontal: 10,
    fontFamily:'Montserrat',

  },
  businessCardContainer: {
    borderWidth: 1,
    marginTop: 4,
    padding: 3,
    borderRadius: 4,
    flexDirection: 'row'

  },
  businessCardImage: {
    height: 50,
    width: 50,
    marginLeft: 3
  },  centeredView: {
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
export default (SignUpScreen)







// <View style={styles.input}>
//                   <View style={styles.inputIconcontainer}>
//                     <Image source={require('../../assets/locklite.png')} />
//                   </View>


//                   <View style={styles.textImput}>
//                     <TextInput style={{ fontSize: 12, color: '#444444' }} placeholder={'Confirm Password'} maxLength={20} value={this.state.confirmPassword} onChangeText={(text) => {
//                       this.setState({
//                         confirmPassword: text
//                       })
//                     }}></TextInput>
//                   </View>
//                 </View>