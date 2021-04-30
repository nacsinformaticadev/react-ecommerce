import React from 'react'
import { StyleSheet, View, Text, Alert } from 'react-native'
import { Button } from 'react-native-paper'
import { map } from 'lodash'
import {useNavigation} from '@react-navigation/native'
import useAuth from '../../hooks/useAuth'
import {deleteAddressApi} from '../../api/address'

import colors from '../../styles/colors'

export default function AddressList(props) {

    const { addresses , setReloadAddress} = props;
    const {auth} = useAuth()
    const navigation = useNavigation();

    const deleteAddressAlert = (address)=>{

        Alert.alert(
            "Eliminando Direccion",
            `¿Estas seguro de que quieres eliminar la direccion ${address.title}?`,
            [
                {
                    text: "NO"
                },
                {
                    text:"SI",
                    onPress:()=>{deleteAddress(address._id)},
                }

            ],
            {cancelable: false}
        )
    }

    const deleteAddress = async(idAddress)=>{
        try {
            await deleteAddressApi(auth,idAddress)
            setReloadAddress(true);
        } catch (error) {
            console.log(error);
        }
    }

    const goToUpdateAddress = (idAddress)=>{
        navigation.navigate('add-address', {idAddress})
    }
    return (
        <View style={styles.container}>
            {map(addresses, (address) => (

                <View key={address._id} style={styles.address}>
                    <Text style={[styles.title, styles.capitalize]} > {address.title} </Text>
                    <Text style={[styles.title, styles.capitalize]} > {address.name_lastname} </Text>
                    <Text style={[styles.title, styles.capitalize]} > {address.address} </Text>
                    <View style={styles.blockLine}>
                        <Text style={styles.capitalize}>{address.state},  </Text>
                        <Text style={styles.capitalize}>{address.city},  </Text>
                        <Text>{address.postal_code}  </Text>
                    </View>
                    <Text style={styles.capitalize}>{address.country} </Text>
                    <Text>Numero de telefono:  {address.phone} </Text>
                    <View style={styles.actions}>
                        <Button mode="contained" color={colors.primary} onPress={()=>{goToUpdateAddress(address._id) }} >Editar</Button>
                        <Button mode="contained" color={colors.danger} onPress={()=>{ deleteAddressAlert(address)}}>Eliminar</Button>
                    </View>
                </View>

            ))}
        </View>
    )
}


const styles = StyleSheet.create({

    container: {
        marginTop: 50,
    },
    address: {
        borderWidth: 0.9,
        borderRadius: 5,
        borderColor: "#ddd",
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginBottom: 15,
    },
    title: {
        fontWeight: 'bold',
        paddingBottom: 5,
    },
    blockLine: {
        flexDirection: 'row',
    },
    actions: {
        flexDirection:'row',
        justifyContent: 'space-between',
        marginTop: 30,
    },
    capitalize: {
        textTransform: 'capitalize'
    }
})