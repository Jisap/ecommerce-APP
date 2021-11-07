import React from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router'
import styled from 'styled-components'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Newsletter from '../components/Newsletter'
import Products from '../components/Products'
import { mobile } from '../responsive'

const Container = styled.div`

`
const Title = styled.h1`
    margin: 20px;

`
const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
`
const Filter = styled.div`
    margin: 20px;
    ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`
const FilterText = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin-right: 20px;
    ${mobile({ marginRight: "0px" })}
`
const Select = styled.select`
    padding: 10px;
    margin-right: 20px;
    ${mobile({ margin: "10px 0px" })}
`
const Option = styled.option`

`

const ProductList = () => {                         // Página que muestra una lista de productos según categoría

    const location = useLocation();
    const cat = location.pathname.split("/")[2];    // category seleccionada

    const [filters, setFilters] = useState({});     // Estado de los filters, un objeto con el color y la talla
    
    const [sort, setSort] = useState("newest");     // Estado para el ordenamiento de los productos

    const handleFilters = (e) => {                  // Recibe el evento ( color y talla seleccionados )
        const value = e.target.value;               // Definimos el valor seleccionado de color o talla (White, XL)
        setFilters({
            ...filters,                             // Establecemos el estado de filters ( posibles valores anteriores )
            [ e.target.name ]: value                // Asignamos a filters un nuevo elemento seleccionado ( { color:white , talla:XL } )
        })
    }

    return (
        <Container>
            <Navbar />
            <Announcement />
            <Title>{cat}</Title>
            <FilterContainer>
                <Filter>
                    <FilterText>Filter Products:</FilterText>
                    <Select name="color" onChange={ handleFilters }> {/*Cuando el select cambie envia a handleFilters el evento */}
                        <Option disabled >Color</Option>
                        <Option>white</Option>
                        <Option>black</Option>
                        <Option>red</Option>
                        <Option>green</Option>
                        <Option>yellow</Option>
                        <Option>gray</Option>
                    </Select>
                    <Select name="size" onChange={ handleFilters }>
                        <Option disabled >Size</Option>
                        <Option>XS</Option>
                        <Option>S</Option>
                        <Option>M</Option>
                        <Option>L</Option>
                        <Option>XL</Option>
                    </Select>
                </Filter>
                <Filter>
                    <FilterText>Sort Products:</FilterText>
                    <Select onChange={ (e) => setSort( e.target.value ) }> {/* Se establece directamente el estado de sort con una ()=> */}
                        <Option value="newest">Newest</Option>
                        <Option value="asc">Price (asc)</Option>
                        <Option value="desc">Price (desc)</Option>
                    </Select>
                </Filter>
            </FilterContainer>
            <Products cat={cat} filters={filters} sort={sort}/>{/*Los filtros seleccionados se envian a Products */}
            <Newsletter />
            <Footer />
        </Container>
    )
}


export default ProductList
