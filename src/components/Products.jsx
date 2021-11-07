import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
//import { popularProducts } from '../data'
import Product from './Product'
import axios from "axios";

const Container = styled.div`
    padding: 20px;
    display: flex; 
    flex-wrap: wrap;
    justify-content: space-between;
`

const Products = ({ cat, filters, sort }) => {
   
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    
    useEffect(() => { // Productos según categoría
        const getProducts = async() => {
            try {
                const res = await axios.get( 
                    cat
                        ? `http://localhost:5000/api/products?category=${cat}`
                        : "http://localhost:5000/api/products"
                );
                setProducts(res.data);
            } catch (err) {
                console.log(err)
            }
        }
        getProducts()
    },[cat]);

    useEffect(() => { // Productos según filtros
        cat && 
            setFilteredProducts(
                products.filter((item) =>                          //Filter crea un array que cumpla la condición y every determina si los elem del array 
                //[["key","value"]]  {key:'value'}                   cumplen una condición 
                    Object.entries(filters).every(([key,value]) => // Aquí convertimos un {} en un [] y vemos si cumple una condición
                        item[key].includes(value)                  // Se observa si cada item de products tiene
                    )                                              // una key(color) con el valor seleccionado (rojo) por ejemplo.
                )                                
            )                                        
    },[products, cat, filters ]);

    useEffect(() => {
        if(( sort === "newest" )){
            setFilteredProducts(
                (prev) => [...prev].sort(( a, b ) => a.createdAt - b.createdAt) // sort(a,b) compara los elementos según una condición
            );                                                                  // Si la condición < 0, a tendrá un índice menor que b
        }else if ((sort === "asc")){
            setFilteredProducts(
                (prev) => [...prev].sort(( a, b ) => a.price - b.price )        // Lo mismo para los precios
            )
        }else {
            setFilteredProducts(
                (prev) => [...prev].sort(( a, b ) => b.price - a.price )        // Lo contrario para orden descendente.
            )
        }
        
    }, [sort]);

    return (
        <Container>
            { cat
                ? filteredProducts.map( item => <Product item={ item } key={ item._id }/>)
                : products
                    .slice(0, 8)
                    .map((item) => <Product item={item} key={item._id} />)}
        </Container>
    )
}

export default Products
