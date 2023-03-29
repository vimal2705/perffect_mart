import * as firebase from 'firebase';


import syncStorage from 'sync-storage';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView ,Modal,Alert} from 'react-native';
const userDefaultState = [];
const uploadImage = async (uri, uid, name) => {
  const response = await fetch(uri)
  const blobSol = await response.blob();
  var user_id = uid;
  var db = firebase.firestore().collection('users_list').doc(user_id)

  var ref = firebase.storage().ref(`userDetailes/${user_id}/${name}/`)

  // return ref.put(response)
  const uploadTask = ref.put(blobSol);
  console.log("upload task : " + JSON.stringify(uploadTask));


  uploadTask.on('state_changed', function (snapshot) {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');

    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
        console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
        break;
    }
  }, function (error) {
    console.log(error);

  }, function () {

    uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {


      if (name === 'adharCard') {

        db.update({
          adharCard: downloadURL
        })
      }
      else if (name == 'imageOfShop') {

        db.update({
          shopImage: downloadURL
        })
      }
      else if (name === 'BusinessCard') {
        db.update({
          BusinessCard: downloadURL
        })
      }

    })

  })


}

const userReducer = (state = userDefaultState, action) => {
  const val = 10


  switch (action.type) {
    case "ADD_USER":
      firebase.firestore()
      .collection('sales_person_details')
      .where("per_code","==",parseInt(action.data.referencepersonCode, 10))
          .get()
          
          .then((snapshot) => {
            var array = []
          
            var size = snapshot.size;



            var array = []
            console.log('User exists: ', size);
            if(action.data.referencepersonCode == '')
            {
              firebase.auth().createUserWithEmailAndPassword(action.data.email, action.data.password)
              .then(
               
                      
                (result) => {
                  console.log(result)
                  console.log("uid", result.user.uid)
                  firebase.firestore()
                    .collection('users_list')
                    .doc(result.user.uid)
                    .set({
                      uid: result.user.uid,
                      email: action.data.email,
                      shopName: action.data.shopName,
                      userName: action.data.userName,
                      phone: action.data.phone,
                      time_stamp : action.data.time,
                      referencepersonName: action.data.referencepersonName,
                      referencepersonPhone: action.data.referencepersonPhone,
                      referencepersonCode:action.data.referencepersonCode,
                      addressofShop: action.data.addressofShop,
                      hasPermission: false,
                      invoice_count: 0
                      
      
                    })   
                    .then(() => {
                      syncStorage.set('user_id', result.user.uid)
                      var i = 0;
                      uploadImage(action.data.adharCard, result.user.uid, 'adharCard')
                      uploadImage(action.data.imageOfShop, result.user.uid, 'imageOfShop')
                      uploadImage(action.data.imageOfShop, result.user.uid, 'BusinessCard')
                      alert('congratulations \n You have Sucessfully Register \n Your Request is Under Review')
      
                        
      
      
                    })
                   
                    .catch((error) => 
                      
                      Alert.alert(
                        "Alert Title",
                        `${error}`,
                        [
                          {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                          },
                          { text: "OK", onPress: () => console.log("OK Pressed") }
                        ]
                      )
                      
                      )
                }
              )
             
              .catch((error) =>  Alert.alert(
                "Alert Title",
                `${error}`,
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
              ))
            
            }
           
           else if(size >= 1)
            {
            // if (documentSnapshot.exists) {
            //   console.log('User data: ', documentSnapshot.data());
            // }
            // if (condition) {
            //   // RUN
            // }else{
            //   // ERROR
            // }
           
            snapshot.forEach((Snapshot) => {
            
          
                array.push(
                  {
                  Id:Snapshot.id,
                  no_of_seller:Snapshot.data().no_of_seller,
                  per_code:Snapshot.data().per_code,
                  per_contact:Snapshot.data().per_contac,
                  img_uri:Snapshot.data().img,
                  per_name:Snapshot.data().per_name
                }
                )
  
                console.log('person--->',array);

                // this.setState({temparray:array})
                // this.setState({referencepersonPhone:Snapshot.data().per_contac,referencepersonName:Snapshot.data().per_name})
     
             
                if(!Snapshot.data().no_of_seller)
                {
             firebase.firestore()
      .collection('sales_person_details')
      .doc(Snapshot.id)
      .update(
        {
          no_of_seller:1
        }
      ) 
      .then(
        firebase.auth().createUserWithEmailAndPassword(action.data.email, action.data.password)
        .then(
         
                
          (result) => {
            console.log(result)
            console.log("uid", result.user.uid)
            firebase.firestore()
              .collection('users_list')
              .doc(result.user.uid)
              .set({
                uid: result.user.uid,
                email: action.data.email,
                shopName: action.data.shopName,
                userName: action.data.userName,
                phone: action.data.phone,
                time_stamp : action.data.time,
                referencepersonName: Snapshot.data().per_name,
                referencepersonPhone: Snapshot.data().per_contac,
                referencepersonCode:action.data.referencepersonCode,
                addressofShop: action.data.addressofShop,
                hasPermission: false,
                invoice_count: 0
                

              })   
              .then(() => {
                syncStorage.set('user_id', result.user.uid)
                var i = 0;
                uploadImage(action.data.adharCard, result.user.uid, 'adharCard')
                uploadImage(action.data.imageOfShop, result.user.uid, 'imageOfShop')
                uploadImage(action.data.imageOfShop, result.user.uid, 'BusinessCard')
                alert('congratulations \n You have Sucessfully Register \n Your Request is Under Review')

               


              })
              .then(() => {
                firebase.firestore()
        .collection('sales_person_details')
        .doc(Snapshot.id)
        .collection('User_list')
        .doc(result.user.uid)
        .set({
        email: action.data.email,
        shopName: action.data.shopName,
        userName: action.data.userName,
        phone: action.data.phone,
        time_stamp : action.data.time,
        uid:result.user.uid,
        phone: action.data.phone,
        
        })
              
          }  )  
              .catch(error => alert(error))
          }
        )
       
        .catch(error => alert(error))
      )

                }
                else
                {
                  firebase.firestore()
                  .collection('sales_person_details')
                  .doc(Snapshot.id)
                  .update(
                    {
                      no_of_seller: Snapshot.data().no_of_seller + 1
                    }
                     
              
                  ) 
                  .then(
                    firebase.auth().createUserWithEmailAndPassword(action.data.email, action.data.password)
                    .then(
                     
                            
                      (result) => {
                        console.log(result)
                        console.log("uid", result.user.uid)
                        firebase.firestore()
                          .collection('users_list')
                          .doc(result.user.uid)
                          .set({
                            uid: result.user.uid,
                            email: action.data.email,
                            shopName: action.data.shopName,
                            userName: action.data.userName,
                            phone: action.data.phone,
                            time_stamp : action.data.time,
                            referencepersonName: Snapshot.data().per_name,
                            referencepersonPhone: Snapshot.data().per_contac,
                            referencepersonCode:action.data.referencepersonCode,
                            addressofShop: action.data.addressofShop,
                            hasPermission: false,
                            invoice_count: 0
                            
            
                          })   
                          .then(() => {
                            syncStorage.set('user_id', result.user.uid)
                            var i = 0;
                            uploadImage(action.data.adharCard, result.user.uid, 'adharCard')
                            uploadImage(action.data.imageOfShop, result.user.uid, 'imageOfShop')
                            uploadImage(action.data.imageOfShop, result.user.uid, 'BusinessCard')
                            alert('congratulations \n You have Sucessfully Register \n Your Request is Under Review')
            
                           
            
            
                          })
                          .then(() => {
                            firebase.firestore()
                    .collection('sales_person_details')
                    .doc(Snapshot.id)
                    .collection('User_list')
                    .doc(result.user.uid)
                    .set({
                    email: action.data.email,
                    shopName: action.data.shopName,
                    userName: action.data.userName,
                    phone: action.data.phone,
                    time_stamp : action.data.time,
                    uid:result.user.uid,
                    phone: action.data.phone,
                    
                    
                    })
                          
                      }  )  
                          .catch(error => alert(error))
                      }
                    )
        //             .then((result) => {
        //               firebase.firestore()
        //   .collection('sales_person_details')
        //   .doc(snapshot.id)
        //   .collection('User_list')
        //   .doc(result.user.uid)
        //  .set({
        //   email: action.data.email,
        //   shopName: action.data.shopName,
        //   userName: action.data.userName,
        //   phone: action.data.phone,
        //   time_stamp : action.data.time,
        //  uid:result.user.uid,
        //  phone: action.data.phone,
      
    
        //  })
                    
        //   }  )  
                    .catch(error => alert(error))
                  )
              }
            
            }
            
            )
          }else{
           alert('invaild code')
          }
      
           
        }
        )
        .catch((error) =>{
          console.log("ERROR: ",error);
        }
      );
       

     
      return 0
      
    // case "VERIFY_USER":
    //   // const [modalVisible, setModalVisible] = useState(false);
   
    //   firebase.auth().signInWithEmailAndPassword(action.data.email, action.data.password)
    //     .then(
    //       (user) => {
    //         syncStorage.set('user_id', user.user.uid);
    //         action.navigation.replace('TabBarNavigation')
    //       }
    //     )
    //     .catch(error =>{
    
    //       alert('Invalid credentials')
          
    //       Alert.alert(
    //         'Invalid credentials',
    //         "Email Id and password doesn't match",
    //         [
    //           {
    //             text: "Cancel",
    //             onPress: () => console.log("Cancel Pressed"),
    //             style: "cancel"
    //           },
    //           { text: "OK", onPress: () => console.log("OK Pressed") }
    //         ]
    //       );

    //       action.navigation.replace('SignIn')

          
           
    //     })
        

    //   return 0
    case "ADD_IMAGE":
      //   alert(JSON.stringify(action.data))

      return 0
    default:
      return state
  }
  


}


