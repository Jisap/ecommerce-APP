import React from 'react'
import styled from 'styled-components'
import { categories } from "../data"
import CategoryItem from './CategoryItem'
import { v4 as uuidv4 } from 'uuid';
import { mobile } from '../responsive';


const Container = styled.div`
    display: flex;
    padding: 20px;
    justify-content: space-between;
    ${mobile({ padding: "0px", flexDirection:"column" })}
`

const Categories = () => {
    return (
        <Container>
            {categories.map( item => (
                <CategoryItem item={ item } key={ uuidv4() }/>
            ))}
        </Container>
    )
}

export default Categories
