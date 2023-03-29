import React, { useEffect, useState,useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image,Dimensions,ActivityIndicator ,FlatList} from 'react-native';
import syncStorage from 'sync-storage';
import * as firebase from 'firebase';
import I18n from 'i18n-js';
import moment from 'moment';
import { StatusBar } from 'expo-status-bar';
import { ScrollView } from 'react-native';
import {fetchnotifications,fetchMorenotifications} from './notilist'

const Notifications = (props) => {
    const [orders, setOrders] = useState([])
    const [notificationsperload]  =React.useState(5)

     const [startAfter, setstartAfter] = React.useState(Object);
     const [lastNotification, setlastNotification] = useState(false)

    const [order, setorder] = useState([])
    const [key, setkey] = useState('')
    const [deleteorder, setdeleteorder] = useState([])
    const [Height,setHeight]=useState(0);
    const [isLoading, setisLoading] = useState(false)

    async function  getNotification() {
        setisLoading(true)
        const notificationsData = await fetchnotifications(notificationsperload);
        setOrders([...orders,...notificationsData.notifications])
        setstartAfter(notificationsData.lastVisible)
        setisLoading(false)
      }  
      async function getMoreNotification() {
        if(!lastNotification){
        const notificationsData = await fetchMorenotifications(startAfter,notificationsperload);
        setOrders([...orders,...notificationsData.notifications])
        setstartAfter(notificationsData.lastVisible)
    
        notificationsData.notifications.length==0? ( setlastNotificationt(true)):  setlastNotification(false)
       
      } 
     
      
    } 
 useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
        setHeight(Dimensions.get('window').Height);
        syncStorage.set('isBasket', false)
            getNotification()
        });
        return unsubscribe;
    
    }, [props.navigation]);
   
    const deletenotification = () => {

        firebase
       .firestore()
       .collection('notification_list')
       .doc(syncStorage.get('user_id'))
       .collection('noti_list')
       .get()
       .then((querySnapshot) => {
       querySnapshot.forEach((doc) => {
         doc.ref.delete();
         setOrders(0)
         alert('notification clear')
       });
     });

            
            
}
let keyExtractor = useCallback((item) => item.orderKey);
 
let itemView = useCallback (({item}) => 

                 <View key={item.orderKey} style={{ backgroundColor: '#F2F2F2', padding: 10, borderRadius: 10, borderWidth: 1, marginTop: 10, borderColor: 'lightgrey' }}>
                                        <TouchableOpacity onPress={
                                            ()=>{
                                             
                                               setkey(item.orderKey)
                                               props.navigation.navigate('OrderDetailes',{order_id:item.orderKey})
                                            }
                                        }>
                                        <View style={{ flexDirection: 'row' }}>
                                          
                                           <View style={{ width: '30%', justifyContent: 'center' }}>
                                                <Image style={{ alignSelf: 'center', height:60,width:60}} source={require('../../assets/Parcel.png')} />
                                            </View>
                                            <View style={{ width: '70%' }}>
                                                <Text style={{ fontSize: 15 }}>{item.body}</Text>
                                                <Text style={{ fontSize: 15, marginTop: 10 }}>{I18n.t('OrderDate')} : {converDate(item.timestamp)}</Text>
                                                <Text style={{ fontSize: 15, marginTop: 10 }}>{I18n.t('Time')} : {convertime(item.timestamp)}</Text>
                                                <Text style={{ marginTop: 10, fontSize: 15 }}>{I18n.t('OrderID')} : {item.order_id}</Text>
                                            </View>
                                        </View>
                                        </TouchableOpacity>
                                       {/* <TouchableOpacity style={{ position:"absolute",right:0}} onPress={dele}>
                                                <View>
                                        <Image style={{  height:30,width:30}} source={require('../../assets/close.png')} />
                                        </View>
                                        </TouchableOpacity> */}

                                    </View>
);



// const deletesinglenotification = () => {

//     firebase
//    .firestore()
//    .collection('notification_list')
//    .doc(syncStorage.get('user_id'))
//    .collection('noti_list')
//    .get().then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//         console.log(`${doc.id} => ${doc.data()}`);
//     });
//  });

        
        
