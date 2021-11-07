import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({ // Objeto que contiene nuestro estado inicial y sus reducers
    name:"user",
    initialState:{
       currentUser: null,
       isFetching: false,
       error: false,
    },                                                                          
    reducers:{                                                                  
        loginStart:( state ) => {   
            state.isFetching = true;                // isFetchin indica si estamos en proceso de logueo, en este caso, si.
        },
        loginSuccess:( state, action ) => {
            state.isFetching = false;               // Cuando el proceso de logueo terminó isFetchin pasa falso
            state.currentUser = action.payload;     // Y establecemos el estado del usuario con la información del action
            localStorage.setItem( "TOKENshop", action.payload.accessToken  )
        },
        loginFailure:( state ) => {
            state.isFetching = false;
            state.error = true;
        }
    }
});

export const { 
    loginFailure,
    loginStart,
    loginSuccess
 } = userSlice.actions;                 // Exportamos las funciónes reductoras que permite loguear un usuario

 export default userSlice.reducer;       // Exportamos el objeto que controla los reducers de logueo