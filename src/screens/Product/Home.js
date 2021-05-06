import React from 'react'
import {ScrollView} from 'react-native'
import StatusBar from '../../components/StatusBarCustom'
import Search from '../../components/Search'
import NewProducts from '../../components/Home/NewProducts'
import Banner from '../../components/Home/Banner'
import colors from '../../styles/colors'

export default function Home() {
    return (
        <>
            <StatusBar backgroundColor={colors.tele_cafeObs} barStyle='light-content' />
            <Search/>
            <ScrollView>
                <Banner/>
                <NewProducts/>
            </ScrollView>
        </>
    )
}


