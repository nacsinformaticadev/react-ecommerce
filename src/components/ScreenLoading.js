import React from 'react'
import {StyleSheet, SafeAreaView, Text, ActivityIndicator } from 'react-native'

export default function ScreenLoading() {
    return (
        <SafeAreaView style={styles.container}>

            <activityIndicator size={} color={} style={styles.loading}/>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({

    container:{

        flex:1,
        alignItems:'center',
        justifyContent: 'center',
    }

})