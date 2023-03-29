import React from 'react';
import {View,Text,StyleSheet,Image,TouchableOpacity, TextInput} from 'react-native';
import Header1 from './Header1';
import * as firebase from 'firebase';
import syncStorage from 'sync-storage';
import uuid from 'react-native-uuid';
import CheckBox from '@react-native-community/checkbox'
import NetInfo from "@react-native-community/netinfo";
import i18n from 'i18n-js';
import { StatusBar } from 'expo-status-bar';
import { ScrollView } from 'react-native';
import moment from 'moment';
class OrderSummary extends React.Component{
   constructor(){
       super();
       this.state={
        Products:[],
            deliverAddress:'',
            Email:'',
            DeliverTime:'',
            MobileNumber:'',
            modalOpen:true,
            modalData:'address',
            error:'',
            totalAmount:0,
            total_price:0,
            Gst_price:0,
        
            userName:'',
            invoice:0,
                checkbox:'A',
            internet:false
        
       }
   }
   componentDidMount(){
      this.setState({Products:this.props.route.params.products})
      this.setState({totalAmount:this.props.route.params.Amount})
      this.setState({total_price:this.props.route.params.total})
      this.setState({Gst_price:this.props.route.params.Gst})

      this.unsubscribe = NetInfo.addEventListener(state => {
        console.log("Connection type____", state.type);
        this.setState({internet:state.isConnected})
        console.log("Is connected___?", state.isConnected);
    
        
      });
    
     this.getData()
      firebase.
      firestore()
     .collection('users_list')
     .doc(syncStorage.get('user_id'))
     .get()
     .then((data)=>{
      this.setState({deliverAddress:data.data().addressofShop})
         this.setState({userName:data.data().userName})
         this.setState({Email:data.data().email})
         this.setState({MobileNumber:data.data().phone})
     })
     .catch(error=>alert(error))
    
   }
   componentWillUnmount(){
    this.unsubscribe()
  }
deleteallDoc = () =>
{
  firebase.
  firestore()
  .collection('my_basket')
  .doc(syncStorage.get('user_id'))

  .delete()
  .then(() => {
    console.log('delete--->',id);
 })
}

   deleteDoc = (id) => {

    firebase.
        firestore()
        .collection('my_basket')
        .doc(syncStorage.get('user_id'))
        .collection('item_list')
        .doc(id)
        .delete()
        .then(() => {
           console.log('delete--->',id);
         
        })

}
clearBasket=()=>{
    this.state.Products.forEach(item=>{
        this.deleteDoc(item.product_det.product_id)
        console.log('delete->',item.product_det.product_id);
    })
    
}
   addfield=(uid)=>{
     // alert(JSON.stringify(product))
     var date=new Date();
     var hours = date.getHours()
     var minu =date.getMinutes()
     var minutes = minu < 10 ? '0' + minu : minu; 
     var ampm = hours >= 12 ? 'pm' : 'am';
     hours = hours % 12;
     hours = hours ? hours : 12; // the hour '0' should be '12'
     var strTime = hours + ':' + minutes + ' ' + ampm;
    if(!this.state.internet)
      alert('No Internet Please \n Connect To Internet')
    
    firebase.
    firestore()
    .collection('order_list')
    .doc(uid)
    .set({
        deliveryDetailes:{
            deliveryAddress:this.state.deliverAddress,
            deliveryEmail:this.state.Email,
            deliveryTime:this.state.checkbox==='A'?'7:00AM - 9:00PM':'9:00AM - 5:00PM',
            deliveryPhone:this.state.MobileNumber
            
        },
        orderDate: moment(date).format("DD-MM-YYYY"),
        timeStamp:date.getTime(),
        user_id:syncStorage.get('user_id'),
        orderPrepared:false,
        orderRecived:false,
        orderdispatch:false,
        orderPlaced:true,
        orderOutForDelivery:false,
        order_key:uid,
        order_id:Math.floor(Math.random()*100000 + 1),
        order_time:strTime,
        user_name:this.state.userName,
        total_amount:this.state.totalAmount,
        
        
    }).then(()=>{
      this.clearBasket()
      

    }).catch(error=>{
      alert(error)
    })
   }

  
 getData=()=>{
  firebase.firestore()
  .collection('users_list')
  .doc(syncStorage.get('user_id'))
 .get()
 .then((data)=>{
  this.setState({invoice:data.data().invoice_count})
  console.log('invoice',data.data().invoice_count);
   
 })

 
 }

