// class Dashbord extends React.Component {
//     constructor() {
//         super();
//         this.state = {
//             //categories:this.props.state.product,
//             categories: [],
//             sliderImage: [],
//             newArrival: [
//                 { name: 'fruits', image: require('../../assets/oil.png') },
//                 { name: 'fruits', image: require('../../assets/aata.png') },
//                 { name: 'fruits', image: require('../../assets/suger.png') },
//                 { name: 'fruits', image: require('../../assets/suger.png') },
//                 { name: 'fruits', image: require('../../assets/aata.png') },
//                 { name: 'fruits', image: require('../../assets/oil.png') },
//             ],
//             check: false,
//             isLoading:false

//         }

//     }
//     goBack = () => {
//         alert('hello')
//     }


//     getCategories = () => {
//         this.setState({isLoading:true})
//         firebase.firestore()
//             .collection('category_list')
//             .get()
//             .then(
            
//                 (snapshot) => {
//                     var cat_array = [];
//                     snapshot.forEach((ss) => {
//                         cat_array.push(ss.data())
                       
//                         // console.log("data",ss.data().name)
//                     })
//                     this.setState({isLoading:false})
//                     this.setState({ categories: cat_array })
//                     //  SyncStorage.set()
//                 }
//             )
//             .catch((error) => {
//                 console.log(error)
//             })

//     }

//     async registerForPushNotificationsAsync() {

//         let token;
//         if (Constants.isDevice) {
//             const { status: existingStatus } = await Notifications.getPermissionsAsync();
//             let finalStatus = existingStatus;
//             if (existingStatus !== 'granted') {
//                 const { status } = await Notifications.requestPermissionsAsync();
//                 finalStatus = status;
//             }
//             if (finalStatus !== 'granted') {
//                 alert('Failed to get push token for push notification!');
//                 return;
//             }
//             token = (await Notifications.getExpoPushTokenAsync()).data;
//             console.log(token);
//         } else {
//             alert('Must use physical device for Push Notifications');
//         }

//         if (Platform.OS === 'android') {
//             Notifications.setNotificationChannelAsync('default', {
//                 name: 'default',
//                 importance: Notifications.AndroidImportance.MAX,
//                 vibrationPattern: [0, 250, 250, 250],
//                 lightColor: '#FF231F7C',
//             });
//         }
//         console.log("TOKEN:  ", token);
//         db
//             .doc("token_list/list")
//             .set({
//                 token: token
//             })
//             .then(function (doc) {
//                 alert("SUCCESS!!")
//             })
//             .catch(function (error) {
//                 alert(error)
//             })
//         return token;
//     }

//     componentDidMount() {
//         syncStorage.set('isBasket', false)
//         // this.props.dispatch(getinitialCategories())
//         this.getCategories();
//         this.getBanner();
//         this.getProducts();
//         console.log("state_from", this.props.state)

//         firebase.auth().onAuthStateChanged(user => {
//             console.log("USER : ", JSON.stringify(user));
//         })
//         this.registerForPushNotificationsAsync()
//     }
//     getProducts = () => {
//         this.setState({isLoading:true})
//         firebase.firestore()
//             .collection('product_list')
//             .orderBy("time_stamp", "desc")
//             .limit(9)
//             .get()
//             .then((snapshot) => {
//                 var array = []
//                 snapshot.forEach(item => {
//                     array.push(item.data())
//                 })
//                 this.setState({isLoading:false})
//                 this.setState({ newArrival: array })
//             }


//             )
//             .catch((error) => {
//                 console.log(error)
//             })
//     }
//     getBanner = () => {
       
//         firebase.firestore()
//             .collection('banner_img_list')
//             .get()
//             .then((snapshot) => {
//                 var array = []
//                 snapshot.forEach(item => {
//                     array.push(item.data().image_url)
//                 })
//                 this.setState({ sliderImage: array })
//             }


//             )
//             .catch((error) => {
//                 console.log(error)
//             })
//     }

//     render() {
//         // this.setState({categories:this.props.state.product})
//         // console.log("FinalData",this.state.categories)

