import React from 'react';
import '../css/home.css';

const Home = () => {
    return (
        

        <section class="home" id="home">

        <div class="swiper home-slider">
        
            <div class="swiper-wrapper">
        
                <div class="swiper-slide">
                    <div class="box" style={{background: 'url(images/home-bg-1.jpg)'}}>
                        <div class="content">
                            <span>Ticketing system</span>
                            <h3>Cloud Computing</h3>
                            <p>Ticketing System provides a bridge to solve problems of the students in and around the campus</p>
                            <a href="#" class="btn">read more</a>
                        </div>
                    </div>
                </div>
        
                </div>
        
        </div>
        </section>
    )
    }

export default Home