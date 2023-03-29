import I18n from 'i18n-js';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import './library';
import {FlatListSlider} from 'react-native-flatlist-slider';
import { SliderBox } from "react-native-image-slider-box";

const RegisterTemporaryScreen = (props) => {
  
    const images = [
        {
         banner:require('../../assets/imageSlide1.png'),
        },
       {
         banner:  require('../../assets/imageSlide1.png'),
       },
       {
        banner:  require('../../assets/imageSlide1.png'),
      }
     
       ]
    // React.useState(()=>{

    // })
    return (
        <View style={styles.container}>
            <View style={styles.top} />
            <View style={{ height: '86%' }}>
                <ScrollView style={{ marginBottom: 10 }}>
                    <View style={{marginTop:10}}>
                    <FlatListSlider 
    data={images} 
    imageKey={'banner'}
    height={115}
    timer={5000}
    width={300}
    contentContainerStyle={{paddingHorizontal: 29}}
    indicatorContainerStyle={{position:'absolute',bottom:-15}}
    indicatorActiveColor={'#005478'}
    indicatorInActiveColor={'#005478'}
    indicatorActiveWidth={30}
    separatorWidth={10}
    animation
    local
  />
                        {/* <SliderBox
                            autoplay={true}
                            circleLoop={true}
                            sliderBoxHeight={250}
                            disableOnPress={false}
                            paginationBoxStyle={{

                                paddingLeft: 46
                            }}
                            dotColor={'black'}
                            inactiveDotColor={'blue'}
                            dotStyle={
                                {
                                    width: 30,
                                    borderWidth: 2,
                                    marginLeft: -5,
                                    borderColor: 'black',
                                    backgroundColor: 'black',
                                    alignSelf: 'center'
                                }
                            }
                            ImageComponentStyle={
                                {
                                    marginTop: 50,
                                    width: '90%',
                                    height: 180,
                                    borderRadius: 5,
                                    top: -30
                                }
                            }
                            images={state}
                            
                            /> */}
                        <View style={{ padding: 20, }}>
                        
                            <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{I18n.t('categories')}</Text>

                            <View style={styles.row}>
                                <View style={styles.box}>
                                    <View style={styles.innerBox} >
                                        <Image style={{ alignSelf: 'center' }} source={require('../../assets/grocery.png')} />
                                    </View>
                                    <View >
                                        <Text style={styles.text}>{I18n.t('categories')}</Text>
                                        <Text style={styles.text}>{I18n.t('Name')}</Text>
                                    </View>
                                </View>

                                <View style={styles.box}>
                                    <View style={styles.innerBox} >
                                        <Image style={{ alignSelf: 'center' }} source={require('../../assets/snack.png')} />
                                    </View>
                                    <View>
                                        <Text style={styles.text}>{I18n.t('categories')}</Text>
                                        <Text style={styles.text}>{I18n.t('Name')}</Text>
                                    </View>
                                </View>

                            </View>

                            <View style={styles.row}>


                                <View style={styles.box}>
                                    <View style={styles.innerBox} >
                                        <Image style={{ alignSelf: 'center' }} source={require('../../assets/vegetables.png')} />
                                    </View>
                                    <View>
                                        <Text style={styles.text}>{I18n.t('categories')}</Text>
                                        <Text style={styles.text}>{I18n.t('Name')}</Text>
                                    </View>
                                </View>

                                <View style={styles.box}>
                                    <View style={styles.innerBox} >
                                        <Image style={{ alignSelf: 'center' }} source={require('../../assets/fruit.png')} />
                                    </View>
                                    <View>
                                        <Text style={styles.text}>{I18n.t('categories')}</Text>
                                        <Text style={styles.text}>{I18n.t('Name')}</Text>
                                    </View>
                                </View>

                            </View>

                        </View>
                        <View style={{ borderWidth: 1, backgroundColor: '#005478', padding: 4 }}>
                            <Text style={{ fontSize: 10, alignSelf: 'center', color: 'white' }}>{I18n.t('Note')}</Text>
                        </View>

                    </View>
                </ScrollView>

            </View>

            <View style={styles.bottom} />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: 'white'
    },
    top: {
        height: '7%',
        width: '100%',
        backgroundColor: '#005478',
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        alignSelf: 'flex-start'
    },
    bottom: {
        height: '7%',
        width: '100%',
        backgroundColor: '#005478',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        justifyContent: 'flex-end'
    },
    box: {
        height: 170,
        width: '35%',


    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',

        marginTop: 20
    },
    text: {
        alignSelf: 'center',
        fontWeight: '400'
    },
    innerBox: {
        height: 120,
        borderRadius: 12,
        backgroundColor: '#F7F8F9',
        justifyContent: 'center',
        marginBottom: 10
    }
})
export default RegisterTemporaryScreen