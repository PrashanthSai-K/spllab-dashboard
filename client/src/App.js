import { useState, useEffect, useContext } from 'react';
import './App.css';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import Main from './components/landing page/Main';
import Labpage from './components/labLanding/Labpage';
import Pagenot from './components/errors/Pagenot';
import AchieveReuest from './components/labLanding/achievements/AchieveReuest';
import ProjectRequest from './components/labLanding/projects/ProjectRequest';
import Alllabs from './components/landing page/Alllabs';
import { MyContext } from './components/landing page/Navbar';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import AchievePreview from './components/labLanding/achievements/AchievePreview';

function App() {

  useEffect(() => {

    window.scrollTo(0, 0)

    const handleScroll = () => {
      if (window.pageYOffset == 0) {
        window.scrollTo(0, 0); // Scroll to top on pageYOffset === 0
      }
    };

    const handleBeforeUnload = () => {
      window.scrollTo(0, 0); // Scroll to top before page is unloaded
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('scroll', handleScroll); // Remove event listener on component unmount
      window.removeEventListener('beforeunload', handleBeforeUnload); // Remove beforeunload event listener on component unmount
    };
  })

  return (

    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path='/labpage/:id' element={<Labpage />} />
        <Route
          path='/addachieve/:id'
          element={
            <Incharge>
              <AchieveReuest />
            </Incharge>
          }
        />

        <Route
          path='/addproject/:id'
          element={
            <Incharge>
              <AchieveReuest />
            </Incharge>
          }
        />

        <Route
          path='/achievepreview/:id'
          element={
            <Incharge>
              <AchievePreview />
            </Incharge>
          }
        />

        <Route
          path='/projectpreview/:id'
          element={
            <Incharge>
              <AchievePreview />
            </Incharge>
          }
        />

        <Route path='/addprojects' element={<ProjectRequest />} />
        <Route path='/alllabs' element={<Alllabs />} />
        <Route path="*" element={<Pagenot />} />
      </Routes>
    </>
  );
}

export default App;



function Incharge({ children }) {
  const [role, setRole] = useState();

  useEffect(() => {
    const accessToken = Cookies.get('session')
    if (accessToken) {
      try {
        const userRole = jwt_decode(accessToken)
        // console.log(userRole)
        setRole(userRole.roollee);
      } catch (err) {
        if (err) {
          setRole("invalid User")
        }
      }

    } else {
      setRole('not logged in')
    }

  }, [])

  console.log(role)

  if (role == 'admin') {

    return <>{children}</>
  } else {
    return "not authorised"
  }

}

