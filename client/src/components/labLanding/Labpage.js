import React, { useRef } from 'react';
import Achievements from './achievements/Achievements';
import Projects from './projects/Projects';
import CommonLanding from './LabLanding';
import CommonNavbar from './LabNavbar';



const Labpage = () => {


  return (

    <>
      <section id='labhome-section'>
        <CommonNavbar />
        <CommonLanding />
      </section>

      <Achievements />
      {/* <Projects /> */}

    </>
  )
}

export default Labpage