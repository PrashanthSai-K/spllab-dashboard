import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Projects = () => {

    const {id} = useParams();
    const [data, setData] = useState([]);

    useEffect(()=>{
        async function getdata(){
            await axios.get(`http://localhost:5000/labproject/${id}`)
            .then(response => setData(response.data))
            .catch(error=> console.log(error))
        }
        getdata()
    },[])

  return (
    <>
    <br />
    <h1>Projects of Cloud Computing Laboratory</h1>
    <br />
        {data.map((item)=>{
            return(

                <div key={item.id}>  
                    <h1>{item.labcode}</h1>
                    <h2>{item.project_name}</h2>
                    <h2>{item.project_description}</h2>
                    <h2>{item.project_image}</h2>
                </div>
            )
        })}
    </>
  )
}

export default Projects