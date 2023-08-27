import React from "react";
import { Route, Routes } from "react-router-dom";
import { UserContextes } from "../contexts/user";
import { useContext } from "react";

import Login from './Login';
import Product from './Product';

export function AppRouter() {
    const { loged } = useContext(UserContextes)

    if (loged) {
        return (
            <Routes>
                <Route path="/product" element={<Product />} />
            </Routes>
        )
    }

    return (
        <Routes>
            <Route path="" element={<Login />} />
        </Routes>
    )
}