//         const { isFocused } = this.props;

//         return (<View style={{ height: '100%', backgroundColor: 'white' }}>
//             <ScrollView>

//                 <View style={styles.container}>

//                     <Header1 title={'Home'} backArrowInclude={false} optionsInclude={true} goBack={this.props} navigation={this.props.navigation} />
//                     <View style={{ paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
//                         <View>
//                             <Text style={{ fontSize: 15, fontWeight: '500' }}>Categories</Text>
//                         </View>
//                         <View>
//                             <TouchableOpacity onPress={
//                                 () => {
//                                     this.props.navigation.navigate('AllcategoriesScreen')
//                                 }
//                             }>
//                                 <View style={{ width: 48, height: 23, backgroundColor: '#444444', borderRadius: 5, justifyContent: 'center' }}>
//                                     <Text style={{ color: 'white', fontSize: 8, alignSelf: 'center' }}>
//                                         View All
//             </Text>
//                                 </View>
//                             </TouchableOpacity>
//                             <View>

//                             </View>

//                         </View>

//                     </View>
//                     <ActivityIndicator
// 							style={{
// 								flex: 1,
// 								justifyContent: 'center',
// 								alignItems: 'center',
// 							}}
// 							visible={this.state.isLoading}
// 							animating={this.state.isLoading}
// 							color="black"
// 							size="large"
// 						/>
//                     <View style={styles.section2}>
//                         <ScrollView horizontal={true}>
//                             {this.state.categories.map((item) => {

//                                 // var ref=firebase.firestore().collection('category_list');

//                                 return (
//                                     <TouchableOpacity
//                                         style={styles.box}
//                                         onPress={
//                                             () => {
//                                                 this.props.navigation.navigate('AllcategoriesScreen')
//                                             }
//                                         }>
//                                         <View >
//                                             <View style={styles.innerBox} >
//                                                 <Image style={{ alignSelf: 'center', height: 70, width: 70, borderRadius: 4 }} source={{ uri: item.cat_img }} />
//                                             </View>
//                                             <View>
//                                                 <Text style={styles.text}>{item.cat_name}</Text>

//                                             </View>
//                                         </View>
//                                     </TouchableOpacity>


//                                 )
//                             })}
//                         </ScrollView>
//                     </View>
//                     <View style={styles.section3}>
//                         <SliderBox
//                             autoplay={true}
//                             circleLoop={true}
//                             sliderBoxHeight={200}
//                             disableOnPress={false}
//                             paginationBoxStyle={{


//                             }}
//                             dotColor={'black'}
//                             inactiveDotColor={'black'}
//                             dotStyle={
//                                 {
//                                     width: 30,
//                                     borderWidth: 2,
//                                     marginLeft: -23,
//                                     borderColor: 'black',
//                                     backgroundColor: 'black',
//                                     alignSelf: 'center'
//                                 }
//                             }
//                             imageLoadingColor={`black`}
//                             ImageComponentStyle={
//                                 {
//                                     marginTop: 50,


//                                     width: '90%',
//                                     height: 150,
//                                     borderRadius: 5,
//                                     top: -30
//                                 }
//                             }
//                             images={this.state.sliderImage} />
//                     </View>
//                     <View style={{ paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
//                         <View>
//                             <Text style={{ fontSize: 15, fontWeight: '500' }}>New Arrival</Text>
//                         </View>
//                         <View>
//                             <TouchableOpacity onPress={
//                                 () => {
//                                     this.props.navigation.navigate('AllcategoriesScreen')
//                                 }
//                             }>
//                                 <View style={{ width: 48, height: 23, backgroundColor: '#444444', borderRadius: 5, justifyContent: 'center' }}>
//                                     <Text style={{ color: 'white', fontSize: 8, alignSelf: 'center' }}>
//                                         View All
//             </Text>
//                                 </View>
//                             </TouchableOpacity>
//                         </View>
//                     </View>
//                     <ActivityIndicator
//                     style={{
//                         flex: 1,
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                     }}
//                     visible={this.state.isLoading}
//                     animating={this.state.isLoading}
//                     color="black"
//                     size="large"
//                 />
//                     <View style={styles.section4}>
//                         {
//                             this.state.newArrival.map((item) => {
//                                 return (