// }
    // const getproducts = () => {
    //     setisLoading(true)
    //     firebase
    //         .firestore()
    //         .collection('notification_list')
    //         .doc(syncStorage.get('user_id'))
    //         .collection('noti_list')
    //         .orderBy('timestamp','desc')
    //         .get()
    //         .then(ss => {
    //             var array = []
    //             ss.forEach(item => {
    //                 array.push(item.data())
    //                 console.log('---->',item.data().orderKey)

                   
    //             })

    //             setOrders(array)
    //             setisLoading(false)
               
    //         })
    // }


    
    const converDate = (timestamp) => {
      
        //var formatted = timestemp.format("dd/mm/yyyy hh:MM:ss");
        var time =  moment(timestamp).format("DD-MM-YYYY");
        return time
    }
    const convertime = (timestamp) => {
      
        //var formatted = timestemp.format("dd/mm/yyyy hh:MM:ss");
        var time =  moment(timestamp).format("hh:mm:ss a");
        return time
    }
    return (
        <View style={styles.container}>
                     <StatusBar backgroundColor="#005478" style={Platform.OS === "android" ? "light" : "dark"} />
             {
                Platform.OS === 'android' ?
            
            <View style={{ backgroundColor: '#005478', borderWidth: 5, borderColor: '#fff', borderRadius: 100, height: 50, width: 50, justifyContent: 'center', bottom:"-3.7%",position:"absolute", zIndex: 1,alignSelf:"center", elevation: 9}}>
           <TouchableOpacity onPress={() => this.props.navigation.navigate('Search')}   activeOpacity={1.0}>
            <Image style={{ height: 25, width: 25, alignSelf: 'center' }} source={require('../../assets/searchIcon.png')}></Image>
            </TouchableOpacity>
            </View>: null
}
            {isLoading ? <View style={{marginVertical:"100%"}}>
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
                        </View> :null}
            <View style={styles.secttion1}>
                <TouchableOpacity onPress={
                    () => {
                        props.navigation.goBack();
                    }
                }>
                    <View style={{ marginLeft: 20}}>
                    <Image style={{  height:30,width:30 }} source={require('../../assets/backArrow.png')}></Image>
                    </View>
                </TouchableOpacity>
               <View style={{justifyContent:'center',height:40,alignItems:'center',alignContent:"center"}}>
               <Text style={{ fontSize: 21,  width: 240, fontFamily: 'Montserrat',marginTop:5,marginLeft:2  }}> {I18n.t('Notifications')} </Text>   
            </View>
            <TouchableOpacity style={{justifyContent:'center',position:"absolute",right:23}} onPress={deletenotification}  disabled={orders == 0} activeOpacity={orders >= 1? 0.5 : 1} > 
                    <View style={{justifyContent:'center',height:30,borderWidth:1,borderRadius:10,paddingHorizontal:3}}>
                    <Text> {I18n.t('clearall')}</Text>
                    </View>
                </TouchableOpacity>

            </View>
    
              
            <View>
            <View style={{ marginHorizontal: '5%',marginBottom:100 }}>
            {
                orders.length>0?
                <View>
                <FlatList
                  data={orders}
                  keyExtractor = {keyExtractor}
                  renderItem={itemView}
                  onEndReached={getMoreNotification}
                  onEndReachedThreshold={1}
                  scrollEventThrottle={10}
                 
                />
              </View>
            
                    // <View style={{ marginHorizontal: '5%', marginTop: 10 }}>

                    //     {
                    //         orders.map((item) => {

                    //             return (

                    //                 <View style={{ backgroundColor: '#F2F2F2', padding: 10, borderRadius: 10, borderWidth: 1, marginTop: 10, borderColor: 'lightgrey' }}>
                    //                     <TouchableOpacity onPress={
                    //                         ()=>{
                                             
                    //                            setkey(item.orderKey)
                    //                            props.navigation.navigate('OrderDetailes',{order_id:item.orderKey})
                    //                         }
                    //                     }>
                    //                     <View style={{ flexDirection: 'row' }}>
                                          
                    //                        <View style={{ width: '30%', justifyContent: 'center' }}>
                    //                             <Image style={{ alignSelf: 'center', height:60,width:60}} source={require('../../assets/Parcel.png')} />
                    //                         </View>
                    //                         <View style={{ width: '70%' }}>
                    //                             <Text style={{ fontSize: 15 }}>{item.body}</Text>
                    //                             <Text style={{ fontSize: 15, marginTop: 10 }}>{I18n.t('OrderDate')} : {converDate(item.timestamp)}</Text>
                    //                             <Text style={{ fontSize: 15, marginTop: 10 }}>{I18n.t('Time')} : {convertime(item.timestamp)}</Text>
                    //                             <Text style={{ marginTop: 10, fontSize: 15 }}>{I18n.t('OrderID')} : {item.order_id}</Text>
                    //                         </View>
                    //                     </View>
                    //                     </TouchableOpacity>
                    //                     {/* <TouchableOpacity style={{ position:"absolute",right:0}} onPress={dele}>
                    //                             <View>
                    //                     <Image style={{  height:30,width:30}} source={require('../../assets/close.png')} />
                    //                     </View>
                    //                     </TouchableOpacity> */}

                    //                 </View>


                    //             )

                    //         })
                    //     }
                        
                    // </View>
                    : <View  style={{ height: '80%', justifyContent: 'center'}}>
                    <View style={{marginTop:'50%',alignSelf:'center', justifyContent: 'center' }}>
                    <Image style={{ height: 310, width: 300, justifyContent: 'center', alignSelf: 'center' }} source={require('../../assets/EmptyView.png')}></Image>
                </View>
                    </View>

            }
              </View>
        </View>
  
         
            </View>

    )
}
const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: 'white'
    },
    secttion1: {
        height: 70,
        backgroundColor: '#Ffffff',
        marginTop: 25,
        alignItems:"center",
        flexDirection: 'row'

    },
})
export default Notifications