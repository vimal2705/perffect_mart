import * as firebase from 'firebase';
import syncStorage from 'sync-storage';
export const fetchnotifications = async ( notificationsperload) => {
    
    const db = firebase.firestore();
 
    const notifications = new Array ();
const querySnapshot = await
db
.collection('notification_list')
            .doc(syncStorage.get('user_id'))
            .collection('noti_list')
            .orderBy('timestamp','desc')
            .limit(notificationsperload)
            .get()

const lastVisible=querySnapshot.docs[querySnapshot.docs.length - 1]
querySnapshot.forEach((documentSnapshot) => {

       
    let notificationData = documentSnapshot.data();
    notificationData.id = documentSnapshot.id;
    notifications.push(notificationData);
    
});
return {notifications,lastVisible};

}

// more data

export const fetchMorenotifications = async (startAfter, notificationsperload ) => {

    const db = firebase.firestore();
   
    const notifications =new Array ();
  
const querySnapshot = await
db
.collection('notification_list')
            .doc(syncStorage.get('user_id'))
            .collection('noti_list')
            .orderBy('timestamp','desc')
.startAfter(startAfter)
.limit(notificationsperload)
.get()
const lastVisible=querySnapshot.docs[querySnapshot.docs.length - 1]
querySnapshot.forEach((documentSnapshot) => {
    let notificationData = documentSnapshot.data();
    notificationData.id = documentSnapshot.id;
    notifications.push(notificationData);
});
return {notifications,lastVisible};

}
