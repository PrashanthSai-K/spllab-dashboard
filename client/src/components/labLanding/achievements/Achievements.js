import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Achievements = () => {

  const [data, setData] = useState([]);

  const { id } = useParams();


  useEffect(() => {
    async function fetchdata() {
      await axios.get(`http://localhost:5000/labdata/${id}`)
        .then(response => setData(response.data))
        .catch(error => console.log(error))
      console.log(data)
    }

    fetchdata()
  }, [setData])

  console.log(data)

  return (
    <>
      <br />
      {data.slice(0, 1).map((datas) => {
        return (
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }} >
            <h1># Achievements of {datas.labname}</h1>
            <Link to={`/addachieve/${datas.labcode}`}>
              <button style={{padding:'10px', cursor:'pointer'}}>Add Achievements</button>
            </Link>
          </div>
        )
      })}

      <br />
      {data.map((datas) => {
        return (
          <div key={datas.id}>
            <h1>{datas.labcode}</h1>
            <h2>{datas.comp_name}</h2>
            <h2>{datas.comp_desc}</h2>
            <img src={`http://localhost:5000/img/${datas.comp_image}`} style={{ width: '30%' }} alt="" />
          </div>
        )
      })}
    </>
  )
}

export default Achievements