import React, { useState } from 'react'
import { StyleSheet, View, Keyboard, Animated } from 'react-native'
import { Searchbar } from 'react-native-paper'
import { useNavigation } from "@react-navigation/native"
import {
    AnimatedIcon,
    inputAnimationWidth,
    inputAnimation,
    animatedTransition,
    animatedTransitionReset,
    arrowAnimation
}
    from '../Search/SearchAnimation'
import {updateSearchHistoryApi } from '../../api/search'
import SearchHistoy from './SearchHistoy'
import colors from '../../styles/colors'

export default function Search() {

    const [searchQuery, setSearchQuery] = useState('')
    const [showHistory, setShowHistory] = useState(false)
    const [containerHeight, setContainerHeight] = useState(0)
    const navigation = useNavigation();

    const onChangeSearch = (query) => setSearchQuery(query);

    const openSearch = () => {

        animatedTransition.start();
        setShowHistory(!showHistory);
    }

    const closeSearch = () => {
        animatedTransitionReset.start();
        Keyboard.dismiss();
        setShowHistory(!showHistory);
    }

    const onSearch = async () => {
        closeSearch();

        await updateSearchHistoryApi(searchQuery);

        navigation.push('search', {
            search: searchQuery
        })
    }

    return (
        <View style={styles.container}
            onLayout={(e) => { setContainerHeight(e.nativeEvent.layout.height) }}
        >


            <View style={styles.containerInput}>
                <AnimatedIcon
                    name="arrow-left"
                    size={20}
                    style={[styles.backArrow, arrowAnimation]}
                    onPress={closeSearch}

                />
                <Animated.View style={[inputAnimation, { width: inputAnimationWidth }]}>
                    <Searchbar placeholder="Busca Tu Producto" value={searchQuery} onFocus={openSearch} onChangeText={onChangeSearch} onSubmitEditing={onSearch} />
                </Animated.View>

            </View>
            <SearchHistoy showHistory={showHistory} containerHeight={containerHeight} />
        </View>
    )
}


const styles = StyleSheet.create({

    container: {

        backgroundColor: colors.tele_cafeObs,
        paddingVertical: 10,
        paddingHorizontal: 20,
        zIndex: 1,
    },
    containerInput: {
        position: 'relative',
        alignItems: 'flex-end',
    },
    backArrow: {
        position: 'absolute',
        left: 0,
        top: 15,
        color: colors.fontLight
    }
})