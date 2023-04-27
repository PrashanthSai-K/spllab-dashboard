import React from 'react';
import "../../css/commonlanding.css";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';

const CommonLanding = () => {

    const [data,setData] = useState([]);

    const {id} = useParams();

    useEffect(()=>{
        async function fetchData(){
            const resp = await axios.get(`http://localhost:5000/labbasicdata/${id}`)
            .catch(err=>console.log(err))
            setData(resp.data)

        }
        fetchData();
    },[setData])

console.log(data)

  return (
    <div class="main-container">
    <center>
        {data.map((datas)=>{
            return(
            <div class="home-container" style={{background:"url(http://localhost:5000/img/2.jpg)", backgroundSize:"100%" ,backgroundRepeat: "no-repeat", backgroundSize:"cover"}}>
            <div class="home-content1">Welcome!!</div>
            <div class="home-content2">{datas.labname}</div>
            <div class="home-content3">{datas.labdesc}</div>
            <button class="home-button">Explore</button>
         </div>
            )
        })}
       
       {/* {data[0].labname} {data[0].labdesc} */}
    </center>
    </div>
  )
}

export default CommonLanding