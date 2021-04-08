import React from 'react'
import {StyleSheet, View, Text } from 'react-native'
import {Searchbar} from 'react-native-paper'

import colors from '../../styles/colors'

export default function Search() {
    return (
        <View style={styles.container}>
      
            <Searchbar
            placeholder="Busca Tu Producto"
            />
        </View>
    )
}


const styles = StyleSheet.create({

    container:{
        
        backgroundColor: colors.tele_cafeObs,
        paddingVertical: 10,
        paddingHorizontal:20,
        zIndex:1,
    }
})