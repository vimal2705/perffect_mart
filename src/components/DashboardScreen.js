import React, { useState, useRef, version } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ActivityIndicator,FlatList,Animated,SafeAreaView ,ImageBackground,Modal,Alert,Dimensions,Linking} from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
import Header1 from "./Header1";
// import { connect } from "react-redux";
import * as firebase from 'firebase';
import { getinitialCategories } from '../actions/productAction';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import i18n from 'i18n-js'; 
import syncStorage from 'sync-storage';

import NetInfo from "@react-native-community/netinfo";
import {FlatListSlider} from 'react-native-flatlist-slider';
import library from './library';
import VersionCheck from 'react-native-version-check-expo'
import { checkVersion } from "react-native-check-version";
import { screensEnabled } from 'react-native-screens';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { useFonts,Poppins_400Regular,Poppins_500Medium,Poppins_700Bold} from '@expo-google-fonts/poppins'
var firebaseConfig = {
    apiKey: "AIzaSyD_2NIuxDoVnCxWTOrP8pq16MFho4Nl6VM",
    authDomain: "perfect-mart.firebaseapp.com",
    projectId: "perfect-mart",
    storageBucket: "perfect-mart.appspot.com",
    messagingSenderId: "68570693732",
    appId: "1:68570693732:web:a0077602bee94cd6a3df71",
    measurementId: "G-9N3RJV08V5"
};
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}
let db = firebase.firestore();


Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});
const Dashbord = (props) => {
    const [fontsLoad] = useFonts({
        Poppins_400Regular,Poppins_500Medium,Poppins_700Bold
      });
    i18n.translations = library;

    const [categories, setCategories] = useState([])
    const [sliderImage, setSliderImage] = useState([])
    const [newArrival, setNewArrival] = useState([
    ])
    const [version, setversion] = useState('')
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    const [isLoading, setIsLoading] = useState(false)
    const [internet, setInternet] = useState(false)
    const [keyword, setkeyword] = useState([])
    const [qnt,setQnt]=useState(0)
    const [keywordvalue, setkeywordvalue] = useState('')
    const [pwexist, setpwExist] = useState([]);
    const [modalmsg, setmodalmsg] = useState('')
    const [permission, setPremission] = useState([]);
    const [Iddoc,setIddoc] = useState('')
    const [modalVisible, setModalVisible] = useState(false);
    const [details, setdetails] = useState([])
    const [price, setprice] = useState([])
    const [priceamount, setpriceamount] = useState('')
    const [producteng, setproducteng] = useState('')
    const [productguj, setproductguj] = useState('')
    const [producthin, setproducthin] = useState('')
    const fadeadd = useRef(new Animated.Value(0)).current;
    const faderemove = useRef(new Animated.Value(0)).current;
    const fadeInadd = () => {
      // Will change fadeAnim value to 1 in 5 seconds
      Animated.timing(fadeadd, {
        toValue: 20,
        duration: 2000,
        useNativeDriver: true 
      }).start(fadeOutadd);
    
    };
  
    const fadeOutadd = () => {
      // Will change fadeAnim value to 0 in 3 seconds
      Animated.timing(fadeadd, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true 
      }).start();
    };

    const fadeInremove = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(faderemove, {
            toValue: 20,
          duration: 2000,
          useNativeDriver: true 
        }).start(fadeOutremove);
        
      };
    
      const fadeOutremove= () => {
        // Will change fadeAnim value to 0 in 3 seconds
        Animated.timing(faderemove, {
          toValue: 0,
          duration: 1000,
           useNativeDriver: true 
        }).start();
      };
    // if (!loaded) {
    //     return null;
    // }


    React.useEffect(() => {

 
          
              
      
              // // // When a value is missing from a language it'll fallback to another language with the key present.
            //   i18n.fallbacks = true;

            
        const unsubscribe = props.navigation.addListener('focus', () => {
            syncStorage.set('isBasket', false)
           
         
            checkAppUpdate();
            var uid = firebase.auth().currentUser.uid;
            firebase.firestore().collection('users_list').doc(uid).get().then((ss) => {

                ss.data().hasPermission ? null : props.navigation.navigate('RegisterTemporaryScreen')
            })


            getCategories();
            getBanner();
            getProducts();
            isExist();
            console.log("state_from", props.state)
         

            firebase.auth().onAuthStateChanged(user => {
                console.log("USER : ", JSON.stringify(user));
            })

            // this.registerForPushNotificationsAsync()

        });
        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });
        registerForPushNotificationsAsync()
        // Return the function to unsubscribe from the event so it gets removed on unmount

        const unsubscribeinternet = NetInfo.addEventListener(state => {
            console.log("Connection type____", state.type);

            console.log("Is connected___?", state.isConnected);
            setInternet(state.isConnected)

        });


        return () => {
            unsubscribe
            unsubscribeinternet
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        }


    }, [props.navigation]);



    const checkAppUpdate = () => {
         /* ios version check*/
          
//         VersionCheck.setAppID(APP_ID);                    
// VersionCheck.setAppName(APP_NAME);   
// {Platform.OS === 'ios'?
// 
// VersionCheck.({
//     provider: 'appStore'  // for iOS
//   })
//   .then(latestVersion => {
//     alert(latestVersion);    // 0.1.2
//   })
// :

// VersionCheck.getLatestVersion({
//     provider: 'playStore'  // for Android
//   })
//   .then(latestVersion => {
//     alert(latestVersion);    // 0.1.2
//   });
// }
{Platform.OS === 'android' ?  


VersionCheck.needUpdate().then(res => {
             

    
    if (res.isNeeded) {
        
        setmodalmsg('update')
          setModalVisible(true)
    
      }
    

})
    :

VersionCheck.needUpdate({
    latestVersion:"1.0.8"
}).then(res => {
               
    if (res.isNeeded) {
        
        setmodalmsg('update')
          setModalVisible(true)
    
      }
    


})
}
    //  {Platform.OS === 'android' ?   
    //    VersionCheck.getStoreUrl({
    //             appID:'com.perffectdigitalmart',
    //             appName:'PerffectDigitalMart'
    //           })
    //             .then(url => {
    //                 console.log('--->>>',url);
    //               Linking.canOpenURL(url)
    //                 .then(supported => {
    //                   if (!supported) {
    //                   } else {
    //                       setModalVisible(false)            //             return Linking.openURL(url);
    //                  }
    //                 })
    //                .catch(err => console.error('An error occurred', err));
    //             })
    //             .catch(err => {
    //               console.log(`error is: ${err}`);                })
            
           
    //   :
    //   VersionCheck.needUpdate()
            
    //   .then(async res => {
    //       console.log(res.isNeeded);    // true
    //       if (res.isNeeded) {
    //         Linking.openURL(res.storeUrl);  // open store if update is needed.
    //       }
    //     })
    
    //     }
    }

        const updateApp = () => {
            {
                Platform.OS === 'android'? 
            VersionCheck.getStoreUrl({
              appID:'com.perffectdigitalmart',
              appName:'PerffectDigitalMart'
            })
              .then(url => {
                  console.log('--->>>',url);
                Linking.canOpenURL(url)
                  .then(supported => {
                    if (!supported) {
                    } else {
                        setModalVisible(false)
                      return Linking.openURL(url);
                    }
                  })
                  .catch(err => console.error('An error occurred', err));
              })
              .catch(err => {
                console.log(`error is: ${err}`);
              }): 
          
              /* ios version check for update*/
              
              VersionCheck.getStoreUrl({
                appID:1584326789,
               
              })
                .then(url => {
                    console.log('--->>>',url);
                   
                  Linking.canOpenURL(url)
                    .then(supported => {
                      if (!supported) {
                      } else {
                          setModalVisible(false)
                        return Linking.openURL(url);
                      }
                    })
                    .catch(err => console.error('An error occurred', err));
                })
                .catch(err => {
                  console.log(`error is: ${err}`);
                })
            
            }

             };
            

    const getCategories = () => {
        setIsLoading(true)
        firebase.firestore()
            .collection('category_list')
            .get()
            .then(
            snapshot => {
                var cat_array = [];
               snapshot.forEach((Snapshot) => {
                     
                     firebase.firestore()
                        .collection('category_list')
                        .doc(Snapshot.id)
                        .get()

                  cat_array.push({
                         Id:Snapshot.id,
                         name_eng:Snapshot.data().cat_name_en,
                         name_guj:Snapshot.data().cat_name_gu,
                         name_hin:Snapshot.data().cat_name_hi,
                         img_uri:Snapshot.data().cat_img,
                    
                  })
                          console.log('---name',Snapshot.data().cat_img);

              
                          }  )
                        setCategories(cat_array)

            
            })
            .catch((error) => {
                console.log(error)
            }
            )
    }

    const registerForPushNotificationsAsync = async () => {

        let token;
        if (Constants.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
            console.log("TOKEN ID: " + token);
        } else {
            alert('Must use physical device for Push Notifications');
        }

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
                
            });
        }
        var user = firebase.auth().currentUser;

        db
            .doc("users_list/" + user.uid)
            .update({
                token_id: token
            })
            .then(function (doc) {

            })
            .catch(function (error) {
                alert(error)
            })
        return token;
    }

    const getProducts = () => {
        setIsLoading(true)
        firebase.firestore()
            .collection('product_list')
            .orderBy("time_stamp", "desc")
            .limit(12)
            .get()
            .then((snapshot) => {
                var array = []
                snapshot.forEach(item => {
                    array.push(item.data())
            
              
                   
                })
                setIsLoading(false)
          
                setNewArrival(array)
            }


            )
            .catch((error) => {
                console.log(error)
            })
    }
    const getBanner = () => {

        firebase.firestore()
            .collection('banner_img_list')
            .get()
            .then((snapshot) => {
                var array = []
                snapshot.forEach(item => {
                    array.push({
                        images:item.data().image_url})
                })
                console.log('------',array);
                setSliderImage(array)
            }
            )
            .catch((error) => {
                console.log(error)
            })
    }
    const addToWishList = () => {
        //alert(id)
      
        firebase.firestore()
            .collection('wish_list')
            .doc(syncStorage.get('user_id'))
            .collection('item_list')
            .doc(Iddoc)
            .set({
                
                product_det: details,
                product_qnt: 1,
                product_size:qnt ,
                product_price:parseFloat(priceamount),
                totalPrice: 1 * parseFloat(priceamount).toFixed(2),
                product_gst: 1 * parseInt(details.pro_gst),

             

            })
            .then(() => {
                isExist()
           
                setModalVisible(false)
                setQnt(0)
              fadeInadd()

            }).catch(e => alert(e))

    }
    const addTo = (id, item) => {
        //alert(id)
       
        firebase.firestore()
            .collection('product_list')
            .doc(id)
            .get()
            .then(() => {
               
                console.log('--0,.',item.pro_keyword_name);
                setkeyword(item.keyword_value_list_id)
                setkeywordvalue(item.pro_keyword_name)
                setdetails(item)
                setprice(item.pro_price)
                setModalVisible(true)
                setIddoc(item.product_id)
                setproducteng(item.pro_name_en)
                setproductguj(item.pro_name_gu)
                setproducthin(item.pro_name_hi)
             

            }).catch(e => alert(e))

    }

    const deletefromWishlist = (id) => {
      
        firebase.firestore()
            .collection('wish_list')
            .doc(syncStorage.get('user_id'))
            .collection('item_list')
            .doc(id)
            .delete()
            .then(() => {

                isExist()
          
               fadeInremove()
            }).catch((error) => {
                alert(error)
            })
    }
    const isExist = (id) => {
      
        firebase.firestore()
            .collection('wish_list')
            .doc(syncStorage.get('user_id'))
            .collection('item_list')
            .get()
            .then((ss) => {
                var array = []
                ss.forEach((item) => {
                    // alert(JSON.stringify(item.data().product_id))
                    array.push(item.data().product_det.product_id)
                })
              

                setpwExist(array)
            })
    }



    // return (<View style={{ height: '100%', backgroundColor: 'white' }}>
    //     <ScrollView>

    //         <View style={styles.container}>

    //             <Header1 title={'Home'} backArrowInclude={false} optionsInclude={true} goBack={props} navigation={props.navigation} />
    //             <View style={{ paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
    //                 <View>
    //                     <Text style={{ fontSize: 15, fontWeight: '500' }}>Categories</Text>
    //                 </View>
    //                 <View>
    //                     <TouchableOpacity onPress={
    //                         () => {
    //                           props.navigation.navigate('AllcategoriesScreen')
    //                         }
    //                     }>
    //                         <View style={{ width: 48, height: 23, backgroundColor: '#444444', borderRadius: 5, justifyContent: 'center' }}>
    //                             <Text style={{ color: 'white', fontSize: 8, alignSelf: 'center' }}>
    //                                 View All
    //     </Text>
    //                         </View>
    //                     </TouchableOpacity>
    //                     <View>
    //  useFonts({
    //     Poiins: require('../../assets/fonts/Poppins-Regular.ttf'),
    //   })
    const getText = (text) => {
        var len = 0;
        if (text == undefined)
            len = 0
        else
            len = text.length;
        if (len >= 13)
            return `${text.substring(0, 9)}...`;
        else
            return text;
    }
    const renderOptions=(array)=>{
    
        return array!==undefined?array.map(item => <TouchableOpacity onPress={()=>{
            setQnt((item.sub_type_name) +' '+ (item.product_keyword_name)  )
   
        setpriceamount( item.particular_size_price-(parseInt(item.particular_size_price)* details.discount_percentage)/100)
        

    }} 

    style = {qnt === (item.sub_type_name) +' '+ (item.product_keyword_name)  ?{borderRadius:10,borderWidth:1,width:60,height:30,justifyContent:"center",alignItems:"center",margin:10,backgroundColor:"#005478",borderColor:"#005478"} :{borderRadius:10,borderWidth:1,width:60,height:30,justifyContent:"center",alignItems:"center",margin:10}}
   
   >
        <View >
          <Text  style= {qnt === (item.sub_type_name) +' '+ (item.product_keyword_name)? {color:"white"} :{color:"black"}} > {item.sub_type_name} {item.product_keyword_name}</Text>
      
    
            </View>
            </TouchableOpacity>):null
        // return array.
    
      }
  
      if(!fontsLoad ) {
        return (
          <View style={styles.container}>
              <ActivityIndicator />
              <StatusBar barStyle="default" />
          </View>
      );
    
          // from the custom App we return the component we assigned to RootApp.
         
      }
      else {
    return (
        <View  >
            {
                Platform.OS === 'android' ?
            
            <View style={{ backgroundColor: '#005478', borderWidth: 5, borderColor: '#fff', borderRadius: 100, height: 50, width: 50, justifyContent: 'center', bottom:"-3.7%",position:"absolute", zIndex: 1,alignSelf:"center", elevation: 9}}>
           <TouchableOpacity onPress={() =>  props.navigation.navigate('Search')}   activeOpacity={1.0}>
            <Image style={{ height: 25, width: 25, alignSelf: 'center' }} source={require('../../assets/searchIcon.png')}></Image>
            </TouchableOpacity>
            </View>: null
}

        <View style={{ height: '100%' }}>
        <StatusBar backgroundColor="#005478" style={Platform.OS === "android" ? "light" : "dark"} />
                        {/* {modalVisible == true ? <View style={styles.ModalContainer}>  */}
          

                        {isLoading ? 

<View style={{marginVertical:"100%"}}>
                            <ActivityIndicator
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                            visible={isLoading}
                            animating={isLoading}
                            color="black"
                            size="large"
                        />
                        </View> :
                                  
        
                internet ?
                    <ScrollView>
                        <View style={styles.container}>
                         
                        <View style={styles.section1}>
                        <View style={{ alignSelf:'center', flexDirection: 'row'}}>
           
                    <View style={{ marginLeft: 14 }}>
                    <Text></Text>
                    </View>

                <View style={{ justifyContent:'center',alignItems:'center',alignContent:"center"}}>
             <Text style={{ fontSize: 21, width: 260, fontFamily: 'Montserrat'}}> {i18n.t('dashbord')} </Text>   
          </View>
          </View>
         
                   
          <View style={{position:"absolute",right:-32,top:7}}>
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
                            {/* <Header1 title={i18n.t('dashbord')} backArrowInclude={false} optionsInclude={true} goBack={props} navigation={props.navigation} /> */}
                           
                            <View style={{ paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View>
                                    <Text style={{
                                        fontSize: 18, fontWeight: '500', fontFamily: 'Montserrat'
                                    }}>{i18n.t('categories')} </Text>
                                </View>
                                <View>
                                    <TouchableOpacity onPress={
                                        () => {
                                            props.navigation.navigate('AllcategoriesScreen',{categories_id:''})
                                        }
                                    }>
                                        <View style={{ width: 60, height: 30, backgroundColor: '#005478', borderRadius: 5, justifyContent: 'center' }}>
                                            <Text style={{ color: 'white', fontSize: 10, alignSelf: 'center', fontFamily: 'Montserrat' }}>
                                                {i18n.t('ViewAll')}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                    <View>

                                    </View>

                                </View>

                            </View>

                            <View style={styles.section2}>
                                <ScrollView horizontal={true}>
                                    {categories.map((item) => {

                                        // var ref=firebase.firestore().collection('category_list');

                                        return (
                                            <TouchableOpacity 
                                            key={item.Id}
                                                style={styles.box}
                                                onPress={
                                                    () => {
                                                   
                                                         props.navigation.navigate('AllcategoriesScreen',{categories_id:`${item.Id}`})
                                                   
                                                    }
                                                }>
                                                <View >
                                                    <View style={styles.innerBox} >
                                                        {!item.img_uri ?
                                                         <Image style={{ alignSelf: 'center', height: 70, width: 70, borderRadius: 4 }} source={require('../../assets/grocery.png')} /> :
                                                        <Image style={{ alignSelf: 'center', height: 70, width: 70, borderRadius: 4 }} source={{ uri: item.img_uri }} />
                                            }
                                                    </View>
                                                    <View>
                                                        <Text numberOfLines={1} style={styles.text}>{i18n.locale === 'en' ? item.name_eng : i18n.locale === 'gu' ? item.name_guj : item.name_hin}</Text>

                                                    </View>
                                                </View>
                                            </TouchableOpacity>


                                        )
                                    })}
                                </ScrollView>
                            </View>
                            <View style={styles.section3 } >
                            {/* <FlatListSlider 
                            images={sliderImage}
                            aspectRatio = {2}
                             width='window'
                              resizeMode='cover' 
                              showIndicator = {true}
                              indicatorSize = {15}
                              indicatorColor = '#d1d1d1'
                              indicatorActiveColor =  '#005478'
                              indicatorShape = "line"
                              pressable = {false}
                              borderWidth = {1}
                              borderColor = '#fff'
                      
                              /> */}
                                   <FlatListSlider 
                                    // height={240}
                                    timer={5000}
                                    width={(Dimensions.get('window').width)-38}
                                    onPress={item => item.images}
                                    height={180}
                                    timer={5000}
                                    contentContainerStyle={{paddingHorizontal:20,borderRadius:29}}
                                    indicatorContainerStyle={{position:'absolute',bottom:-15}}
                                    indicatorActiveColor={'#005478'}
                                    indicatorInActiveColor={'#005478'}
                                    indicatorActiveWidth={30}
                                    separatorWidth={30}
                                    animation
                                    data={sliderImage} 
                            
                                    imageKey={'images'}
                                  />

                                {/* <SliderBox
                                    autoplay={true}
                                    circleLoop={true}
                                    disableOnPress={false}
                                    dotColor={'black'}
                                    inactiveDotColor={'black'}
                                    dotStyle={
                                        {
                                            width: 20,
                                            height:3,
                                            borderWidth: 1,
                                            marginTop:10,
                                            borderColor: 'black',
                                            alignSelf: 'center'
                                        }
                                    }
                                    imageLoadingColor={`black`}
                                    ImageComponentStyle={
                                        {
                                            width: '100%',
                                            height: 140,
                                            borderRadius: 5,
                                         
                                        }
                                    }
                                    images={sliderImage}
                                     /> */}
                            </View>
                            <View style={{ paddingHorizontal: 19, flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                                <View>
                                    <Text style={{ fontSize: 18, fontWeight: '500', fontFamily: 'Montserrat',paddingLeft:3 }}>{i18n.t('NewArrival')}</Text>
                                </View>
                                <View>
                                    <TouchableOpacity onPress={
                                        () => {
                                            props.navigation.navigate('AllcategoriesScreen',{categories_id:''})
                                        }
                                    }>
                                        <View style={{ width: 60, height: 30, backgroundColor: '#005478', borderRadius: 5, justifyContent: 'center' }}>
                                            <Text style={{ color: 'white', fontSize: 10, alignSelf: 'center', fontFamily: 'Montserrat' }}>
                                                {i18n.t('ViewAll')}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.section4}>
               
                     {
                        <FlatList
                       numColumns={3}
                        style={{padding:3,paddingLeft:10}}
                        data={newArrival} 
                        renderItem={({item})=>{
                            return (
                             
                                <View  style={styles.newArrival}>
            {!item.discount_percentage ?null :<View style={{borderTopRightRadius:4,borderBottomRightRadius:4,position:"absolute",height:18,zIndex:1,backgroundColor:"#8cc63f",width:60,justifyContent:"center",alignItems:"center",alignContent:"center"}}>
                          <Text numberOfLines={1} style={{color:"#fff",fontWeight:"900",fontSize:12,alignSelf:"center"}}> {item.discount_percentage}% {i18n.t('off')}   </Text>
                        </View>}
                                                <View>

                                                    <TouchableOpacity onPress={() => {
                                                        if (pwexist.includes(item.product_id))
                                                            deletefromWishlist(item.product_id)
                                                        else addTo(item.product_id,item)

                                                    }}>
                                                        <View style={styles.heart}>


                                                            {
                                                                pwexist.includes(item.product_id) ? <Image style={{ height: 20, width: 20 }} source={require('../../assets/filledheart.png')} /> : <Image style={{ height: 20, width: 20 }} source={require('../../assets/heart.png')} />
                                                            }



                                                        </View>
                                                    </TouchableOpacity>

                                                    <TouchableOpacity onPress={
                                                        () => {
                                                            props.navigation.navigate('ProductScreen', { product: item, similarProducts: newArrival })
                                                        }
                                                    }>
                                                        <View style={{ height: 84, width: 74, alignSelf: 'center' }}>
                                            
                                                        {!item.img ? 
                                 <ImageBackground style={{ marginTop: 5, height: 84, width: 74 }} source={require('../../assets/PerffectLogoholder.png') }> 
                                 {item.is_out_of_stock === false ? 
                                      <Image style={{height:84,width:74,alignSelf:'center'}} source={i18n.locale==='en'?require('../../assets/Out_Of_Stock.png') :i18n.locale==='gu'?require('../../assets/Out_Of_Stock_guj.png'):require('../../assets/Out_Of_Stock_hi.png')}/> : null }
                                    </ImageBackground>
                                   :<ImageBackground style={{ marginTop: 5, height: 84, width: 74 }} source={{ uri: item.img }}>
                                      {item.is_out_of_stock === false ? 
                                      <Image style={{height:84,width:74,alignSelf:'center'}} source={i18n.locale==='en'?require('../../assets/Out_Of_Stock.png') :i18n.locale==='gu'?require('../../assets/Out_Of_Stock_guj.png'):require('../../assets/Out_Of_Stock_hi.png')}/> : null }
                                    </ImageBackground>}
                                                           
                                                        </View>
                                                        <View style={{ marginTop: 2 }}>
                                                            <Text style={{ alignSelf: 'center', fontSize: 14, fontFamily: 'MontserratSemiBold', fontWeight: '500', marginTop: 6, marginHorizontal: 3 }}>


                                                                {i18n.locale === 'en' ? getText(item.pro_name_en) : i18n.locale === 'gu' ? getText(item.pro_name_gu) : getText(item.pro_name_hi)}

                                                            </Text>
                                                            <Text style={{ alignSelf: 'center', fontFamily: 'Montserrat',paddingBottom:7 }}>{`\u20B9${parseFloat(item.pro_price).toFixed(2)}`}</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>

    
                            )
                        }}
                        keyExtractor={item => item.product_id}
                      />
                      
                     }
                    
                 </View> 
                        
                            
                        </View>
                    
                    </ScrollView>
                    
                    
                    : <View style={styles.containernew}>
                        <Image style={{ justifyContent: 'center', alignSelf: 'center', }} source={require('../../assets/noInternet.png')}>
                        </Image>
                        <Text style={{ fontFamily: 'Montserrat', color: '#333333', alignSelf: 'center', fontSize: 25, marginTop: 20 }}>{i18n.t('NoInternetConnection')} </Text>
                        <Text style={{ fontFamily: 'Montserrat', color: '#333333', alignSelf: 'center', fontSize: 20, marginTop: 10 }}>{i18n.t('PleaseTryAgainLater')}</Text>
                    </View>
                    
            }
         
  
 <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
            
          setModalVisible(!modalVisible)
          setQnt(0);
        }}
        style={{alignSelf:'center',backgroundColor:"#fff"}}
      >
        <View style={styles.centeredView}>
        {modalmsg==='update' ?  <View style={styles.modalView}>
        
         
            
              <Text style={{fontSize:17,fontWeight:"bold"}}>
             {i18n.t('updatealert')}    </Text>
             <View style={{alignItems:"center",alignContent:"center"}}>
              <Text style={{fontSize:14,alignSelf:"center",marginTop:10}}>{i18n.t('updatemsg')}</Text>
</View>
<View  style={{flex:1,flexWrap:"wrap",width:"100%"}}>

<TouchableOpacity 
style={{  height:30,
    borderRadius: 5,
    padding: 5,
  
    position:"absolute",right:70,bottom:0,
   }}
onPress={() => {
    setModalVisible(false)}}>
    <Text style={{color:"#005478"}}>{i18n.t('nothanks')}</Text>
</TouchableOpacity>
  
                 
        

        <TouchableOpacity 
        style={{  height:30,
            borderRadius: 5,
            padding: 5,
            elevation: 2,
            
    position:"absolute",right:0,bottom:0,
           backgroundColor:"#005478"}}
        onPress={() => updateApp()}>
            <Text style={{color:"#fff"}}>{i18n.t('update')}</Text>
        </TouchableOpacity>
        </View>
                        
          

            
        </View> :
            
          <View style={styles.modalView}>
            
          <TouchableOpacity  style={{position:"absolute",right:10,top:10}} onPress={() =>{ setModalVisible(false)
        setQnt(0)}}>
          <Image source={require('../../assets/close.png')} style={{height:30,width:30}} />
          </TouchableOpacity>
         
          <View  style={{height:100}}>
          <ScrollView horizontal={true}>
          {i18n.locale === 'en' ? 

                          <Text numberOfLines={1} style={{alignSelf:"center",fontSize:20,paddingHorizontal:10}}> {producteng}</Text> : i18n.locale === 'gu' ? <Text  numberOfLines={1} style={{alignSelf:"center",fontSize:20}}> {productguj}</Text> :  <Text  numberOfLines={1} style={{alignSelf:"center",fontSize:20}}> {producthin}</Text>}
                          </ScrollView>
                          <Text style={{alignSelf:"center"}}> {i18n.t('weigths')}</Text>
                
                                 
                          <ScrollView  horizontal={true}  showsHorizontalScrollIndicator={true} persistentScrollbar={true} >
                                      {
                                         renderOptions(keyword)
                                     
                                      }
                                      
                                  </ScrollView>
                               
      
                            
                          </View>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
              
                addToWishList()
                setQnt(0)  
            }}
            
            >
            {qnt  === 0 ?    <Text style={{color: "white",textAlign: "center"} }> {i18n.t('selectweigth')}</Text> :<Text style={{color: "white",textAlign: "center"} }> {i18n.t('addtowishlist')}</Text>}
            </TouchableOpacity>

          </View>
}
        </View>
      </Modal>
 

         
     
             <Animated.View
        style={[
          styles.fadingContainer,
          {
            // Bind opacity to animated value
            opacity: fadeadd
          }
        ]}
        
      >
        <Text style={styles.fadingText}>{i18n.t('addedtowishlist')}</Text>
      </Animated.View>
 
      <Animated.View
        style={[
          styles.fadingContainer,
          {
            // Bind opacity to animated value
            opacity: faderemove
          }
        ]}
      >
        <Text style={styles.fadingText}>{i18n.t('removedfromwishlist')}</Text>
      </Animated.View>
     

        </View>
        
        </View>
        )
}}


const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: 'white'
    },
    section1: {
        height: 70,
     
        marginTop: 25,
        alignItems:"center",
        flexDirection: 'row'
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
        paddingHorizontal:10,
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
    
    },
    heart: {
        alignSelf: 'flex-end',
        marginRight: 4,
        
    },
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
        height: 200,
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
const mapSatateToProps = (state) => ({
    state: state
})
export default (Dashbord)


// <View style={{flexDirection:'row'}}>
// {this.state.categories.map((item)=>{
//     return (
//         <View>

// <View style={styles.box}>
// <View style={styles.innerBox} >
// <Image  style={{alignSelf:'center'}} source={item.image}/>
// </View>
// <View>
// <Text style={styles.text}>Categories</Text>
// <Text style={styles.text}>Name</Text>
// </View>
// </View>

//         </View>
//     )
// })}


// </View>
