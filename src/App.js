import React from 'react'
import "./index.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Username from './component/Username'
import Register from './component/Register'
import Recovery from './component/Recovery'
import Password from './component/Password'
import Reset from './component/Reset'
import PageNotFound from './component/PageNotFound'
import Profile from './component/Profile'
const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Username />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/recovery" element={<Recovery />} />
                <Route path="/password" element={<Password />} />
                <Route path="/username" element={<Username />} />
                <Route path="/reset" element={<Reset />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App