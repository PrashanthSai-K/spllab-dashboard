import React from 'react';
import '../../css/home.css';

const Home = () => {
    return (
        

        <div class="main-container">
        <div class="header">
           <div class="left-header">Special Lab</div>
           <div class="right-header">
              <li>Home</li>
              <li>Achievements</li>
              <li>Projects</li>
              <li>Media</li>
              <li>Labs</li>
              <li>Contact Us</li>
           </div>
        </div>
        <center>
           <div class="home-container" style={{background:"url(./images/bit.jpg)", backgroundSize:"100%" ,backgroundRepeat: "no-repeat", backgroundSize:"cover"}}>
              <div class="home-content1">Welcome!!</div>
              <div class="home-content2">Special Laboratory</div>
              <div class="home-content3">BIT Special Laboratories provide a platform for students to learn, practice, and innovate on the globally sought after skills, beside product development. BIT Special Laboratories established over-and-over the regular labs mandated by the University / AICTE, trains students to participate in internationally reputed competitions.</div>
              <button class="home-button">Explore</button>
           </div>
        </center>
        
     
     </div>
    )
    }

export default Home