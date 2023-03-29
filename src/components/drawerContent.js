import React from 'react';
import { View, StyleSheet ,Modal,TouchableOpacity,Image} from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import * as firebase from 'firebase';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import i18n from 'i18n-js';
import { Poppins_100Thin } from '@expo-google-fonts/poppins';


export function DrawerContent(props) {

    const [modall, setModal] = React.useState(false)

 

    return(
        <View style={{flex:1}}>
              <Modal
        animationType="slide"
        transparent={true}
        visible={modall}
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



            <DrawerContentScrollView {...props}>
            
                <View style={styles.drawerContent}>
                
                    <Drawer.Section >
                   
                    <View style={{ flexDirection: 'row' ,marginTop:10}}>
                   
                <View style={{alignSelf:'center'}}>
                  <Image style={{ height: 40, width: 40, marginRight: 10,marginLeft:10 }} source={require('../../assets/dashbordProfile.png')}></Image>
                </View>
                
                <TouchableOpacity onPress={() => {
                 
                  props.navigation.navigate('Profile');
                }}>
                  <Text style={{ fontFamily: 'Montserrat', fontSize: 18, alignSelf: 'center', justifyContent: 'center',marginTop:8 }}>{i18n.t('Profile')}</Text>
                </TouchableOpacity> 
               
               
                <TouchableOpacity style={{ position: "absolute", right: 10, top: -1 }} onPress={() => props.navigation.toggleDrawer()} >

<Image style={{ height: 25, width: 25, top: 8, }} source={require('../../assets/backArrownew.png')} />

</TouchableOpacity>
              </View>
              
           
              
              
                    </Drawer.Section>
                  
                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={() => (
                               <Image source={require('../../assets/options.png')} style={{height:25,width:25}} />
                            )}
                            label={i18n.t('AllCategories')}
                            onPress={() => {props.navigation.navigate('AllcategoriesScreen',{categories_id:''}) , props.navigation.closeDrawer()}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Image source={require('../../assets/wishlist.png')} style={{height:25,width:25}} />
                            )}
                            label={i18n.t('WishList')}
                            onPress={() => {props.navigation.navigate('WishList'), props.navigation.closeDrawer()}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Image source={require('../../assets/cargo.png')} style={{height:25,width:25}} />
                            )}
                            label={i18n.t('YourOrders')}
                            onPress={() => {props.navigation.navigate('OrderHistory'), props.navigation.closeDrawer()}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Image source={require('../../assets/profilemanage.png')} style={{height:25,width:25}} />
                            )}
                            label={i18n.t('ManageProfile')}
                            onPress={() => {props.navigation.navigate('EditProfile'), props.navigation.closeDrawer()}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Image source={require('../../assets/privacy-policy.png')} style={{height:25,width:25}} />
                            )}
                            label={i18n.t('PrivacyPolicy')}
                            onPress={() => {props.navigation.navigate('privacy'), props.navigation.closeDrawer()}}
                        />
                         <DrawerItem 
                            icon={({color, size}) => (
                                <Image source={require('../../assets/terms-and-conditions.png')} style={{height:25,width:25}} />
                            )}
                            label={i18n.t('Tearmsofuse')}
                            onPress={() => {props.navigation.navigate('termofuse'), props.navigation.closeDrawer()}}
                        />
                         <DrawerItem 
                            icon={({color, size}) => (
                                <Image source={require('../../assets/faq.png')} style={{height:25,width:25}} />
                            )}
                            label={i18n.t('FAQs')}
                            onPress={() => {props.navigation.navigate('FAQs'), props.navigation.closeDrawer()}}
                        />
                         <DrawerItem 
                            icon={({color, size}) => (
                                <Image source={require('../../assets/Languages.png')} style={{height:25,width:25}} />
                            )}
                            label={i18n.t('ChangeLanguage')}
                            onPress={() => {props.navigation.navigate('ChangeLanguage'), props.navigation.closeDrawer()}}
                        />
                    </Drawer.Section>
                    {/* <Drawer.Section title="Preferences">
                        <TouchableRipple onPress={() => {toggleTheme()}}>
                            <View style={styles.preference}>
                                <Text>Dark Theme</Text>
                                <View pointerEvents="none">
                                    <Switch value={paperTheme.dark}/>
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section> */}
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({color, size}) => (
                      <Image  source={require('../../assets/signout.png')} style={{height:25,width:25}} />
                    )}
                    label={i18n.t('LogOut')}
                    onPress={
                        () => 
                            setModal(true)

                        
                      }
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });
