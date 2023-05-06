import React from 'react';
import "../../css/commonnavbar.css";
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import AnchorLink from 'react-anchor-link-smooth-scroll';


const CommonNavbar = () => {


    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (

        <div class="header">
            <div class="left-header">Special Lab</div>
            <div class="right-main-header">
                <div class="right-header">
                    <li>Achievements</li>
                    <li>Projects</li>
                    <li>ContactUs</li>
                </div>
            </div>
        </div >
    )
}

export default CommonNavbar