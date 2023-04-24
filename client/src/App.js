import { useState, useEffect, useContext } from 'react';
import './App.css';
import axios from 'axios';

import { Routes, Route } from 'react-router-dom';
import Main from './components/landing page/Main';
import Labpage from './components/Labpage';
import Pagenot from './components/errors/Pagenot';
import AchieveReuest from './components/achievements/AchieveReuest';
import ProjectRequest from './components/projects/ProjectRequest';
import { MyContext } from './components/landing page/Navbar';
import Cookies from 'js-cookie';



function App() {



  return (

    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path='/labpage/:id' element={<Labpage />} />


        <Route
          path='/addachieve'
          element={
            <Incharge>
              <AchieveReuest />
            </Incharge>} />

        <Route path='/addprojects' element={<ProjectRequest />} />
        <Route path="*" element={<Pagenot />} />
      </Routes>
    </>
  );
}

export default App;



function Incharge({children}) {
  const [role, setRole] = useState();

  useEffect(()=>{
    setRole(Cookies.get('session'))
  })

  console.log(role)

  if (role == 'admin'){

    return <>{children}</>
  }else{
    return "not authorised"
  }

}

