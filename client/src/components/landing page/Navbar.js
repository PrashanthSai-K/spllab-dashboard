import React, { useState, createContext, useEffect } from 'react';
import '../../css/navbar.css';
import axios from 'axios';
import { useGoogleOneTapLogin, GoogleLogin } from '@react-oauth/google';
import Cookies from 'js-cookie';


export const MyContext = createContext();

const Navbar = (props) => {



    const [role, setRole] = useState();

    const googleLogin = (response) => {
        const token = response.credential
        console.log(token)
        axios.get('http://localhost:5000/login', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            const role = res.data;
            window.location.reload();
            Cookies.set('session', role, { expires: 1 });
        })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        setRole(Cookies.get('session'))
    })

    const logout = () => {
        Cookies.remove('session')
        window.location.reload();
    }

    return (

        <header className="header">
            <a href="/home" className="logo"> <i className="fas fa-hikin"></i> Special lab </a>

            <nav className="navbar">
                <div id="nav-close" className="fas fa-times"></div>
                <a href="#home">HOME</a>
                <a href="#about-us">ABOUT US</a>
                <a href="#achievements">ACHIEVEMENTS</a>
                {
                    role == 'admin' || role == 'user' ?
                        <a style={{ display: '', marginLeft: '20%' }} onClick={logout}>Logout</a> :
                        <a href="" >
                            <GoogleLogin

                                onSuccess={googleLogin}
                                onError={(err) => console.log(err)}
                                buttontext='Login'
                            /></a>
                }
            </nav>
        </header>
    )
}


export default Navbar