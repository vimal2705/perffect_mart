import React from 'react';
import {View,Keyboard,Text,StyleSheet,Image,TouchableOpacity, ScrollView,TextInput,ActivityIndicator,KeyboardAvoidingView} from 'react-native';
import Header1 from './Header1';
import syncStorage from 'sync-storage';
import * as firebase from 'firebase';
import { Profiler } from 'react';
import NetInfo from "@react-native-community/netinfo";
import Dialog from 'react-native-popup-dialog';
import DialogTitle from 'react-native-dialog/lib/Title';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';
import i18n from 'i18n-js';

class EditProfile extends React.Component{
  constructor(){
      super();
      this.state={
          name:'',
          Phone:'',
          address:'',
          shippingAddress:'',
          profile:{},
          error:'',
          isLoading:false,
          internet:false,
          visibleDialog:false,
             hasPermission: '',
          imagetoadd:'',
          keyboardStatus:'keyboard Hidden',
         
      }
  }
  
  getData=()=>{
    this.setState({isLoading:true})
    firebase.firestore()
    .collection('users_list')
    .doc(syncStorage.get('user_id'))
    .get()
    .then((snapShot)=>{
      this.setState({profile:snapShot.data()})
      this.setState({name:snapShot.data().userName})
      this.setState({Phone:snapShot.data().phone})
      this.setState({address:snapShot.data().shopName})
      this.setState({shippingAddress:snapShot.data().addressofShop})
      this.setState({isLoading:false})
      this.setState({imagetoadd:snapShot.data().shopImage})

    }).catch(error=>alert(error))
  }
  async getPermission() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasPermission: status === 'granted' });
  }

   uploadImage = async (uri, uid) => {
   
    const response = await fetch(uri)
    const blobSol = await response.blob();
    var user_id = uid;
    var db = firebase.firestore().collection('users_list').doc(user_id)
  
    var ref = firebase.storage().ref(`userDetailes/${user_id}/imageOfShop`)
  
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
  
  
      
         
          db.update({
            shopImage: downloadURL
          })
          
          
        
  
      })
  
    })
  
  
  }
  componentDidMount(){

    this.keyboardDidShowSubscription = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        this.setState({ keyboardStatus: 'Keyboard Shown' });
      },
    );
    this.keyboardDidHideSubscription = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        this.setState({ keyboardStatus: 'Keyboard Hidden' });
      },
    );
    syncStorage.set('isBasket', false)
    this.getData();
    this.unsubscribe = NetInfo.addEventListener(state => {
      console.log("Connection type____", state.type);
      this.setState({internet:state.isConnected})
      console.log("Is connected___?", state.isConnected);
      
      this.getPermission()
    });
    
  }
  componentWillUnmount(){
    this.unsubscribe()
    this.keyboardDidShowSubscription.remove();
    this.keyboardDidHideSubscription.remove();
  }


  setData=()=>{
    firebase.firestore()
    .collection('users_list')
    .doc(syncStorage.get('user_id'))
    .set({
      ...this.state.profile,
      userName:this.state.name,
      phone:this.state.Phone,
      addressofShop:this.state.shippingAddress,
      shopName:this.state.address

    }).then(()=>{
      this.props.navigation.navigate('Profile')
    })
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

     
        this.setState({ imagetoadd: result.uri });
        this.setState({ visibleDialog: false })
         this.uploadImage( result.uri,syncStorage.get('user_id'))

      
        // this.uploadImage(result.uri, "i_Image")
      
      // this.setState({ businessCard:[ ...this.state.businessCard,result.uri] });
      // this.setState({ visibleDialog: false })
      // console.log(this.state.businessCard)
    }

  }
  async frontSideImgCam() {
    if (this.state.hasPermission) {
      let resultCamera = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.2,
        saveToPhotos: true,
        base64: true
      });
      if (!resultCamera.cancelled) {

      
          this.setState({ imagetoadd: resultCamera.uri });
          this.setState({ visibleDialog: false })
           this.uploadImage( resultCamera.uri,syncStorage.get('user_id'))
            
         


      }
    
      this.getPermission()
    }


  }

    render(){
     
        return (
          <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
          >
          <View style={{flex:1,backgroundColor:"#fff"}}>
                {
                Platform.OS === 'android' &&( this.state.keyboardStatus ) != 'Keyboard Shown'  ?
            
            <View style={{ backgroundColor: '#005478', borderWidth: 5, borderColor: '#fff', borderRadius: 100, height: 50, width: 50, justifyContent: 'center', bottom:"-3.7%",position:"absolute", zIndex: 1,alignSelf:"center", elevation: 9}}>
           <TouchableOpacity onPress={() => this.props.navigation.navigate('Search')}   activeOpacity={1.0}>
            <Image style={{ height: 25, width: 25, alignSelf: 'center' }} source={require('../../assets/searchIcon.png')}></Image>
            </TouchableOpacity>
            </View>: null
}
<StatusBar backgroundColor="#005478" style={Platform.OS === "android" ? "light" : "dark"} />
         
            <ScrollView style={{height:"100%"}}>
            {
              this.state.isLoading? <View style={{marginVertical:"90%"}}>
              <ActivityIndicator
              style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
              }}
              visible={ this.state.isLoading}
              animating={ this.state.isLoading}
              color="black"
              size="large"
          />
          </View> :     
              <View style={styles.container}>
                   <StatusBar backgroundColor="#005478" style={Platform.OS === "android" ? "light" : "dark"} />
                 
              <View style={{backgroundColor:'#F1F1F1',height:180}}>
              <View style={styles.section1}>
              <View style={{ alignSelf:'center', flexDirection: 'row'}}>
             <TouchableOpacity onPress={
                    () => {
                        this.props.navigation.goBack();
                    }
                }>
                    <View style={{ marginLeft: 20}}>
                    <Image style={{  height:30,width:30 }} source={require('../../assets/backArrow.png')}></Image>
                    </View>
                </TouchableOpacity>
             
                <View style={{ justifyContent:'center',alignItems:'center',alignContent:"center"}}>
             <Text style={{ fontSize: 21, width: 260, fontFamily: 'Montserrat'}}> {i18n.t('EditProfile')}</Text>   
          </View>
          </View>
       
                 
          

          </View>
              {/* <Header1 title={i18n.t('EditProfile')} backArrowInclude={true} optionsInclude={false}  goBack={this.props}  navigation={this.props.navigation}/> */}
              </View>
               <View style={{flex:1}}>
                
              <TouchableOpacity onPress={
                ()=>{
                  this.setState({visibleDialog:true})
                }
              }>
             
              
               <View style={{top:-50}}>
               <View style={{ height: 106, width: 106,alignSelf: 'center',borderRadius: 53,borderColor:"#005478",borderWidth:1,backgroundColor:"white"}}>
                <Image style={{height:100,width:100,alignSelf:'center',borderRadius:50,justifyContent:"center",marginTop:2  }} source={{uri:this.state.imagetoadd}}></Image>
                <Image style={{alignSelf:'center',marginLeft:40,top:-15,height:20,width:20,}} source={require('../../assets/circleforedit.png')}/>
              </View>
              </View>
  
              
              </TouchableOpacity>
              <View>
               
              </View>
              
              <View style={{height:450,backgroundColor:'white'}}>
              <View>
               <View style={styles.fieldContainer}>
                 <View style={styles.fieldImage}>
                    <Image style={{height:20,width:20}} source={require('../../assets/profile.png')}></Image>
                 </View>
                 <View style={styles.fieldText}>
                   <TextInput  style={{fontSize:12,color:'#444444'}} placeholder={i18n.t('nameofuser')} maxLength={40} value={this.state.name} onChangeText={(text)=>{
                       this.setState({
                        name:text
                          })
                        }}>
                   </TextInput>
                 </View>
                </View>
            
              </View>
              <View style={styles.fieldContainer}>
                 <View style={styles.fieldImage}>
                    <Image style={{height:20,width:20}}  source={require('../../assets/phone.png')}></Image>
                 </View>
                 <View style={styles.fieldText}>
                   <TextInput  style={{fontSize:12,color:'#444444'}} placeholder={i18n.t('PhoneNumber')} maxLength={20} value={this.state.Phone} onChangeText={(text)=>{
                       this.setState({
                        Phone:text
                          })
                        }}>
                   </TextInput>
                 </View>
                </View>
                <View style={styles.fieldContainer}>
                 <View style={styles.fieldImage}>
                   <Image style={{height:20,width:20}}  source={require('../../assets/shop.png')}></Image>
                </View>
                <View style={styles.fieldText}>
                  <TextInput  style={{fontSize:12,color:'#444444'}} placeholder={i18n.t('shopname')} value={this.state.address} onChangeText={(text)=>{
                      this.setState({
                       address:text
                         })
                       }}>
                  </TextInput>
                </View>
               </View>
               <View style={{...styles.input}}>
                  <View style={{marginLeft:20,marginTop:10}}>
                    <Image style={{height:20,width:20}}  source={require('../../assets/locationli.png')} />
                  </View>
                  <View style={{marginLeft:10,marginTop:10,
        width:"80%",}}>
             <TextInput   style={{fontSize:12,color:'#444444'}} multiline={true} placeholder={i18n.t('Address')} value={this.state.shippingAddress} onChangeText={
                 (text)=>{
                  this.setState({
                    shippingAddress:text
                    })
                 }
             }>
              
             </TextInput>
            </View>
          
            
           </View>
             
                <View>
               <TouchableOpacity onPress={
                 ()=>{
                   this.props.navigation.navigate('ForgotPassword')
                 }
               }>
               <Text style={{fontFamily:'Montserrat',fontSize:10,fontWeight:'500',alignSelf:'center',color:'#444444',marginTop:20,borderBottomWidth:2,borderBottomColor:'#333333',paddingBottom:5}}>{i18n.t('ChangePassword')} ? </Text>
  
               </TouchableOpacity>
                </View>
              <TouchableOpacity onPress={
                ()=>{
                 if(this.state.Phone.length!=10){
                   this.setState({error:i18n.t('pleaseentervaildphonenumber')})
                 }
                 else if(!isNaN(this.state.Phone)===false){
                  this.setState({error:i18n.t('pleaseentervaildphonenumber')})
                 }
                  else{
                  this.setData()
                  }
                }
              }>
              <Text style={{fontFamily:'Montserrat',alignSelf:'center',color:'red'}}>{this.state.error}</Text>
              <View style={{backgroundColor:'#005478',height:50,marginHorizontal:'15%',marginTop:20,borderRadius:4,justifyContent:'center'}}>
              <Text style={{fontFamily:'Montserrat',alignSelf:'center',color:'white',fontSize:20}}>{i18n.t('SaveDetails')}</Text>
            </View>
              </TouchableOpacity>
              </View>
                </View>
                <View>
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
              {i18n.t('selectyourfile')}
              </DialogTitle>
                <View style={{paddingHorizontal:30}}>
                 <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <View >
                      <TouchableOpacity onPress={
                        () => {
                          this.frontSideImgCam()
                        }
                      }>
                        <View style={{padding:20}}>
                          <Image style={styles.dialogBoxImage} source={require('../../assets/camara.png')}></Image>
                          <Text style={styles.dialogText}>{i18n.t('camera')}</Text>
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
                          <Text style={{ fontFamily:'Montserrat',alignSelf: 'center', marginHorizontal: 10 }}>{i18n.t('gallery')}</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                   
                  </View> 
                </View>
                <TouchableOpacity onPress={
                  () => { this.setState({ visibleDialog: false }) }
                }>
                <View style={{justifyContent:'center',marginHorizontal:30,backgroundColor:'#005478',borderRadius:4,height:50,marginBottom:20}}
                >
                  <Text style={{color:'white',alignSelf:'center',alignSelf:'center',fontSize:20}}>{i18n.t('cancel')}</Text>
                </View>
                </TouchableOpacity>
              </Dialog>
                </View>
              </View>
              
            }

            </ScrollView>
            </View>
            </KeyboardAvoidingView>
            
                 )
    }
}
const styles=StyleSheet.create({
    container:{
        height:'100%',
        backgroundColor:'white'
  
    },
    input: {
      flexDirection:'row',
      backgroundColor:'#F1F1F1',
      marginHorizontal:'15%',
      height:40,
      borderRadius:4,
      marginTop:20,
      height:"20%"
     
  
    },
    editButton:{
     alignSelf:'center',
     justifyContent:'center',
     backgroundColor:'#444444',
     height:40,
     width:150,
     borderRadius:4,
    },
    editButtonText:{
      justifyContent:'center',
      alignSelf:'center',
      color:'white',
      
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
    fieldContainer:{
       flexDirection:'row',
       backgroundColor:'#F1F1F1',
       marginHorizontal:'15%',
       height:40,
       borderRadius:4,
       marginTop:20
    },
    addressContainer:{
      flexDirection:'row',
      backgroundColor:'#F1F1F1',
      marginHorizontal:'15%',

      height:100,
      borderRadius:4,
      marginTop:20
   },
    fieldImage:{
       marginLeft:20,
       alignSelf:'center'
    },
    fieldText:{
        marginLeft:10,
        alignSelf:'center',
        width:"80%",
       
        
    },
    containernew: {
      height: '100%',
     
      justifyContent: 'center'
  },
  section1: {
    height: 70,
 
    marginTop: 25,
    alignItems:"center",
    flexDirection: 'row'
}, 
})
export default EditProfile;