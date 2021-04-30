import React, { useState, useCallback } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Toast from 'react-native-root-toast';
import useAuth from '../../hooks/useAuth'
import { getMeApi, updateUserApi } from '../../api/user'
import { formStyle } from '../../styles'

export default function ChangeUserName() {


    const { auth } = useAuth();
    const [loading, setLoading] = useState(false)
    const navigate = useNavigation();

    useFocusEffect(

        useCallback(() => {

            (async () => {
                const response = await getMeApi(auth.token);
                await formik.setFieldValue('username', response.username)
            })()
        }, [])
    );

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true)

            try {
                const response = await updateUserApi(auth, formData)
                if(response.statusCode) throw ""
                Alert.alert("Exito", "Nombre de usuario actualizado", [ { text: 'Buenos Humos' }])
                navigate.goBack();
            } catch (error) {
                Alert.alert("Que Mala Suerte", "Ese fumado nombre ya esta en uso", [ { text: 'Buenos Humos' }])   
                formik.setFieldError('username', true);
                setLoading(false)
            }

            
        }
    })
    return (
        <View style={styles.content}>
            <TextInput
                label="Nombre De Usuario (minimo 4 caracteres)"
                style={formStyle.input}
                onChangeText={(text) => formik.setFieldValue('username', text)}
                value={formik.values.username}
                error={formik.errors.username}
            />
            <Button
                mode="contained"
                style={formStyle.btnSuccess}
                onPress={formik.handleSubmit}
                loading={loading}
            >

                Cambiar Nombre De Usuario
            </Button>
        </View>
    )
}

function initialValues() {

    return {
        username: '',
    }
}
function validationSchema() {
    return {
        username: Yup.string().min(4).required(true),
    }
}

const styles = StyleSheet.create({

    content: {
        padding: 20,
    }
})