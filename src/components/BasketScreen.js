import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView ,ActivityIndicator,Dimensions,FlatList} from 'react-native';
import Header1 from './Header1';
import SyncStorage from 'sync-storage';
import * as firebase from 'firebase';
import syncStorage from 'sync-storage';
import NetInfo from "@react-native-community/netinfo";
import library from './library';
import { StatusBar } from 'expo-status-bar';
import i18n from 'i18n-js';
import { set } from 'react-native-reanimated';
const BasketScreen = (props) => {

    React.useEffect(() => {

      
        setLoader(true)
      

      
        const unsubscribe = props.navigation.addListener('focus', () => {
            syncStorage.set('isBasket', true)
            // The screen is focused
        getProducts()
          
            setHeight(Dimensions.get('window').height)
            unsubscribeinternet
            // Call any action
        });
        setLoader(false) 
        // Return the function to unsubscribe from the event so it gets removed on unmount

        const unsubscribeinternet = NetInfo.addEventListener(state => {
            console.log("Connection type____", state.type);
            
            console.log("Is connected___?", state.isConnected);
           setInternet(state.isConnected) 
          
          });
        
          return ()=>{
            unsubscribe
            unsubscribeinternet
           
        }    
    
 }, [props.navigation]);
    const [products, setProduct] = useState([]);
    const [price,setprice] = useState(0)
    const [totalPrice, settotalPrice] = useState(0);
    const [product_gst, setproduct_gst] = useState(0)
    const [isLoading,setLoader]=useState(false)
    const [count,setCount]=useState(0)
    const [internet,setInternet]=useState(false);
    const [Height,setHeight]=useState(0);
    const [invoice, setinvoice] = useState(0)

    const getProducts = () => {
    
        setLoader(true)
        firebase.
            firestore()
            .collection('my_basket')
            .doc(syncStorage.get('user_id'))
            .collection('item_list')
            .get()
            .then((snapshot) => {
                console.log();
                var array = [];
                var totalPrice = 0;
                var product_gst = 0;
                snapshot.forEach(item => {
                    array.push(item.data())
                    totalPrice = parseFloat(totalPrice) + parseFloat(item.data().totalPrice) ;
                    console.log('--->>>>',item.data().product_gst);
             if(!item.data().product_gst)
             {
                product_gst = 0
             }
             else{
                product_gst = product_gst +  parseInt( item.data().product_gst );
             }
                   
   
               
                })
                setProduct(array)
             
                settotalPrice(totalPrice)
                {product_gst === undefined
                ?
                  setproduct_gst(0)
                :
             setproduct_gst(product_gst)


                }
  
                
                var amount = totalPrice + product_gst
                setprice(amount)
                
               
            })
            setLoader(false)
    }
     
   const deleteDoc = (id) => {

        firebase.
            firestore()
            .collection('my_basket')
            .doc(syncStorage.get('user_id'))
            .collection('item_list')
            .doc(id)
            .delete()
            .then(() => {
               getProducts()
            })
    
    }
    const minusOne=(item,id,qnt)=>{
        firebase.
        firestore()
        .collection('my_basket')
        .doc(syncStorage.get('user_id'))
        .collection('item_list')
        .doc(id)
        .set({
            ...item,
            product_qnt:qnt-1,
            totalPrice:parseInt(item.product_price)*(parseInt(qnt-1)),
            product_gst:parseInt(item.product_det.pro_gst)*(parseInt(qnt-1))
        }).then(()=>{
            getProducts()
        })
    }
    const plusOne=(item,id,qnt)=>{
        firebase.
        firestore()
        .collection('my_basket')
        .doc(syncStorage.get('user_id'))
        .collection('item_list')
        .doc(id)
        .set({
            ...item,
            product_qnt:qnt+1,
            totalPrice:parseInt(item.product_price)*(parseInt(qnt+1)),
            product_gst:parseInt(item.product_det.pro_gst)*(parseInt(qnt+1))
        }).then(()=>{
            getProducts()
        })
    }
    const counterOne=()=>{
        firebase.
        firestore()
        .collection('users_list')
        .doc(syncStorage.get('user_id'))
        .add({
         
            invoice_count:invoice+1,
           
        }).then(()=>{
            getProducts()
        })
    }
    return (
<View>
{isLoading ? 

<View style={{marginVertical:"90%"}}>
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
                        </View> : internet ?       
                        
                        <View style={styles.container}>
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
             <Text style={{ fontSize: 21,  width: 260, fontFamily: 'Montserrat'}}> {i18n.t('myBasket')}</Text>   
          </View>
          </View>
       
                 
     

          </View>
                        <StatusBar backgroundColor="#005478" style={Platform.OS === "android" ? "light" : "dark"} />
 
   <ScrollView>
  
 {
    products.length>0?
      <View>
                      
     <View style={styles.section3}> 
     { <FlatList
                       numColumns={2}
                             style={{padding:3,paddingLeft:10}}
                        data={products}
                        renderItem={({item})=>{
                            return (
                                <View style={styles.newArrival}>
                                <View>
                                {
                                   <View style={styles.heart}>
                                    <TouchableOpacity onPress={
                                        ()=>{
                                          deleteDoc(item.product_det.product_id)
                                        }
                                    }>
                                    <Image style={{height:20,width:20}} source={require('../../assets/close.png')}/>
                                    </TouchableOpacity>
                                    </View>
                                }
                                
                                  
                                 <View style={{height:94,width:74,alignSelf:'center'}}>
                                 <TouchableOpacity onPress={() => 
                                        props.navigation.navigate('ProductScreen',{product:item.product_det})
                                    }
                                    >
                                 <Image style={{marginTop:5,height:84,width:74}} source={{uri:item.product_det.img}}>
                                  </Image>
                                  </TouchableOpacity>
                                 </View>
                                
                                
                                <View style={{marginTop:2,marginHorizontal:15}}>
                                  <Text numberOfLines={1}  style={{alignSelf:'center',fontSize:14,marginTop:6,fontFamily:'MontserratSemiBold' }}>
                                  {i18n.locale==='en'?item.product_det.pro_name_en:i18n.locale==='hi'?item.product_det.pro_name_hi:item.product_det.pro_name_gu}
                                  </Text>
                                 { item.product_size === 0 ? null :<Text style={{alignSelf:'center',fontSize:14,fontWeight:'500',marginTop:1,fontFamily:'Montserrat'}}>
                                   {`${item.product_size}`}
                                  </Text>}
                                  <Text style={{alignSelf:'center',marginTop:3,fontFamily:'Montserrat'}}>{`\u20B9${item.totalPrice}`}</Text>
                                  <View style={{ flexDirection: 'row' ,alignSelf:'center',marginTop:3}}>
                                              <TouchableOpacity onPress={
                                                  () => {
                                                     
                                                     minusOne(item,item.product_det.product_id,item.product_qnt)
                                                    
                                                
                                                  }
                                              }>
                                                  <Image style={{ marginHorizontal: 5,height:20,width:20 }} source={require('../../assets/remove.png')}></Image>
                                              </TouchableOpacity>
                                              <Text >{item.product_qnt}</Text>
                                              <TouchableOpacity onPress={
                                                  () => {
                                                     plusOne(item,item.product_det.product_id,item.product_qnt)
                                                  }
                                              }>
                                                  <Image style={{ marginHorizontal: 5 ,height:20,width:20}} source={require('../../assets/add.png')}></Image>
                                              </TouchableOpacity>
                                          </View>
                          
                          
                          
                          
                          
                                
                                 </View>
                                
                           
                            
                                </View>
                              </View>
    
                            )
                        }}
                        keyExtractor={item => item.id}
                      />
                      
                     }
    
     </View>
       <View style={{padding:30}}>
       <View style={{justifyContent:'space-between',flexDirection:'row',marginTop:5}}>
  
       <Text style={{fontFamily:'MontserratSemiBold'}}>{i18n.t('BillDetailes')}</Text>
      <Text></Text>
    
       </View>
       <View style={{borderBottomWidth:1,paddingBottom:10}}>
       <View style={{justifyContent:'space-between',flexDirection:'row',marginTop:5}}>
       <Text style={{fontFamily:'Montserrat'}}>{i18n.t('ItemTotal')}</Text>
       <Text>{`\u20B9`+totalPrice}</Text>
       </View>
       <View style={{justifyContent:'space-between',flexDirection:'row',marginTop:5}}>
       <Text style={{fontFamily:'Montserrat'}}>{i18n.t('Delivery')}</Text>
       <Text>{`\u20B9`+0}</Text>
       </View>
       <View style={{justifyContent:'space-between',flexDirection:'row',marginTop:5}}>
       <Text style={{fontFamily:'Montserrat'}}>{i18n.t('TaxesandCharges')}</Text>
       {product_gst == NaN ?<Text>{`\u20B9`}0</Text>:<Text>{`\u20B9`+product_gst}</Text> }
       
       </View>
       </View>
       <View style={{justifyContent:'space-between',flexDirection:'row',marginTop:5}}>
       <Text style={{fontWeight:'bold',fontFamily:'MontserratSemiBold'}}>{i18n.t('TotalPrice')}</Text>
       <Text style={{fontWeight:'bold',}}>{`\u20B9`+ price}  </Text>
       </View>
       
      
       </View>
  
      </View>
     :<View style={{height:Height-190,justifyContent:'center'}}>
     <View  style={{ height: '80%', justifyContent: 'center'}}>
       <Image style={{height:310,width:300,alignSelf:'center',justifyContent: 'center'}} source={require('../../assets/EmptyView.png')}/>
       </View>
        
     
     </View>  
 }


   </ScrollView>
 
     
       <View style={{ height: '7%', backgroundColor: '#005478', zIndex: 1000, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
           {
               products.length>0?<Text style={{ fontSize: 16, color: 'white', marginLeft: 20, marginTop: 5 }}>{`\u20B9` + price}</Text>:null
           }
           <TouchableOpacity
               onPress={
                   () => {
                      
                       props.navigation.navigate('OrderSummary',{products:products,Amount: price ,Gst :product_gst,total: totalPrice})
                   }

               }>
               {products.length>0?<View style={{ backgroundColor: 'white', padding: 5, marginRight: 20, borderRadius: 5 }}>
               <Text style={{ fontFamily:'Montserrat',fontSize: 14, fontWeight: 'bold' ,}}>{i18n.t('PlaceOrder')}</Text>
           </View>:null}
           </TouchableOpacity>
       </View>
   </View>
:<View style={styles.containernew}>
<Image style={{justifyContent:'center',alignSelf:'center',}} source={require('../../assets/noInternet.png')}>
</Image>
<Text style={{fontFamily:'Montserrat',color:'#333333',alignSelf:'center',fontSize:25,marginTop:20}}>{i18n.t('NoInternetConnection')} </Text>
<Text style={{fontFamily:'Montserrat',color:'#333333',alignSelf:'center',fontSize:20,marginTop:10}}>{i18n.t('PleaseTryAgainLater')}</Text>
</View>}
</View> )

}
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

    
        newArrival: {
            alignContent:"center",
            height: 235,
            width: '49%',
            borderWidth: 1,
            borderColor: '#E9E9E9',
            marginHorizontal: 2,
            marginTop: 14
    
    },containernew: {
        height: '100%',
       
        justifyContent: 'center'
    },
    heart: {
        alignSelf: 'flex-end',
        marginRight: 4,
        marginTop: 4
    },
    section3: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        display: 'flex',
        padding: 10,
        justifyContent: 'center',
        
    }
})
export default BasketScreen