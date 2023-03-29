import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Modal, Dimensions,Share,Platform,Linking} from 'react-native';
import Header1 from './Header1';
import Dialog from "react-native-dialog";
import syncStorage from 'sync-storage';
import * as firebase from 'firebase';
import NetInfo from "@react-native-community/netinfo";
import i18n from 'i18n-js';
import { StatusBar } from 'expo-status-bar';


const Profile = (props) => {

  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      setHeight(Dimensions.get('window').height)
      getData();
      syncStorage.set('isBasket', false)
    });
    const unsubscribeinternet = NetInfo.addEventListener(state => {
      console.log("Connection type____", state.type);
      getData()

      console.log("Is connected___?", state.isConnected);
      setInternet(state.isConnected)

    });
    return () => {
      unsubscribe
      unsubscribeinternet
    }
  }, [props.navigation]);
  const [shareAppDialog, setShareApp] = useState(false);
  const [link, setLink] = useState('Link')
  const [dialogContent, setDialogContent] = useState('')
  const [profile, setProfile] = useState('')
  const [modal, setModal] = useState(false)
  const [Height, setHeight] = useState(0);
  const [internet, setInternet] = useState(false)
  const [modalVisible,setModalVisible] = useState(false)
  const GOOGLE_PACKAGE_NAME = 'com.perffectdigitalmart';
  const APPLE_STORE_ID = '1584326789';
  const getData = () => {

    firebase.firestore()
      .collection('users_list')
      .doc(syncStorage.get('user_id'))
      .get()
      .then((snapShot) => {
        setProfile(snapShot.data())
      })

  }

  const rating = () => {
    if (Platform.OS === 'android') {
      Linking.openURL(
        'https://play.google.com/store/apps/details?id=com.perffectdigitalmart',
      ).catch(
          (err) => alert('Please check for Google Play Store')
      );
    } else {
      Linking.openURL(
        'https://apps.apple.com/in/app/perffect-digital-mart/id1584326789',
      ).catch((err) => alert('Please check for the App Store'));
    }
  }
  
   


  
  const onShareandroid = async () => {
    try {
      const result = await Share.share({
        message:
        'https://play.google.com/store/apps/details?id=com.perffectdigitalmart',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  
  const onShareios = async () => {
    try {
      const result = await Share.share({
        message:
        'https://apps.apple.com/in/app/perffect-digital-mart/id1584326789',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={{height:"100%",backgroundColor:"#fff"}}>
               <StatusBar backgroundColor="#005478" style={Platform.OS === "android" ? "light" : "dark"} />
       {
                Platform.OS === 'android' ?
            
            <View style={{ backgroundColor: '#005478', borderWidth: 5, borderColor: '#fff', borderRadius: 100, height: 50, width: 50, justifyContent: 'center', bottom:"-3.7%",position:"absolute", zIndex: 1,alignSelf:"center", elevation: 9}}>
           <TouchableOpacity onPress={() => props.navigation.navigate('Search')}   activeOpacity={1.0}>
            <Image style={{ height: 25, width: 25, alignSelf: 'center' }} source={require('../../assets/searchIcon.png')}></Image>
            </TouchableOpacity>
            </View>: null
}
      {internet ?
        <ScrollView>

          <View style={styles.container}>
            <View style={{ backgroundColor: '#F1F1F1', height: 180 }}>



            <View style={styles.section1}>
             <View style={{ alignSelf:'center', flexDirection: 'row'}}>
             <TouchableOpacity onPress={
                    () => {
                        props.navigation.goBack();
                    }
                }>
                    <View style={{ marginLeft: 14}}>
                    <Image style={{  height:30,width:30 }} source={require('../../assets/backArrow.png')}></Image>
                    </View>
                </TouchableOpacity>
             
             <View style={{ justifyContent:'center',alignItems:'center',alignContent:"center"}}>
             <Text style={{ fontSize: 21,  width: 260, fontFamily: 'Montserrat'}}> {i18n.t('Profile')}</Text>   
          </View>
          </View>
       
                 
          <View style={{position:"absolute",right:-30,top:8}}>
            <View style={{ height:45,alignSelf:'center', flexDirection: 'row', width: '40%',justifyContent: 'flex-end' }}>
              <View >
                <TouchableOpacity onPress={() => {
                  props.navigation.navigate('Notifications')
                }}>
                <View style={{height:45,justifyContent:'center'}}>
                <Image style={{ height: 25, width: 25 }} source={require('../../assets/notification.png')}>
                </Image>
                </View>

                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity onPress={() =>  props.navigation.toggleDrawer()}>
                 <View style={{height:45,justifyContent:'center'}}>
                 <Image style={{ height: 25, width: 25, marginLeft: 10 ,marginRight:25}} source={require('../../assets/menu.png')}>
                 </Image>
                 </View>

                 
                </TouchableOpacity>
                </View>
              </View>
            </View>

          </View>
              {/* <Header1 title={i18n.t('Profile')} backArrowInclude={true} optionsInclude={false} goBack={props} /> */}
            </View>
            <View style={{ flex: 1 }}>
              <View style={{ top: -50 }}>
                <View style={{ height: 106, width: 106,alignSelf: 'center',borderRadius: 53,borderColor:"#005478",borderWidth:1,backgroundColor:"white"}}>
                <Image style={{ height: 100, width: 100, alignSelf: 'center', borderRadius: 50,justifyContent:"center",marginTop:2 }} source={{ uri: profile.shopImage }}></Image>
                </View>
                <Text style={{ fontFamily: 'Montserrat', alignSelf: 'center', marginTop: 20, fontSize: 20, fontWeight: '500' }}>{profile.userName}</Text>
              </View>
              <View style={{marginTop:-40}}>
                <TouchableOpacity onPress={
                  () => {
                    props.navigation.navigate('EditProfile')
                  }
                }>
                  <View style={styles.editButton}>
                    <Text style={styles.editButtonText}>{i18n.t('EditYourProfile')}</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{ padding: 40,marginTop:-20 }}>



                  <View>  
                  <TouchableOpacity style={styles.subcontainer} onPress={
                    () => {
                      props.navigation.navigate('address')
                    }
                  }>
                    <View style={styles.subcontainers1} >
                      <View style={styles.subcontainerImage}>
                      <Image style={{ height: 20, width: 20 }} source={require('../../assets/locationp.png')} />
                      </View>
                      <View style={styles.subContainerTextView}>
                      <Text style={{ fontFamily: 'Montserrat', marginLeft: 10, fontWeight: '500', fontSize: 18 }}>{i18n.t('ShippingAddress')}</Text>
                      </View>
                   
                    </View>
                    <View style={styles.subcontainers2}>
                      <Image style={{ height: 20, width: 20 }} source={require('../../assets/goAhead.png')} />
                    </View>
                   
                  </TouchableOpacity>
                </View>
                


                {/* <View style={styles.subcontainer}>
                  <View style={styles.subcontainers1}>
                    <View style={styles.subcontainerImage}>
                      <Image style={{ height: 20, width: 20 }} source={require('../../assets/wallet.png')} />
                    </View>
                    <View style={styles.subContainerTextView}>
                      <Text style={{ fontFamily: 'Montserrat', marginLeft: 10, fontWeight: '500', fontSize: 18 }}>{i18n.t('PaymentMethods')}</Text>
                    </View>
                  </View>
                  <View style={styles.subcontainers2}>
                    <Image style={{ height: 20, width: 20 }} source={require('../../assets/goAhead.png')} />
                  </View>
                </View> */}


                <View>
                  <TouchableOpacity style={styles.subcontainer} onPress={
                    () => {
                      props.navigation.navigate('OrderHistory')
                    }
                  }>
                    <View style={styles.subcontainers1} >
                      <View style={styles.subcontainerImage}>
                        <Image style={{ height: 20, width: 20 }} source={require('../../assets/orderHistory.png')} />
                      </View>
                      <View style={styles.subContainerTextView}>
                        <Text style={{ fontFamily: 'Montserrat', marginLeft: 10, fontWeight: '500', fontSize: 18 }}>{i18n.t('OrderHistory')}</Text>
                      </View>
                    </View>
                    <View style={styles.subcontainers2}>

                      <Image style={{ height: 20, width: 20 }} source={require('../../assets/goAhead.png')} />

                    </View>
                  </TouchableOpacity>
                </View>

             

                <TouchableOpacity onPress={
                  () => {
                    props.navigation.navigate('WishList')
                  }
                }>
                  <View style={styles.subcontainer}>
                    <View style={styles.subcontainers1} >
                      <View style={styles.subcontainerImage}>
                        <Image style={{ height: 20, width: 20 }} source={require('../../assets/heartP.png')} />
                      </View>
                      <View style={styles.subContainerTextView}>
                        <Text style={{ fontFamily: 'Montserrat', marginLeft: 10, fontWeight: '500', fontSize: 18 }}>{i18n.t('Favorite')}</Text>
                      </View>
                    </View>
                    <View style={styles.subcontainers2}>
                      <Image style={{ height: 20, width: 20 }} source={require('../../assets/goAhead.png')} />
                    </View>
                  </View>
                </TouchableOpacity>

                {/* <View style={styles.subcontainer}>
                  <View style={styles.subcontainers1}>
                    <View style={styles.subcontainerImage}>
                      <Image style={{ height: 20, width: 20 }} source={require('../../assets/lock.png')} />
                    </View>
                    <View style={styles.subContainerTextView}>
                      <Text style={{ fontFamily: 'Montserrat', marginLeft: 10, fontWeight: '500', fontSize: 18 }}>{i18n.t('ChangePassword')}</Text>
                    </View>
                  </View>
                  <View style={styles.subcontainers2}>
                    <Image style={{ height: 20, width: 20 }} source={require('../../assets/goAhead.png')} />
                  </View>
                </View> */}


                {/* <View style={styles.subcontainer}>
                  <View style={styles.subcontainers1}>
                    <View style={styles.subcontainerImage}>
                      <Image style={{ height: 20, width: 20 }} source={require('../../assets/PrivacyPolicy.png')} />
                    </View>
                    <View style={styles.subContainerTextView}>
                      <Text style={{ fontFamily: 'Montserrat', marginLeft: 10, fontWeight: '500', fontSize: 18 }}>{i18n.t('PrivacyPolicy')}</Text>
                    </View>
                  </View>
                  <View style={styles.subcontainers2}>
                    <Image style={{ height: 20, width: 20 }} source={require('../../assets/goAhead.png')} />
                  </View>

                </View> */}

                <TouchableOpacity onPress={() => {
                  setDialogContent('Share')
                  setModalVisible(true)
                }}>
                  <View style={styles.subcontainer}>
                    <View style={styles.subcontainers1}>
                      <View style={styles.subcontainerImage}>
                        <Image style={{ height: 20, width: 20 }} source={require('../../assets/Help.png')} />
                      </View>
                      <View style={styles.subContainerTextView}>
                        <Text style={{ fontFamily: 'Montserrat', marginLeft: 10, fontWeight: '500', fontSize: 18 }}>{i18n.t('Help')}</Text>
                      </View>
                    </View>
                    <View style={styles.subcontainers2}>

                      <Image style={{ height: 20, width: 20 }} source={require('../../assets/goAhead.png')} />

                    </View>

                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={
                 
                    rating 
                
                }>
                  <View style={styles.subcontainer}>
                    <View style={styles.subcontainers1}>
                      <View style={styles.subcontainerImage}>
                        <Image style={{ height: 20, width: 20 }} source={require('../../assets/star.png')} />
                      </View>
                      <View style={styles.subContainerTextView}>
                        <Text style={{ fontFamily: 'Montserrat', marginLeft: 10, fontWeight: '500', fontSize: 18 }}>{i18n.t('RateApp')}</Text>
                      </View>
                    </View>
                    <View style={styles.subcontainers2}>

                      <Image style={{ height: 20, width: 20 }} source={require('../../assets/goAhead.png')} />

                    </View>

                  </View>
                </TouchableOpacity>
              <TouchableOpacity    onPress={    Platform.OS === 'ios' ? onShareios:
                onShareandroid
         
        }>
                <View style={styles.subcontainer}>

                  <View style={styles.subcontainers1}>
                    <View style={styles.subcontainerImage}>
                      <Image style={{ height: 20, width: 20 }} source={require('../../assets/share.png')} />
                    </View>
                    <View style={styles.subContainerTextView}>
                      <Text style={{ fontFamily: 'Montserrat', marginLeft: 10, fontWeight: '500', fontSize: 18 }}>{i18n.t('ShareApp')}</Text>
                    </View>
                  </View>
                  <View style={styles.subcontainers2}>

                    <Image style={{ height: 20, width: 20 }} source={require('../../assets/goAhead.png')} />

                  </View>

                </View>
              </TouchableOpacity>
                {/* <TouchableOpacity onPress={
              
                onShare
                  
                }>
                  <View style={styles.subcontainer}>

                    <View style={styles.subcontainers1}>
                      <View style={styles.subcontainerImage}>
                        <Image style={{ height: 20, width: 20 }} source={require('../../assets/share.png')} />
                      </View>
                      <View style={styles.subContainerTextView}>
                        <Text style={{ fontFamily: 'Montserrat', marginLeft: 10, fontWeight: '500', fontSize: 18 }}>{i18n.t('ShareApp')}</Text>
                      </View>
                    </View>
                    <View style={styles.subcontainers2}>

                      <Image style={{ height: 20, width: 20 }} source={require('../../assets/goAhead.png')} />

                    </View>

                  </View>
                </TouchableOpacity> */}

                <TouchableOpacity onPress={
                  () => {
                    setModal(true)

                  }
                }>
                  <View style={{ alignSelf: 'center', flexDirection: 'row', marginTop: 20 }}>
                   <View style={{justifyContent:'center'}}>
                   <Image style={{ height: 16, width: 16 }} source={require('../../assets/logout.png')} />
                   </View>
                   <View style={{justifyContent:'center'}}>
                   <Text style={{ fontFamily: 'Montserrat', marginLeft: 10 ,fontSize:16}}>{i18n.t('LogOut')}</Text>
                    </View>
                  </View>
                </TouchableOpacity>

              </View>
              <View style={{ height: 60, backgroundColor: 'white' }}>

              </View>
            </View>
          </View>


          {/* <Dialog.Container contentStyle={{ borderRadius: 10, justifyContent: 'center' }} visible={shareAppDialog}>

            <Dialog.Description>
              <View style={{ width: 240 }}>
                <View style={{ width: '100%' }}>
                  <TouchableOpacity onPress={() => {
                    setShareApp(false)
                  }}>
                    <Image style={{ alignSelf: 'flex-end', height: 20, width: 20 }} source={require('../../assets/closeb.png')}></Image>
                  </TouchableOpacity>

                </View>

                {dialogContent === 'ShareApp' ?
                  <View>

                    <Text style={styles.dialogTitle}>Share PerffectMart</Text>
                    <View style={{ fontFamily: 'Montserrat', flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
                      <View>
                        <TouchableOpacity onPress={
                          () => {
                            alert('Left to set Clipbord')
                          }
                        }>
                          <Image style={{height:40,width:40}} source={require('../../assets/whatsappCic.png')}></Image>
                        </TouchableOpacity>

                      </View>
                      <View>
                        <Image style={{height:40,width:40}} source={require('../../assets/instacic.png')}></Image>
                      </View>
                      <View>
                        <Image style={{height:40,width:40}} source={require('../../assets/linkedincic.png')}></Image>
                      </View>
                      <View>
                        <Image style={{height:40,width:40}} source={require('../../assets/fbcic.png')}></Image>
                      </View>
                    </View>
                    <View style={{ flexDirection: 'row', height: 40, padding: 10, backgroundColor: '#F1F1F1', marginHorizontal: 20, marginVertical: 20 }}>
                      <View>
                        <Image style={{height:20,width:20}} source={require('../../assets/link.png')}></Image>
                      </View>
                      <View style={{ marginLeft: 10 }}>
                        <Text>{link}</Text>
                      </View>
                    </View>
                    <View>
                      <View style={{ height: 40, backgroundColor: '#005478', justifyContent: 'center', borderRadius: 4, marginHorizontal: 20 }}>
                        <Text style={{ fontFamily: 'Montserrat', color: 'white', fontSize: 14, alignSelf: 'center', fontWeight: 'bold' }}>Copy Link</Text>
                      </View>
                    </View>


                  </View>
                  : <View>
                    <Text>Contact PerffectMart</Text>
                  </View>}
              </View>
            </Dialog.Description>


          </Dialog.Container> */}
          <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
         
          setModalVisible(!modalVisible);
        }}
        style={{alignSelf:'center',backgroundColor:"#fff"}}
      >
        <View style={styles.centeredView}>
         {dialogContent === 'playstore'?
            
          <View style={{ height:100,
            width:"85%",
            backgroundColor: "white",
            borderRadius: 20,
            padding: 20,
           
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5}}>
            
          <TouchableOpacity  style={{position:"absolute",right:10,top:10}} onPress={() => setModalVisible(false)}>
          <Image source={require('../../assets/close.png')} style={{height:30,width:30}} />
          </TouchableOpacity>
          <View>
                    <Text style={{fontSize:15,alignSelf:"center",justifyContent:"center",marginTop:20}}>link will come soon</Text>
                  </View>

          </View>:    <View style={{ height:100,
            width:"85%",
            backgroundColor: "white",
            borderRadius: 20,
            padding: 20,
           
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5}}>
            
          <TouchableOpacity  style={{position:"absolute",right:10,top:10}} onPress={() => setModalVisible(false)}>
          <Image source={require('../../assets/close.png')} style={{height:30,width:30}} />
          </TouchableOpacity>
          <View>
                    <Text style={{fontSize:15,alignSelf:"center",justifyContent:"center",marginTop:20}}>link will come soon</Text>
                  </View>

          </View>
}
        </View>
      </Modal>
        
              <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => {

          setModal(false)
        }}
      >
             <View style={{ height: "100%",justifyContent:'center',flex:1,  backgroundColor: 'rgba(100,100,100, 0.9)' }}>
        <View style={{ alignSelf: 'center', backgroundColor: '#005478', marginVertical: '80%', borderRadius: 20 }}>
   

<View style={{ height: 150, width: 300, alignSelf: 'center' }}>
  <View style={{ alignSelf: 'flex-start', height: '70%', justifyContent: 'center',borderTopLeftRadius:20,borderTopRightRadius:20, width: '100%', backgroundColor: '#fff' }}>
    <Text style={{ fontFamily: 'Montserrat', alignSelf: 'center', fontSize: 16, color: 'black' }}>{i18n.t('AreYouSureYouWant')}  </Text>
    {i18n.locale === 'en' ?<Text style={{ fontFamily: 'Montserrat', alignSelf: 'center', fontSize: 16, color: 'black' }}>To Logout ?</Text>: null} 
  </View>

  <View style={{ height: '30%', flexDirection: 'row', justifyContent: 'space-around', width: '100%', borderTopWidth: 1, borderColor: 'white' , backgroundColor: '#005478',borderBottomLeftRadius:20,borderBottomRightRadius:20}}>

    <View style={{ borderRightWidth: 1, paddingVertical: 10, borderColor: 'white', width: '40%',borderBottomLeftRadius:20 }}>
      <TouchableOpacity onPress={
        () => {
          setModal(false)
        }
      }>
        <Text style={{ fontFamily: 'Montserrat', color: 'white', fontSize: 18, }}>{i18n.t('cancel')} </Text>
      </TouchableOpacity>
    </View>
    <View style={{ paddingVertical: 10 }}>
      <TouchableOpacity onPress={
        () => {
          firebase.auth().signOut()
          props.navigation.reset({
            index: 1,
            routes: [{name: 'SignIn'}],
          });
          setModal(false)
        }
      }>
        <Text style={{ fontFamily: 'Montserrat', color: 'white', fontSize: 18 }}> {i18n.t('Logout')}</Text>
      </TouchableOpacity>
    </View>
  </View>


</View>

</View>
        </View>
      </Modal>


        </ScrollView>
        : <View style={styles.containernew}>
          <Image style={{ justifyContent: 'center', alignSelf: 'center', }} source={require('../../assets/noInternet.png')}>
          </Image>
          <Text style={{ fontFamily: 'Montserrat', color: '#333333', alignSelf: 'center', fontSize: 25, marginTop: 20 }}>{i18n.t('NoInternetConnection')} </Text>
          <Text style={{ fontFamily: 'Montserrat', color: '#333333', alignSelf: 'center', fontSize: 20, marginTop: 10 }}>{i18n.t('PleaseTryAgainLater')}</Text>
        </View>
      }
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white'

  },
  editButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#005478',
    height: 40,
    width: 170,
    borderRadius: 4,
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
  section1: {
    height: 70,
 
    marginTop: 25,
    alignItems:"center",
    flexDirection: 'row'
}, 

  dialogTitle: {
    alignSelf: 'center',

    color: '#444444',
    fontSize: 20,
    fontWeight: 'bold'
  },
  subcontainer: {
    flexDirection: 'row',
    marginTop: 20,
    width: '100%',

    justifyContent: 'space-between'
  },
  subcontainers1: {
    flexDirection: 'row',
    alignSelf: 'flex-start',

    height: 30
  },
  subcontainerText: {
    marginLeft: 10,
    fontWeight: '500'
  },
  subcontainers2: {
    alignSelf: 'flex-end'
  },
  subcontainerImage: { marginLeft: 5, justifyContent: 'center', alignSelf: 'center' },
  subContainerTextView: { height: 30, justifyContent: 'center' },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 250,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    backgroundColor: 'rgba(100,100,100, 0.9)',
    padding: 20,

  },
  modalView: {
    height: 250,
    width:"85%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
   
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
    borderRadius: 20,
    padding: 4,
    elevation: 2,
    marginTop:20
  
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    width:200,
    alignSelf:"center",
    backgroundColor: "#005478",
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
export default Profile