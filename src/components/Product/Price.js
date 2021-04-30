import React from 'react'
import {StyleSheet, View, Text } from 'react-native'

export default function Price(props) {
    
    const {price, discount} = props
    
    const calcPrice = (price, discount)=>{
        if(!discount) return price;

        const discountAmount = (price * discount) / 100;
        return (price - discountAmount)
    }
    return (
        <View>
            
            {discount && (

                <View style={styles.containerData}>
                    <Text style={styles.dataText}>Otras Tiendas:</Text>
                    <Text style={[styles.dataValue, styles.oldPrice]}>$ {price} </Text>
                </View>

            )}

            <View style={styles.containerData}>
                <Text style={styles.dataText}>Grow Del Tele: </Text>
                <Text style={[styles.dataValue, styles.currentPrice]}>
                $ {calcPrice(price, discount)} 
                </Text>
            </View>

            {discount && (
                <View style={styles.containerData}>
                    <Text style={styles.dataText}>Te Ahorras: </Text>
                    <Text style={[styles.dataValue, styles.saving]}>
                      $  {((price * discount)/100)}  ({discount}%)
                    </Text>
                </View>
            )}

        </View>
    )
}

const styles = StyleSheet.create({

    containerData:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical:5,
        
    },
    dataText:{
        width:'45%',
        fontSize:18,
        color: '#38241f',
        textAlign: 'right'
    },
    dataValue:{
        width:'45%',
        fontSize:18,
        paddingLeft:5,
        
    },
    oldPrice:{
        textDecorationLine:'line-through',
        color:'#6a0904'
    },
    currentPrice:{
        fontSize:23,
        color:"#aed934",
        
    },
    saving:{
        color:'#bc0e0d'
    }

})