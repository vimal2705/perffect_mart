import React from 'react'
import { View, Text } from 'react-native'
import { StatusBar } from 'expo-status-bar'

const termofuse = () => {
    return (
        <View>
                     <StatusBar backgroundColor="#005478" style={Platform.OS === "android" ? "light" : "dark"} />
            <Text> termofuse</Text>
        </View>
    )
}

export default termofuse
