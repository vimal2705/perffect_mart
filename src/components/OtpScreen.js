import React, { useRef, useState } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, Image } from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';

export default OtpScreen = (props) => {
    const [state, setState] = useState(0);
    let otpInput = useRef(null);
    const clearText = () => {
        otpInput.current.clear();
    }


    return (
        <View>
            <View style={{
                height: '12%',
                width: '100%',
                backgroundColor: 'white',
                borderBottomRightRadius: 10,
                borderBottomLeftRadius: 10,
                alignSelf: 'flex-start',
                flexDirection: 'row',
                paddingTop: '5%'
            }}
            >
                <View style={{ paddingTop: '8%', paddingLeft: '10%' }}>
                    <TouchableOpacity onPress={() => {
                        props.navigation.goBack()
                    }}>
                        <Image style={{height:20,width:20}} source={require('../../assets/backArrow.png')} />
                    </TouchableOpacity>
                </View>
                <View style={{ marginLeft: 30, paddingTop: '6%' }}>
                    <Text style={{ fontFamily: 'Montserrat', fontSize: 20, fontWeight: '500' }}>OTP verification</Text>
                </View>
            </View>
            <View style={{ backgroundColor: 'white', height: '81%', justifyContent: 'center', alignSelf: 'center', paddingHorizontal: 20 }}>
                <Text style={{ fontFamily: 'Montserrat', alignSelf: 'center', fontSize: 20, fontWeight: 'bold' }}>Get Your OTP</Text>
                <View>
                    <Text style={{ fontFamily: 'Montserrat', alignSelf: 'center', fontSize: 15, marginTop: 50 }}>Please enter the 6 digit code sent </Text>
                    <Text style={{ fontFamily: 'Montserrat', alignSelf: 'center', fontSize: 15, marginTop: 5 }}> to your phone number.</Text>
                </View>
                <View style={{ alignSelf: 'center' }}>
                    <OTPTextInput tintColor={'#444444'} inputCount={6} textInputStyle={{ marginTop: 30, backgroundColor: '#F1F1F1', borderRadius: 5, }} ref={e => (otpInput = e)} handleTextChange={(text) => {
                        setState(text)
                    }} />
                    <View style={{ alignSelf: 'center', marginTop: 20 }}>
                        <Text>If you don’t receive a OTP?  </Text>
                    </View>
                    <TouchableOpacity style={{ borderWidth: 1, height: 42, width: 232, alignSelf: 'center', justifyContent: 'center', backgroundColor: '#444444', borderRadius: 5, marginTop: 40 }} onPress={() => {
                        props.navigation.navigate('RegisterTemporaryScreen')
                    }}>
                        <Text style={{ fontFamily: 'Montserrat', alignSelf: 'center', color: 'white', fontSize: 15, fontWeight: 'bold' }}>Verify OTP</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{
                height: '7%',
                width: '100%',
                backgroundColor: '#333333',
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
                justifyContent: 'flex-end'
            }} />
        </View>
    )
}