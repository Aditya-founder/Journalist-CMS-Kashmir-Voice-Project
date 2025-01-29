import {combineReducers , configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userslice'
// import { version } from 'react';
import {persistReducer, persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react
import themeReducer from  './theme/themeslice'

const rootReducer = combineReducers({
    user : userReducer,
    theme : themeReducer
})

const persistConfig = {
    key: 'root',
    storage,
    version:1
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer:persistedReducer,
  middleware : (getDefaultMiddleware) => 
    getDefaultMiddleware({serializableCheck : false}),    
})


export const persistor = persistStore(store);
