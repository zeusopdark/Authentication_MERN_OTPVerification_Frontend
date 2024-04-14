import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App";
import { Toaster } from "react-hot-toast"
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux"
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <Provider store={store}>

            <PersistGate loading={null} persistor={persistor}>
                <App />
                <Toaster />
            </PersistGate>

        </Provider>

    </>
);