 setData=()=>{
        firebase.firestore()
        .collection('users_list')
        .doc(syncStorage.get('user_id'))
        .update({
          invoice_count:this.state.invoice + 1 })
       
      }
  
   setToDb=(uid,id,product)=>{
  
    
    firebase.
    firestore()
    .collection('order_list')
    .doc(uid)
    .collection('item_list')
    .doc(id)
    .set(product,product.product_id)
    .then(()=>{
        
    })
    .catch((error)=>alert(error))
   }
   render(){
    return (
      <View>
        
     
<View style={{height:'93%'}}>
 <ScrollView>
  
 <View style={styles.container}>
 <View style={styles.section1}>
 <View style={{ alignSelf:'center', flexDirection: 'row'}}>
             <TouchableOpacity onPress={
                    () => {
                        this.props.navigation.goBack();
                    }
                }>
                    <View style={{ marginLeft: 20}}>
                    <Image style={{  height:30,width:30 }} source={require('../../assets/backArrow.png')}></Image>
                    </View>
                </TouchableOpacity>
             
                <View style={{ justifyContent:'center',alignItems:'center',alignContent:"center"}}>
             <Text style={{ fontSize: 21, width: 260, fontFamily: 'Montserrat'}}>{i18n.t('OrderSummary')} </Text>   
          </View>
          </View>
       
                 
        
            

          </View>
 <StatusBar backgroundColor="#005478" style={Platform.OS === "android" ? "light" : "dark"} />
    
 {/* <Header1 title={i18n.t('OrderSummary')} backArrowInclude={true} optionsInclude={false}  goBack={this.props}/> */}
 <View style={{padding:40}}>
  <Text style={{fontFamily:'MontserratSemiBold',fontSize:20,fontWeight:'bold'}}>
    {this.state.userName}
 </Text>
 </View> 
 <View style={{flexDirection:'row',fontSize:12,paddingHorizontal:40,justifyContent:'space-between',marginTop:10}}>

 
 </View>
     

 <View style={{justifyContent:'center',paddingHorizontal:40,}}>
 <TouchableOpacity onPress={
     ()=>{
       this.state.modalOpen?this.setState({modalOpen:false})
       : 
         this.setState({modalOpen:true});
         this.setState({modalData:'address'})
     }
 }>
  <View style={{flexDirection:'row',borderBottomWidth:1,marginTop:10,paddingBottom:10,borderColor:'#444444'}}>
  <View style={{flexDirection:'row',width:'60%'}}>
  <Image style={{height:25,width:25,marginTop:5}} source={require('../../assets/truck.png')}/>
  <Text style={{fontFamily:'Montserrat',marginLeft:20,marginTop:10}}>{i18n.t('DeliveryAddress')}</Text>
  </View>
   <View style={{width:'30%'}}>

 {
   this.state.modalOpen&&this.state.modalData==='address'?<Image style={{marginLeft:'100%',marginTop:10,height:20,width:20}} source={require('../../assets/backArrow.png')}/>:<Image style={{marginLeft:'100%',marginTop:10,height:20,width:20}} source={require('../../assets/goAhead.png')}/>
 }

 
   </View>
  </View>
  </TouchableOpacity>
  {
      this.state.modalOpen&&this.state.modalData==='address'?
      <View style={{padding:20}}>
        <View>
        <TextInput style={{borderBottomWidth:1,borderColor:'grey'}} placeholder={'Address'} value={this.state.deliverAddress} onChangeText={
            (text)=>{
                this.setState({deliverAddress:text})
            }
        }/>
        
        </View>
        
      </View>
:null   
  }
   <TouchableOpacity onPress={
     ()=>{
       this.state.modalOpen?this.setState({modalOpen:false})
       : 
         this.setState({modalOpen:true});
       this.setState({modalData:'email'})
     }
 }>
  <View style={{flexDirection:'row',borderBottomWidth:1,marginTop:10,paddingBottom:10,borderColor:'#444444'}}>
   <View style={{flexDirection:'row',width:'60%'}}>
   <Image style={{height:25,width:25,marginTop:5}} source={require('../../assets/email.png')}/>
   <Text style={{fontFamily:'Montserrat',marginLeft:20,marginTop:10}}>{i18n.t('Email')}</Text>
   </View>
    <View style={{width:'30%'}}> 
     
  
 {
   this.state.modalOpen&&this.state.modalData==='email'?<Image style={{marginLeft:'100%',marginTop:10,height:20,width:20}} source={require('../../assets/backArrow.png')}/>:<Image style={{marginLeft:'100%',marginTop:10,height:20,width:20}} source={require('../../assets/goAhead.png')}/>
 }


    </View>
    
   </View>
   </TouchableOpacity>
   {
     this.state.modalOpen&&this.state.modalData==='email'?
     <View style={{padding:20}}>
       <View>
       <TextInput style={{borderBottomWidth:1,borderColor:'grey'}} placeholder={'email'} value={this.state.Email} onChangeText={
           (text)=>{
               this.setState({Email:text})
           }
       }/>

      
       </View>
       
     </View>
:null   
 }

<TouchableOpacity onPress={
   ()=>{
     this.state.modalOpen?this.setState({modalOpen:false})
       : 
         this.setState({modalOpen:true});
    this.setState({modalData:'deliverTime'}) 
   }
}>
 <View style={{flexDirection:'row',borderBottomWidth:1,marginTop:10,paddingBottom:10,borderColor:'#444444'}}>
 <View style={{width:'60%',flexDirection:'row'}}>
 <Image style={{height:25,width:25,marginTop:5}} source={require('../../assets/clock.png')}/>
 <Text style={{fontFamily:'Montserrat',marginLeft:20,marginTop:10}}>{i18n.t('DeliveryTime')}</Text>
 </View>
  <View style={{width:'30%'}}>
 
{
 this.state.modalOpen&&this.state.modalData==='deliverTime'?<Image style={{marginLeft:'100%',marginTop:10,height:20,width:20}} source={require('../../assets/backArrow.png')}/>:<Image style={{marginLeft:'100%',marginTop:10,height:20,width:20}} source={require('../../assets/goAhead.png')}/>
}

 

  </View>
 </View>
 </TouchableOpacity>  
   {
     this.state.modalOpen&&this.state.modalData==='deliverTime'?
     <View style={{padding:20}}>
       <View>
        <View style={{flexDirection:'row' ,marginBottom:20}}>
         <View style={{width:'60%'}}>
         <Text>{`7:00AM - 7:00PM`}</Text>
         </View>
         <View style={{width:'40%'}}>
         <TouchableOpacity onPress={()=>{
           this.setState({checkbox:'A'})
         }}>

         {
           this.state.checkbox==='A'?<Image style={{height:20,width:20}} source={require('../../assets/checked.png')}/>:<Image style={{height:20,width:20}} source={require('../../assets/unchecked.png')}/>
         }
         
         </TouchableOpacity>
          
         </View>
        </View>
        
        <View style={{flexDirection:'row'}}>
         <View style={{width:'60%'}}>
         <Text>9:00AM - 5:00PM</Text>
         </View>
         <View style={{width:'40%'}}>
         <TouchableOpacity onPress={()=>{
           this.setState({checkbox:'B'})
         }}>
         {
           this.state.checkbox==='B'?<Image style={{height:20,width:20}} source={require('../../assets/checked.png')}/>:<Image style={{height:20,width:20}} source={require('../../assets/unchecked.png')}/>
         }
         </TouchableOpacity>
          
         </View>
        </View>
      
       
       </View>
       
     </View>
:null   
 }
  <TouchableOpacity onPress={
     ()=>{
       this.state.modalOpen?this.setState({modalOpen:false})
       : 
         this.setState({modalOpen:true});
        this.setState({modalData:'MobileNumber'}) 
     }
 }>
  <View style={{flexDirection:'row',borderBottomWidth:1,marginTop:10,paddingBottom:10,borderColor:'#444444'}}>
   <View style={{width:'60%',flexDirection:'row'}}>
   <Image style={{height:25,width:25,marginTop:5}} source={require('../../assets/call.png')}/>
   <Text style={{fontFamily:'Montserrat',marginLeft:20,marginTop:10}}>{i18n.t('MobileNumber')}</Text>
   </View>
   <View style={{width:'30%'}}>
 
 {
   this.state.modalOpen&&this.state.modalData==='MobileNumber'?<Image style={{marginLeft:'100%',marginTop:10,height:20,width:20}} source={require('../../assets/backArrow.png')}/>:<Image style={{marginLeft:'100%',marginTop:10,height:20,width:20}} source={require('../../assets/goAhead.png')}/>
 }

   </View>
  </View>
  </TouchableOpacity>
  {
   this.state.modalOpen&&this.state.modalData==='MobileNumber'?
   <View style={{padding:20}}>
     <View>
     <TextInput style={{borderBottomWidth:1,borderColor:'grey'}} placeholder={'Mobile Number'} value={this.state.MobileNumber} onChangeText={
         (text)=>{
             this.setState({MobileNumber:text})
         }
     }/>
    
     </View>
     
   </View>
:null   
}

<View style={{marginTop:40}}>
<View style={{justifyContent:'space-between',flexDirection:'row',marginTop:5}}>
  
  <Text style={{fontFamily:'MontserratSemiBold'}}>{i18n.t('BillDetailes')}</Text>
 <Text></Text>

  </View>
<View style={{borderBottomWidth:1,paddingBottom:10}}>
<View style={{justifyContent:'space-between',flexDirection:'row',marginTop:5}}>
<Text>{i18n.t('ItemTotal')}</Text>
<Text>{`\u20B9`+this.state.total_price}</Text>
</View>
<View style={{justifyContent:'space-between',flexDirection:'row',marginTop:5}}>
<Text>{i18n.t('Delivery')}</Text>
<Text>{`\u20B9`+0}</Text>
</View>
<View style={{justifyContent:'space-between',flexDirection:'row',marginTop:5}}>
<Text>{i18n.t('TaxesandCharges')}</Text>
<Text>{`\u20B9`+this.state.Gst_price}</Text>
</View>
</View>
<View style={{justifyContent:'space-between',flexDirection:'row',marginTop:5}}>
<Text style={{fontFamily:'MontserratSemiBold',fontWeight:'bold'}}>{i18n.t('TotalPrice')}</Text>
<Text style={{fontFamily:'MontserratSemiBold'}}>{`\u20B9`+this.state.totalAmount}</Text>
</View>
{
   this.state.error===''?null:   <View style={{alignSelf:'center',justifyContent:'center',marginTop:20}}>
   <Text style={{fontFamily:'Montserrat',color:'red'}}>{this.state.error}</Text>
  </View>
}

</View>



  </View>

 </View>
  
 </ScrollView>
</View>
      <View style={{ height: '7%', backgroundColor: '#005478', zIndex: 1000, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
      <Text style={{fontFamily:'Montserrat',fontSize:16,color:'white',marginLeft:20,marginTop:5}}>{`\u20B9`+this.state.totalAmount}</Text>
     <TouchableOpacity 
         onPress={
             ()=>{
                
              const regemail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
              
                 if(this.state.deliverAddress.length<=10){

                     this.setState({error:'Delivery Address Should Contain Minimum 10 Letters'})
                 }
                 else if(regemail.test(this.state.Email)===false){
                     this.setState({error:'Please Enter Valid Delivery Email'})
                 }
                 
                 else if((!isNaN(this.state.MobileNumber)===false)){
                     this.setState({error:'please Enter Valid Contact Number'})
                 }
                 else if(this.state.MobileNumber.length<10){
                     this.setState({error:'Please Enter Valid Conatct Number'})
                 }
                 else{
                   var uid=uuid.v4()
                   this.addfield(uid) 
                   this.setData()
                  this.state.Products.forEach((product)=>{
                     this.setToDb(uid,product.product_det.product_id,product)
                  
                 })
                
                
                 this.props.navigation.navigate('OrderConfirmScreen')
             }
        
             }
         
     }>
     <View style={{backgroundColor:'white',padding:5,marginRight:20 ,borderRadius:5}}>
     <Text style={{fontFamily:'Montserrat',fontSize:14,fontWeight:'bold',}}>{i18n.t('PlaceOrder')}</Text>
    </View>
     </TouchableOpacity>
     
     
      </View>
   


    
      </View>
           )
   }
}
const styles=StyleSheet.create({
    container:{
        height:'93%',

    },containernew: {
      height: '100%',
     
      justifyContent: 'center'
  },
  section1: {
    height: 70,
 
    marginTop: 25,
    alignItems:"center",
    flexDirection: 'row'
}, 
})
export default OrderSummary