//                                     <View style={styles.newArrival}>
//                                         <TouchableOpacity onPress={
//                                             () => {
//                                                 this.props.navigation.navigate('ProductScreen', { product: item, similarProducts: this.state.newArrival })
//                                             }
//                                         }>
//                                             <View>
//                                                 {
//                                                     true ? <View style={styles.heart}>
//                                                         <Image source={require('../../assets/heart.png')} />
//                                                     </View> : null
//                                                 }
//                                                 <View style={{ height: 84, width: 74, alignSelf: 'center' }}>

//                                                     <Image style={{ marginTop: 5, height: 84, width: 74 }} source={{ uri: item.img }}>
//                                                     </Image>
//                                                 </View>
//                                                 <View style={{ marginTop: 4 }}>
//                                                     <Text style={{ alignSelf: 'center', fontSize: 14, fontWeight: '500', marginTop: 6 }}>
//                                                         {item.pro_name}
//                                                     </Text>
//                                                     <Text style={{ alignSelf: 'center', marginTop: 4 }}>{`\u20B9${item.pro_price}`}</Text>
//                                                 </View>
//                                             </View>
//                                         </TouchableOpacity>
//                                     </View>

//                                 )
//                             })
//                         }
//                     </View>
//                 </View>

//             </ScrollView>
//         </View>)
//     }
// }


<View>
{
    this.state.activeTab==='PastOrder'? this.state.pastOrder.map(e=>{
       return (
         <View style={styles.orderContainer}>
         <View>
          <Image  style= {styles.orderImage} source={e.productImage}></Image>
         </View>
         <View>
           <Text>{e.productName}</Text>
           <Text>{e.productSize}</Text>
           <Text>{e.productPrice}</Text>
         </View>
         <View style={{justifyContent:'center'}}>
           <Text style={e.productDeliveryStatus?styles.deliverTextgreen:styles.deliverTextRed}>{e.productDeliveryStatus?'Delivered':'Cancled'}</Text>
         </View>
        </View>
       )
  }) :this.state.ongoingOrder.map(e=>{
   return (
     <View style={styles.orderContainer}>
     <View>
      <Image  style= {styles.orderImage} source={e.productImage}></Image>
     </View>
     <View>
       <Text>{e.productName}</Text>
       <Text>{e.productSize}</Text>
       <Text>{e.productPrice}</Text>
     </View>
     <View style={{justifyContent:'center'}}>
       <Text style={e.productDeliveryStatus?styles.deliverTextgreen:styles.deliverTextRed}>{e.productDeliveryStatus?'Delivered':'Cancled'}</Text>
     </View>
    </View>
   )
}) 
}

</View>
//------------------------------------------------------------------------------------------------
                  // {
                            //     this.state.isExist ? null :
                            //         <View style={{ flexDirection: 'row' }}>
                            //             <TouchableOpacity onPress={
                            //                 () => {
                            //                     if (this.state.count > 1)
                            //                         this.setState({ count: this.state.count - 1 })
                            //                     this.setState({ totalPrice: this.state.product.pro_price * (this.state.count + 1) })
                            //                 }
                            //             }>
                            //                 <Image style={{ marginHorizontal: 5 }} source={require('../../assets/minus.png')}></Image>
                            //             </TouchableOpacity>
                            //             <Text>{this.state.count}</Text>
                            //             <TouchableOpacity onPress={
                            //                 () => {
                            //                     this.setState({ count: this.state.count + 1 })
                            //                     this.setState({ totalPrice: this.state.product.pro_price * (this.state.count + 1) })
                            //                 }
                            //             }>
                            //                 <Image style={{ marginHorizontal: 5 }} source={require('../../assets/addition.png')}></Image>
                            //             </TouchableOpacity>
                            //         </View>

                            // }