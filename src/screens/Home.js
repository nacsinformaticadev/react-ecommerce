import React from 'react'
import colors from '../styles/colors'
import {StyleSheet, View, Text } from 'react-native'

export default function Home() {
    return (
        <View style={styles.container}>
            <Text>Estamos en Home</Text>
        </View>
    )
}


const styles = StyleSheet.create({

    container:{
        flex: 1,
        justifyContent:'center',
        alignItems: 'center',  
    }
 
})