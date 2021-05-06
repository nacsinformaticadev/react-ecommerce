import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Dimensions, TouchableWithoutFeedback } from 'react-native'
import { map } from 'lodash'
import { getSearchHistoryApi } from '../../api/search'
import colors from '../../styles/colors'

export default function SearchHistoy(props) {

    const { showHistory, containerHeight } = props;
    const [history, setHistory] = useState(null)

    useEffect(() => {
        if (showHistory) {
            (async () => {
                const response = await getSearchHistoryApi()
                setHistory(response);
            })()
        }
    }, [showHistory])

    return (
        <View style={[showHistory ? styles.history : styles.hiden, { top: containerHeight }]}>
            {history &&
                map(history, (item, index) => (
                    <TouchableWithoutFeedback
                        key={index}
                        onPress={() => console.log(item.search)}>
                        <View>
                            <Text>{item.search}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({

    hiden: {
        display: 'none'
    },
    history: {
        position: 'absolute',
        backgroundColor: colors.bglight,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
})