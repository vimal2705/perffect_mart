import React,{useState} from 'react';
import {View,Text,StyleSheet,Image,TouchableOpacity,ActivityIndicator} from 'react-native';
import syncStorage from 'sync-storage';
import Header1 from './Header1';
import i18n from 'i18n-js';
import { StatusBar } from 'expo-status-bar';
import NetInfo from "@react-native-community/netinfo";
import * as firebase from "firebase"
import {useNavigation} from '@react-navigation/native';

const OrderConfirmScreen=(props)=>{
  const [isLoading, setIsLoading] = useState(false)
  const [order, setorder] = useState([])
  const [invoice,setinvoice] =useState(0)
    React.useEffect(() => {
      counter()
        const unsubscribe = props.navigation.addListener('focus', () => {
            // The screen is focused
          
            syncStorage.set('isBasket', true)
          
            
            // Call any action
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount

        const unsubscribeinternet = NetInfo.addEventListener(state => {
            console.log("Connection type____", state.type);
            
            console.log("Is connected___?", state.isConnected);
          
          
          });
          return ()=>{
            unsubscribe
            unsubscribeinternet
        }      }, [props.navigation]);


      const deletedoc = () =>
        {
        
            firebase.
            firestore()
            .collection('my_basket')
            .doc(syncStorage.get('user_id'))
            .delete().
            then(()=>{
               
               props.navigation.reset({
                    index: 1,
                    routes: [{name: 'drawer'}],
                  }); 
                   
                //  props.navigation.navigate('Dashboard')
            })

        }

        const counter = () =>
        {
          setIsLoading(true)
            firebase.
            firestore()
            .collection('users_list')
            .doc(syncStorage.get('user_id'))
            .get()
           .then((snapShot)=>{
             setinvoice(snapShot.data().invoice_count)
           setIsLoading(false)

           }).catch(error=>alert(error))
  
      }

     
        const navigation = useNavigation();
    return (
        <View style={styles.container}>
                      <StatusBar backgroundColor="#005478" style={Platform.OS === "android" ? "light" : "dark"} />
     
        <Header1 title={i18n.t('ConfirmOrder')} backArrowInclude={true} optionsInclude={false}  goBack={props} />
        {isLoading ? 

<View style={{marginVertical:"80%"}}>
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
          <View style={{flex:1,justifyContent:'center'}}>
         
     <Image style={{alignSelf:'center'}} source={require('../../assets/success.png')}/>
      <Text style={{fontFamily:'MontserratSemiBold',alignSelf:'center',fontSize:20,fontWeight:'bold',marginTop:20}}>{i18n.t('OrderSuccessfullyPlaced')}</Text>
      <Text style={{fontFamily:'Montserrat',alignSelf:'center',marginTop:20}}>{i18n.t('Yourinvoicenumberis')} {invoice}</Text>
      <Text style={{fontFamily:'Montserrat',alignSelf:'center',marginTop:10}}>{i18n.t('Wellprocessyourorderassoonaspossible')}</Text>
      <TouchableOpacity onPress={ deletedoc}>
      <View style={{height:50,width:270,backgroundColor:'#005478',alignSelf:'center',borderRadius:10,justifyContent:'center',marginTop:20}}>
      <Text style={{fontFamily:'Montserrat',color:'white',alignSelf:'center',fontWeight:'500',fontSize:20}}>{i18n.t('ContinueShopping')}</Text>
    </View>
      </TouchableOpacity>
    </View>
}
    <View style={{height:'7%',backgroundColor:'#005478',zIndex:1000,display:'flex',flexDirection:'row',justifyContent:'space-between',padding:10}}/>
        </View>
                          
    )
}
const styles=StyleSheet.create({
    container:{
        height:'100%',
        
    },
    section1:{
        flexDirection:'row',
        paddingTop:40,
        justifyContent:'space-between',
        paddingHorizontal:20,
        height:'20%'
        
    },
})
export default OrderConfirmScreen