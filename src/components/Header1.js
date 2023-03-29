import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, Platform } from 'react-native';
import syncStorage from 'sync-storage';
import * as firebase from 'firebase';
import i18n from 'i18n-js';
import { Keyboard } from 'react-native';
const Header1 = (props) => {
  console.log(props)
  let [state, setState] = useState(false)
  const [modal, setModal] = useState(false)
  const [modall, setModall] = useState(false)


  return (
    <View style={styles.container}>
      <Modal visible={state} 
      transparent
      animationType="fade"
     
        >
        {/* <View style={{ height: 500, width: 200, borderWidth: 1, alignSelf: 'flex-end', backgroundColor: 'white',  borderColor: 'lightgrey' }}>
          <View style={Platform.OS === 'ios' ? styles.ios : styles.android}>
            <TouchableOpacity onPress={() => {
              setState(false)
            }}>

              <Image style={{ height: 25, width: 25 }} source={require('../../assets/backArrownew.png')}></Image>
            </TouchableOpacity>
          </View>
          <View style={{ width: '100%', paddingBottom: 10, borderBottomWidth: 1 }}>
            <View style={{ flexDirection: 'row', marginTop: 10, width: '100%', justifyContent: 'space-between' }}>

              <View style={{ flexDirection: 'row' }}>
                <View style={{alignSelf:'center'}}>
                  <Image style={{ height: 40, width: 40, marginRight: 10 }} source={require('../../assets/dashbordProfile.png')}></Image>
                </View>
                <TouchableOpacity onPress={() => {
                  setState(false)
                  props.navigation.navigate('Profile');
                }}>
                  <Text style={{ fontFamily: 'Montserrat', fontSize: 18, alignSelf: 'center', justifyContent: 'center',marginTop:8 }}>{i18n.t('Profile')}</Text>
                </TouchableOpacity>

              </View>
            </View>
          </View>
          <View style={{ width: '100%', justifyContent: 'flex-end' }}>
           
            <View style={styles.optionText}>
              <TouchableOpacity onPress={() => {
                setState(false)
                props.navigation.navigate('AllcategoriesScreen',{name:''});
              }}>
                <Text style={{ fontFamily: 'Montserrat', fontSize: 18 }}>{i18n.t('AllCategories')}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.optionText}>
              <TouchableOpacity onPress={() => {
                setState(false)
                props.navigation.navigate('WishList');
              }}>
                <Text style={{ fontFamily: 'Montserrat', fontSize: 18 }}>{i18n.t('WishList')}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.optionText}>
              <TouchableOpacity onPress={() => {
                setState(false)
                props.navigation.navigate('OrderHistory');
              }}>
                <Text style={{ fontFamily: 'Montserrat', fontSize: 18 }}>{i18n.t('YourOrders')}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.optionText}>
              <TouchableOpacity onPress={() => {
                setState(false)
                props.navigation.navigate('EditProfile')
              }}>
                <Text style={{ fontFamily: 'Montserrat', fontSize: 18 }}>{i18n.t('ManageProfile')}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.optionText}>
              <TouchableOpacity onPress={() => {

                setState(false)

              }}>
                <Text style={{ fontFamily: 'Montserrat', fontSize: 18 }}>{i18n.t('PrivacyPolicy')}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.optionText}>
              <TouchableOpacity onPress={() => {

                setState(false)

              }}>
                <Text style={{ fontFamily: 'Montserrat', fontSize: 18 }}>{i18n.t('Tearmsofuse')}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.optionText}>
              <TouchableOpacity onPress={() => {
                setState(false)

              }}>
                <Text style={{ fontFamily: 'Montserrat', fontSize: 18 }}>{i18n.t('FAQs')}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.optionText}>
              <TouchableOpacity onPress={() => {
                props.navigation.navigate('ChangeLanguage');
                setState(false)
              }}>


                <Text style={{ fontFamily: 'Montserrat', fontSize: 18 }}>{i18n.t('ChangeLanguage')}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.optionText}>
              <TouchableOpacity onPress={() => {

                setModall(true)


                setState(false)
              }}>


                <Text style={{ fontFamily: 'Montserrat', fontSize: 18 }}>{i18n.t('LogOut')}</Text>
              </TouchableOpacity>
            </View>
          </View>


        </View> */}

      </Modal>



      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modall}
        onRequestClose={() => {

          setModall(false)
        }}
      >
        <View style={{ height: 150, width: 300, alignSelf: 'center', backgroundColor: '#005478', marginVertical: '80%', borderRadius: 20 }}>
          <View style={{ alignSelf: 'flex-start', height: '70%', justifyContent: 'center', width: '100%' }}>
            <Text style={{ fontFamily: 'Montserrat', alignSelf: 'center', fontSize: 16, color: 'white' }}>Are You Sure You Want  </Text>
            <Text style={{ fontFamily: 'Montserrat', alignSelf: 'center', fontSize: 16, color: 'white' }}>To Logout ?</Text>
          </View>

          <View style={{ height: '30%', flexDirection: 'row', justifyContent: 'space-around', width: '100%', borderTopWidth: 1, borderColor: 'white' }}>

            <View style={{ borderRightWidth: 1, paddingVertical: 10, borderColor: 'white', width: '40%' }}>
              <TouchableOpacity onPress={
                () => {
                  setModall(false)
                }
              }>
                <Text style={{ fontFamily: 'Montserrat', color: 'white', fontSize: 18 }}>Cancle</Text>
              </TouchableOpacity>
            </View>
            <View style={{ paddingVertical: 10 }}>
              <TouchableOpacity onPress={
                () => {
                  firebase.auth().signOut()
                  setModall(false)
                }
              }>
                <Text style={{ fontFamily: 'Montserrat', color: 'white', fontSize: 18 }}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>


        </View>
      </Modal> */}




      <View style={{ flexDirection: 'row' }}>

        {
          props.backArrowInclude ? <View style={{ paddingTop: "4%", marginLeft: 30 }}>
            <TouchableOpacity  onPress={() => {
              props.goBack.navigation.goBack(),
              Keyboard.dismiss()

            }}>
              <View style={{height:40,justifyContent:'center'}}>
               <Image style={{height:30,width:35,marginLeft:-10}} source={require('../../assets/backArrow.png')} />
              </View>
            </TouchableOpacity>
          </View> : null
        }
        <View style={props.backArrowInclude ? styles.section1 : { ...styles.section1, width: '100%' }}>

          <View style={props.backArrowInclude ? styles.backArrow : styles.nobackArrow}>
            <Text style={props.optionsInclude ? styles.optionsIncluded : styles.noOptionsInclude}>{props.title==="Dashbord"?i18n.t('dashbord'):props.title}</Text>
          </View>
          </View>
          {
            props.optionsInclude ?
            <View style={{position:"absolute",right:-30,top:16}}>
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
              : null
          }
        </View>
        <View>
        </View>
      
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    display: 'flex'
  },
  section1: {
    flexDirection: 'row',
    paddingTop: 14,



  },
  nobackArrow:
  {
    width: '33%',
    marginLeft: 20,
    marginTop:9,

  
  },
  backArrow: {
    width: '33%',
    justifyContent:"center"
   
 
   
    
  },
  noOptionsInclude: { fontSize: 21, fontWeight: '100', width: 400, fontFamily: 'Montserrat' ,justifyContent:"center"},
  optionsIncluded: {
    fontSize: 21, fontWeight: '100',
    fontFamily: 'Montserrat',
    width: 400,
    

    

  }
  ,
  ios: {
    marginTop: 40,
    alignSelf: 'flex-end',
    marginRight: 10
  },
  android: {

    marginRight: 10,
    alignSelf: 'flex-end'
  },
  optionText: {
    alignSelf: 'flex-end',
    marginTop: 5
  }

})
export default Header1