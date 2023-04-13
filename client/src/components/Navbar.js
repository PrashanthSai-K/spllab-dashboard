import React from 'react';
import '../css/navbar.css';

const Navbar = () => {

    return (

        <header class="header">
            <a href="#" class="logo"> <i class="fas fa-hikin"></i> Special lab </a>

            <nav class="navbar">
                <div id="nav-close" class="fas fa-times"></div>
                <a href="#home">HOME</a>
                <a href="#about-us">ABOUT US</a>
                {/* <div class="dropdown">
                    <button class="dropbtn">LABS<i class="arrow down"></i></button>
                    <div class="dropdown-content">
                        <a href="/labs/art_design.html">Art and Design</a>
                        <a href="blockchain">Blockchain</a>
                        <a href="cyber-security">cyber security</a>
                        
                    </div>
                </div> */}
                
                <a href="#achievements">ACHIEVEMENTS</a>
                <a href="#media">MEDIA</a>
                <a href="#labs">LABS</a>
                <a href="#contact-us">CONTACT US</a>
            </nav>

            {/* <div class="icons">
                <div id="menu-btn" class="fas fa-bars"></div>
                <div id="search-btn" class="fas fa-search"></div>
            </div> */}

        </header>
    )
}


export default Navbar