import react, { useState, useEffect, Children } from "react";
import axios from 'axios';
import { AuthContext } from "./AuthContext";
import { auth } from "../../../BackEnd/Config/db";

const AuthProvider = ({ Children }) => {
    const [auth, setAuth] = useState({
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null
    })
}

useEffect(() => {
    if (auth.token) {
        axios.defaults.headers.common['Authorization'] = auth.token;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
    setAuth({ ...auth, loading: false });
}, [auth.token]);

const login = async (username, password) => {
    try {
        const res = await axios.post('/api/users/login', { username, password });
        localStorage.setItem('token', res.data.token);
        setAuth({ ...auth, token: res.data.token, isAuthenticated: true, loading: false });

    } catch (error) {
        console.error(error);
    }

};
