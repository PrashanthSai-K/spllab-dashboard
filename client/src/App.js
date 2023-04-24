import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

import {Routes, Route} from 'react-router-dom';
import Main from './components/landing page/Main';
import Labpage from './components/Labpage';
import Pagenot from  './components/errors/Pagenot';
import AchieveReuest from './components/achievements/AchieveReuest';
import ProjectRequest from './components/projects/ProjectRequest';
import Alllabs from './components/landing page/Alllabs';

function App() {

  const [file, setFile] = useState();
  const [fileName, setFileName] = useState();

  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  }

  const fileUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append('fileName', fileName);

    try {
      const res = await axios.post("http://localhost:5000/upload", formData);
      console.log(res);
    } catch (er) {
      console.log(er);
    }
  }

  return (
    // <div className="App" >
    //   <form action="" id="form" onSubmit={fileUpload}>
    //     <input type="file" id="file "onChange={saveFile} />
    //     <button type='submit' />

    //   </form>
    // </div>
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path='/labpage/:id' element={<Labpage />}/>
        <Route path='/addachieve' element={<AchieveReuest />} />
        <Route path='/addprojects' element={<ProjectRequest />} />
        <Route path='/alllabs' element={<Alllabs />} />
        <Route path="*" element={<Pagenot />} />
      </Routes>
    </>
  );
}

export default App;
