import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./cartRedux";
import userReducer from "./userRedux";
//yarn add redux-persist
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';                             // Redux persist es una biblioteca que permite guardar la tienda redux 
import storage from 'redux-persist/lib/storage';    // en el almacenamiento local de su navegador. Nos ayuda a mantener el estado 
                                                    // después de la actualización de la página

const persistConfig = {                             // Configuramos el persist que contiene el storage
  key: 'root',
  version: 1,
  storage,                                          // storage es el objeto que almacenará los reducers que queremos que persistan
}

const rootReducer = combineReducers({ user: userReducer, cart: cartReducer });  // Combinamos los reducers en uno solo, rootReducer.

const persistedReducer = persistReducer(persistConfig, rootReducer); // Creamos un reducer persistente con rootReducer

export const store = configureStore({       // El store es el objeto que contiene todo el estado de la aplicación
    reducer: persistedReducer,              // Asignamos el reducer persistente (que contiene todos los reducers) al store
     middleware: (getDefaultMiddleware) =>  // Usamos un middleware que ignorará funciones de redux-toolkit para que no de errores
        getDefaultMiddleware({
            serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore( store ); // Exportamos todo