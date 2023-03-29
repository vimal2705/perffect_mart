import * as firebase from 'firebase';
import syncStorage from 'sync-storage';

export const fetchPosts = async ( postsperload) => {
    
    const db = firebase.firestore();
 
    const posts = new Array ();
const querySnapshot = await
db
.collection('order_list')
    
.where('user_id','==',syncStorage.get('user_id'))
.orderBy('timeStamp','desc')
.limit(postsperload)

.get()

    
     const lastVisible=querySnapshot.docs[querySnapshot.docs.length - 1]
     querySnapshot.forEach((item)=>{
         if(item.data().orderRecived == false)
         {
            let postData = item.data();
            postData.id = item.id;
            posts.push(postData);
     
         }
     
      
})
return {posts,lastVisible};

}

// more data

export const fetchMorePosts = async (startAfter, postsperload ) => {

    const db = firebase.firestore();
   
    const posts =new Array ();

const querySnapshot = await
db
.collection('order_list')
    
.where('user_id','==',syncStorage.get('user_id'))

.orderBy('timeStamp','desc')
.startAfter(startAfter)
.limit(postsperload)

.get()

const lastVisible=querySnapshot.docs[querySnapshot.docs.length - 1]
querySnapshot.forEach((item)=>{
    if(item.data().orderRecived == false)
    {
       let postData = item.data();
       postData.id = item.id;
       posts.push(postData);

    }
});
return {posts,lastVisible};

}
