import React, { useState, useCallback } from 'react'
import { ScrollView, Text, Button } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import StatusBar from '../../components/StatusBarCustom'
import Search from "../../components/Search"
import ScreenLoading from "../../components/ScreenLoading"
import UserInfo from '../../components/Account/UserInfo'
import Menu from '../../components/Account/Menu'
import { getMeApi } from '../../api/user'
import useAuth from '../../hooks/useAuth'
import colors from '../../styles/colors'



export default function Account() {

    const [user, setUser] = useState(null);
    const { auth } = useAuth();


    useFocusEffect(
        useCallback(() => {
            (async () => {
                const response = await getMeApi(auth.token);
                setUser(response);
            })();
        }, [])
    );



    return (
        <>
            <StatusBar backgroundColor={colors.tele_cafeObs} barStyle="light-content" />

            {!user ? (
                <ScreenLoading size='large' />
            ) : (
                <>
                    <Search />
                    <ScrollView>
                        <UserInfo user={user}/>
                        <Menu/>
                    </ScrollView>
                </>
            )}
            
        </>

    )
}

