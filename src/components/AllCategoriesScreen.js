import React ,{useState}from 'react';
import { render } from 'react-dom';
import {View,Text,StyleSheet,TouchableOpacity,Image, ScrollView,ActivityIndicator,FlatList} from 'react-native';
import Header1 from './Header1';
import * as firebase from 'firebase';
import SubCategory from './SubCategory';
import syncStorage   from 'sync-storage';
import { StatusBar } from 'expo-status-bar';
import NetInfo from "@react-native-community/netinfo";
import I18n from 'i18n-js';
class AllCategoriesScreen extends React.Component{
   constructor(){
       super();
       this.state={
        categories:[],
           subList:true,
           cat_id:'',
           subcategory:[],
           superSub:false,
           superSubName:'',
           superSubCat:[],
           isLoading:false,
           internet:false,
           height:0,
           RouteName:'',
           temp:'',
           cata_id:'',
       }
   }
   componentDidMount(){
    syncStorage.set('isBasket', false)
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
       var cat_array=[];
       var catid=[]
        snapshot.forEach((ss)=>{
          if(this.props.route.params.categories_id == '')
          cat_array.push({
            Id:ss.id,
            name_eng:ss.data().cat_name_en,
            name_guj:ss.data().cat_name_gu,
            name_hin:ss.data().cat_name_hi,
            img_uri:ss.data().cat_img,
            
       
     })
         
          else 
             if(JSON.stringify(ss.id).includes(this.props.route.params.categories_id))
             cat_array.push({
              Id:ss.id,
              name_eng:ss.data().cat_name_en,
              name_guj:ss.data().cat_name_gu,
              name_hin:ss.data().cat_name_hi,
              img_uri:ss.data().cat_img,
              
         
       })
           
           // console.log("data",ss.data().name)
        })
        console.log('cat_array_from all categories : ',cat_array)
        this.setState({categories:cat_array})
        this.setState({isLoading:false})
   this.getsubcategories(ss.id)
       //  SyncStorage.set()
      }
    )
    .catch((error)=>{
      console.log(error)
    })
     
   }
   getsubcategories=(id)=>{
     var final_array=[]
      firebase.firestore()
     .collection('sub_cat_list')
     .where("cat_id",'==',id)
    .get()
       .then((snapshot)=>{
         var sub_cat_array=[]
          snapshot.forEach((item)=>{
            console.log("item_data",item.data())
              // if(item.data().cat_name_en===cat_name){
              //     // sub_cat_array.push(item.data().sub_cat_name_en)
              //     if(I18n.locale==='en')
                //     sub_cat_array.push(item.data().sub_cat_name_en)
               //     else if(I18n.locale==='hi')
                //     sub_cat_array.push(item.data().sub_cat_name_hi)
                //     else 
                //     sub_cat_array.push(item.data().sub_cat_name_gu)
                // if(item.data().cat_id === thiscat_id){
                  sub_cat_array.push(
                    item.data()
                  )
               
                // }
            })
         final_array=sub_cat_array
           this.setState({subcategory:final_array})
         this.setState({isLoading:false})

     console.log("item_data",this.state.subcategory)
         //    alert(JSON.stringify(final_array))
            // this.setState({subcategory:sub_cat_array})
          
            // alert("Vale At End"+sub_cat_array)
            
        })
    .catch(error=>alert(error))
    
   }
 
   
   render(){
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
         <View style={styles.section1}>
             <View style={{ alignSelf:'center', flexDirection: 'row'}}>
             <TouchableOpacity onPress={
                    () => {
                        this.props.navigation.goBack();
                    }
                }>
                    <View style={{ marginLeft: 14}}>
                    <Image style={{  height:30,width:30 }} source={require('../../assets/backArrow.png')}></Image>
                    </View>
                </TouchableOpacity>
             
             <View style={{ justifyContent:'center',alignItems:'center',alignContent:"center"}}>
             <Text style={{ fontSize: 21,  width: 260, fontFamily: 'Montserrat'}}>{I18n.t('AllCategories')} </Text>   
          </View>
          </View>
       
                 
          <View style={{position:"absolute",right:-30,top:8}}>
            <View style={{ height:45,alignSelf:'center', flexDirection: 'row', width: '40%',justifyContent: 'flex-end' }}>
              <View >
                <TouchableOpacity onPress={() => {
                this.props.navigation.navigate('Notifications')
                }}>
                <View style={{height:45,justifyContent:'center'}}>
                <Image style={{ height: 25, width: 25 }} source={require('../../assets/notification.png')}>
                </Image>
                </View>

                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity onPress={() =>  this.props.navigation.toggleDrawer()}>
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
        {/* <Header1 title={I18n.t('AllCategories')} backArrowInclude={true} optionsInclude={true} goBack={this.props} navigation={this.props.navigation} /> */}
        <ScrollView>
         {this.state.isLoading?
         <View style={{marginVertical:"60%"}}>
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
                          
                           this.setState({cat_id:item.Id})
                           console.log('cat_id',this.state.cat_id)
                           this.getsubcategories(item.Id)
                        // if(this.state.subList === false)
                        // {this.setState({subList:true})
                        // this.setState({SubListName:item.cat_name_en})
                        //   }else{
                        //   this.setState({subList:false})
                        // }
                        //  if(this.state.subList === true)
                        //  {
                          this.setState({cata_id:item.cat_id})
                          this.setState({temp : item.Id})
                        {this.state.temp === item.Id ?
                        this.state.subList != true ?  this.setState({subList:true,cat_id:item.Id}): this.setState({subList:false,cat_id:'' })
                        :
                        this.setState({temp : item.Id})
                        }
                        
                        this.setState({temp :item.Id})
                        //   console.log('->',item.Id);
                        //   console.log('....>',this.state.subcategory);
                        //   setSubListName(item.name)
                      }}>
                      <View style={{flexDirection:'row',alignSelf:'center'}}>
                      <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                      <View style={styles.innerBox} >
                      <View style={{justifyContent:'center'}}>
                      {!item.img_uri ?
                                                         <Image style={{ alignSelf: 'center',marginLeft:20,height:70,width:70, borderRadius: 4 }} source={require('../../assets/PerffectLogoholder.png')} /> :
                                                         <Image  style={{alignSelf:'center',marginLeft:20,height:70,width:70,borderRadius:4}} source={{uri:item.img_uri}}/>
                                            }

                      </View>
                      <View style={{justifyContent:'flex-start',flexDirection:'row',marginLeft:20,width:'59%'}}>
                       <Text style={styles.text}>  {I18n.locale==='en'?item.name_eng:I18n.locale==='gu'?item.name_guj:item.name_hin}</Text>
                       
                      </View>
                      <View style={{height:15,width:15,alignSelf:'center'}}>
                    
                    
                       <Image style={{height:25,width:25,right:10}} source={this.state.subList===true&&this.state.cat_id===item.Id?require('../../assets/closearray.png'):require('../../assets/dropdown.png')}></Image>
                     
                     </View>
                      </View>
                      
                      </View>
                      
                       </View>
                       </TouchableOpacity>
                       {this.state.subList&&this.state.cat_id===item.Id?
                      
                        <View style={styles.subCAtView}>
                          {this.state.subcategory == 0 ? <Text style={{alignSelf:"center",fontSize:20}}>{I18n.t('noproductavailable')}</Text>:
                         <SubCategory sub_cat={this.state.cat_id} navigation={this.props.navigation}/>
                          }
                        </View>:null}
                      </View>
                


                      )
                  }}
                  keyExtractor={item => item.Id}
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
     marginHorizontal:15,
       display:'flex',
       flexWrap:'wrap',
       flexDirection:'row',
       justifyContent:'space-around'
    },
    section1: {
      height: 70,
   
      marginTop: 25,
      alignItems:"center",
      flexDirection: 'row'
  }, 
    innerBox:{
        height:130,
      
        width:'100%',
        borderRadius:12,
        backgroundColor:'#F7F8F9',
       
        marginTop:10,
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
        marginVertical:5,
        backgroundColor:'#F7F8F9',
        borderRadius:10
    }

})
export default AllCategoriesScreen

