import React, { useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../../../css/achievements.css';
import Tilt from "react-parallax-tilt";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/react-splide/css'




const Achievements = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  const [data, setData] = useState([]);

  const { id } = useParams();

  const [options, setOptions] = useState({
    perPage: screenWidth > 700 ? (screenWidth < 1100 ? 2 : 3) : 1,
    rewind: true,
    arrows: false,
    autoplay: true,
    interval: 2000,
    type: 'slide',
    perMove: 1,
    direction: 'ltr',
    width: screenWidth > 700 ? (screenWidth < 1300 ? '100vw' : '85vw') : '100vw',
    gap: 1,
    infinity:true,
  })


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
      {data.slice(0,1).map((datas)=>{
        return (
          <div className="achiements-header">
            <div className="achievements-heading">
              # Achievements of {datas.labname} Laboratory
            </div>
            <Link to={`/addachieve/${datas.labcode}`}>
              <button className="addachieve-button fourth">
                Add Achievements
              </button>
            </Link>
          </div>
        ); 
      })}
      

      <div class="achievements-container" >
        <Splide
          options={options}
        >
          {data.map((datas) => {
            return (
              <SplideSlide>
                <Tilt>
                  <div class="achievements-card" data-tilt data-tilt-max="15" data-tilt-speed="400" data-tilt-perspective="500" key={datas.id} >
                    <img src={`http://localhost:5000/img/${datas.comp_image}`} alt='alter_img'/>
                    <div class="achievements-content">
                      <h2>{datas.comp_name}</h2>
                      <p>{datas.comp_desc}
                      </p>
                    </div>
                  </div>
                </Tilt>
              </SplideSlide>
            )
          })}
        </Splide>
      </div>
    </>
  )
}
export default Achievements