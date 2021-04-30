import React, {useState} from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import {useNavigation} from '@react-navigation/native'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import useAuth from '../../hooks/useAuth'
import {updateUserApi} from '../../api/user'
import { formStyle } from '../../styles'


export default function ChangePassword() {

    const [loading, setLoading] = useState(false)
    const {auth} = useAuth();
    const navigation = useNavigation();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true)
            try {
                const response = await updateUserApi(auth,formData)
                if (response.statusCode) throw "";
                Alert.alert("¡Buena Suerte!", "Contraseña Actualizada", [ { text: '¡Buenos Humos!' }])
                navigation.goBack();
            } catch (error) {
                Alert.alert("¡Que Mala Suerte!", "Las contraseñas no coinciden", [ { text: 'Volver a intentar' }])
                setLoading(false)
            }



           

        }

    })


    return (
        <View style={styles.container}>
            <TextInput
                label="Nueva contraseña"
                style={formStyle.input}
                onChangeText={(text) => { formik.setFieldValue("password", text) }}
                value={formik.values.password}
                error={formik.errors.password}
                secureTextEntry
            />
            <TextInput
                label="Repetir nueva contraseña"
                style={formStyle.input}
                onChangeText={(text) => { formik.setFieldValue('repeatPassword', text) }}
                value={formik.values.repeatPassword}
                error={formik.errors.repeatPassword}
                secureTextEntry
            />
            <Button
                style={formStyle.btnSuccess}
                mode="contained"
                onPress={formik.handleSubmit}
                loading={loading}
            >

                Cambiar contraseña
            </Button>
        </View>
    )
}

function initialValues() {

    return {
        password: '',
        repeatPassword: '',
    }
}

function validationSchema() {

    return {
        password: Yup.string().min(4,true).required(true),
        repeatPassword: Yup.string().min(4,true)
            .oneOf([Yup.ref("password")], true).required(true),
    }
}

const styles = StyleSheet.create({

    container: {
        padding: 20
    }
})