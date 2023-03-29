import * as firebase from 'firebase';
import SyncStorage from 'sync-storage';



var firebaseConfig = {
  apiKey: "AIzaSyD_2NIuxDoVnCxWTOrP8pq16MFho4Nl6VM",
  authDomain: "perfect-mart.firebaseapp.com",
  projectId: "perfect-mart",
  storageBucket: "perfect-mart.appspot.com",
  messagingSenderId: "68570693732",
  appId: "1:68570693732:web:a0077602bee94cd6a3df71",
  measurementId: "G-9N3RJV08V5"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}
// firebase.firestore().enablePersistence()

const productDefaultState = [];

// var ans={}
// ans=ref.get().then(snapshot=>{
// snapshot.forEach((doc)=>{
//   ans=doc.data()
// })
// }).catch(error=>alert(error))


const productReducer = (state = productDefaultState, action) => {

  switch (action.type) {
    case 'GET_INITIAL_CATEGORITES':

      firebase.firestore()
        .collection('category_list')
        .get()
        .then(

          (snapshot) => {
            var cat_array = [];
            snapshot.forEach((ss) => {
              cat_array.push(ss.data().name)
              // console.log("data",ss.data().name)
            })
            //  SyncStorage.set()
          }
        )
        .catch((error) => {
          console.log(error)
        })
     
      return state;

    default:
      return state
  }
  // firebase.firestore().enablePersistence()

  const productDefaultState = [];

  // var ans = {}
  // ans = ref.get().then(snapshot => {
  //   snapshot.forEach((doc) => {
  //     ans = doc.data()
  //   })
  // }).catch(error => alert(error))


  const productReducer = (state = productDefaultState, action) => {
    switch (action.type) {
      case 'GET_INITIAL_CATEGORITES':
      
        return 0
      default:
        return 0
    }
  }
}

export default productReducer;

//  {
// //     var ans=[]
//        ref.get().then(snapshot=>{


//         return {name:'bhumi'}
//         }).catch(error=>{
//          alert(error)
//      })
//  