export default userReducer;

const styles = StyleSheet.create({
  container: {
      height: '100%',
      backgroundColor: 'white'
  },
  section1: {
      flexDirection: 'row',
      paddingTop: 20,
      justifyContent: 'space-between',
      paddingHorizontal: 20
  },
  section2: {
      width: '100%',
      paddingHorizontal: 20,
      paddingVertical: 20
  },
  section3: {
      width: '100%',
      marginTop:-10,
      marginBottom:20
  },
  containernew: {
      height: '100%',

      justifyContent: 'center'
  },
  box: {
      height: 150,
      width: 100,

      marginRight: 15
  },
  text: {
      alignSelf: 'center',
      fontWeight: '400',
      fontFamily: 'Montserrat'

  },
  innerBox: {
      height: 100,
      borderRadius: 12,
      backgroundColor: '#F7F8F9',
      justifyContent: 'center',
      marginBottom: 10
  },
  section4: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      display: 'flex',
      padding: 10,
      justifyContent: 'center'


  },
//     ModalContainer :{



//   backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     opacity:0.9,
// },
  fadingContainer: {
      padding: 10,
      backgroundColor: "#f7f7f7",
        borderRadius:25,
         position:"absolute",
          bottom:55,
          alignSelf:"center",
          shadowColor: "#2222",
          shadowOpacity: 0.8,
          shadowRadius: 2,
          elevation:15,
          shadowOffset: {
            height: 1,
            width: 1
          },
    },
    fadingText: {
      fontSize: 15
    },
  newArrival: {
      width: '32%',
      borderWidth: 1,
      borderColor: '#E9E9E9',
    margin:2,
      marginTop: 10
  },
  heart: {
      alignSelf: 'flex-end',
      marginRight: 4,
      marginTop: 4
  },
  centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      height: 250,
      position: 'absolute',
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      backgroundColor: 'rgba(100,100,100, 0.9)',
      padding: 20,

    },
    modalView: {
      height: 200,
      width:"85%",
      backgroundColor: "white",
      borderRadius: 20,
      padding: 30,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
    
      height:30,
      borderRadius: 20,
      padding: 4,
      elevation: 2,
      marginTop:20
    
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#005478",
    },
    textStyle: {
      color: "white",
     
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },
    blurView:{
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
      }
  
})