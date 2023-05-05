import React, { useState, createContext, useEffect } from 'react';
import '../../css/navbar.css';
import axios from 'axios';
import { useGoogleOneTapLogin, GoogleLogin } from '@react-oauth/google';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import jwtDecode from 'jwt-decode';






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
            window.location.reload()
            Cookies.set('session', role);   
        })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        const accessToken = Cookies.get('session')
        if (accessToken){
            try{
                const userRole = jwt_decode(accessToken)

                setRole(userRole.roollee);
            }catch(err) {
                if(err){
                    setRole("invalid User")
                }
            }
            
        }else{
            setRole('not logged in')
        }
        
    },[])


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
                        <li style={{ display: '', cursor: 'pointer', listStyle:'none', marginTop:'5px', fontSize:'25px' }} onClick={logout}>Logout</li> :
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