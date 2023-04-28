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


        <div class="header">
            <div class="left-header">Special Lab</div>
            <div class = "right-main-header">
                <div class="right-header">
                    <li>Achievements</li>
                    <li>Projects</li>
                    <li>Labs</li>
                    <li>ContactUs</li>
                    {
                    role == 'admin' || role == 'user' ?
                        <li style={{ display: '', cursor: 'pointer',listStyle:"none" }} onClick={logout}>Logout</li> :
                        <a href="" style={{ height: '10px' }} >
                            <GoogleLogin

                                onSuccess={googleLogin}
                                onError={(err) => console.log(err)}
                                buttontext='Login'
                                useOneTap
                            /></a>
                }
                </div>
                
            </div>
        </div>



    )
}


export default Navbar