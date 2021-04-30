import React, { useState, useCallback } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Toast from "react-native-root-toast";
import { getMeApi, updateUserApi } from '../../api/user'
import useAuth from '../../hooks/useAuth'
import color from '../../styles/colors'
import { formStyle } from '../../styles'
export default function ChangeEmail() {

    const { auth } = useAuth();
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation();
    useFocusEffect(
        useCallback(() => {
            (async () => {
                const response = await getMeApi(auth.token);
                await formik.setFieldValue("email", response.email);
            })();
        }, [])
    );

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true);
            try {
                const response = await updateUserApi(auth, formData);
                if (response.statusCode) throw "";
                Alert.alert("¡Buena Suerte!", "Email actualizado", [ { text: 'Buenos Humos' }])   
                navigation.goBack();
            } catch (error) {
                
                Alert.alert("¡Que Mala Suerte!", "Este Email pertenece a otra persona, ¿seguro que es el tuyo?", [ { text: 'Buenos Humos' }])   
                formik.setFieldError("email", true);
            }
            setLoading(false);
        },
    });
    return (
        <View style={styles.container}>
            <TextInput
                label='Email'
                style={formStyle.input}
                onChangeText={(text) => formik.setFieldValue('email', text)}
                value={formik.values.email}
                error={formik.errors.email} />

            <Button
                mode='contained'
                style={formStyle.btnSuccess}
                onPress={formik.handleSubmit}
                loading={loading}
            >
                Cambiar Email
          </Button>
        </View>
    )
}

function initialValues() {

    return {
        email: '',
    }
}

function validationSchema() {

    return {
        email: Yup.string().email(true).required(true)
    };

}

const styles = StyleSheet.create({

    container: {
        padding: 20,
    },

})


