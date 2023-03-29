import React, { useState } from 'react';
import {View,Text,StyleSheet,TouchableOpacity,Image,Dimensions} from 'react-native';
import * as firebase from 'firebase';
import NetInfo from "@react-native-community/netinfo";
import I18n from 'i18n-js';
import Header1 from './Header1';
import StepIndicator from 'react-native-step-indicator';
import syncStorage from 'sync-storage';
import { ScrollView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';

const OrderDetailes = (props) => {
    const [id, setid] = useState('')
    const [address, setaddress] = useState('')
    const [email, setemail] = useState('')
    const [totalprice, settotalPrice] = useState(0)
 const [Detai, setDetai] = useState([])
    const [orderid, setorderid] = useState('')
    const [orders, setorders] = useState([])
    const [internet,setInternet]=useState(false);
    const [height, setheight] = useState(0)
    const [currentPosition, setcurrentPosition] = useState(0)
    const [labels,setlabels] = useState([]);
    const [Info, setInfo] = useState([])

// class OrderDetailes extends React.Component{
    // constructor(){
    //     super();
    //     this.state={
    //        order_id:'',
    //        orders:[],
    //        internet:false,
    //        height:0
    //     }
    // }

    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
         
        setheight(Dimensions.get('window').height)
        setorderid(props.route.params.order_id)
        //     setDetai(props.route.params.orderDetailes)
        // setaddress(props.route.params.orderDetailes.deliveryDetailes.deliveryAddress)
        // setemail(props.route.params.orderDetailes.deliveryDetailes.deliveryEmail)
        // settime(props.route.params.orderDetailes.deliveryDetailes.deliveryTime) 
        // setphone(props.route.params.orderDetailes.deliveryDetailes.deliveryPhone)
        //    setid(props.route.params.orderDetailes.order_id)
        //    if(props.route.params.orderDetailes.orderplaced===true){
        //        setcurrentPosition(0)
              
        //    }
        //    if(props.route.params.orderDetailes.orderPrepared===true){
        //        setcurrentPosition(1) 
        //    }
        //    if(props.route.params.orderDetailes.orderdispatch===true){
        //        setcurrentPosition(2)
        //    }
        //    if(props.route.params.orderDetailes.outForDelivery===true){
        //        setcurrentPosition(3) 
        //    }
        //    if(props.route.params.orderDetailes.orderRecived===true){
        //        setcurrentPosition(4)
        //    }
        //    setlabels([I18n.t('OrderPlaced'),I18n.t('OrderPrepared'),I18n.t('OrderDispatch'),I18n.t('outForDeliver'),I18n.t('OrderRecived')])
        getData();
      
       Data();


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
  },[props.navigation]);

    // componentDidMount(){
    // //    alert(JSON.stringify(this.props.route.params.order_id))
    //     this.setState({height:Dimensions.get('window').height})
    //      this.setState({order_id:this.props.route.params.order_id})
    //      this.getData();
      
        //  this.unsubscribe = NetInfo.addEventListener(state => {
        //     console.log("Connection type____", state.type);
        //     this.setState({internet:state.isConnected})
        //     console.log("Is connected___?", state.isConnected);
            
            
        //   });

    // }
    // componentWillUnmount(){
    //     this.unsubscribe()
    //   }
    const getData=()=>{
        firebase.firestore()
    .collection('order_list')
    .doc(props.route.params.order_id)
    .collection('item_list')
    .get()
    .then(ss=>{
       var array=[];
       ss.forEach(item=>{
        
            array.push(item.data())
          console.log('-->>',item)

       })
    setorders(array)
       
    })
    }

    const Data=()=>{
        firebase.firestore()
    .collection('order_list')
    .doc(props.route.params.order_id)
    .get()
    .then(ss=>{
       var price = 0;
     
        
           price=(ss.data().total_amount)
        

      
       settotalPrice(price)
   
       
    })
    }

   
    
   
    return (
        <View>
                     <StatusBar backgroundColor="#005478" style={Platform.OS === "android" ? "light" : "dark"} />
             {
                Platform.OS === 'android' ?
            
            <View style={{ backgroundColor: '#005478', borderWidth: 5, borderColor: '#fff', borderRadius: 100, height: 50, width: 50, justifyContent: 'center', bottom:"-3.7%",position:"absolute", zIndex: 1,alignSelf:"center", elevation: 9}}>
           <TouchableOpacity onPress={() => props.navigation.navigate('Search')}   activeOpacity={1.0}>
            <Image style={{ height: 25, width: 25, alignSelf: 'center' }} source={require('../../assets/searchIcon.png')}></Image>
            </TouchableOpacity>
            </View>: null
}
         {internet?
            <View style={styles.container}>

                     
             
                 <Header1 title={I18n.t('OrderDetailes')} backArrowInclude={true}   goBack={props}  />
               {props.route.params.orderDetailes != null  ? <TouchableOpacity style={{borderWidth:1,position:"absolute",top:45,right:18 ,padding:5,borderRadius:10,backgroundColor:"#F1F1F1"}} onPress={() => props.navigation.navigate('status',{details:props.route.params.orderDetailes}) }>
                    <Text>{I18n.t('status')}</Text>
                     </TouchableOpacity>:  <TouchableOpacity>
                    <Text></Text>
                     </TouchableOpacity>
                   
}
                
             {/* <View style={styles.secttion1}>
            <TouchableOpacity onPress={
               ()=>{
              props.navigation.goBack();
               }
           }>
             <Image style={{marginTop:5, height:20,width:20}} source={require('../../assets/backArrow.png')}></Image>
             </TouchableOpacity>
             <Text style={{fontFamily:'Montserrat',marginLeft:20,marginTop:5,fontSize:16}}>{I18n.t('OrderDetailes')}</Text>
            </View> */}
              <ScrollView>    
    
            <View style={{paddingHorizontal:'5%'}}>
           
            {orders.length>0?orders.map(item=>{
                     return(
                        <TouchableOpacity   onPress={()=>
                            props.navigation.navigate('ProductScreen',{product:item.product_det})}
                           >
                        <View style={styles.orderContainer}>
                          
                        <View >
                         <Image  style= {styles.orderImage} source={{uri:item.product_det.img}}></Image>
                        </View>
    
                        <View style={{width:'40%'}}>
                            <Text>{`${I18n.t('Productid')} : `+ item.product_det.pro_ID_auto}</Text>
                        <Text>{I18n.locale==='en'?item.product_det.pro_name_en:I18n.locale==='hi'?item.product_det.pro_name_hi:item.product_det.pro_name_gu}</Text>
                          <Text >{item.product_size}</Text>

                          <Text >{'\u20B9'+(item.totalPrice/item.product_qnt)}</Text>
                        </View>
                        <View style={{justifyContent:'center',marginTop:40}}>
                          <Text style={{fontFamily:'Montserrat',fontWeight:"bold",fontSize:14}}>{`${I18n.t('Quantity')} : `+item.product_qnt}</Text>
                          <Text style={{fontWeight:"bold",fontSize:14}} >{`${I18n.t('total')} : `+'\u20B9'+item.totalPrice}  </Text>
                        </View>
                      
                       </View>
                       </TouchableOpacity>
                     )
            }):<View style={{height:height-150,justifyContent:'center'}}>
            <Image style={{height:310,width:300,justifyContent:'center',alignSelf:'center'}} source={require('../../assets/EmptyView.png')}></Image>
            </View>}
            
        
            </View> 
      
            </ScrollView>
            <View >
            <View style={{padding:40}}>
       <Text style={{fontWeight:'bold',fontFamily:'MontserratSemiBold'}}>{I18n.t('BillDetailes')}</Text>
     
       <View style={{justifyContent:'space-between',flexDirection:'row',marginTop:5}}>
       <Text style={{fontWeight:'bold',fontFamily:'MontserratSemiBold'}}>{I18n.t('TotalPrice')}</Text>
       <Text style={{fontWeight:'bold',}}>{`\u20B9`+totalprice}  </Text>
       </View>
       
      
       </View>
       </View>
            </View>
        :<View style={styles.containernew}>
        <Image style={{justifyContent:'center',alignSelf:'center',}} source={require('../../assets/noInternet.png')}>
        </Image>
        <Text style={{fontFamily:'Montserrat',color:'#333333',alignSelf:'center',fontSize:25,marginTop:20}}>{I18n.t('NoInternetConnection')} </Text>
    <Text style={{fontFamily:'Montserrat',color:'#333333',alignSelf:'center',fontSize:20,marginTop:10}}>{I18n.t('PleaseTryAgainLater')}</Text>
</View>}
         </View>
    )
   }

const styles=StyleSheet.create({
    container:{
        height:'100%',
        backgroundColor:'white'
    },
    secttion1:{
        height:80,
        backgroundColor:'#F1F1F1',
        paddingTop:40,
        paddingLeft:40,
        flexDirection:'row'
        
    },
    orderContainer:{
        borderWidth:1,
        padding:10,
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:10,
        borderColor:'#E9E9E9',
        borderRadius:4
    },
    orderImage:{
        marginLeft:0,
        height:80,
        width:80,
        overflow:'hidden',
        alignSelf:'center'
        
    },
    deliverTextgreen:{
        color:'green',
        alignSelf:'center'
    },
    deliverTextRed:{
     color:'red',
     alignSelf:'center'  
    }
})
export default  OrderDetailes