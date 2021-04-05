import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Toast from 'react-native-root-toast';
import { registerApi } from '../../api/user';
import { formStyle } from "../../styles";
export default function RegisterForm(props) {

    const { changeForm } = props;
    const [loading, setLoading] = useState(false)
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true);
            try {
                await registerApi(formData);
                changeForm();
            } catch (e) {
                setLoading(false);
                Alert.alert("Error Fumeta", "Error al Registrar Usuario Intente Nuevamente", [
                    { text: 'Buenos Humos' }
                ])
                Toast.show("Error Al Registrar Revisa Tus Datos", {
                    position: Toast.positions.CENTER
                })
                setLoading(true);
            }
        }
    })

    return (
        <View>
            <TextInput
                label='Email'
                style={formStyle.input}
                onChangeText={(text) => { formik.setFieldValue('email', text) }}
                value={formik.values.email}
                error={formik.errors.email}
            />
            <TextInput
                label='Nombre De Usuario'
                style={formStyle.input}
                onChangeText={(text) => { formik.setFieldValue('username', text) }}
                value={formik.values.username}
                error={formik.errors.username}
            />

            <TextInput
                label='Contrase;a'
                style={formStyle.input}
                secureTextEntry
                onChangeText={(text) => { formik.setFieldValue('password', text) }}
                value={formik.values.password}
                error={formik.errors.password}
            />
            <TextInput
                label='Repetir Contrasena'
                style={formStyle.input}
                secureTextEntry
                onChangeText={(text) => { formik.setFieldValue('repeatPassword', text) }}
                value={formik.values.repeatPassword}
                error={formik.errors.repeatPassword}
            />
            <Button mode='contained' style={formStyle.btnSuccess} onPress={formik.handleSubmit} loading={loading}>
                Registrarse
            </Button>
            <Button onPress={changeForm} mode='text' style={formStyle.btnText} labelStyle={formStyle.btnTextLabel}>
                Iniciar Sesion
            </Button>
        </View>


    )
}

function initialValues() {

    return {
        email: '',
        username: '',
        password: '',
        repeatPassword: '',
    }
}

function validationSchema() {

    return {
        email: Yup.string().email(true).required(true),
        username: Yup.string().required(true),
        password: Yup.string().required(true),
        repeatPassword: Yup.string()
            .required(true)
            .oneOf([Yup.ref("password")], true),
    }

}