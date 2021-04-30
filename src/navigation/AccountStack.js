import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Account from "../screens/Account/Account"
import ChangeName from '../screens/Account/ChangeName'
import ChangeEmail from '../screens/Account/ChangeEmail'
import ChangeUserName from '../screens/Account/ChangeUserName'
import ChangePassword from '../screens/Account/ChangePassword'
import Addresses from '../screens/Account/Addresses'
import AddAddress from '../screens/Account/AddAddress'
import colors from '../styles/colors'

const Stack = createStackNavigator();


export default function AccountStack() {
    return (

        <Stack.Navigator
            screenOptions={{

                headerTintColor: colors.tele_verdeClaro,
                headerStyle: { backgroundColor: colors.tele_cafeObs },
                cardStyle: {
                    backgroundColor: colors.bglight,
                },
            }}
        >
            <Stack.Screen
                name="account"
                component={Account}
                options={{ title: "Cuenta", headerShown: false }}
            />
            <Stack.Screen
                name='change-name'
                component={ChangeName}
                options={{ title: "Cambiar Nombre y Apellidos", }}
            />
            <Stack.Screen
                name='change-email'
                component={ChangeEmail}
                options={{
                    title: 'Cambiar Email'
                }}
            />
            <Stack.Screen
                name='change-username'
                component={ChangeUserName}
                options={{
                    title: 'Cambiar UserName'
                }}
            />
            <Stack.Screen
                name='change-password'
                component={ChangePassword}
                options={{
                    title: 'Cambiar Contraseñas'
                }}
            />

            <Stack.Screen
                name='adresses'
                component={Addresses}
                options={{
                    title: 'Mis direcciones',
                }}
            />
            <Stack.Screen
                name='add-address'
                component={AddAddress}
                options={{
                    title: 'Nueva direccion',
                }}
            />


        </Stack.Navigator>
    )
}
