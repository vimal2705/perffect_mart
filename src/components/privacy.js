import React from 'react'
import { View, Text } from 'react-native'
import { StatusBar } from 'expo-status-bar'

const privacy = () => {
    return (
        <View>
                     <StatusBar backgroundColor="#005478" style={Platform.OS === "android" ? "light" : "dark"} />
            <Text>privacy</Text>
        </View>
    )
}

export default privacy
