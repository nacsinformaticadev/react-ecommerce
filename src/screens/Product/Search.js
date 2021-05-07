import React, { useState, useEffect } from 'react'
import { size } from 'lodash'
import StatusBar from '../../components/StatusBarCustom'
import Search from '../../components/Search'
import ScreenLoading from '../../components/ScreenLoading'
import ResultNotFound from '../../components/Search/ResultNotFound'
import ProductList from '../../components/Search/ProductList'
import { searchProductsApi } from '../../api/search'
import color from '../../styles/colors'
import colors from '../../styles/colors'


export default function SearchScreen(props) {

    const { route } = props;
    const { params } = route;
    const [products, setProducts] = useState(null)

    useEffect(() => {

        (async () => {
            setProducts(null);
            const response = await searchProductsApi(params.search)
            setProducts(response)
        })()


    }, [params.search])
    return (
        <>
            <StatusBar backgroundColor={colors.tele_cafeObs} barStyle='light-content' />
            <Search currentSearch={params.search} />
            {!products ? (
                <ScreenLoading text="Buscando Productos"/>
            ) : size(products) === 0 ? (
                <ResultNotFound search={params.search}/>
            ) : (
                <ProductList products={products} />
            )}
        </>
    )
}
