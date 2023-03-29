import React,{useState,useEffect,useRef} from 'react'
import {View,Text,StyleSheet,TouchableOpacity,Image, ScrollView,ActivityIndicator,Dimensions,Animated,Modal,FlatList} from 'react-native';
import Header1 from './Header1';
import * as firebase from 'firebase';
import syncStorage from 'sync-storage';
import NetInfo from "@react-native-community/netinfo";
import I18n from 'i18n-js';
import { Platform } from 'react-native';
import { ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';
// import Toast from "react-native-simple-toast"

const AllProductsScreen= (props) => {

  const [allProduct, setallProduct] = useState([])
  const [super_sub_cat, setsuper_sub_cat] = useState('')
  const [id, setid] = useState('')
  const [titleImage, settitleImage] = useState([])
  const [array, setarray] = useState([])
  const [isLoading, setisLoading] = useState(false)
  const [basketarray,setbasketarray] = useState([])
  const [internet, setInternet] = useState(false)
  const [heigth, setheigth] = useState(0)
  const [qntopen,setqntopen]=useState(0)
  const [keyword, setkeyword] = useState([])
 const [keywordvalue, setkeywordvalue] = useState('')
 const [details, setdetails] = useState([])
 const [price, setprice] = useState([])
 const [priceid, setpriceid] = useState('')

 const [priceamount, setpriceamount] = useState('')
 const [modalVisible, setModalVisible] = useState(false)
 const [Iddoc, setIddoc] = useState('')
 const [producteng, setproducteng] = useState('')
 const [productguj, setproductguj] = useState('')
 const [producthin, setproducthin] = useState('')
 const fadeadd = useRef(new Animated.Value(0)).current;
 const faderemove = useRef(new Animated.Value(0)).current;



 useEffect(() => {

 
  syncStorage.set('isBasket', false)

   const unsubscribeinternet = NetInfo.addEventListener(state => {
    console.log("Connection type____", state.type);
    
    console.log("Is connected___?", state.isConnected);
   setInternet(state.isConnected) 
   isExist()
     getProductIdArray()
    var cat_name = props.route.params.super_sub_cat
    // alert(cat_name)
    setsuper_sub_cat(cat_name)
  setisLoading(true)
var final_array=[]
firebase.firestore()
.collection('product_list')
.get()
.then((snapshot)=>{
    var sub_cat_array=[]
    snapshot.forEach((item)=>{
      // console.log("Product_list_new",item.data())
         
        if(item.data().super_sub_cat_name_en===cat_name){
         
            sub_cat_array.push(item.data())
           setid(item.data().product_id)
            getBannerImg() 
             
            // alert(JSON.stringify(item.data()))
            
            // alert(JSON.stringify(item.data().product_id))
         
        }
    })
   final_array=sub_cat_array
   setallProduct(final_array)
setisLoading(false)
 
  // alert(JSON.stringify(final_array))
    
})
.catch(error=>alert(error))

  
  });
    return () => {
      
        unsubscribeinternet
    }


}, [props.navigation]);
 
const isExist=(id)=>{
setisLoading(true)  
  firebase.firestore()
  .collection('wish_list')
  .doc(syncStorage.get('user_id'))
  .collection('item_list')
  .get()
  .then((ss)=>{
     var array=[]
      ss.forEach((item)=>{
          // alert(JSON.stringify(item.data().product_id))
           array.push(item.data().product_det.product_id)
     })
setisLoading(false)
   setarray(array)
      
  })
}


const fadeInadd=()=> {
 console.log(fadeadd);
 // Will change fadeAnim value to 1 in 5 seconds
 Animated.timing(fadeadd, {
   toValue: 20,
   duration: 2000,
   useNativeDriver: true 
 }).start(fadeOutadd);

};
const fadeOutadd=()=> {
 // Will change fadeAnim value to 0 in 3 seconds
 Animated.timing(fadeadd, {
   toValue: 0,
   duration: 1000,
   useNativeDriver: true 
 }).start();
};

const fadeInremove=()=> {
   // Will change fadeAnim value to 1 in 5 seconds
   Animated.timing(faderemove, {
       toValue: 20,
     duration: 2000,
     useNativeDriver: true 
   }).start(fadeOutremove);
   
 };
 const fadeOutremove=()=> {
   // Will change fadeAnim value to 0 in 3 seconds
   Animated.timing(faderemove, {
     toValue: 0,
     duration: 1000,
      useNativeDriver: true 
   }).start();
 };

 const addToWishList =()=>{
//alert(id)
setisLoading(true)   
firebase.firestore()
.collection('wish_list')
.doc(syncStorage.get('user_id'))
.collection('item_list')
.doc(Iddoc)
.set({
  product_det: details,
                product_qnt: 1,
                product_size:qntopen,
                product_price:parseFloat(priceamount),
                totalPrice: 1 * parseFloat(priceamount).toFixed(2),
                product_gst: 1 * parseInt(details.pro_gst),
})
.then(()=>{
isExist()
setModalVisible(false)
fadeInadd()
// Toast.show('added to whishlist');
}).catch(e=>alert(e))

}


const addTo = (id, item) => {
//alert(id)

firebase.firestore()
    .collection('product_list')
    .doc(id)
    .get()
    .then(() => {
       
      console.log('--0,.',item.product_id);
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




const deletefromWishlist=(id)=>{
  setisLoading(true)     
 firebase.firestore()
 .collection('wish_list')
 .doc(syncStorage.get('user_id'))
 .collection('item_list')
 .doc(id)
 .delete()
 .then(()=>{
   
  isExist()
  setisLoading(false)
  fadeInremove()
    //  Toast.show('removed to whishlist');
 }).catch((error)=>{
     alert(error)
 })
} 


const addToBasket = (item) => {
  // alert(syncStorage.get('user_id'))
  if (syncStorage.get('user_id') == undefined) {
      alert('please Login To Continue')
  }
  else {
      //    alert(syncStorage.get('user_id'))
      setisLoading(true)   
      firebase.
          firestore()
          .collection('my_basket')
          .doc(syncStorage.get('user_id'))
          .collection('item_list')
          .doc(item.product_id)
          .set({
              product_qnt: item.pro_qty,
              product_det: item,
              totalPrice: parseInt(item.pro_price),
              product_gst: 1 * parseInt(item.pro_gst)

          })
      isExist(true)
      setisLoading(false)
     getProductIdArray()
  }

}

const getProductIdArray=()=>{
firebase.firestore()
.collection('my_basket')
.doc(syncStorage.get('user_id'))
.collection('item_list')
.get()
.then((ss)=>{
   var array=[]
    ss.forEach((item)=>{
        // alert(JSON.stringify(item.data().product_id))
         array.push(item.data().product_det.product_id)
   })
  
   setbasketarray(array)
   
    
})
}

const getBannerImg=()=>{ }

const getText=(text)=>{
  var len=text.length;
if(len>=13)
return `${text.substring(0,9)}...`;
else 
return text; 
}


const renderOption=(array)=>{
    
 return array !== undefined?   array.map(item=><TouchableOpacity onPress={()=>{

      setqntopen((item.sub_type_name) +' '+ (item.product_keyword_name)  )
      setpriceid(item.particular_size_price)
      setpriceamount( item.particular_size_price-(parseInt(item.particular_size_price)* details.discount_percentage)/100)
  }} 
  style = {qntopen === (item.sub_type_name) +' '+ (item.product_keyword_name)  ?{borderRadius:10,borderWidth:1,width:60,height:30,justifyContent:"center",alignItems:"center",margin:10,backgroundColor:"#005478",borderColor:"#005478"} :{borderRadius:10,borderWidth:1,width:60,height:30,justifyContent:"center",alignItems:"center",margin:10}}
   
  >
       <View >
         <Text  style= {qntopen === (item.sub_type_name) +' '+ (item.product_keyword_name)? {color:"white"} :{color:"black"}} > {item.sub_type_name} {item.product_keyword_name}</Text>
     


      </View>
      </TouchableOpacity>):null
  
// return array.
  // return array.

}
return (<View>
      {
                Platform.OS === 'android' ?
            
            <View style={{ backgroundColor: '#005478', borderWidth: 5, borderColor: '#fff', borderRadius: 100, height: 50, width: 50, justifyContent: 'center', bottom:"-3.7%",position:"absolute", zIndex: 1,alignSelf:"center", elevation: 9}}>
           <TouchableOpacity onPress={() => this.props.navigation.navigate('Search')}   activeOpacity={1.0}>
            <Image style={{ height: 25, width: 25, alignSelf: 'center' }} source={require('../../assets/searchIcon.png')}></Image>
            </TouchableOpacity>
            </View>: null
}
   {
      isLoading?<View style={{marginVertical:"100%"}}>
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
  </View>:
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
             <Text style={{ fontSize: 21, width: 260, fontFamily: 'Montserrat'}}> {I18n.t('AllProducts')} </Text>   
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

{
   allProduct.length>0?

  <View style={{height:'84%'}}>

   <View style={styles.section4}>
               
               {
                  <FlatList
                 numColumns={3}
                 style={{padding:3,paddingLeft:10}}
                  data={ allProduct}
                  renderItem={({item})=>{
                      return (
                       
                       
                
                          <View style={styles.newArrival}>
                            {!item.discount_percentage ?null :<View style={{borderTopRightRadius:4,borderBottomRightRadius:4,position:"absolute",height:18,zIndex:1,backgroundColor:"#8cc63f",width:60,justifyContent:"center",alignItems:"center",alignContent:"center"}}>
                          <Text numberOfLines={1} style={{color:"#fff",fontWeight:"900",fontSize:12,alignSelf:"center"}}> {item.discount_percentage}% {I18n.t('off')}   </Text>
                        </View>}
                          <View key={item.product_id}>
                           <TouchableOpacity onPress={
                             ()=>{
                        array.includes(item.product_id)?deletefromWishlist(item.product_id):item.keyword_value_list <= 0 ? addToWishList(item.product_id,item) :qntopen === 0 ?addTo(item.product_id,item,item.keyword_value_list):addToWishList(item.product_id,item)
                      
                             }
                           }>
                           <View style={styles.heart}>
                           { array.includes(item.product_id)? <Image style={{ height: 20, width: 20, marginLeft: 10 }} source={require('../../assets/filledheart.png')}></Image>: <Image style={{ height: 20, width: 20, marginLeft: 10 }} source={require('../../assets/heart.png')}></Image>}
                      
                        </View>
                           </TouchableOpacity>
                           <TouchableOpacity onPress={()=>{
                      props.navigation.navigate('ProductScreen',{product:item,similarProducts:allProduct,})
                           }
                          }>
                            
                           <View style={{height:84,width:74,alignSelf:'center'}}>
                             
                           {!item.img ? 
                                 <ImageBackground style={{ marginTop: 5, height: 84, width: 74 }} source={require('../../assets/Perffect_Icon.png') }> 
                                 {item.is_out_of_stock === false ? 
                                      <Image style={{height:84,width:74,alignSelf:'center'}} source={I18n.locale==='en'?require('../../assets/Out_Of_Stock.png') :I18n.locale==='gu'?require('../../assets/Out_Of_Stock_guj.png'):require('../../assets/Out_Of_Stock_hi.png')}/> : null }
                                    </ImageBackground>
                                   :<ImageBackground style={{ marginTop: 5, height: 84, width: 74 }} source={{ uri: item.img }}>
                                      {item.is_out_of_stock === false ? 
                                      <Image style={{height:84,width:74,alignSelf:'center'}} source={I18n.locale==='en'?require('../../assets/Out_Of_Stock.png') :I18n.locale==='gu'?require('../../assets/Out_Of_Stock_guj.png'):require('../../assets/Out_Of_Stock_hi.png')}/> : null }
                                    </ImageBackground>}
                           
                           </View>
                          
                           </TouchableOpacity>
                          <View style={{marginTop:4}}>
                            <Text numberOfLines={1} style={{marginTop:5,alignSelf:'center',fontSize:14,fontFamily:'Montserrat',fontWeight:'500',marginTop:6,paddingHorizontal:10}}>
                           
                            {I18n.locale==='en'?getText(item.pro_name_en):I18n.locale==='hi'?getText(item.pro_name_hi):getText(item.pro_name_gu)}
                            </Text>
                            <Text style={{alignSelf:'center',marginTop:4,fontFamily:'Montserrat'}}>{`\u20B9${item.pro_price}`}</Text>
                           </View>
                           <TouchableOpacity onPress={
                             ()=>{
                      
                         basketarray.includes(item.product_id)?props.navigation.navigate('BasketScreen'):addToBasket(item)
                                
                             }
                           }>
                           <View style={ 
                              item.is_out_of_stock === false ? 
                              
                             {
                             
                               backgroundColor:'#f1f1f1',
                               height:24,
                               justifyContent:'center',
                               flexDirection:'row',
                               borderRadius:4
                             }:
                             Platform.OS==='ios'?{
                               marginTop:20,
                               backgroundColor:'#005478',
                               height:24,
                               justifyContent:'center',
                               flexDirection:'row',
                               borderRadius:4
                             }
                             :
                             {
                             
                               backgroundColor:'#005478',
                               height:24,
                               justifyContent:'center',
                               flexDirection:'row',
                               borderRadius:4
                             }
                      
                           }>
                            {
                                item.is_out_of_stock === false ?  <Text style={{fontSize:10,color:'black',alignSelf:'center'}}>{I18n.t('OutOfStock') }</Text> : basketarray.includes(item.product_id)?<Text style={{fontSize:10,color:'white',alignSelf:'center',fontFamily:'MontserratSemiBold'}}>{I18n.t('GoToBasket')}</Text>:<Text style={{fontSize:10,color:'white',alignSelf:'center'}}>{I18n.t('AddToBasket')}</Text>
                      
                            }
                          {  item.is_out_of_stock === false ? null : <Image style={{height:17,width:17,marginLeft:3,alignSelf:'center'}} source={require('../../assets/basketIcon.png')}/> }
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
  :
<View style={{justifyContent:'center',marginTop:100}}>
 <Image style={{ height: 310, width: 300, justifyContent: 'center', alignSelf: 'center', }} source={I18n.locale==='en'?require('../../assets/EmptyView.png'):I18n.locale==="hi"?require('../../assets/notdatahindi.png'):require('../../assets/nodataguj.png')}>

                    </Image>
            
                        </View>
    }

  

     </View>
:<View style={styles.containernew}>
<Image style={{justifyContent:'center',alignSelf:'center',}} source={require('../../assets/noInternet.png')}>
</Image>
<Text style={{fontFamily:'Montserrat',color:'#333333',alignSelf:'center',fontSize:25,marginTop:20}}>{I18n.t('NoInternetConnection')} </Text>
<Text style={{fontFamily:'Montserrat',color:'#333333',alignSelf:'center',fontSize:20,marginTop:10}}>{I18n.t('PleaseTryAgainLater')}</Text>
</View> 
  }
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
            
          <View style={styles.modalView}>
          <TouchableOpacity  style={{position:"absolute",right:10,top:10}} onPress={() => setModalVisible(false)}>
          <Image source={require('../../assets/close.png')} style={{height:30,width:30}} />
          </TouchableOpacity>
          <View  style={{height:100}} >
              
                          
          {I18n.locale === 'en' ? 

<Text style={{alignSelf:"center",fontSize:20}}> {producteng}</Text> : I18n.locale === 'gu' ? <Text style={{alignSelf:"center",fontSize:20}}> {productguj}</Text> :  <Text style={{alignSelf:"center",fontSize:20}}> {producthin}</Text>}
                          
                          <Text style={{alignSelf:"center"}}> {I18n.t('weigths')} </Text>
                
                                 
                          <ScrollView  horizontal={true}  showsHorizontalScrollIndicator={true} persistentScrollbar={true} >
                                      {
                                         renderOption(keyword)
                                     
                                      }
                                      
                                  </ScrollView>
                               
      
                            
                          </View>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => addToWishList()}
              disabled = {qntopen === 0 ? true: false}  
            >
            {qntopen  === 0 ? <Text style={{color: "white",textAlign: "center"} }> {I18n.t('selectweigth')} </Text> :<Text style={{color: "white",textAlign: "center"} }>{I18n.t('addtowishlist')}</Text>}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
   <Animated.View
   style={[
     styles.fadingContainer,
     {
       // Bind opacity to animated value
       opacity:fadeadd
     }
   ]}
   
 >
   <Text style={styles.fadingText}>added to whislist</Text>
 </Animated.View>

 <Animated.View
   style={[
     styles.fadingContainer,
     {
       // Bind opacity to animated value
       opacity:faderemove
     }
   ]}
 >
   <Text style={styles.fadingText}>removed from whislist</Text>
 </Animated.View>
 </View>  )
}

const styles=StyleSheet.create({
container:{
   height:'100%',
   backgroundColor:'white'
},
section1:{
  height: 70,
 
  marginTop: 30,
  alignItems:"center",
  flexDirection: 'row' 
},
containernew: {
 height: '100%',

 justifyContent: 'center'
},
section2:{
 height:36,
 backgroundColor:'#F7F8F9',
 marginTop:20,
 padding:5
},
section3:{
 flexDirection:'row',
 flexWrap:'wrap',
 display:'flex',
 padding:10,
 justifyContent:'center'
},
 newArrival:{

  //  height:195,
 width: '32%',
 borderWidth: 1,
 borderColor: '#E9E9E9',
margin:2,
},
section4: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  display: 'flex',
  padding: 10,
  justifyContent: 'center'


},
fadingContainer: {
padding: 10,
backgroundColor: "#f1f1f1",
opacity:1,
 borderRadius:25,
  position:"absolute",
   bottom:35,
   alignSelf:"center"
},
fadingText: {
fontSize: 15
},
heart:{
  alignSelf:'flex-end',
  marginRight:4,
  marginTop:4
},  centeredView: {
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
  padding: 30,
  alignItems: "center",
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
})
export default AllProductsScreen

 



