import React from 'react';
import {View,Text,StyleSheet,Image, TouchableOpacity,FlatList,ActivityIndicator,Dimensions} from 'react-native';
import * as firebase from 'firebase';
import syncStorage from 'sync-storage';
import NetInfo from "@react-native-community/netinfo";
import { StatusBar } from 'expo-status-bar';
import I18n from 'i18n-js';
import { ScrollView } from 'react-native';
import Header1 from './Header1';
import Swiper from 'react-native-swiper'

class OrderHistory extends React.Component{
  constructor(){
      super();
      this.state={
          activeTab:'ongoingorder',
         
        orders:[],
        isLoading:false,
        internet:false,
        height:0
       
        
      }
  } 
  renderOrders=(e)=>{
    
   
  }
  componentDidMount(){
      this.setState({height:Dimensions.get('window').height})
      this.setState({isLoading:true})
      syncStorage.set('isBasket', false)
      this.unsubscribe = NetInfo.addEventListener(state => {
        console.log("Connection type____", state.type);
        this.setState({internet:state.isConnected})
        console.log("Is connected___?", state.isConnected);
        
        
      });

    firebase.firestore()
    .collection('order_list')
    
    .where('user_id','==',syncStorage.get('user_id'))
    
    .orderBy('timeStamp','desc')
 
    .get()
    .then((ss)=>{
         var array=[]
         ss.forEach((item)=>{
             if(item.data().orderRecived == false)
             {
             array.push(item.data())
             console.log('--->id',item);
             }
         })
         this.setState({orders:array})
         this.setState({isLoading:false})
       
    })
  }
  componentWillUnmount(){
    this.unsubscribe()
  }
   render(){
    return (<View>
                 <StatusBar backgroundColor="#005478" style={Platform.OS === "android" ? "light" : "dark"} />
         {
                Platform.OS === 'android' ?
            
            <View style={{ backgroundColor: '#005478', borderWidth: 5, borderColor: '#fff', borderRadius: 100, height: 50, width: 50, justifyContent: 'center', bottom:"-3.7%",position:"absolute", zIndex: 1,alignSelf:"center", elevation: 9}}>
           <TouchableOpacity onPress={() => this.props.navigation.navigate('Search')}   activeOpacity={1.0}>
            <Image style={{ height: 25, width: 25, alignSelf: 'center' }} source={require('../../assets/searchIcon.png')}></Image>
            </TouchableOpacity>
            </View>: null
}
         {this.state.isLoading?
         <View style={{height:"70%"}}>
                 <ActivityIndicator
                         style={{
                             flex: 1,
                             justifyContent: 'center',
                             alignItems: 'center',
                            marginBottom:100
                         }}
                         visible={this.state.isLoading}
                         animating={this.state.isLoading}
                         color="black"
                         size="large"

                     />
                     </View>:null}
         {
             this.state.internet?
             <View style={styles.container}>
             
              {/* <View style={styles.secttion1}>
              <TouchableOpacity onPress={
                 ()=>{
                     this.props.navigation.goBack();
                 }
             }>
               <View style={{height:40,justifyContent:'center'}}>
               <Image style={{ height:25,width:25}} source={require('../../assets/backArrow.png')}></Image>
               </View>
               </TouchableOpacity>
                <View style={{height:40,justifyContent:'center'}}>
                <Text style={{fontFamily:'Montserrat',marginLeft:20,fontSize:25}}> {I18n.t('MyOrder')}</Text>

                </View>
               </View>   */}
               
             
     
                     {
                        this.state.orders.length>0?  
                        <View style={{marginHorizontal:'5%',marginTop:10}}>
                       
                     
                            {
                                 <FlatList
                              
                                  style={{padding:3}}
                                  data={this.state.orders}
                                  
                                  renderItem={({item})=>{
                                    if(this.state.activeTab==='ongoingorder'?item.orderRecived===false:item.orderRecived===true)
                                      {return (
                                       
                                        <TouchableOpacity onPress={
                                                        ()=>{
                                                           this.props.navigation.navigate('OrderDetailes',{order_id:item.order_key,orderDetailes: item})
                                                        }
                                                    }>
                                                    <View style={{backgroundColor:'#F2F2F2',flexDirection:'row',padding:10,borderRadius:10,borderWidth:1,marginTop:10,borderColor:'lightgrey'}}>
                                                    <View style={{width:'30%',justifyContent:'center'}}>
                                                    <Image style={{alignSelf:'center',height:60,width:60}} source={require('../../assets/Parcel.png')}/>
                                                   </View>
                                                    <View style={{width:'70%'}}>
                                                     <Text style={{fontFamily:'Montserrat',fontSize:15}}>{I18n.t('OrderDate')}:{item.orderDate}</Text>
                                                     <Text style={{fontFamily:'Montserrat',fontSize:15}}>{I18n.t('Time')}:{item.order_time}</Text>
                                                     <Text style={{fontFamily:'Montserrat',marginTop:10,fontSize:15}}>{I18n.t('OrderID')} : {item.order_id}</Text>
                                                    </View>
                                                   </View>
                                                    </TouchableOpacity>
                                      )}}}
                                  keyExtractor={item => item.product_id}
                                />
                                
                                // this.state.orders.map((item)=>{
                                //     if(this.state.activeTab==='ongoingorder'?item.orderRecived===false:item.orderRecived===true){
                                //         return(
                                         
                                //         <TouchableOpacity onPress={
                                //             ()=>{
                                //                this.props.navigation.navigate('OrderDetailes',{order_id:item.order_key,orderDetailes: item})
                                //             }
                                //         }>
                                //         <View style={{backgroundColor:'#F2F2F2',flexDirection:'row',padding:10,borderRadius:10,borderWidth:1,marginTop:10,borderColor:'lightgrey'}}>
                                //         <View style={{width:'30%',justifyContent:'center'}}>
                                //         <Image style={{alignSelf:'center',height:60,width:60}} source={require('../../assets/Parcel.png')}/>
                                //        </View>
                                //         <View style={{width:'70%'}}>
                                //          <Text style={{fontFamily:'Montserrat',fontSize:15}}>{I18n.t('OrderDate')}:{item.orderDate}</Text>
                                //          <Text style={{fontFamily:'Montserrat',fontSize:15}}>{I18n.t('Time')}:{item.order_time}</Text>
                                //          <Text style={{fontFamily:'Montserrat',marginTop:10,fontSize:15}}>{I18n.t('OrderID')} : {item.order_id}</Text>
                                //         </View>
                                //        </View>
                                //         </TouchableOpacity>
                                       
                                //         )
                                //     }
                                // })
                            }
                   
                        </View>
                     
                        :  <View style={{height:this.state.height-150,justifyContent:'center'}}>
                        <Image style={{height:310,width:300,justifyContent:'center',alignSelf:'center'}} source={require('../../assets/EmptyView.png')}></Image>
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
        </View>)
 }
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
    underLineActive:{
        borderBottomColor:'black',borderBottomWidth:3,width:'50%',
     }
     ,underLineInactive:{
        borderBottomColor:'#BABABA',borderBottomWidth:3,width:'50%',
     }, titleTextActive:{
         alignSelf:'center',
        fontSize:20,
        color:'black',
        padding:10,
        fontFamily:'MontserratSemiBold',
        fontWeight:'700'
        
    },
    titleTextInActive:{
        alignSelf:'center',
       fontSize:20,
       color:'#BABABA',
       padding:10,
       fontFamily:'MontserratSemiBold',
       fontWeight:'700'
   },
   orderContainer:{
       borderWidth:1,
       padding:10,
       flexDirection:'row',
       justifyContent:'space-around',
       marginTop:10,
       borderColor:'#E9E9E9'
   },
   orderImage:{
       height:80,
       width:60,
       overflow:'hidden',
       
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
export default OrderHistory