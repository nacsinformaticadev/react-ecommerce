import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button } from 'react-native-paper'

export default function Buy(props) {

    const { product, quantity } = props;
    const addProductCar = () => {
        console.log("Producto Anadido al carrito!");
        console.log(product.title);
        console.log("Cantidad: " + quantity);

    }

    return (

        <View style={{zIndex: 1}}>
        <Button
        mode='contained'
        contentStyle={styles.btnBuyContent}
        labelStyle={styles.btnLabel}
        style={styles.btn}
        onPress={addProductCar}
       >

           Añadir al carrito
   
       </Button>
       </View>
    )
}

const styles = StyleSheet.create({

    btnBuyContent: {
        backgroundColor: '#aed934',
        paddingVertical: 5,
    },
    btnLabel: {
        fontSize: 18,
    },
    btn: {
        marginTop: 10,
    }
})
