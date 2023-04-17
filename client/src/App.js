import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Labs from './components/Labs';
import Achievements from './components/Achievements';
import {Routes, Route} from 'react-router-dom';
import Main from './components/Main';
import Labpage from './components/Labpage';
import Pagenot from  './components/Pagenot';

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
    // console.log(file)
    // console.log(fileName)
    // console.log(formData)
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
    //     <input type="file" id="file"onChange={saveFile} />
    //     <button type='submit' />

    //   </form>
    // </div>
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path='/labpage/:id' element={<Labpage />}/>
        <Route path="*" element={<Pagenot />} />
      </Routes>
    </>
  );
}

export default App;
