import React from 'react';
import '../../css/home.css';

const Home = () => {
    return (
        

        <section className="home" id="home">

        <div className="swiper home-slider">
        
            <div className="swiper-wrapper">
        
                <div className="swiper-slide">
                    <div className="box" style={{background: 'url(images/home-bg-1.jpg)'}}>
                        <div className="content">
                            <span>Ticketing system</span>
                            <h3>Cloud Computing</h3>
                            <p>Ticketing System provides a bridge to solve problems of the students in and around the campus</p>
                            <a href="#" className="btn">read more</a>
                        </div>
                    </div>
                </div>
        
                </div>
        
        </div>
        </section>
    )
    }

export default Home