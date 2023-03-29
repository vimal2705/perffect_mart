import React, { Component } from 'react';
import {
  Text,
  View,
  Dimensions,
  TouchableHighlight,
  StyleSheet, 
  Animated,
} from 'react-native';

const pageWidth  = Dimensions.get('window').width;

export default class ToastExample extends Component {

  constructor(props) {
    super(props);
    this.state = {

      modalShown: false,
      toastColor: 'green',
      message: 'Success!',

    };

    this.animatedValue = new Animated.Value(0)

  }

   callToast(message, type) {
    if(this.state.modalShown) return
    this.setToastType(message, type)
    this.setState({ modalShown: true })
    Animated.timing(
      this.animatedValue,
      {
        toValue: 1,
        duration: 350
      }).start(this.closeToast())
  }
  
  closeToast() {
    setTimeout(() => {
      this.setState({ modalShown: false })
      Animated.timing(
      this.animatedValue,
      { 
        toValue: 0,
        duration: 350
      }).start()
    }, 2000)
  }

  setToastType(message='Success!', type='success') {
    let color
    if (type == 'error') color = 'red'
    if (type == 'warning') color = 'yellow'
    if (type == 'success') color = 'green'
    this.setState({ toastColor: color, message: message })
  }


  componentDidMount() {

  }

  render() {

    let animation = this.animatedValue.interpolate({
       inputRange:[-700, -10, 0],
       outputRange: [1110, 1000, 10]
     })

    return (

      <View style={styles.container}>

          

         <View style={{ 
                        backgroundColor: '#f8f8ff', 
                        borderRadius:5, 
                        borderWidth: 1, 
                        borderColor: '#000',
                        marginTop: 1, }} >
            <TouchableHighlight 
                style={{
                    backgroundColor: 'green',
                  }} 
                onPress={() => {
                  this.callToast("Success Message", 'success');
                }}  >
                <Text style={styles.modalContentStyle}>
                  {"Show Success Message"}
                </Text>
            </TouchableHighlight> 
          </View>
            <Animated.View  style={{ transform: [{ translateY: animation }], height: 50, backgroundColor:"#d3d3d3", position: 'absolute', bottom:-60,  justifyContent:  'center',alignSelf:'center',alignContent:"center",borderRadius:25,}}>
              <Text style={{ marginLeft: 10,  color: 'white',  fontSize:16, alignSelf:"center",marginRight: 10}}>
                add to wishlist  
              </Text>
            </Animated.View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',

    backgroundColor: '#F5FCFF',
  },
  modalContentStyle:{
    fontSize: 15,
    fontWeight: 'bold',
  },
 
});