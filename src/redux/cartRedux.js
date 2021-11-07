import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({ // Objeto que contiene nuestro estado inicial y sus reducers
    name:"cart",
    initialState:{
        products:[],
        quantity: 0,
        total:0, 
    },                                                                          
    reducers:{                                                                  // Los reducers permiten mutar el estado
        addProduct:( state, action ) => {                                       // Estado inicial, información o carga útil -> cantidad, precio, producto                                     
            state.quantity += 1;                                                // Las acciones tienen varias props como type y payload                                  
            state.products.push( action.payload );                              // Introducimos en el []Productos la carga útil del producto
            state.total += action.payload.price * action.payload.quantity;      // El total se añade al rdo de multiplicar el precio * la cantidad
        }
    }
});

export const { addProduct } = cartSlice.actions;    // Exportamos la función reductora que permite añadir productos a nuestro carrito
export default cartSlice.reducer;                   // Exportamos el objeto que controla los reducers de modificación del carrito