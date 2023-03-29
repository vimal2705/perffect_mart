import React, { useEffect, useState,useCallback } from 'react';
import * as firebase from 'firebase';
import Header1 from "./Header1";
import { Keyboard,KeyboardAvoidingView, View, Text, StyleSheet, Image, TouchableOpacity, TextInput ,FlatList, ScrollView,ActivityIndicator,ImageBackground,Dimensions, Platform} from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import library from './library';
import i18n from 'i18n-js';
import syncStorage from 'sync-storage';
import { StatusBar } from 'expo-status-bar';
import { fetchPosts,fetchMorePosts } from './search';


const searchScreen = (props) => {
    const [widthsize]= useState('66%')
    const [text, settext] = useState('')
    const [postsperload]  = useState(15)
    const [keyboardStatus, setKeyboardStatus] = useState('Keyboard Hidden');
     const [startAfter, setstartAfter] = React.useState(Object);
     const [lastPost, setlastPost] = useState(false)
    const [productList, setproductList] = useState([])
    const [product,setproduct] = useState([])
    const [filteredArray, setfilteredArray] = useState([])
    const [internet,setInternet]=useState(false);
    const [loading, setLoading] = useState(false)
    const tem = 0
    async function getPosts() { 
       if(text.length <= 0 )
      
       setproductList([])
        setLoading(true)
        
        
        const postsData = await fetchPosts(postsperload);
  
        
        setproductList([...productList,...postsData.posts])
        setstartAfter(postsData.lastVisible)
        setLoading(false)
      }  
      async function getMorePosts() {
        if(!lastPost){
            
        const postsData = await fetchMorePosts(startAfter,postsperload);
        setproductList([...productList,...postsData.posts])
        setstartAfter(postsData.lastVisible)
        postsData.posts.length==0? (setlastPost(true)  ): setlastPost(false)

     
      } 
     
      
    }
    useEffect(() => {
     
        setLoading(true)
        const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
            setKeyboardStatus("Keyboard Shown");
          });
          const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
            setKeyboardStatus("Keyboard Hidden");
          });
    
        const unsubscribe = props.navigation.addListener('focus', () => {

            syncStorage.set('isBasket',false)
          
            
    getPosts()
            // getoutofstockproducts()
            // setHeight(Dimensions.get('window').height)

        });
       

     const  unsubscriber = NetInfo.addEventListener(state => {
            console.log("Connection type____", state.type);
            setInternet(state.isConnected) 
            console.log("Is connected___?", state.isConnected);
            i18n.translations = library;
            syncStorage.set('isBasket', false)
            
        })

   

        setLoading(false)
        // getItem()
        return ()=>{
            unsubscribe
            unsubscriber
            showSubscription.remove();
            hideSubscription.remove();
        }    
    
     } , [props.navigation]);

     let keyExtractor = useCallback((item) => item.product_id);
 
    let itemView = useCallback (({item}) => 
    
       <View key={item.product_id} style={styles.newArrival}>
    {!item.discount_percentage ?null :<View style={{borderTopRightRadius:4,borderBottomRightRadius:4,position:"absolute",height:18,zIndex:1,backgroundColor:"#8cc63f",width:60,justifyContent:"center",alignItems:"center",alignContent:"center"}}>
                          <Text style={{color:"#fff",fontWeight:"900",fontSize:12,alignSelf:"center"}}> {item.discount_percentage}% OFF </Text>
                        </View>}
                                    <TouchableOpacity onPress={
                                        () => {
                                            props.navigation.navigate('ProductScreen', { product: item })
                                        }
                                    }><View>
                                      
                                    </View>
    
                                        <View>
                                           
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
                                            <View style={{ marginTop: 8,alignContent:"center",alignItems:"center",paddingHorizontal:10 }}>
                                                <Text numberOfLines={1} style={{alignSelf: 'center', fontSize: 14, fontFamily: 'MontserratSemiBold', fontWeight: '500', marginTop: 6, marginHorizontal: 3}}>
                                                
                                                {i18n.locale==='en'?getText(item.pro_name_en):i18n.locale==='hi'?getText(item.pro_name_hi):getText(item.pro_name_gu)}
                                                </Text>
         
                                                <Text style={{fontFamily:'Montserrat', alignSelf: 'center', marginTop: 4 }}>{`\u20B9${item.pro_price}`}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
    
  );

//    const getItem=()=>{
//         firebase.firestore()
//         .collection('product_list')
//         .orderBy('pro_name_en')
    
//         .limit(12)
//         .get()
//         .then(
         
//             (snapshot) => {
//                 setproductList('')
//                 var product_list_array = [];
//                 snapshot.forEach((ss) => {
                  
//                         product_list_array.push(ss.data())
//                     console.log("dat--a",ss.data().pro_name_en)
                    
                
                
//                 })
//                 setproductList(product_list_array)
              
