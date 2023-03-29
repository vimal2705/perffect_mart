import React from 'react';
import {View,Text,StyleSheet,Image,TouchableOpacity,Dimensions} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import NetInfo from "@react-native-community/netinfo";
import I18n from 'i18n-js';
import syncStorage from 'sync-storage';
import { ScrollView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import Header1 from './Header1';
class DeliverStatus extends React.Component{
    constructor(){
        super();
        this.state={
           product:{
            id:123321,
            image:require('../../assets/aata.png')
           },
           currentPosition:0,
           labels:[I18n.t('OrderPlaced'),I18n.t('OrderPrepared'),I18n.t('OrderDispatch'),I18n.t('outForDeliver'),I18n.t('OrderRecived')],
            id:'',
           address:'',
           email:'',
           phone:'',
           time:'',
           internet:false,
           height:0
        }
    }
    componentDidMount(){
        syncStorage.set('isBasket', false)
        this.setState({height:Dimensions.get('window').height})
        this.unsubscribe = NetInfo.addEventListener(state => {
            console.log("Connection type____", state.type);
            this.setState({internet:state.isConnected})
            console.log("Is connected___?", state.isConnected);
            
            
          });
         
       
         this.setState({address:this.props.route.params.orderDetailes.deliveryDetailes.deliveryAddress})
         this.setState({email:this.props.route.params.orderDetailes.deliveryDetailes.deliveryEmail})
         this.setState({phone:this.props.route.params.orderDetailes.deliveryDetailes.deliveryPhone})
         this.setState({time:this.props.route.params.orderDetailes.deliveryDetailes.deliveryTime})
         this.setState({id:this.props.route.params.orderDetailes.order_id})
         if(this.props.route.params.orderDetailes.orderplaced===true){
             this.setState({currentPosition:0})
            
         }
         if(this.props.route.params.orderDetailes.orderPrepared===true){
            this.setState({currentPosition:1})   
         }
         if(this.props.route.params.orderDetailes.orderdispatch===true){
            this.setState({currentPosition:2})
         }
         if(this.props.route.params.orderDetailes.outForDelivery===true){
            this.setState({currentPosition:3})   
         }
         if(this.props.route.params.orderDetailes.orderRecived===true){
            this.setState({currentPosition:4})
         }
         
    }
    componentWillUnmount(){
        this.unsubscribe()
      }
    render(){
        const customStyles = {
            stepIndicatorSize: 20,
            currentStepIndicatorSize:20,
            separatorStrokeWidth: 3,
            currentStepStrokeWidth: 3,
            stepStrokeCurrentColor: '#005478',
            stepStrokeWidth: 1,
            stepStrokeFinishedColor: '#005478',
            stepStrokeUnFinishedColor: '#F1F1F1',
            separatorFinishedColor: '#005478',
            separatorUnFinishedColor: '#F1F1F1',
            stepIndicatorFinishedColor: '#005478',
            stepIndicatorUnFinishedColor: '#ffffff',
            stepIndicatorCurrentColor: '#005478',
            stepIndicatorLabelFontSize: 13,
            currentStepIndicatorLabelFontSize: 13,
            stepIndicatorLabelCurrentColor: '#005478',
            stepIndicatorLabelFinishedColor: '#005478',
            stepIndicatorLabelUnFinishedColor: 'white',
            labelColor: '#005478',
            labelSize: 13,
            currentStepLabelColor: '#005478'
          }
          
    return (
        <View>
                {
                Platform.OS === 'android' ?
            
            <View style={{ backgroundColor: '#005478', borderWidth: 5, borderColor: '#fff', borderRadius: 100, height: 50, width: 50, justifyContent: 'center', bottom:"-3.7%",position:"absolute", zIndex: 1,alignSelf:"center", elevation: 9}}>
           <TouchableOpacity onPress={() => this.props.navigation.navigate('Search')}   activeOpacity={1.0}>
            <Image style={{ height: 25, width: 25, alignSelf: 'center' }} source={require('../../assets/searchIcon.png')}></Image>
            </TouchableOpacity>
            </View>: null
}
         {this.state.internet?
            <View style={styles.container}>
                   <StatusBar backgroundColor="#005478" style={Platform.OS === "android" ? "light" : "dark"} />
                   <View style={styles.section1}>
                        <View style={{ alignSelf:'center', flexDirection: 'row'}}>
                   <TouchableOpacity onPress={
                    () => {
                        props.navigation.goBack();
                    }
                }>
                    <View style={{ marginLeft: 20}}>
                    <Image style={{  height:30,width:30 }} source={require('../../assets/backArrow.png')}></Image>
                    </View>
                </TouchableOpacity>
             
                <View style={{ justifyContent:'center',alignItems:'center',alignContent:"center"}}>
             <Text style={{ fontSize: 21, width: 260, fontFamily: 'Montserrat'}}> {i18n.t('myBasket')} </Text>   
          </View>
          </View>
             
           
       
                 
          </View>
            {/* <View style={styles.secttion1}>
            <TouchableOpacity  onPress={
                ()=>{
                    this.props.navigation.goBack();
                }
            }>
            <View style={{height:40,justifyContent:'center'}}>
            <Image style={{height:25,width:25}} source={require('../../assets/backArrow.png')}>
            </Image>
            </View>
            </TouchableOpacity>
            <View style={{height:40,justifyContent:'center'}}>
            <Text style={{fontFamily:'Montserrat',marginLeft:20,fontSize:25,alignSelf:'center'}}>{I18n.t('DeliveryStatus')} </Text>
            </View>
           </View> */}
           <ScrollView >
           <View style={styles.subContainer}>
            <View>
            <Text style={{fontFamily:'Montserrat',}}>
             {I18n.t('OrderID')} : {this.state.id}
            </Text>
           </View>  
            <View>
             <View style={{flexDirection:'row',marginTop:20}}> 
             <Image style={{borderwidth:1,height:20,width:20}} source={require('../../assets/truck.png')}></Image>
             <Text style={{fontFamily:'Montserrat',marginLeft:5}}>{I18n.t('Address')} : {this.state.address}</Text>
             </View>
             <View style={{flexDirection:'row',marginTop:20}}> 
             <Image style={{borderwidth:1,height:20,width:20}} source={require('../../assets/email.png')}></Image>
             <Text style={{fontFamily:'Montserrat',marginLeft:5}}>{I18n.t('Email')} : {this.state.email}</Text>
             </View>
             <View style={{flexDirection:'row',marginTop:20}}> 
             <Image style={{borderwidth:1,height:20,width:20}} source={require('../../assets/phone.png')}></Image>
             <Text style={{fontFamily:'Montserrat',marginLeft:5}}>{I18n.t('PhoneNumber')} : {this.state.phone}</Text>
             </View>
             <View style={{flexDirection:'row',marginTop:20}}> 
             <Image style={{borderwidth:1,height:20,width:20}} source={require('../../assets/clock.png')}></Image>
             <Text style={{fontFamily:'Montserrat',marginLeft:5}}>{I18n.t('Time')} : {this.state.time}</Text>
             </View>
            
          
            
            </View>
           <View style={{marginTop:20}}>
           <Text style={styles.title}>{I18n.t('TrackingStatus')}</Text>
           <View style={{marginTop:20 ,flex:1,height:300 }}>
          
           <StepIndicator
           customStyles={customStyles}
           currentPosition={this.state.currentPosition}
           labels={this.state.labels}
           direction={'vertical'}
            
      />
           </View>
           </View>
           </View>    
           </ScrollView> 
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
        ,
        
    },
    containernew: {
        height: '100%',
       
        justifyContent: 'center'
    },
    subContainer:{
        marginHorizontal:'15%',
        
        marginTop:20
    },
    image:{
        height:170,
        width:150,
        alignSelf:'center',
        marginTop:20
    },
    title:{
        fontSize:20,
        fontWeight:'500',
        fontFamily:'MontserratSemiBold',
    }
})
  
export default DeliverStatus