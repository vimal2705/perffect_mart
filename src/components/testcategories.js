import React ,{useState}from 'react';
import { render } from 'react-dom';
import {View,Text,StyleSheet,TouchableOpacity,Image, ScrollView,ActivityIndicator,FlatList} from 'react-native';
import Header1 from './Header1';
import * as firebase from 'firebase';
import SubCategory from './SubCategory';
import NetInfo from "@react-native-community/netinfo";
import I18n from 'i18n-js';
class AllCategoriesScreen extends React.Component{
   constructor(){
       super();
       this.state={
        categories:[
           ],
           subList:true,
           SubListName:'',
           subcategory:['sub1','sub2'],
           superSub:false,
           superSubName:'',
           superSubCat:['superSUB1',"superSUB2",'superSUB3'],
           isLoading:false,
           internet:false,
           height:0,
           RouteName:''
       }
   }
   componentDidMount(){
   
    this.getCategories();
    this.setState({RouteName:this.props.route.params})
    this.unsubscribe = NetInfo.addEventListener(state => {
      console.log("Connection type____", state.type);
      this.setState({internet:state.isConnected})
      console.log("Is connected___?", state.isConnected);
      
      
    });
   }

   componentWillUnmount(){
    this.unsubscribe()
  }
   getCategories=()=>{
     this.setState({isLoading:true})
    firebase.firestore()
    .collection('category_list')
    .get()
    .then(
    
      (snapshot)=>{
       var cat_array=[] ;
        snapshot.forEach((ss)=>{
          if(this.props.route.params.name=='')
           cat_array.push(ss.data())
          else 
             if(JSON.stringify(ss.data().cat_name_en).includes(this.props.route.params.name))
              cat_array.push(ss.data())
              console.log('--->',ss.id);
           // console.log("data",ss.data().name)
        })
        console.log('cat_array_from all categories : ',cat_array)
        this.setState({categories:cat_array})
        this.setState({isLoading:false})
       
       //  SyncStorage.set()
      }
    )
    .catch((error)=>{
      console.log(error)
    })
     
   }
 
   
   render(){
    return (
      <View>
       {this.state.internet?
        <View style={styles.container}>
        <Header1 title={I18n.t('AllCategories')} backArrowInclude={true} optionsInclude={true} goBack={this.props} navigation={this.props.navigation} />
        <ScrollView>
         {this.state.isLoading?
         <View style={{marginVertical:"50%"}}>
          <ActivityIndicator
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          visible={this.state.isLoading}
          animating={this.state.isLoading}
          color="black"
          size="large"
        />
          </View>
          :null}
      <View  style={styles.container1}>
      <FlatList
                
                  style={{padding:8}}
                  data={this.state.categories}
                  renderItem={({item})=>{
                      return (
                      <View  >
                          <TouchableOpacity onPress={()=>{
                        //   setSubList(true)
                        
                        this.state.subList?this.setState({subList:false}):this.setState({subList:true})
                          this.setState({SubListName:item.cat_name_en})
                          console.log('->',item.cat_name_en);
                        //   setSubListName(item.name)
                      }}>
                      <View style={{flexDirection:'row',alignSelf:'center'}}>
                      <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                      <View style={styles.innerBox} >
                      <View style={{justifyContent:'center'}}>
                      <Image  style={{alignSelf:'center',marginLeft:20,height:70,width:70,borderRadius:4}} source={{uri:item.cat_img}}/>
                      </View>
                      <View style={{justifyContent:'flex-start',flexDirection:'row',marginLeft:20,width:'40%'}}>
                       <Text style={styles.text}>  {I18n.locale==='en'?item.cat_name_en:I18n.locale==='gu'?item.cat_name_gu:item.cat_name_hi}</Text>
                       
                      </View>
                      <View style={{height:15,width:15,marginLeft:20,alignSelf:'center',justifyContent:"center"}}>
                    
                    
                       <Image style={{height:25,width:25}} source={this.state.subList===true&&this.state.SubListName===item.cat_name_en?require('../../assets/closearray.png'):require('../../assets/dropdown.png')}></Image>
                     
                     </View>
                      </View>
                      
                      </View>
                      
                       </View>
                       </TouchableOpacity>
                       {this.state.subList&&this.state.SubListName==item.cat_name_en?
                        <View style={styles.subCAtView}>
                         <SubCategory sub_cat={this.state.SubListName} navigation={this.props.navigation}/>
                      
                        </View>:null}
                      </View>
                


                      )
                  }}
                  keyExtractor={item => item.cat_name_en}
                />
            
              
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
    containernew: {
      height: '100%',
     
      justifyContent: 'center'
  },
    subCatContainer:{
     justifyContent:'space-around',
     flexDirection:'row'
    },
    container1:{
       padding:20,
       display:'flex',
       flexWrap:'wrap',
       flexDirection:'row',
       justifyContent:'space-around'
    },
    section1:{
        flexDirection:'row',
        paddingTop:20,
        justifyContent:'space-between',
        paddingHorizontal:20
    },
    innerBox:{
        height:130,
      
        width:'100%',
        borderRadius:12,
        backgroundColor:'#F7F8F9',
       
        marginBottom:10,
        flexDirection:'row',
        
       
    }, box:{
        height:130,
        width:'100%',
        alignSelf:'center',
        marginRight:15,
        marginLeft:15,
        marginTop:20
    },
    text:{
        alignSelf:'center',
        fontWeight:'400',
        fontSize:16,
        fontFamily:'Montserrat'
    },
    subCAtView:{
        marginVertical:10,
        backgroundColor:'#F7F8F9',
        borderRadius:10
    }

})
export default AllCategoriesScreen

