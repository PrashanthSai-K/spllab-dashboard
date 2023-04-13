import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';


const Achievements = () => {

  const [data, setData] = useState([]);

  const { id } = useParams();


  useEffect(() => {
    async function fetchdata() {
      await axios.get(`http://localhost:5000/labdata/${id}`)
        .then(response => setData(response.data))
        .catch(error => console.log(error))
    }
    fetchdata()
  }, [])



  return (
    <>
    <br />
    <h1>Achievements of Cloud Computing Laboratory</h1>
    <br />
      {data.map((datas) => {
        return (
          <div key={datas.id}>
            <h1>{datas.labcode}</h1>
            <h2>{datas.comp_name}</h2>
            <h2>{datas.comp_desc}</h2>
            <h2>{datas.com_image}</h2>
          </div>
        )
      })}
    </>
  )
}

export default Achievements