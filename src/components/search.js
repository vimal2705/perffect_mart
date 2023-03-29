import * as firebase from 'firebase';


export const fetchPosts = async ( postsperload) => {
    
    const db = firebase.firestore();
 
    let posts = new Array ();
const querySnapshot = await
db
.collection('product_list')
.orderBy('pro_name_en')
.limit(postsperload)
.get()

const lastVisible=querySnapshot.docs[querySnapshot.docs.length - 1]

                    querySnapshot.forEach((ss) => {
                      
                            posts.push(ss.data())
                        console.log("dat--a",ss.data().pro_name_en)
                        
    
                    })
                 
                  
                

return {posts,lastVisible};

}

// more data

export const fetchMorePosts = async (startAfter, postsperload ) => {

    const db = firebase.firestore();
   
    let posts =new Array ();
  
const querySnapshot = await
db
.collection('product_list')
.orderBy('pro_name_en')
.startAfter(startAfter)
.limit(postsperload)
.get()
const lastVisible=querySnapshot.docs[querySnapshot.docs.length - 1]
                  
                    querySnapshot.forEach((ss) => {
                      
                            posts.push(ss.data())
                        console.log("d-a",ss.data().pro_name_en)
                        
                    
                    
                    })
return {posts,lastVisible};

}
