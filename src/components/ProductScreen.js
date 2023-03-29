import React, { useState ,useRef,useCallback,useEffect} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView ,Animated,ActivityIndicator,ImageBackground,Modal,Dimensions, Platform} from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
import * as firebase from 'firebase';
import syncStorage from 'sync-storage';
import { setAutoServerRegistrationEnabledAsync } from 'expo-notifications';
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";

import NetInfo from "@react-native-community/netinfo";
import { FlatListSlider } from '@kuasha420/react-native-flatlist-slider';
import I18n from 'i18n-js';
import { FlatList } from 'react-native-gesture-handler';
import QuickScrollList from 'react-native-quick-scroll';
import { StatusBar } from 'expo-status-bar';
import { enableScreens } from 'react-native-screens';
import DropDownPicker from 'react-native-dropdown-picker';
// import {FlatListSlider} from 'react-native-flatlist-slider';

import Header1 from './Header1';
import { SafeAreaView } from 'react-native';
import { set } from 'react-native-reanimated';
const ProductScreen=(props)=>{


//    constructor(){
//        super()
//        {
//            product:{},
//         sliderImage:[],
//         count:1,
//         similarProducts:[],
//         totalPrice:1,
//         exists:false,
//         array:[]
//        }
//    }
   
 const [product,setproduct]=useState({});
 const [sliderImage,setsliderImage]=useState([]);
 const [count,setcount]=useState(1);
 const [similarProducts,setsimilarProducts]=useState([]);
 const [totalPrice,settotalPrice]=useState(1);
 const [exists,setexists]=useState(false);
 const [array,setarray]=useState([]);
 const [isLoading,setisLoading]=useState(false);
 const [isExist,setisExist]=useState(false)
 const [internet,setInternet]=useState(false);
 const [description,setDescription]=useState(false)
 const [qnt,setQnt]=useState(0)
const [priceid, setpriceid] = useState('')
const [errormsg, seterrormsg] = useState('')
 const [qntopen,setqntopen]=useState(0)
 const [keyword, setkeyword] = useState([])
const [keywordvalue, setkeywordvalue] = useState('')
const [details, setdetails] = useState([])
const [price, setprice] = useState([])
const [modalVisible, setModalVisible] = useState(false)
const [Iddoc, setIddoc] = useState('')
const [producteng, setproducteng] = useState('')
const [productguj, setproductguj] = useState('')
const [producthin, setproducthin] = useState('')
const [discount, setdiscount] = useState('')
const [keywordlist, setkeywordlist] = useState([])
const [defaultproductsize, setdefaultproductsize] = useState('')
const [payable, setpayable] = useState('')
const [relatedwishlist, setrelatedwishlist] = useState(false)
 const [textShown, setTextShown] = useState(false); //To show ur remaining Text
 const [lengthMore,setLengthMore] = useState(false); //to show the "Read more & Less Line"
 const [open, setOpen] = useState(false);
  const [value, setValue] = useState(8);
  const [priceamount,setpriceamount] = useState('')
  var extra = ''
  var countqty = ''
  const [extradiscount, setextradiscount] = useState('')
  const [items, setItems] = useState([
    {label: 1, value: 1},
    {label: 2, value: 2},
    {label:3,value: 3},
    {label: 4, value: 4},
    {label: 5, value: 5},
    {label:6,value: 6},
    {label: 7, value: 7},
    {label: 8, value: 8},
    {label:9,value: 9},
    {label:10,value: 10},
    {label: 11, value: 11},
    {label: 12, value: 12},
    {label:13,value: 13},
    {label: 14, value: 14},
    {label: 15, value: 15},
    {label:16,value: 16},
    {label: 17, value: 17},
    {label: 18, value: 18},
    {label:19,value: 19},
    {label:20,value: 20},
    {label: 21, value: 21},
    {label: 22, value: 22},
    {label: 23,value: 23},
    {label: 24, value: 24},
    {label: 25, value: 25},
    {label: 26,value: 26},
    {label: 27, value: 27},
    {label: 28, value: 28},
    {label:29,value: 29},
    {label:30,value: 30},
    {label: 31, value: 31},
    {label: 32, value: 32},
    {label: 33,value:  33},
    {label: 34, value: 34},
    {label: 35, value: 35},
    {label: 36,value:  36},
    {label: 37, value: 37},
    {label: 38, value: 38},
    {label: 39,value:  39},
    {label:40,value: 40},
    {label: 41, value: 41},
    {label: 42, value: 42},
    {label:43,value: 43},
    {label: 44, value: 44},
    {label: 45, value: 45},
    {label:46,value: 46},
    {label: 47, value: 47},
    {label: 48, value: 48},
    {label:49,value: 49},
    {label:50,value: 50},
    {label: 51, value: 51},
    {label: 52, value: 52},
    {label:53,value: 53},
    {label: 54, value: 54},
    {label: 55, value: 55},
    {label:56,value: 56},
    {label: 57, value: 57},
    {label: 58, value: 58},
    {label:59,value: 59},
    {label:60,value: 60},
    {label: 61, value: 61},
    {label: 62, value: 62},
    {label:63,value: 63},
    {label: 64, value: 64},
    {label: 65, value: 65},
    {label:66,value: 66},
    {label: 67, value: 67},
    {label: 68, value: 68},
    {label:69,value: 69},
    {label:70,value: 70},
    {label: 71, value: 71},
    {label: 72, value: 72},
    {label:73,value: 73},
    {label: 74, value: 74},
    {label: 75, value: 75},
    {label:76,value: 76},
    {label: 77, value: 77},
    {label: 78, value: 78},
    {label:79,value: 79},
    {label:80,value: 0},
    {label: 81, value: 81},
    {label: 82, value: 82},
    {label:83,value: 83},
    {label: 84, value: 84},
    {label: 85, value: 85},
    {label:86,value: 86},
    {label: 87, value: 87},
    {label: 88, value: 88},
    {label:89,value: 89},
    {label:90,value: 90},
    {label: 91, value: 91},
    {label: 92, value: 92},
    {label:93,value: 93},
    {label: 94, value: 94},
    {label: 95, value: 95},
    {label:96,value: 96},
    {label: 97, value: 97},
    {label: 98, value: 98},
    {label:99,value: 99},
    {label:100,value: 100},
  ]);


 const toggleNumberOfLines = () => { //To toggle the show text or hide it
     setTextShown(!textShown);
 }
 const ViewTypes = {
  FULL: 0,
  HALF_LEFT: 1,
  HALF_RIGHT: 2
};
 let { width } = Dimensions.get("window");
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
//    componentDidMount(){
      
//     //    alert(JSON.stringify(this.props.route.params.product))
//        this.setState({product:this.props.route.params.product})
//         this.setState({similarProducts:this.props.route.params.similarProducts})
//      //  this.getSimilarProductsArray()
//        this.getSildeImage()
//        this.checkIsExist()
//        this.isExist()
       
  
//    }


  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
       
      syncStorage.set('isBasket', false)
    
    //    setproduct(props.route.params.product) 
    //    setsimilarProducts(props.route.params.similarProducts)
       getProduct()
      // getSimilarProductsArray() ;
       getSildeImage();
       checkIsExist()
       isExistf()
       
      
  setextradiscount(extra)
       


      //  useScreens('ProductScreen');
   
      
    });
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

  
//    const  getSimilarProductsArray=()=>{
//     firebase.
//     firestore()
//     .collection('product_list')
//     .get()
//     .then((ss)=>{
//         var array=[]
//         ss.forEach(item=>{
                       