//             }
//         )
//         .catch((error) => {
//             console.log(error)
//         })
//        } 
    
     const getItems=(text)=>{

        
       {i18n.locale==='en'? firebase.firestore()
        .collection('product_list')
        .orderBy('pro_name_en')
        .startAt(text)
        .endAt(text+ '\uf8ff')
    //  .limit(11)
        .get()
        .then(
    
            (snapshot) => {
                
                var product_list_array = [];
                snapshot.forEach((ss) => {
                   
                        product_list_array.push(ss.data())
                 
                
                
                })
                setproduct(product_list_array)
           
            }
        )
        .catch((error) => {
            console.log(error)
        }):
        i18n.locale==='gu'?
        firebase.firestore()
        .collection('product_list')
        .orderBy('pro_name_gu')
        .startAt(text)
        .endAt(text+ '\uf8ff')
    //  .limit(11)
        .get()
        .then(
    
            (snapshot) => {
                
                var product_list_array = [];
                snapshot.forEach((ss) => {
                   
                        product_list_array.push(ss.data())
                 
                
                
                })
                setproduct(product_list_array)
           
            }
        )
        .catch((error) => {
            console.log(error)
        }) :firebase.firestore()
        .collection('product_list')
        .orderBy('pro_name_hi')
        .startAt(text)
        .endAt(text+ '\uf8ff')
    //  .limit(11)
        .get()
        .then(
    
            (snapshot) => {
                
                var product_list_array = [];
                snapshot.forEach((ss) => {
                   
                        product_list_array.push(ss.data())
                 
                
                
                })
                setproduct(product_list_array)
           
            }
        )
        .catch((error) => {
            console.log(error)
        })}
       } 
    //    getBannerImg=()=>{ }
    
   const getText=(text)=>{
        //      var len=text.length;
        //    if(len>=13)
        //    return `${text.substring(0,9)}...`;
        //   else 
        //   return text; 
        return text
         }

    return (
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        >
        <View style={{height:"100%"}}>
            
             {
                Platform.OS === 'android' && keyboardStatus === 'Keyboard Hidden' ?
            
            <View style={{ backgroundColor: '#005478', borderWidth: 5, borderColor: '#fff', borderRadius: 100, height: 50, width: 50, justifyContent: 'center', bottom:"-3.7%",position:"absolute", zIndex: 1,alignSelf:"center", elevation: 9}}>
           <TouchableOpacity onPress={() => this.props.navigation.navigate('Search')}   activeOpacity={1.0}>
            <Image style={{ height: 25, width: 25, alignSelf: 'center' }} source={require('../../assets/searchIcon.png')}></Image>
            </TouchableOpacity>
            </View>: null
}
                       <StatusBar backgroundColor="#005478" style={Platform.OS === "android" ? "light" : "dark"} />
         
            {
    
             internet?
             
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
             <Text style={{ fontSize: 21,  width: 260, fontFamily: 'Montserrat'}}> {i18n.t('search')}</Text>   
          </View>
          </View>
                 
        

          </View>
                 <View>
                     <View style={styles.searchBox}>
                         <View style={{ flexDirection: 'row', padding: 10 }}>
                             <Image style={{ height: 30, width: 30 }} source={require('../../assets/searchSmall.png')} />
                             <TextInput placeholder= {i18n.t('search')} style={{ width: '80%' }} value={text} onChangeText={
     
                                 (text) => {
                                    
                                    settext(text)
                           
                                 if(text.length >= 1)

                                 {
                                          console.log('textlength',text.length);
                                    getItems(text)
                                       console.log('length',productList.length);
                                    
                                
                                   }
                                 else {
                                      
                                    productList.length = 0;
                                    product.length = 0;
                                    getPosts()
                                   console.log('length',productList.length);
                                 }
                         
                               
                                     
                                 }
                             }></TextInput>
                            
                         </View>
                     </View>
                 </View>
                { loading ?  <ActivityIndicator
                         style={{
                             flex: 1,
                             justifyContent: 'center',
                             alignSelf: 'center',
                         }}
                         visible={loading}
                         animating={loading}
                         color="black"
                         size="large"
                     />:
                 <View style={styles.section4}>
            <View>
              
{text <= 0 ? 
 <FlatList
 data={productList}
 numColumns={3}
 style={{padding:3,paddingLeft:10}}
 keyExtractor = {keyExtractor}
 renderItem={itemView}
 
 onEndReached={getMorePosts}
 onEndReachedThreshold={1}
 scrollEventThrottle={1}
 ListFooterComponent={()=>
(!lastPost &&
 <ActivityIndicator/>)}
/> : <FlatList
        data={product}
        numColumns={3}
        style={{padding:3,paddingLeft:10}}
        keyExtractor = {keyExtractor}
        renderItem={itemView}
        
        // onEndReached={getMorePosts}
        // onEndReachedThreshold={1}
        // scrollEventThrottle={1}
        ListFooterComponent={()=>
      (!lastPost &&
        <ActivityIndicator/>)}
      />}
              
      
    

             
   
                 </View> 
              </View> }
               
             </View>
   :<View style={styles.containernew}>
   <Image style={{justifyContent:'center',alignSelf:'center',}} source={require('../../assets/noInternet.png')}>
   </Image>
   <Text style={{fontFamily:'Montserrat',color:'#333333',alignSelf:'center',fontSize:25,marginTop:20}}>{i18n.t('NoInternetConnection')} </Text>
    <Text style={{fontFamily:'Montserrat',color:'#333333',alignSelf:'center',fontSize:20,marginTop:10}}>{i18n.t('PleaseTryAgainLater')}</Text>
</View>     
         }
         
        </View>
        </KeyboardAvoidingView>
     )
   }

const styles = StyleSheet.create({
 
    container: {
        height: '100%',
        backgroundColor: 'white'
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
    searchBox: {
        height: 50,
        backgroundColor: '#F1F1F1',
        marginHorizontal: 40,
      
        borderRadius: 20
    },
    section2: {
        backgroundColor: '#F1F1F1',
        height: 300,
        alignSelf: 'center'
    },
    section3: {
     
        backgroundColor: 'white',

        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
     
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
        marginTop: 4
    }, section4: {
        width: '100%',
     paddingTop:10,
       flex:1,

   


    },
})
export default searchScreen