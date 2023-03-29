import React, { useEffect } from 'react';
import {View,Text,StyleSheet,Image} from 'react-native';
import library from './library';
import i18n from 'i18n-js';
import syncStorage from 'sync-storage';
import { TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Header1 from './Header1';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ChangeLanguage=(props)=>{
   

const [lang,changelang] = React.useState('')
const getData = async () => {
      
  const value = await AsyncStorage.getItem('@storage_Key')
  console.log("DEF: "+value);
  if(value === 'hi') {
    changelang('hi')
    i18n.locale = 'hi';
    i18n.translations = library;
  }
  else if(value === 'gu')
  {
  changelang('gu')
  i18n.locale = 'gu';
  i18n.translations = library;
}
else{
  changelang('en')
  i18n.locale = 'en';
  i18n.translations = library;
}

}

const savehi = async (key, value) =>{
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
  }
};
const saveeng = async (key, value) =>{
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
  }
};
const saveguj = async (key, value) =>{
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
  }
};

const englang = () =>
{
 
    changelang('en')
  syncStorage.set('language', 'en');
  const result1 =  syncStorage.get('language');
  console.log('---c',result1);
  changelang(result1)
    console.log('---2',lang);
    //  async () => {
      
    //     await AsyncStorage.setItem('@storage_Key','en')
    //   }
    
    
saveeng('@storage_Key','en')

    

}

const hinlang = () =>
{
    changelang('hi')
    syncStorage.set('language', 'hi');
  const result1 =  syncStorage.get('language');
      console.log('---c',result1);
      changelang(result1)
      console.log('---2',lang);
      savehi('@storage_Key','hi')
 
      // async () => {
      //   await AsyncStorage.setItem('@storage_Key','hi')
      // }

}

const gujlang = () =>
{
    changelang('gu')
    syncStorage.set('language', 'gu');
  const result1 =  syncStorage.get('language');
      console.log('---c',result1);
      changelang(result1)
      console.log('---2',lang);
      // async () => {
      
      //   await AsyncStorage.setItem('@storage_Key', 'gu')

      // }
      saveguj('@storage_Key','gu')
    
}

useEffect(() => {
  syncStorage.set('isBasket', false)
 
  getData()

  }, [props.navigation])



i18n.locale = lang;



    return (
      
        <View style={styles.container}>
             <StatusBar backgroundColor="#005478" style={Platform.OS === "android" ? "light" : "dark"} />
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
             <Text style={{ fontSize: 21,  width: 260, fontFamily: 'Montserrat'}}> {i18n.t('Language')}</Text>   
          </View>
          </View>
       
                 
          <View style={{position:"absolute",right:-30,top:8}}>
            <View style={{ height:45,alignSelf:'center', flexDirection: 'row', width: '40%',justifyContent: 'flex-end' }}>
              <View >
                <TouchableOpacity onPress={() => {
                  props.navigation.navigate('Notifications')
                }}>
                <View style={{height:45,justifyContent:'center'}}>
                <Image style={{ height: 25, width: 25 }} source={require('../../assets/notification.png')}>
                </Image>
                </View>

                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity onPress={() =>  props.navigation.toggleDrawer()}>
                 <View style={{height:45,justifyContent:'center'}}>
                 <Image style={{ height: 25, width: 25, marginLeft: 10 ,marginRight:25}} source={require('../../assets/menu.png')}>
                 </Image>
                 </View>

                 
                </TouchableOpacity>
                </View>
              </View>
            </View>

          </View>
        <View style={{paddingHorizontal:'10%'}}>
          <View style={{marginTop:20}}>
          <Text style={{fontSize:16,fontFamily:'Montserrat',marginLeft:20}} >{i18n.t('ChooseYourPrefferedLanguage')}</Text>
          </View>
          <View style={{marginTop:20}}>
           <View style={{flexDirection:'row',height:120,borderRadius:4,backgroundColor:'#F2F2F2'}}>
             <View style={{width:'80%',justifyContent:'center'}}>
              <Text style={{alignSelf:'center',fontSize:18,fontFamily:'Montserrat'}}>English</Text>
             </View>
             <View style={{justifyContent:'center'}}>
             <TouchableOpacity onPress={englang }>
             {
                lang==='en'? <Image  style={{height:20,width:20,alignSelf:'center'}} source={require('../../assets/circle.png')}/>:<Image  style={{height:20,width:20,alignSelf:'center'}} source={require('../../assets/selectedCircle.png')}/>
            }
             </TouchableOpacity>
             </View>
           </View>
          </View>
         
          <View style={{marginTop:20}}>
           <View style={{flexDirection:'row',height:120,borderRadius:4,backgroundColor:'#F2F2F2'}}>
             <View style={{width:'80%',justifyContent:'center'}}>
              <Text style={{alignSelf:'center',fontSize:18,fontFamily:'Montserrat',}}>हिंदी</Text>
             </View>
             <View style={{justifyContent:'center'}}>
             <TouchableOpacity onPress={hinlang }>
            {
                lang=='hi'? <Image  style={{height:20,width:20,alignSelf:'center'}} source={require('../../assets/circle.png')}/>:<Image  style={{height:20,width:20,alignSelf:'center'}} source={require('../../assets/selectedCircle.png')}/>
            }
             </TouchableOpacity>
             </View>
           </View>
          </View>
       
          <View style={{marginTop:20}}>
           <View style={{flexDirection:'row',height:120,borderRadius:4,backgroundColor:'#F2F2F2'}}>
             <View style={{width:'80%',justifyContent:'center'}}>
              <Text style={{alignSelf:'center',fontSize:18,fontFamily:'Montserrat',}}> ગુજરાતી</Text>
             </View>
             <View style={{justifyContent:'center'}}>
             <TouchableOpacity onPress={gujlang }>
             {
                lang==='gu'? <Image  style={{height:20,width:20,alignSelf:'center'}} source={require('../../assets/circle.png')}/>:<Image  style={{height:20,width:20,alignSelf:'center'}} source={require('../../assets/selectedCircle.png')}/>
            }
             </TouchableOpacity>
             </View>
           </View>
          </View>
          <View>
              
          </View>
         
          </View>
        </View>
    )
}
const styles=StyleSheet.create({
    container:{
        height:'100%',
        backgroundColor:'white'
       

    },
    section1: {
      height: 70,
   
      marginTop: 25,
      alignItems:"center",
      flexDirection: 'row'
  }, 
})
export default ChangeLanguage