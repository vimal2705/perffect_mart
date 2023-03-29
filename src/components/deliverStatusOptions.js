import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, ScrollView, Dimensions } from 'react-native';
import * as firebase from 'firebase';
import syncStorage from 'sync-storage';
import NetInfo from "@react-native-community/netinfo";
import { StatusBar } from 'expo-status-bar';
import I18n from 'i18n-js';
import Header1 from './Header1';

class OrderStausOptions extends React.Component {
    constructor() {
        super();
        this.state = {
            activeTab: 'PastOrder',
            pastOrder: [{
                productName: 'Aata',
                productSize: '10 Kg Pack',
                productPrice: '100 $',
                productImage: require('../../assets/aata.png'),
                productDeliveryStatus: false,
                height: 0,
            },
            {
                productName: 'Sugar',
                productSize: '1 Kg Pack',
                productPrice: '30 $',
                productImage: require('../../assets/suger.png'),
                productDeliveryStatus: true
            }],
            orders: [],
            internet: false,
            isLoading: false,
            ongoingOrder: [{
                productName: 'Aata',
                productSize: '10 Kg Pack',
                productPrice: '100 $',
                productImage: require('../../assets/aata.png'),
                productDeliveryStatus: false
            },

            ],

        }
    }
    renderOrders = (e) => {


    }
    componentDidMount() {
        syncStorage.set('isBasket', false)
        //   console.log("height",Dimensions.get('window').height)
        this.setState({ height: Dimensions.get('window').height })
        this.setState({ isLoading: true })
        this.unsubscribe = NetInfo.addEventListener(state => {
            console.log("Connection type____", state.type);
            this.setState({ internet: state.isConnected })
            console.log("Is connected___?", state.isConnected);


        });

        firebase.firestore()
            .collection('order_list')
            .where('user_id', '==', syncStorage.get('user_id'))
            .get()
            .then((ss) => {
                var array = []
                ss.forEach((item) => {
                    array.push(item.data())
                    console.log('-->',item)
                })
                console.log('-->>>',ss)
                this.setState({ orders: array })
                this.setState({ isLoading: false })

            })
    }
    componentWillUnmount() {
        this.unsubscribe()
    }
    render() {
        return (<View style={{ height: '100%' }}>
                {
                Platform.OS === 'android' ?
            
            <View style={{ backgroundColor: '#005478', borderWidth: 5, borderColor: '#fff', borderRadius: 100, height: 50, width: 50, justifyContent: 'center', bottom:"-3.7%",position:"absolute", zIndex: 1,alignSelf:"center", elevation: 9}}>
           <TouchableOpacity onPress={() => this.props.navigation.navigate('Search')}   activeOpacity={1.0}>
            <Image style={{ height: 25, width: 25, alignSelf: 'center' }} source={require('../../assets/searchIcon.png')}></Image>
            </TouchableOpacity>
            </View>: null
}
            {
                this.state.internet ?
                    <View style={styles.container}>
                           <StatusBar backgroundColor="#005478" style={Platform.OS === "android" ? "light" : "dark"} />
                           <View style={styles.section1}>
                        <View style={{ alignSelf:'center', flexDirection: 'row'}}>
             <TouchableOpacity onPress={
                    () => {
                        this.props.navigation.goBack();
                    }
                }>
                    <View style={{ marginLeft: 20}}>
                    <Image style={{  height:30,width:30 }} source={require('../../assets/backArrow.png')}></Image>
                    </View>
                </TouchableOpacity>
             
                <View style={{ justifyContent:'center',alignItems:'center',alignContent:"center"}}>
             <Text style={{ fontSize: 21, width: 260, fontFamily: 'Montserrat'}}> {I18n.t('MyOrders')} </Text>   
          </View>
          </View>
             
           
       
                 
          </View>
                        <ScrollView>


                            {/* <View style={styles.secttion1}>
                                <TouchableOpacity onPress={
                                    () => {
                                        this.props.navigation.goBack();
                                    }
                                }>
                                <View style={{height:40,justifyContent:'center'}}>
                                <Image style={{ height:25,width:25}} source={require('../../assets/backArrow.png')}></Image>
                                </View>
                                    
                                </TouchableOpacity>
                                <View style={{height:40,justifyContent:'center'}}>
                                <Text style={{ fontFamily: 'Montserrat', marginLeft: 20, fontSize: 25 }}>{I18n.t('MyOrders')}</Text>
                                </View>
                            </View> */}

                            {this.state.isLoading ?
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
                                /> : null}

                            {
                                this.state.orders.length > 0 ?

                                    <View style={{ marginHorizontal: '5%', marginTop: 50 }}>

                                        {
                                            this.state.orders.map((item) => {

                                                return (
                                                    <TouchableOpacity onPress={
                                                        () => {
                                                            this.props.navigation.navigate('DeliverStatus', { orderDetailes: item })
                                                        }
                                                    }>
                                                        <View style={{ flexDirection: 'row', backgroundColor: '#F2F2F2', padding: 10, borderRadius: 10, borderWidth: 1, marginTop: 10, borderColor: 'lightgrey' }}>
                                                            <View style={{ width: '30%', justifyContent: 'center' }}>
                                                                <Image style={{ alignSelf: 'center', height: 60, width: 60 }} source={require('../../assets/Parcel.png')} />
                                                            </View>
                                                            <View style={{ width: '70%' }}>
                                                                <Text style={{ fontFamily: 'Montserrat', fontSize: 18 }}>{I18n.t('OrderDate')} : {item.orderDate}</Text>
                                                                <Text style={{ fontFamily: 'Montserrat', marginTop: 10, fontSize: 18 }}>{I18n.t('OrderID')} : {item.order_id}</Text>
                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>

                                                )

                                            })
                                        }
                                    </View>
                                    : <View style={{ height: this.state.height - 150, justifyContent: 'center' }}>
                                        <Image style={{ height: 310, width: 300, justifyContent: 'center', alignSelf: 'center' }} source={require('../../assets/EmptyView.png')}></Image>
                                    </View>
                            }
                        </ScrollView>
                    </View>
                    : <View style={styles.containernew}>
                        <Image style={{ justifyContent: 'center', alignSelf: 'center', }} source={require('../../assets/noInternet.png')}>
                        </Image>
                        <Text style={{ fontFamily: 'Montserrat', color: '#333333', alignSelf: 'center', fontSize: 25, marginTop: 20 }}>{I18n.t('NoInternetConnection')} </Text>
                        <Text style={{ fontFamily: 'Montserrat', color: '#333333', alignSelf: 'center', fontSize: 20, marginTop: 10 }}>{I18n.t('PleaseTryAgainLater')}</Text>
                    </View>
            }
        </View>)
    }
}
const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: 'white',

    },
    secttion1: {
        height: 80,
        backgroundColor: '#F1F1F1',
        paddingTop: 40,
        paddingLeft: 40,
        flexDirection: 'row'

    }, containernew: {
        height: '100%',

        justifyContent: 'center'
    },
    underLineActive: {
        borderBottomColor: 'black', borderBottomWidth: 3, width: '50%',
    }
    , underLineInactive: {
        borderBottomColor: '#BABABA', borderBottomWidth: 3, width: '50%',
    }, titleTextActive: {
        fontSize: 20,
        color: 'black',
        padding: 10,
        fontWeight: '700'

    },
    titleTextInActive: {
        fontSize: 20,
        color: '#BABABA',
        padding: 10,
        fontWeight: '700'
    },
    orderContainer: {
  
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
        borderColor: '#E9E9E9'
    },
    orderImage: {
        height: 80,
        width: 60,
        overflow: 'hidden',

    },
    deliverTextgreen: {
        color: 'green',
        alignSelf: 'center'
    },
    deliverTextRed: {
        color: 'red',
        alignSelf: 'center'
    }
})
export default OrderStausOptions