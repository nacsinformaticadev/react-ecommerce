import React, { useState, useCallback } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { getMeApi, updateUserApi } from '../../api/user'
import useAuth from '../../hooks/useAuth'
import { formStyle } from '../../styles'


export default function ChangeName() {

    const [loading, setLoading] = useState(false);
    const { auth } = useAuth();
    const navigation = useNavigation();

    useFocusEffect(
        useCallback(
            () => {
                (async () => {
                    const response = await getMeApi(auth.token)

                    if (response.name && response.lastname) {
                        await formik.setFieldValue('name', response.name)
                        await formik.setFieldValue('lastname', response.lastname)
                    }
                })()
            },
            [],
        )
    )



    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true)
            try {

                await updateUserApi(auth, formData)
                Alert.alert("Gracias Fumeta", "Nombre y Apellido Actualizados", [
                    { text: 'Buenos Humos' }])
                navigation.goBack();

            } catch (error) {
                Alert.alert("¿Estas Fumado? :D", "Ingresa Tu Usuario O Contraseña De Nuevo", [
                    { text: 'Buenos Humos' }])
                setLoading(false)
            }

        }

    });
    return (
        <View style={styles.container} >
            <TextInput
                label='Nombre'
                style={formStyle.input}
                onChangeText={(text) => { formik.setFieldValue('name', text) }}
                value={formik.values.name}
                error={formik.errors.name}
            />
            <TextInput
                label='Apellidos'
                style={formStyle.input}
                onChangeText={(text) => { formik.setFieldValue('lastname', text) }}
                value={formik.values.lastname}
                error={formik.errors.lastname}
            />

            <Button
                mode='contained'
                style={formStyle.btnSuccess}
                onPress={formik.handleSubmit}
                loading={loading}
            >
                cambiar Nombre Y apellidos
            </Button>
        </View>
    )
}

function initialValues() {

    return {
        name: "",
        lastname: "",
    }
}

function validationSchema() {

    return {
        name: Yup.string().required(true),
        lastname: Yup.string().required(true),

    }
}

const styles = StyleSheet.create({

    container: {
        padding: 20
    }

})

