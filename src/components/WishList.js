import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView,FlatList, ActivityIndicator ,Dimensions,ImageBackground} from 'react-native';
import syncStorage from 'sync-storage';
import Header1 from './Header1';
import library from './library';
import i18n from 'i18n-js';
import { StatusBar } from 'expo-status-bar';
import * as firebase from 'firebase';
const WishList = (props) => {
    React.useEffect(() => {
        setLoading(true)
        const unsubscribe = props.navigation.addListener('focus', () => {

            syncStorage.set('isBasket',false)
            getproducts()
            // getoutofstockproducts()
            setHeight(Dimensions.get('window').height)

        });
        setLoading(false)
        return unsubscribe;

            
    }, [props.navigation]);

    const getproducts = () => {
        setLoading(true)
        firebase.firestore()
            .collection('wish_list')
            .doc(syncStorage.get('user_id'))
            .collection('item_list')
            .get()
            .then((ss) => {
                var array = []
                var outofstockarr = []
                ss.forEach((item) => {
                    if(item.data().product_det.is_out_of_stock == true)
                    {
                    array.push(item.data())
                    console.log('--->true');
                    }
                    else
                    {
                      outofstockarr.push(item.data())
                        console.log('--->false');
                    }

                })
                setoutofStock(outofstockarr)
                setProducts(array)
                setLoading(false)
            })
    }

    // const getoutofstockproducts = () => {
    //     setLoading(true)
    //     firebase.firestore()
    //         .collection('wish_list')
    //         .doc(syncStorage.get('user_id'))
    //         .collection('item_list')
   
    //         .get()
    //         .then((ss) => {
    //             var array = []
    //             var outofstockarr = []
    //             ss.forEach((item) => {
    //                 if(item.data().product_det.is_out_of_stock == true)
    //                 {
    //                 array.push(item.data())
    //                 console.log('--->true');
    //                 }
    //                 else{
    //                     outofstockarr.push(item.data())
    //                     console.log('--->false');
    //                 }

    //             })
    //             setoutofStock(array)
    //             setLoading(false)
    //         })
    // }



    const plusOne = (item, id, qnt) => {
        setLoading(true)
        firebase.
            firestore()
            .collection('wish_list')
            .doc(syncStorage.get('user_id'))
            .collection('item_list')
            .doc(id)
            .set({
                ...item,
                product_qnt: qnt + 1,
                totalPrice: parseInt(item.product_price) * (parseInt(qnt) + 1),
                product_gst: parseInt(item.product_det.pro_gst) * (parseInt(qnt) + 1)
            }).then(() => {
                getproducts()
                setLoading(false)
            })
    }
    const deleteDoc = (id) => {

        firebase.
            firestore()
            .collection('wish_list')
            .doc(syncStorage.get('user_id'))
            .collection('item_list')
            .doc(id)
            .delete()
            .then(() => {
                getproducts()
            })

    }
    const minusOne = (item, id, qnt) => {
        setLoading(true)
        firebase.
            firestore()
            .collection('wish_list')
            .doc(syncStorage.get('user_id'))
            .collection('item_list')
            .doc(id)
            .set({
                ...item,
                product_qnt: qnt - 1,
                totalPrice: parseInt(item.product_price) * (parseInt(qnt) - 1),
                product_gst: parseInt(item.product_det.pro_gst) * (parseInt(qnt) - 1)
            }).then(() => {
                getproducts()
                setLoading(false)
            })
    }
    const clearWishList = () => {
        products.forEach(item => {
            deleteDoc(item.product_det.product_id)
        })

    }
    const copytobasket = () => {
        const ref = firebase.
            firestore()
            .collection('my_basket')
            .doc(syncStorage.get('user_id'))
            .collection('item_list')

        products.forEach((item) => {
            ref.doc(item.product_det.product_id).set(item)
        })

    }
    const [products, setProducts] = useState([])
    const [outofStock, setoutofStock] = useState([])
    const [count, setCount] = useState(0)
    const [isLoading, setLoading] = useState(false)
    const [height,setHeight]=useState(0);
    return (
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
             <Text style={{ fontSize: 21,  width: 260, fontFamily: 'Montserrat'}}> {i18n.t('WishList')}</Text>   
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
                     <StatusBar backgroundColor="#005478" style={Platform.OS === "android" ? "light" : "dark"} />
             {
                Platform.OS === 'android' ?
            
            <View style={{ backgroundColor: '#005478', borderWidth: 5, borderColor: '#fff', borderRadius: 100, height: 50, width: 50, justifyContent: 'center', bottom:"-3.7%",position:"absolute", zIndex: 1,alignSelf:"center", elevation: 9}}>
           <TouchableOpacity onPress={() => props.navigation.navigate('Search')}   activeOpacity={1.0}>
            <Image style={{ height: 25, width: 25, alignSelf: 'center' }} source={require('../../assets/searchIcon.png')}></Image>
            </TouchableOpacity>
            </View>: null
}

            {/* <Header1 title={i18n.t('WishList')} backArrowInclude={true} optionsInclude={true} goBack={props} navigation={props.navigation} /> */}

           

            {(products.length) > 0 || ( outofStock.length) > 0 ? 
                <ScrollView>

                    { products.length > 0 ?  
                        <View>
                    <View style={styles.section3}>
                    {
                        <FlatList
                        contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
                       numColumns={2}
                        style={{padding:3,paddingLeft:10}}
                        data={products}
                        renderItem={({item})=>{
                            return (
                             
                                <View style={styles.newArrival}>
                                <View>
                                    <TouchableOpacity onPress={
                                        () => {
                                            console.log('asdas',item.product_det.product_id);
                                            deleteDoc(item.product_det.product_id)
                                        }
                                    }>


                                        <View style={styles.heart}>
                                            <Image style={{ height: 20, width: 20 }} source={require('../../assets/close.png')} />
                                        </View>
                                    </TouchableOpacity>



                                    <View style={{ height: 94, width: 74, alignSelf: 'center' }}>

                                    {!item.product_det.img ? 
                                 <ImageBackground style={{ marginTop: 5, height: 84, width: 74 }} source={require('../../assets/PerffectLogoholder.png') }> 
                                 {item.product_det.is_out_of_stock === false ? 
                                      <Image style={{height:84,width:74,alignSelf:'center'}} source={i18n.locale==='en'?require('../../assets/Out_Of_Stock.png') :i18n.locale==='gu'?require('../../assets/Out_Of_Stock_guj.png'):require('../../assets/Out_Of_Stock_hi.png')}/> : null }
                                    </ImageBackground>
                                   :<ImageBackground style={{ marginTop: 5, height: 84, width: 74 }} source={{ uri: item.product_det.img }}>
                                      {item.is_out_of_stock === false ? 
                                      <Image style={{height:84,width:74,alignSelf:'center'}} source={i18n.locale==='en'?require('../../assets/Out_Of_Stock.png') :i18n.locale==='gu'?require('../../assets/Out_Of_Stock_guj.png'):require('../../assets/Out_Of_Stock_hi.png')}/> : null }
                                    </ImageBackground>}
                                    </View>

                                    <View style={{marginTop:2,marginHorizontal:15}}>
                                  <Text numberOfLines={1}  style={{alignSelf:'center',fontSize:14,marginTop:6,fontFamily:'MontserratSemiBold' }}>
                                  {i18n.locale==='en'?item.product_det.pro_name_en:i18n.locale==='hi'?item.product_det.pro_name_hi:item.product_det.pro_name_gu}
                                  </Text>
                                
                                    </View>

                                    <Text style={{alignSelf:'center',fontSize:14,fontWeight:'500',marginTop:1,fontFamily:'Montserrat'}}>
                                   {`${item.product_size}`}
                                  </Text>
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
    
                            )
                        }}
                        keyExtractor={item => item.id}
                      />
                      
                     }
                       
                    </View>
                    <View>
                        <TouchableOpacity onPress={
                            () => {
                                copytobasket()
                                setProducts([])
                                clearWishList()
                                props.navigation.navigate('BasketScreen')
                            }
                        }>
                            <View style={{ justifyContent: 'center', flexDirection: 'row', backgroundColor: '#005478', height: 40, marginTop: 20, borderRadius: 20, padding: 10, paddingHorizontal: 10,paddingLeft:10,paddingRight:10,alignSelf: 'center' ,marginBottom:15}}>
                                <Text style={{ alignSelf: 'center', color: 'white', fontSize: 10 }}>{i18n.t('AddToBasket')}</Text>
                                <Image style={{ height: 18, width: 18, marginLeft: 5 }} source={require('../../assets/basketIcon.png')} />
                            </View>
                        </TouchableOpacity>
                    </View>

                    </View> 
            : null}
                    {outofStock.length > 0 ? 

                    <View style={{borderTopLeftRadius:15,borderTopRightRadius:15,backgroundColor:"#fff", shadowColor: "#2222",
                    shadowOpacity: 1,
                    shadowRadius: 2,
                    elevation:10,
                    shadowOffset: {
                      height: 20,
                      width: 1
                    },}}>
                    <Text style={{alignSelf:"center",marginTop:10}}>{i18n.t('thisproductarenotunavailable')}</Text>

                  
                  
                  <View style={styles.section3}>
                  {
                      <FlatList
                 
                     numColumns={2}
                      style={{padding:8}}
                      data={outofStock}
                      renderItem={({item})=>{
                          return (
                           
                              <View style={styles.newArrival}>
                              <View>
                                  <TouchableOpacity onPress={
                                      () => 
                                      {
                                          console.log('asd',item.product_det.product_id);
                                          deleteDoc(item.product_det.product_id)
                                      }
                                  }>


                                      <View style={styles.heart}>

                                          <Image style={{ height: 20, width: 20 }} source={require('../../assets/close.png')} />
                                      </View>
                                  </TouchableOpacity>



                                  <View style={{ height: 94, width: 74, alignSelf: 'center', marginTop: 10 }}>
                                  {!item.product_det.img ? 
                                 <ImageBackground style={{ marginTop: 5, height: 94, width: 84 }} source={require('../../assets/PerffectLogoholder.png') }> 
                                 {item.product_det.is_out_of_stock === false ? 
                                      <Image style={{height:84,width:74,alignSelf:'center'}} source={i18n.locale==='en'?require('../../assets/Out_Of_Stock.png') :i18n.locale==='gu'?require('../../assets/Out_Of_Stock_guj.png'):require('../../assets/Out_Of_Stock_hi.png')}/> : null }
                                    </ImageBackground>
                                   :<ImageBackground style={{marginTop: 5, height: 94, width: 84  }} source={{ uri: item.product_det.img }}>
                                      {item.is_out_of_stock === false ? 
                                      <Image style={{height:84,width:74,alignSelf:'center'}} source={i18n.locale==='en'?require('../../assets/Out_Of_Stock.png') :i18n.locale==='gu'?require('../../assets/Out_Of_Stock_guj.png'):require('../../assets/Out_Of_Stock_hi.png')}/> : null }
                                    </ImageBackground>}

                                      {/* <Image style={{ marginTop: 5, height: 84, width: 74 }} source={{ uri: item.product_det.img }}>
                                      </Image> */}
                                  </View>


                                  <View style={{ marginTop: 4 }}>
                                      <Text numberOfLines={1} style={{ alignSelf: 'center', fontSize: 14, fontWeight: '500', marginTop: 6 }}> {i18n.locale==='en'?item.product_det.pro_name_en:i18n.locale==='hi'?item.product_det.pro_name_hi:item.product_det.pro_name_gu} </Text>
                                      <Text style={{ alignSelf: 'center', marginTop: 4 }}>{`\u20B9${item.totalPrice}`}</Text>
                                  </View>

                                

                              </View>
                          </View>
  
                          )
                      }}
                      keyExtractor={item => item.id}
                    />
                    
                   }
                     
                  </View>

                   
                 </View>
                 :   null        }
                </ScrollView>
     

                : <View style={{ height: '80%', justifyContent: 'center' }}>
                    {isLoading ?  <ActivityIndicator
              style={{
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              visible={isLoading}
              animating={isLoading}
              color="black"
              size="large"
            /> : <Image style={{ height: 310, width: 300, justifyContent: 'center', alignSelf: 'center', }} source={i18n.locale==='en'?require('../../assets/EmptyView.png'):i18n.locale==="hi"?require('../../assets/notdatahindi.png'):require('../../assets/nodataguj.png')}>

                    </Image>}
                </View>}

        </View>
    )

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

        alignSelf:"center",
        alignContent:"center",
        height: 230,
        width: '48%',
        borderWidth: 1,
        borderColor: '#E9E9E9',
        marginHorizontal: 2,
        marginTop: 6
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
        paddingHorizontal: 10,
        justifyContent: 'center'
    }
})
export default WishList