//             // if(item.data().sub_cat_name===this.props.route.params.product.sub_cat_name){
//             //   array.push(item.data())
//             // }
//         })
     
//         setsimilarProducts(array)
//     })
    
//    }

   const getProduct=()=>{
   
    var subcat='';
    var pid=0;

    firebase
    .firestore()
    .collection('product_list')

    .doc(props.route.params.product.product_id)
   
    .get()
    .then(ss=>{
      
 setkeywordlist(ss.data().keyword_value_list_id)
setdefaultproductsize(ss.data().product_default_unit)
        setproduct(ss.data())
        
        subcat=ss.data().sub_cat_name_en;
        pid=ss.data().product_id;
     
        firebase
        .firestore()
        .collection('product_list')
        
        .get()
        .then(ss2=>{
            var array=[]
       
            
          
            ss2.forEach(item=>{
                if(item.data().sub_cat_name_en===subcat && item.data().product_id!==pid && array.length <= 5)
               
               
                  array.push(item.data())
                  
              
                 
                  
                  console.log('--->>.',item.data().sub_cat_name_en,item.data().product_id,item.data().keyword_value_list_id);
            })
           setsimilarProducts(array)

        
     
        })
    
    })

   
   }

   
   const qtydiscount = () => {
    if (product.qty_discount_list !== undefined) {
     
      for (let i = 0; i < product.qty_discount_list.length; i++) {
    
        if (count >= product.qty_discount_list[i].qty ) {
          countqty = product.qty_discount_list[i].qty
          extra =  product.qty_discount_list[i].discount
          console.log('jkl',extra);
          console.log('dis',product.qty_discount_list[i].discount);

          // setextradiscount(extra)
        }
        
      }
     }
 
  }
   const  isExistf=(id)=>{
      
    setisLoading(true) 
    firebase.firestore()
    .collection('wish_list')
    .doc(syncStorage.get('user_id'))
    .collection('item_list')
    .get()
    .then((ss)=>{
       var array=[]
        ss.forEach((item)=>{
            
             array.push(item.data().product_det.product_id)
            
       })
       setisLoading(false)     
     
       setarray(array)
        
    })
 }



 const  checkIsExist=()=>{
    firebase.
    firestore()
    .collection('my_basket')
    .doc(syncStorage.get('user_id'))
    .collection('item_list')
    .doc(props.route.params.product.product_id)
    .get()
    .then((ss)=>{
     if(ss.exists){
        console.log('--->>>',ss);
         setisExist(true)
         
     }
     else{
        setisExist(false)
         settotalPrice(parseInt(props.route.params.product.pro_price))
     }
      
     
    })  
   }
 

   
   const  getSildeImage = () => {
        firebase.
            firestore()
            .collection('product_list')
            .doc(`${props.route.params.product.product_id}`)
            .collection('img_list')
            .get()
            .then((ss) => {
                var array = []
                ss.forEach((item) => {
                    array.push(item.data().img)
                    
                })
                setsliderImage(array)
                console.log('--....11',array)

            })
    }
    const  addToBasket = () => {
        // alert(syncStorage.get('user_id'))
        if( product.qty_discount_list === undefined){
        if (  product.qty_discount_list === undefined  ) {
        

          setisLoading(true) 
          firebase.
              firestore()
              .collection('my_basket')
              .doc(syncStorage.get('user_id'))
              .collection('item_list')
              .doc(product.product_id)

              .set(
           
                {

                  
                  product_qnt: count,
                  product_det: product,
                  product_size:qnt ,
                  product_price:parseFloat(product.pro_price),
                  totalPrice: count * parseFloat(product.pro_price).toFixed(2),
                  product_gst: count * parseFloat(product.pro_gst).toFixed(2)
              })
          setisExist(true)
          setisLoading(false) 
            console.log('1');
         
        }
        else if(qnt === 0) {
           setisLoading(true) 
          firebase.
              firestore()
              .collection('my_basket')
              .doc(syncStorage.get('user_id'))
              .collection('item_list')
              .doc(product.product_id)

              .set({
                
                  product_qnt: count,
                  product_det: product,
                  product_size:qnt ,
                  product_price:parseFloat(product.payable_amount),
                  totalPrice: count * parseFloat(product.payable_amount).toFixed(2),
                  product_gst: count * parseFloat(product.pro_gst).toFixed(2)
              })
          setisExist(true)
          setisLoading(false) 
          console.log('2');
         }

      else  {
          setisLoading(true) 
          firebase.
              firestore()
              .collection('my_basket')
              .doc(syncStorage.get('user_id'))
              .collection('item_list')
              .doc(product.product_id)

              .set(
            
                {
                  product_qnt: count,
                  product_det: product,
                  product_size:qnt ,
                  product_price:parseFloat(priceamount),
                  totalPrice: count * parseFloat(priceamount).toFixed(2),
                  product_gst: count * parseFloat(product.pro_gst).toFixed(2)
              })
          setisExist(true)
          setisLoading(false) 
          console.log('3');
        }
      }
      else if (count >= countqty){
        if (  product.qty_discount_list=== undefined  ) {
        
          //    alert(syncStorage.get('user_id'))
          setisLoading(true) 
          firebase.
              firestore()
              .collection('my_basket')
              .doc(syncStorage.get('user_id'))
              .collection('item_list')
              .doc(product.product_id)

              .set(
           
                {

                  
                  product_qnt: count,
                  product_det: product,
                  product_size:qnt ,
                  product_price:parseFloat(product.pro_price),
                  totalPrice:count * parseFloat(product.pro_price).toFixed(2)- ((count * parseFloat(product.pro_price).toFixed(2))* extra)/100 ,
                  product_gst: count * parseFloat(product.pro_gst).toFixed(2)
              })
          setisExist(true)
          setisLoading(false) 
          console.log('4');
       
      }
      else if(qnt === 0) {
        
        // setisLoading(true) 
        firebase.
            firestore()
            .collection('my_basket')
            .doc(syncStorage.get('user_id'))
            .collection('item_list')
            .doc(product.product_id)

            .set({
              
                product_qnt: count,
                product_det: product,
                product_size:qnt ,
                product_price:parseFloat(product.payable_amount),
                totalPrice: count * parseFloat(product.payable_amount).toFixed(2)- ((count * parseFloat(product.payable_amount).toFixed(2))* extra)/100 ,
                product_gst: count * parseFloat(product.pro_gst).toFixed(2)
            })
        setisExist(true)
        setisLoading(false)  
        console.log('5');
      }

    else  {
        setisLoading(true) 
        firebase.
            firestore()
            .collection('my_basket')
            .doc(syncStorage.get('user_id'))
            .collection('item_list')
            .doc(product.product_id)
            .set(
              {
                product_qnt: count,
                product_det: product,
                product_size:qnt ,
                product_price:parseFloat(priceamount),
                totalPrice: count * parseFloat(priceamount).toFixed(2)- ((count * parseFloat(priceamount).toFixed(2))* extra)/100 ,
                product_gst: count * parseFloat(product.pro_gst).toFixed(2)
            })
        setisExist(true)
        setisLoading(false) 
        console.log('6');
      }
      }
      else{
        if (  product.discount_percentage === undefined  ) {
        
          //    alert(syncStorage.get('user_id'))
          setisLoading(true) 
          firebase.
              firestore()
              .collection('my_basket')
              .doc(syncStorage.get('user_id'))
              .collection('item_list')
              .doc(product.product_id)

              .set(
           
                {

                  
                  product_qnt: count,
                  product_det: product,
                  product_size:qnt ,
                  product_price:parseFloat(product.pro_price),
                  totalPrice: count * parseFloat(product.pro_price).toFixed(2),
                  product_gst: count * parseFloat(product.pro_gst).toFixed(2)
              })
          setisExist(true)
          setisLoading(false) 
          console.log('7');
       
      }
      else if(qnt === 0) { 
        setisLoading(true) 
        firebase.
            firestore()
            .collection('my_basket')
            .doc(syncStorage.get('user_id'))
            .collection('item_list')
            .doc(product.product_id)

            .set({
              
              product_qnt: count,
                  product_det: product,
                  product_size:qnt ,
                  product_price:parseFloat(product.pro_price),
                  totalPrice: count * parseFloat(product.pro_price).toFixed(2),
                  product_gst: count * parseFloat(product.pro_gst).toFixed(2)
                // product_qnt: count,
                // product_det: product,
                // product_size:qnt ,
                // product_price:parseFloat(product.payable_amount),
                // totalPrice: count * parseFloat(product.payable_amount).toFixed(2),
                // product_gst: count * parseFloat(product.pro_gst).toFixed(2)
            })
        setisExist(true)
        setisLoading(false) 
        console.log('8');
       }

    else  {
        setisLoading(true) 
        firebase.
            firestore()
            .collection('my_basket')
            .doc(syncStorage.get('user_id'))
            .collection('item_list')
            .doc(product.product_id)

            .set(
          
              {
                
                product_qnt: count,
                product_det: product,
                product_size:qnt ,
                product_price:parseFloat(priceamount),
                totalPrice: count * parseFloat(priceamount).toFixed(2),
                product_gst: count * parseFloat(product.pro_gst).toFixed(2)
            })
        setisExist(true)
        setisLoading(false) 
        console.log('9');
      }
      }

    }

    const addToWishList=(id,item)=>{
      if (  product.qty_discount_list === undefined  ) 
  {      //alert(id)
        setisLoading(true)  
     firebase.firestore()
     .collection('wish_list')
     .doc(syncStorage.get('user_id'))
     .collection('item_list')
     .doc(id)
     .set({
       
      product_qnt: count,
      product_det: product,
      product_size:qnt ,
           product_price:parseFloat(priceamount),
        totalPrice: count * parseFloat(priceamount).toFixed(2),
        product_gst: count * parseFloat(product.pro_gst).toFixed(2)
     })
     .then(()=>{
        isExistf()
        setModalVisible(false)
        setQnt(0)
        setisLoading(false) 
        fadeInadd()
     
     }).catch(e=>alert(e))}
     else if (qnt === 0)
     {
      setisLoading(true)  
      firebase.firestore()
      .collection('wish_list')
      .doc(syncStorage.get('user_id'))
      .collection('item_list')
      .doc(id)
      .set({
        
        product_qnt: count,
        product_det: product,
        product_size:qnt ,
        product_price:parseFloat(product.payable_amount),
        totalPrice: count * parseFloat(product.payable_amount).toFixed(2),
        product_gst: count *  parseFloat(product.pro_gst).toFixed(2)
      })
      .then(()=>{
         isExistf()
         setisLoading(false) 
         fadeInadd()
      
      }).catch(e=>alert(e))
     }
     else{
      setisLoading(true)  
      firebase.firestore()
      .collection('wish_list')
      .doc(syncStorage.get('user_id'))
      .collection('item_list')
      .doc(id)
      .set({
        product_qnt: count,
        product_det: product,
        product_size:qnt ,
        product_price:parseFloat(priceamount),
        totalPrice: count * parseFloat(priceamount).toFixed(2),
        product_gst: count * parseFloat(product.pro_gst).toFixed(2)
      })
      .then(()=>{
         isExistf()
         setisLoading(false) 
         fadeInadd()
      
      }).catch(e=>alert(e))
     }
     
    }
    
    
   const  deletefromWishlist=(id)=>{
    setisLoading(true)   
     firebase.firestore()
     .collection('wish_list')
     .doc(syncStorage.get('user_id'))
     .collection('item_list')
     .doc(id)
     .delete()
     .then(()=>{
       
         isExistf()
         setisLoading(false)
         fadeInremove()
        
     }).catch((error)=>{
         alert(error)
     })
    } 

    const addrelatedtoWishList=()=>{
      //alert(id)
      firebase.firestore()
      .collection('wish_list')
      .doc(syncStorage.get('user_id'))
      .collection('item_list')
      .doc(Iddoc)
      .set({
          product_det: details,
          product_qnt: 1,
          totalPrice: price,
          product_size:qntopen,
          product_gst: 1 * parseFloat(details.pro_gst)
          

      })
      .then(() => {
        isExistf()
          setModalVisible(false)
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
           
            console.log('--0,.',item.product_id);
            setkeyword(item.keyword_value_list_id)
            setkeywordvalue(item.pro_keyword_name)
            setdetails(item)
            setprice(item.pro_price)
            seterrormsg(null)
            setModalVisible(true)
            setIddoc(item.product_id)
            setproducteng(item.pro_name_en)
            setproductguj(item.pro_name_gu)
            setproducthin(item.pro_name_hi)
            
      
         
         

        }).catch(e => alert(e))

}
  
 const  deleterelatedfromWishlist=(id)=>{

   firebase.firestore()
   .collection('wish_list')
   .doc(syncStorage.get('user_id'))
   .collection('item_list')
   .doc(id)
   .delete()
   .then(()=>{
     
       isExistf()
       setisLoading(false)
       fadeInremove()
      
   }).catch((error)=>{
       alert(error)
   })
  } 
    const getText=(text)=>{
        var len=text.length;
      if(len>=13)
      return `${text.substring(0,9)}...`;
     else 
     return text; 
  }

  const renderOptions=(array)=>{
    
    return array!==undefined?    array.map(item=><TouchableOpacity onPress={()=>{
        setQnt((item.sub_type_name) +' '+ (item.product_keyword_name)  )
        setpriceid(item.particular_size_price)
        {item.particular_size_discount === undefined ?    setpriceamount( item.particular_size_price):
        setpriceamount( item.particular_size_price-(parseInt(item.particular_size_price)* item.particular_size_discount)/100)}
        setdiscount(item.particular_size_discount)

    }} 

    style = {qnt === (item.sub_type_name) +' '+ (item.product_keyword_name)  ?{borderRadius:10,borderWidth:1,width:60,height:30,justifyContent:"center",alignItems:"center",margin:10,backgroundColor:"#005478",borderColor:"#005478"} :{borderRadius:10,borderWidth:1,width:60,height:30,justifyContent:"center",alignItems:"center",margin:10}}
   
   >
        <View >
          <Text  style= {qnt === (item.sub_type_name) +' '+ (item.product_keyword_name)? {color:"white"} :{color:"black"}} > {item.sub_type_name} {item.product_keyword_name}</Text>
      

        </View>
        </TouchableOpacity>):null
   
  }
  const renderOption=(array)=>{
    
    return array !== undefined?   array.map(item=><TouchableOpacity onPress={()=>{

      setqntopen((item.sub_type_name) +' '+ (item.product_keyword_name)  )
      setpriceid(item.particular_size_price)
      setpriceamount( item.particular_size_price-(parseInt(item.particular_size_price)* product.discount_percentage)/100)
  }} 
  style = {qntopen === (item.sub_type_name) +' '+ (item.product_keyword_name)  ?{borderRadius:10,borderWidth:1,width:60,height:30,justifyContent:"center",alignItems:"center",margin:10,backgroundColor:"#005478",borderColor:"#005478"} :{borderRadius:10,borderWidth:1,width:60,height:30,justifyContent:"center",alignItems:"center",margin:10}}
   
  >
       <View >
         <Text  style= {qntopen === (item.sub_type_name) +' '+ (item.product_keyword_name)? {color:"white"} :{color:"black"}} > {item.sub_type_name} {item.product_keyword_name}</Text>
     


      </View>
      </TouchableOpacity>):null
  

  }


  let keyExtractor = useCallback((item,index) => item.product_id)
 

  let itemView = useCallback (({item}) =>  
 
  <View  style={styles.newArrival} >
      {!item.discount_percentage ?null :<View style={{borderTopRightRadius:4,borderBottomRightRadius:4,position:"absolute",height:18,zIndex:1,backgroundColor:"#8cc63f",width:60,justifyContent:"center",alignItems:"center",alignContent:"center"}}>
                          <Text numberOfLines={1} style={{color:"#fff",fontWeight:"900",fontSize:12,alignSelf:"center"}}> {item.discount_percentage}% {I18n.t('off')}   </Text>
                        </View>}
   <TouchableOpacity
  onPress={
()=>{
 props.navigation.replace('ProductScreen',{product: item, similarProducts: [] })
 console.log('-78',item.product_id)
}
  
  }
 >
  
 
 

      <View>
       
            <TouchableOpacity onPress={()=>{
               setrelatedwishlist(true)
              array.includes(item.product_id)? deleterelatedfromWishlist(item.product_id):item.keyword_value_list_id === null? addrelatedtoWishList(item.product_id,item) :qntopen === 0 ?addTo(item.product_id,item,item.keyword_value_list_id):addrelatedtoWishList(item.product_id,item)
           console.log(item.product_id);
           }}>
            <View style={styles.heart}>
            { array.includes(item.product_id)? <Image style={{ height: 20, width: 20, marginLeft: 10 }} source={require('../../assets/filledheart.png')} />: <Image style={{ height: 20, width: 20, marginLeft: 10 }} source={require('../../assets/heart.png')}/>}
        </View> 
            </TouchableOpacity>

          <View style={{ height: 84, width: 74, alignSelf: 'center' }}>
           {!item.img ? 
           <ImageBackground style={{ marginTop: 5, height: 84, width: 74 }} source={require('../../assets/PerffectLogoholder.png') }> 
           {item.is_out_of_stock === false ? 
                <Image style={{height:84,width:74,alignSelf:'center'}} source={I18n.locale==='en'?require('../../assets/Out_Of_Stock.png') :I18n.locale==='gu'?require('../../assets/Out_Of_Stock_guj.png'):require('../../assets/Out_Of_Stock_hi.png')}/> : null }
              </ImageBackground>
             :<ImageBackground style={{ marginTop: 5, height: 84, width: 74 }} source={{ uri: item.img }}>
                {item.is_out_of_stock === false ? 
                <Image style={{height:84,width:74,alignSelf:'center',resizeMode:"contain"}} source={I18n.locale==='en'?require('../../assets/Out_Of_Stock.png') :I18n.locale==='gu'?require('../../assets/Out_Of_Stock_guj.png'):require('../../assets/Out_Of_Stock_hi.png')}/> : null }
              </ImageBackground>} 
          </View>
          <View style={{ marginTop: 4 }}>
              <Text numberOfLines={1} style={{fontFamily:'MontserratSemiBold', alignSelf: 'center', fontSize: 14, fontWeight: '500', marginTop: 6 ,paddingHorizontal:10}}>
              {I18n.locale==='en'?getText(item.pro_name_en):I18n.locale==='gu'?getText(item.pro_name_gu):getText(item.pro_name_hi)}
              </Text>
              <Text style={{ alignSelf: 'center', marginTop: 4 }}>{`\u20B9${parseFloat(item.pro_price).toFixed(2)}`}</Text>
          </View>
      </View>
 
  </TouchableOpacity>
  </View>
  )

  
  const onTextLayout = useCallback(e =>{
    setLengthMore(e.nativeEvent.lines.length >=4); //to check the text is more than 4 lines or not
    // console.log(e.nativeEvent);
},[]);
    
        return (<View style={{height:"100%",backgroundColor:"#fff"}}>
           <StatusBar backgroundColor="#005478" style={Platform.OS === "android" ? "light" : "dark"} />
           {
                Platform.OS === 'android' ?
            
            <View style={{ backgroundColor: '#005478', borderWidth: 5, borderColor: '#fff', borderRadius: 100, height: 50, width: 50, justifyContent: 'center', bottom:"-3.7%",position:"absolute", zIndex: 1,alignSelf:"center", elevation: 9}}>
           <TouchableOpacity onPress={() =>  props.navigation.navigate('Search')}   activeOpacity={1.0}>
            <Image style={{ height: 25, width: 25, alignSelf: 'center' }} source={require('../../assets/searchIcon.png')}></Image>
            </TouchableOpacity>
            </View>: null
}
            {isLoading?
         <View style={{height:"100%"}}>
          <ActivityIndicator
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop:"30%"
          }}
          visible={isLoading}
          animating={isLoading}
          color="black"
          size="large"
        />
          </View>
          :internet?
         
          <ScrollView scrollEnabled={open? false:true} >
             
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
             <Text style={{ fontSize: 21,  width: 260, fontFamily: 'Montserrat'}}> {I18n.t('ProductPage')} </Text>   
          </View>
          </View>
         
                   
                                <View style={{position:"absolute",right:25,top:20}} >
                                    <TouchableOpacity onPress={
                                        ()=>{
                                          setrelatedwishlist(false)
                                            array.includes(product.product_id  )?deletefromWishlist(product.product_id):product.keyword_value_list_id <= 0 ? addToWishList(product.product_id,product) :qnt === 0 ?addTo(product.product_id,product,product.keyword_value_list):addToWishList(product.product_id,product)
                                        }
                                    }
                                    // disabled = {qnt === 0 ?true: false  }  
                                   >
                                      {
                                        array.includes(product.product_id)? <Image style={{ height: 25, width: 25,marginTop:2,marginLeft: 10 }} source={require('../../assets/filledheart.png')}></Image>: <Image style={{ height: 25, width: 25, marginLeft: 10,marginTop:2 }} source={require('../../assets/heart.png')}></Image>
                                      } 


                                    </TouchableOpacity>
                                
                            </View>

            </View>
         
                     

                        <View>
                      
                              <View style={styles.section2}>
                              {!product.discount_percentage ||typeof discount === 'undefined'?null : <View style={{borderTopRightRadius:8,borderBottomRightRadius:8,position:"absolute",height:30,zIndex:1,backgroundColor:"#8cc63f",width:100,justifyContent:"center",alignItems:"center",alignContent:"center"}}>
                          <Text numberOfLines={1} style={{color:"#fff",fontWeight:"bold",fontSize:20,alignSelf:"center"}}>{discount === '' ? product.discount_percentage :discount}% {I18n.t('off')}  </Text>
                        </View>}
                             
                                  {sliderImage.length <= 0 ? <Image source={require('../../assets/PerffectLogoholder.png')} style={{height:200,width:200}}/> :
                                 
                                   <FlatListSlider 
                                   images={sliderImage}
                                  
                                    width={400}
                                    
                                     resizeMode='center' 
                                     showIndicator = {true}
                                     indicatorSize = {15}
                                     indicatorColor = '#d1d1d1'
                                     indicatorActiveColor =  '#005478'
                                     indicatorShape = "line"
                                     pressable = {false}
                                     
                                     />
                        
                                   
                                   
                         }

                                {product.is_out_of_stock === false ?   
                               <View  style={{marginTop:-50}}>  
                             <Text style={{fontWeight:"800",alignSelf:"center"}}>{I18n.t('CurrentlyUnavailable') } </Text>
                               </View>    
                                : null}
                        </View> 
                        </View>
                        
                       <View style={styles.section3}>
                       
                            <Text>{I18n.t('Productid')}:{product.pro_ID_auto}
                            </Text>
                        
                              <Text style={{ flexDirection: 'row', alignSelf: 'center',position:"absolute",right:110,top:50}}>{I18n.t('Quantity')}</Text>

                            <DropDownPicker
                            open={open}
                            onClose={qtydiscount()}
                            
                            value={count}
                            items={items}
                            setOpen={setOpen}
                            setValue={setcount}
                            setItems={setItems}
                            style={{width:76,height:30,position:"absolute",right:15,top:10}}
                            dropDownContainerStyle={{width:76,height:400,position:"absolute",right:15,top:40}}
                            scrollViewProps={true}
                            />
                               {extra === '' ? null :
                              <Text style={{fontSize: 12, fontFamily:"MontserratSemiBold",color:"#8cc63f",position:"absolute",right:6,top:75}}>Get {extra}%  extra off on {countqty}+ items </Text>}
                            {/* {product.is_out_of_stock === false ?  null: 
                             
                                  <View style={{ flexDirection: 'row', alignSelf: 'center',position:"absolute",right:20,top:5,zIndex:10}}>
                                 {!product.is_quantity_discount ? null :  <Text style={{fontSize: 12, flexDirection: 'row', fontFamily:"MontserratSemiBold",color:"#8cc63f",alignSelf: 'center',position:"absolute",right:-10,top:0}}>Get {product.quantity_discount_percentage}% extra off on {product.qty_limit_discount} items </Text>}  
                              <Text style={{ flexDirection: 'row', alignSelf: 'center',position:"absolute",right:95,top:27}}>{I18n.t('Quantity')}</Text>
                         <View>
                            <DropDownPicker
                            open={open}
                            value={count}
                            items={items}
                            setOpen={setOpen}
                            setValue={setcount}
                            setItems={setItems}
                            style={{width:76,height:30,position:"absolute",right:15,top:23}}
                            dropDownContainerStyle={{width:76,height:400,position:"absolute",right:15,top:50}}
                            scrollViewProps={true}
                            />
                      
                     
                     
                                                 </View>
                                         </View> 
                                    

                                       
                                            } */}
                         <View style={{ flexDirection: 'row', justifyContent: 'space-between',paddingLeft:3 }}>
                             
                                <View style={{ marginTop: 10 }}>
                                <Text style={{ fontFamily:'MontserratBold',fontSize: 20,marginLeft:-10 }}>  {I18n.locale==='en'?product.pro_name_en.length >18 ?`${product.pro_name_en.substring(0, 18)}...`: product.pro_name_en:I18n.locale==='gu'?product.pro_name_gu.length >18 ?`${product.pro_name_gu.substring(0, 18)}...`:product.pro_name_gu:product.pro_name_hi.length >18 ?`${product.pro_name_hi.substring(0, 18)}...`:product.pro_name_hi}</Text>
                                    {/* <View style={{flex:1,flexDirection:"row",flexWrap:"wrap",justifyContent:"center"}}  >
                                    

                                     
                                    </View>
                          */}
                                   
                                   
                                   {!product.discount_percentage  ?  priceid === ''?
                                   <View style={{flex:1,flexWrap:"wrap",flexDirection:"row"}}>
                                   <Text style={{ fontWeight:'bold',fontSize: 20,}}>{`\u20B9${parseFloat(product.pro_price).toFixed(2)}`}</Text> 
                                   <Text style={{ fontFamily:'MontserratBold' ,fontSize: 13, textDecorationStyle: 'solid',color:"#a1a1a1",paddingTop:7}}>/{product.product_size} {product.product_default_unit}</Text>
                                     </View>
                                     :  <View style={{flex:1,flexWrap:"wrap",flexDirection:"row"}}>
                                        <Text style={{ fontWeight:'bold',fontSize: 20,}}>{`\u20B9${parseFloat(priceid).toFixed(2)}`} </Text>  
                                     <Text style={{ fontFamily:'MontserratBold' ,fontSize: 13, textDecorationStyle: 'solid',color:"#a1a1a1",paddingTop:7}}>/{qnt}</Text>
                                     </View>:  qnt === 0 ? <View style={{flex:1,flexWrap:"wrap",flexDirection:"row",paddingLeft:2}}>
                                       
                                     <Text style={{ fontWeight:'bold',fontSize: 20,}}>{`\u20B9${parseFloat(product.payable_amount).toFixed(2)}`}  </Text>
                                     <Text style={{ fontFamily:'MontserratBold' ,textDecorationLine: 'line-through',fontSize: 13, textDecorationStyle: 'solid',color:"#a1a1a1",paddingTop:7}}>{`\u20B9${ parseFloat(product.pro_price).toFixed(2)}`}</Text>
                                      <Text  style={{ fontFamily:'MontserratBold' ,fontSize: 13, textDecorationStyle: 'solid',color:"#a1a1a1",paddingTop:7}}>/{product.product_size} {product.product_default_unit}</Text>
                                
                                             </View>:
                                     <View style={{flex:1,flexWrap:"wrap",flexDirection:"row",paddingLeft:2}}>
                                    <Text style={{ fontWeight:'bold',fontSize: 20,}}>{`\u20B9${parseFloat(priceamount).toFixed(2)}`}  </Text>
                                    {discount === undefined ?null :
                                    <Text style={{ fontFamily:'MontserratBold' ,textDecorationLine: 'line-through',fontSize: 13, textDecorationStyle: 'solid',color:"#a1a1a1",paddingTop:7}}>{`\u20B9${parseFloat(priceid).toFixed(2)}`}</Text>}
                                    <Text  style={{ fontFamily:'MontserratBold' ,fontSize: 13, textDecorationStyle: 'solid',color:"#a1a1a1",paddingTop:7}}>/{qnt}</Text>
                                          

                                            </View>}
                                         
                                  </View>
    
                                {
                                 
                                        <View style={{zIndex:1,marginTop:50}}>
                                            <TouchableOpacity onPress={
                                                () => {
                                                    {isExist?props.navigation.navigate('BasketScreen'):product.keyword_value_list_id <= 0 ? addToBasket():qnt==''?(seterrormsg('alert'),setModalVisible(true)):addToBasket()}
                                                  //  console.log('asd',extra); 
                                                  //  console.log('asd',countqty); 
                                                }
                                                
                                            }
                                         disabled = {product.is_out_of_stock === undefined? false: product.is_out_of_stock === false ?true: false  }  
                                            >
                                                <View style={product.is_out_of_stock === undefined?{ justifyContent: 'center', flexDirection: 'row', backgroundColor: '#005478', height: 40, marginTop: 14, borderRadius: 20, padding:5,paddingLeft:10}:product.is_out_of_stock === true ? { justifyContent: 'center', flexDirection: 'row', backgroundColor: '#005478', height: 40, marginTop: 14, borderRadius: 20, padding:5,paddingLeft:10} : {justifyContent: 'center', flexDirection: 'row', backgroundColor: '#f1f1f1', height: 40, marginTop: 14, borderRadius: 20, padding:5,paddingLeft:10}  }>
                                                {product.is_out_of_stock === undefined? <Text style={{ fontFamily:'Montserrat',alignSelf: 'center', color: 'white', fontSize: 10, marginTop: 0 }}>{isExist?I18n.t('GoToBasket'):I18n.t('AddToBasket')}</Text>: product.is_out_of_stock === true ?

                                                    <Text style={{ fontFamily:'Montserrat',alignSelf: 'center', color: 'white', fontSize: 10, marginTop: 4}}>{isExist?I18n.t('GoToBasket'):I18n.t('AddToBasket')}</Text> :
                                                    <Text style={{ fontFamily:'Montserrat',alignSelf: 'center', color: 'black', fontSize: 12, marginTop: 4 ,fontWeight:"900"}}>{I18n.t('OutOfStock') }</Text>  }
                                                 {product.is_out_of_stock === undefined?<Image style={{ height: 18, width: 18, marginLeft: 5,alignSelf:'center',marginRight:5 }} source={require('../../assets/basketIcon.png')} />: product.is_out_of_stock === true ?<Image style={{ height: 18, width: 18, marginLeft: 5,alignSelf:'center',marginRight:5 }} source={require('../../assets/basketIcon.png')} />:
                                                 null}
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                  
                                }
    
                            </View>
                         
                           
                            { keywordlist >= 1 ? 
                              <View style={{marginTop:10}}></View>:  <View style={{marginTop:0}}>
                              <Text>{I18n.t('selectweigth')}</Text>
                         
                              
                       
                                     
                            
                                        <ScrollView  scrollEnabled={open? false:true}  horizontal={true}>
                                        {
                                           renderOptions(keywordlist) 
                                            
                                        }
                                    </ScrollView>
                                    </View>
                                  
                                }
                              
                        

                          { I18n.locale ==='en' && product.pro_description_en == 0 ? null: I18n.locale ==='gu' && product.pro_description_gu== 0 ? null:  I18n.locale ==='hi' && product.pro_description_hi== 0 ? null: <View style={{ marginTop: 20 }}>
                                <View style={{justifyContent:'space-between',flexDirection:'row'}}>
                                <Text style={{ fontFamily:'Montserrat',fontWeight: 'bold', fontSize: 14 }}>{I18n.t('Description')}</Text>
                               
                                </View>
                                <View style={{ borderWidth: 0.5, borderColor:"#f1f1f1" }} />
                               {/* {
                                description? */}
                                <Text style={{ fontFamily:'Montserrat',fontSize: 10, marginTop: 15,lineHeight: 21 }}   onTextLayout={onTextLayout}
                                numberOfLines={textShown ? undefined : 2} ellipsizeMode='tail'> 
                                 {I18n.locale==='en'?product.pro_description_en:I18n.locale==='gu'?product.pro_description_gu:product.pro_description_hi}</Text>
                                  
                                 {
                  lengthMore ? <Text
                  onPress={toggleNumberOfLines}
                  style={{ lineHeight: 21, marginTop: 10 }}>{textShown ? 'Read less...' : 'Read more...'}</Text>
                  :null
              }
                                   
                                
                            
                            </View>
                            
                            }
                            {similarProducts <= 0 ?null:
                            <View style={{ marginTop: 15}}>
                                <Text style={{ fontFamily:'Montserrat',fontWeight: 'bold', fontSize: 14 }}>{I18n.t('RelatedItems')}</Text>
                            </View>
}
                            </View>    
                         
                            <View style={styles.section4}>
               
               {
            


                  <FlatList
                  numColumns={3}
                  data={similarProducts}
             
              windowSize={3}
                  removeClippedSubviews={true}
           
              
                  renderItem={itemView}
                  keyExtractor={keyExtractor}
        
    
                />
               
               }

                
             
              
           </View> 
                         
        


                            


                      
                            
                        
  
                    </View>
               
                    </ScrollView>
                    
                
                   
                    
          :<View style={styles.containernew}>
          <Image style={{justifyContent:'center',alignSelf:'center',}} source={require('../../assets/noInternet.png')}>
          </Image>
          <Text style={{fontFamily:'Montserrat',color:'#333333',alignSelf:'center',fontSize:25,marginTop:20}}>{I18n.t('NoInternetConnection')} </Text>
          <Text style={{fontFamily:'Montserrat',color:'#333333',alignSelf:'center',fontSize:20,marginTop:10}}>{I18n.t('PleaseTryAgainLater')}</Text>
  </View>}

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
        {errormsg === 'alert' ? 
        
        <View style={{   height: 180,
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
        }}>
          
          <TouchableOpacity  style={{position:"absolute",right:20,top:20}} onPress={() => setModalVisible(false)}>
          <Image source={require('../../assets/close.png')} style={{height:30,width:30}} />
          </TouchableOpacity>
       
              <View style={{flex:1,flexWrap:"wrap" ,flexDirection:"row",alignContent:"space-between"}}>
                <Image source={require('../../assets/alert.png')} style={{height:30,width:30}}/>
                <Text style={{fontSize:25,marginLeft:10}}>{I18n.t('alert')}</Text>
      </View>
        
      
        <Text style={{
          marginTop:35,
          fontSize:16
        }}>
{I18n.t('pleaselectweigthofproduct')}
         </Text>
                          
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(false)}
            
            >
         <Text style={{color:"#fff",justifyContent:"center",alignSelf:"center",fontSize:18}}>
{I18n.t('okay')}
         </Text>
            </TouchableOpacity>
          </View> 
          :
          //for related product 


            relatedwishlist === true?
          <View style={styles.modalView}>
          <TouchableOpacity  style={{position:"absolute",right:10,top:10}} onPress={() => {setModalVisible(false)
          setqntopen(0)
          }}>
          <Image source={require('../../assets/close.png')} style={{height:30,width:30}} />
          </TouchableOpacity>
        
          <View  style={{height:100}}>
              
                          
          {I18n.locale === 'en' ? 
<Text style={{alignSelf:"center",fontSize:20}}>{producteng}</Text> : I18n.locale === 'gu' ? <Text style={{alignSelf:"center",fontSize:20}}> {productguj}</Text> :  <Text style={{alignSelf:"center",fontSize:20}}> {producthin}</Text>}
                          
                          <Text style={{alignSelf:"center"}}>{I18n.t('weigths')}</Text>
                
                                 
                          <ScrollView  scrollEnabled={open? false:true}  horizontal={true}  showsHorizontalScrollIndicator={true} persistentScrollbar={true} >
                                      {
                                         renderOption(keyword)
                                     
                                      }
                                      
                                  </ScrollView>
                               
      
                            
                          </View>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => {addrelatedtoWishList()
              setrelatedwishlist(false)
              setqntopen(0)
              }}
              disabled = {qntopen === 0 ? true: false  }  
            >
            {qntopen === 0 ?    <Text style={{color: "white",textAlign: "center"} }>{I18n.t('selectweigth')} </Text> :<Text style={{color: "white",textAlign: "center"} }>{I18n.t('addtowishlist')}</Text>}
            </TouchableOpacity>
          </View>
          :
          <View style={styles.modalView}>
          <TouchableOpacity  style={{position:"absolute",right:10,top:10}} onPress={() => setModalVisible(false)}>
          <Image source={require('../../assets/close.png')} style={{height:30,width:30}} />
          </TouchableOpacity>
        
          <View  style={{height:100}}>
              
                          
          {I18n.locale === 'en' ? 
<Text style={{alignSelf:"center",fontSize:20}}>{producteng}</Text> : I18n.locale === 'gu' ? <Text style={{alignSelf:"center",fontSize:20}}> {productguj}</Text> :  <Text style={{alignSelf:"center",fontSize:20}}> {producthin}</Text>}
                          
                          <Text style={{alignSelf:"center"}}>{I18n.t('weigths')}</Text>
                
                                 
                          <ScrollView  scrollEnabled={open? false:true}  horizontal={true}  showsHorizontalScrollIndicator={true} persistentScrollbar={true} >
                                      {
                                        renderOptions(keyword)
                                     
                                      }
                                      
                                  </ScrollView>
                               
      
                            
                          </View>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => {addToWishList(Iddoc)
                setModalVisible(false)
              setQnt(0)}}
              disabled = {qnt === 0 ? true: false  }  
            >
            {qnt === 0 ?    <Text style={{color: "white",textAlign: "center"} }>{I18n.t('selectweigth')} </Text> :<Text style={{color: "white",textAlign: "center"} }>{I18n.t('addtowishlist')}</Text>}
            </TouchableOpacity>
          </View>}
          
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
        <Text style={styles.fadingText}>{I18n.t('addedtowishlist')}</Text>
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
        <Text style={styles.fadingText}>{I18n.t('removedfromwishlist')}</Text>
      </Animated.View>

  
            </View>  )
    
}
const styles = StyleSheet.create({
    container: {
      width:"100%",
        height: '100%',
        backgroundColor: 'white',
       
    },
    section1: {
      height: 70,
   
      marginTop: 25,
      alignItems:"center",
      flexDirection: 'row'
    
        

    },
    containernew: {
        height: '100%',
       
        justifyContent: 'center',
       
    },
    section2: {
        backgroundColor: '#F1F1F1',
        height: 290,
        alignSelf: 'center'
    },
    section3: {
      
        backgroundColor: 'white',

        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 15,
        
       
        

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
    newArrival: {
   
       width:"32%",
        borderWidth: 1,
        borderColor: '#E9E9E9',
      margin:2,
      
      
    },
    heart: {
        alignSelf: 'flex-end',
        marginRight: 4,
        marginTop: 4
    }, section4: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      display: 'flex',
      paddingHorizontal: 10,
      justifyContent: 'center',
      marginBottom:30
        


    }, centeredView: {
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
    
      height:40,
      borderRadius: 20,
      padding: 4,
      elevation: 2,
      marginTop:20,
      justifyContent:"center",
      alignSelf:"center"
    
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#005478",
      width:100
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
export default ProductScreen





