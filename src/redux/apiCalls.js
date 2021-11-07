import { publicRequest } from "../requestMethods";
import { loginFailure, loginStart, loginSuccess } from "./userRedux"

export const login = async ( dispatch, user ) => {                      // Función que controla el login de un user, usa el dispatch para poder usar 
                                                                        // los métodos del reducer
    dispatch(loginStart());                                             // Bandera de comienzo: true
    try {
        const res = await publicRequest.post("/auth/login", user);      // Petición de logueo al backend con los datos del usuario, 
        dispatch( loginSuccess( res.data ));                            // Establece el estado del usuario logeado (currentUser), bandera: false
    } catch (error) {
        dispatch(loginFailure());                                       // Si hay error bandera: false y state.Error: true
    }
}