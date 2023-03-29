import React,{useState,useEffect} from 'react';
import {View,Text,StyleSheet,Image,TouchableOpacity,Dimensions} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import NetInfo from "@react-native-community/netinfo";
import I18n from 'i18n-js';
import { ScrollView } from 'react-native-gesture-handler';
import Header1 from './Header1';

import { MaterialIcons } from '@expo/vector-icons';


const secondIndicatorStyles = {
    stepIndicatorSize: 30,
    currentStepIndicatorSize: 40,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#005478',
    stepStrokeWidth: 3,
    separatorStrokeFinishedWidth: 4,
    stepStrokeFinishedColor: '#005478',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#005478',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#005478',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#005478',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#bbbbbb',
    labelSize: 13,
    currentStepLabelColor: '#005478',
  };

const getStepIndicatorIconConfig = ({
    position,
    stepStatus,
  }) => {
    const iconConfig = {
      name: 'shopping-cart',
      color: stepStatus === 'finished' ? '#ffffff' : '#005478',
      size: 15,
    };
    switch (position) {
      case 0: {
        iconConfig.name = 'shopping-cart';
        break;
      }
      case 1: {
        iconConfig.name = 'location-on';
        break;
      }
      case 2: {
        iconConfig.name = 'assessment';
        break;
      }
      case 3: {
        iconConfig.name = 'payment';
        break;
      }
      case 4: {
        iconConfig.name = 'track-changes';
        break;
      }
      default: {
        break;
      }
    }
    return iconConfig;
  };
  
const status = (props) => {
    const [orderrs, setorders] = useState([])
    const [id, setid] = useState('')
    const [address, setaddress] = useState('')
    const [email, setemail] = useState('')
    const [phone, setphone] = useState('')
    const [time, settime] = useState('')
    const [internet,setInternet]=useState(false);
    const [height, setheight] = useState(0)
    const [currentPosition, setcurrentPosition] = useState(0)
    const [labels,setlabels] = useState([]);


    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
        setheight(Dimensions.get('window').height)
      
   
        });
        setemail(props.route.params.details.deliveryDetailes.deliveryEmail)
        setaddress(props.route.params.details.deliveryDetailes.deliveryAddress)
        setemail(props.route.params.details.deliveryDetailes.deliveryEmail)
        settime(props.route.params.details.deliveryDetailes.deliveryTime) 
        setphone(props.route.params.details.deliveryDetailes.deliveryPhone)
           setid(props.route.params.details.order_id)
           if(props.route.params.details.orderplaced===true){
               setcurrentPosition(0)
           }
           if(props.route.params.details.orderPrepared===true){
               setcurrentPosition(1) 
           }
           if(props.route.params.details.orderdispatch===true){
               setcurrentPosition(2)
           }
           if(props.route.params.details.outForDelivery===true){
               setcurrentPosition(3) 
           }
           if(props.route.params.details.orderRecived===true){
               setcurrentPosition(4)
           }
           setlabels([I18n.t('OrderPlaced'),I18n.t('OrderPrepared'),I18n.t('OrderDispatch'),I18n.t('outForDeliver'),I18n.t('OrderRecived')])
    
      

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


     

          const renderStepIndicator = (position) => (
            <MaterialIcons {...getStepIndicatorIconConfig(position)} />
          );
          
    return (
        <View>
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

                 <Header1 title={I18n.t('TrackingStatus')} backArrowInclude={true} goBack={props} />
          
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
             {I18n.t('OrderID')} : {id}
            </Text>
           </View>  
            <View>
             <View style={{flexDirection:'row',marginTop:20}}> 
             <Image style={{borderwidth:1,height:20,width:20}} source={require('../../assets/truck.png')}></Image>
             <Text style={{fontFamily:'Montserrat',marginLeft:5}}>{I18n.t('Address')} : {address}</Text>
             </View>
             <View style={{flexDirection:'row',marginTop:20}}> 
             <Image style={{borderwidth:1,height:20,width:20}} source={require('../../assets/email.png')}></Image>
             <Text style={{fontFamily:'Montserrat',marginLeft:5}}>{I18n.t('Email')} : {email}</Text>
             </View>
             <View style={{flexDirection:'row',marginTop:20}}> 
             <Image style={{borderwidth:1,height:20,width:20}} source={require('../../assets/phone.png')}></Image>
             <Text style={{fontFamily:'Montserrat',marginLeft:5}}>{I18n.t('PhoneNumber')} : {phone}</Text>
             </View>
             <View style={{flexDirection:'row',marginTop:20}}> 
             <Image style={{borderwidth:1,height:20,width:20}} source={require('../../assets/clock.png')}></Image>
             <Text style={{fontFamily:'Montserrat',marginLeft:5}}>{I18n.t('Time')} : {time}</Text>
             </View>
            </View>
           <View style={{marginTop:20}}>
           <Text style={styles.title}>{I18n.t('TrackingStatus')}</Text>
           <View style={{marginTop:20 ,flex:1,height:350,marginBottom:10 }}>
          
           <StepIndicator
          customStyles={secondIndicatorStyles}
          currentPosition={currentPosition}
          renderStepIndicator={renderStepIndicator}
          labels={labels}
          direction={'vertical'}/>
          
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
  
export default status