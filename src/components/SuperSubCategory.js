import React from 'react';
import {View,Text,StyleSheet,TouchableOpacity,ActivityIndicator,FlatList,Image} from 'react-native';
import * as firebase from 'firebase';
import I18n from 'i18n-js';
class SuperSubCategory extends React.Component{
   constructor(){
       super();
       this.state={
        superSubCat:[],
        isLoading:false
       }
   }
    componentDidMount(){
     var sub_cat_id=this.props.super_sub_cat;
        this.setState({sub_cat:sub_cat_id})
     this.setState({isLoading:true}) 
    var final_array=[]
    firebase.firestore()
    .collection('super_sub_cat_list')
    .where("sub_cat_id",'==',sub_cat_id)
    .get()
    .then((snapshot)=>{
        var sub_cat_array=[]
        snapshot.forEach((item)=>{
      
            //  console.log("item_data",item)
            
            // if(item.data().sub_cat_id===sub_cat_id){
                sub_cat_array.push({
                    id:item.id,
                    super_sub_cat_eng:item.data().super_sub_cat_name_en,
                    super_sub_cat_guj:item.data().super_sub_cat_name_gu,
                    super_sub_cat_hin:item.data().super_sub_cat_name_hi,
                    img_uri:item.data().super_sub_cat_img,
                    
                })
             

                console.log('path-->',item.data().super_sub_cat_img);
             
    
            // }
        })
        this.setState({isLoading:false})
     
       final_array=sub_cat_array
       this.setState({superSubCat:final_array})
       console.log("length--->",this.state.superSubCat.length);

      
        
    })
    .catch(error=>alert(error))
  }
    render(){
    return (
        <View style={styles.container}>
        {this.state.isLoading?<ActivityIndicator
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            visible={this.state.isLoading}
            animating={this.state.isLoading}
            color="black"
            size="large"
          />:null}
        <View>
        <FlatList
                       numColumns={2}
                        style={{padding:8}}
                        data={this.state.superSubCat}
                        renderItem={({item})=>{
                            return (
                             
                                <View  style={styles.newArrival}>

<View style={{marginVertical:5,alignItems:"center"}} >
                 <TouchableOpacity onPress={()=>{
                     this.props.navigation.navigate('AllProductsScreen',{super_sub_cat:item.super_sub_cat_eng})
                    // alert('we are Done')
                 }}>
                                                 <View style={{justifyContent:'center'}}>
                            {item.img_uri === undefined?
                                                         <Image style={{ alignSelf: 'center', height:60, width: 60, borderRadius: 4 }} source={require('../../assets/PerffectLogoholder.png')} /> :
                                                         <Image  style={{alignSelf:'center',height:60,width:60,borderRadius:4}} source={{uri:item.img_uri}}/> 
                                            }
                      
                      </View>
                 <Text style={{fontFamily:'Montserrat',fontSize:16,marginTop:4,paddingHorizontal:10}} numberOfLines={1} ellipsizeMode='tail'>{I18n.locale==='en'?item.super_sub_cat_eng:I18n.locale==='hi'?item.super_sub_cat_hin:item.super_sub_cat_guj}</Text>
                 </TouchableOpacity>
                </View>
                                            </View>

    
                            )
                        }}
                        keyExtractor={item => item.id}
                      />
        {/* {this.state.superSubCat.map(e=>{
            return (
                <View style={{marginVertical:5,alignItems:"center"}} >
                 <TouchableOpacity onPress={()=>{
                     this.props.navigation.navigate('AllProductsScreen',{super_sub_cat:e[0]})
                    // alert('we are Done')
                 }}>
                 <Text style={{fontFamily:'Montserrat',fontSize:16,marginTop:4}}>{I18n.locale==='en'?e[0]:I18n.locale==='hi'?e[2]:e[1]}</Text>
                 </TouchableOpacity>
                </View>
            )
        })} */}
       </View>
        </View>
    )
 }
}
const styles=StyleSheet.create({
    container:{
       
    },
    newArrival: {
        width: '49%',
        borderWidth: 1,
        borderColor: '#E9E9E9',
      margin:2,
        marginTop: 2
    },
})
export default SuperSubCategory