import React from 'react';
import '../../css/navbar.css';

const Navbar = () => {

    return (

        <header className="header">
            <a href="#" className="logo"> <i className="fas fa-hikin"></i> Special lab </a>

            <nav className="navbar">
                <div id="nav-close" className="fas fa-times"></div>
                <a href="#home">HOME</a>
                <a href="#about-us">ABOUT US</a>
                {/* <div className="dropdown">
                    <button className="dropbtn">LABS<i className="arrow down"></i></button>
                    <div className="dropdown-content">
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

            {/* <div className="icons">
                <div id="menu-btn" className="fas fa-bars"></div>
                <div id="search-btn" className="fas fa-search"></div>
            </div> */}

        </header>
    )
}


export default Navbar