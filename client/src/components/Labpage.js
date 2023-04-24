import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import Achievements from './achievements/Achievements';
import Projects from './projects/Projects';
import CommonLanding from './commonpages/CommonLanding';
import CommonNavbar from './commonpages/CommonNavbar';



const Labpage = () => {


  return (

    <>
      <section id='labhome-section'>
        <CommonNavbar />
        <CommonLanding />
      </section>

      <Achievements />
      <Projects />

    </>
  )
}

export default Labpage