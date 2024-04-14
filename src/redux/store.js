import { combineReducers, configureStore } from "@reduxjs/toolkit";
import reducer from "./reducers/rootslice";
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({ root: reducer })
const persistConfig = {
    key: 'root',
    storage,
    version: 1,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
})
export const persistor = persistStore(store)