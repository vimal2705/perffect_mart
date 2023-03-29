import React from 'react';
import {View,Text,StyleSheet,TouchableOpacity,Image,ActivityIndicator} from 'react-native';
import * as firebase from 'firebase';
import SuperSubCategory from './SuperSubCategory';
import I18n from 'i18n-js';
class SubCategory extends React.Component{
    constructor(){
        super();
        this.state={
            sub_cat:'',
            subcategory:[],
            superSubid:'',
            superSub:false,
            isLoading:false,
            superSubCat:[],
            length:0,
            temp:''
        }
    }
    componentDidMount(){

       
        var cat_id=this.props.sub_cat;
        this.setState({sub_cat:cat_id})
        this.setState({isLoading:true})
        // alert("newALert"+JSON.stringify(cat_name))
 
    firebase.firestore()
    .collection('sub_cat_list')
    .where("cat_id",'==',cat_id)
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
             
                console.log('iddd',item.id);
                  var sub_cat_id=item.id;
      
                  this.setState({isLoading:true})
              firebase.firestore()
              .collection('super_sub_cat_list')
              .where("sub_cat_id",'==',sub_cat_id)
              .get()
              .then((snapshot)=>{
              
                  var size = snapshot.size;
                  console.log('siixe',size);
                 
               
               
                 this.setState({length:size})
                 console.log("len--->",this.state.length);
                
                 sub_cat_array.push(
                  {
                      sub_cat_id:item.id,
                      cat_id:item.data().cat_id,
                      cat_name_eng:item.data().cat_name_en,
                      cat_name_guj:item.data().cat_name_gu,
                      cat_name_hin:item.data().cat_name_hi,
                      sub_cat_img:item.data().sub_cat_img,
                      sub_cat_name_eng:item.data().sub_cat_name_en,
                      sub_cat_name_guj: item.data().sub_cat_name_gu,
                      sub_cat_name_hin: item.data().sub_cat_name_hi,
                      length:this.state.length
                  }
                   
                 )
                 this.setState({subcategory:sub_cat_array})
                 console.log('------->',sub_cat_array)
                  
              })
              .catch(error=>alert(error))
    
              
            
            
            })
                      
 
      
         

     
         this.setState({isLoading:false})

      

     console.log("itemdata",this.state.subcategory)
    //    alert(JSON.stringify(final_array))
        // this.setState({subcategory:sub_cat_array})
        
        // alert("Vale At End"+sub_cat_array)
        
    })
    .catch(error=>alert(error))
    
    }
    render(){
        return (
            <View style={styles.container}>
             {this.state.isLoading?
                <ActivityIndicator
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  zIndex:1000
                }}
                visible={this.state.isLoading}
                animating={this.state.isLoading}
                color="black"
                size="large"
              />:null
            }
            {
              
                        this.state.subcategory.map(e=>{
                            return <View key={e.id}>
                              
                                 <TouchableOpacity onPress={
                                  ()=>{
                                  

                                 {e.length === 0?   this.props.navigation.navigate('AllProductsScreen',{super_sub_cat:e.super_sub_cat_eng}):this.setState({superSubid:e.sub_cat_id})
                                       console.log('subctisd',e.sub_cat_id);
                       
                          this.setState({temp : e.sub_cat_id})
                        {this.state.temp === e.sub_cat_id?
                            this.state.superSub != true ?  this.setState({superSub:true,superSubid:e.sub_cat_id}): this.setState({superSub:false,superSubid:'' })
                        :
                        this.setState({temp :e.sub_cat_id})
                        }
                        this.setState({temp :e.sub_cat_id})
                      
                        
                          // setSubListName(item.name)
                                  
                        this.state.superSub?this.setState({superSub:false,superSubid:''}):this.setState({superSub:true})

                                     this.setState({superSubid:e.sub_cat_id})

                                  }}
                              }>
                            <View style={styles.subCatContainer}>
                            <View style={{justifyContent:'center'}}>
                            {!e.sub_cat_img ?
                                                         <Image style={{ alignSelf: 'center', height:30, width: 30, borderRadius: 4 }} source={require('../../assets/grocery.png')} /> :
                                                         <Image  style={{alignSelf:'center',height:30,width:30,borderRadius:4}} source={{uri:e.sub_cat_img}}/> 
                                            }
                      
                      </View>
                             <View style={{width:'50%',justifyContent:"center"}}>
                              <Text numberOfLines={1} style={{fontFamily:'Montserrat',fontSize:16,}}>{I18n.locale==='en'?e.sub_cat_name_eng:I18n.locale==='hi'?e.sub_cat_name_hin:e.sub_cat_name_guj}</Text>  
                             </View>
                             <View  style={{height:15,width:15,alignSelf:'center',justifyContent:"center"}}>
                             {e.length === 0 ? null: <Image  style={{height:25,width:25}} source={this.state.superSub===true&&this.state.superSubid===e.sub_cat_id?require('../../assets/closearray.png'):require('../../assets/dropdown.png')}></Image> }
                             
                             
                             </View>
                            
                             </View>
                             </TouchableOpacity>
                         
                            {
                            this.state.superSubid===e.sub_cat_id&&this.state.superSub?<View style={{backgroundColor:'#FCFCFC'}}>
                             {
                              <SuperSubCategory super_sub_cat={this.state.superSubid} navigation={this.props.navigation}/>

                                
                             }
                            
                             </View>:null}
                            </View>
                        })

            
            }
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container:{
       
    },
    subCatContainer:{
        justifyContent:'space-around',
        flexDirection:'row',height:50
       },
})
export default SubCategory