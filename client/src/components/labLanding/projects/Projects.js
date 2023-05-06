import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useAnimation } from "framer-motion";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import styled from "styled-components";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { EffectCoverflow, Pagination, Navigation } from "swiper";
import "../../../css/project.css";

const Projects = () => {
  //To handle slides preview for different sizes
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

  const slidePreview = screenWidth < 768 ? "1" : 2.5;
  const offset = null;

  //To get Data for projects
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getdata() {
      await axios
        .get(`http://localhost:5000/labproject/${id}`)
        .then((response) => setData(response.data))
        .catch((error) => console.log(error));
    }
    getdata();
  }, []);

  console.log(data);
  //To use Animation
  const [ref, inView] = useInView();

  const control = useAnimation();
  const boxVariant = {
    visible: {
      opacity: 1,
      scale: 1,
      duration: {
        duration: 0.3,
        ease: [0, 0.71, 0.2, 1.01],
        scale: {
          type: "spring",
          damping: 5,
          stiffness: 100,
          restDelta: 0.001,
        },
      },
    },
    hidden: {
      opacity: 0,
      scale: 0.5,
    },
  };
  useEffect(() => {
    if (inView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [control, inView]);

  const [options, setOptions] = useState({
    perPage: 1,
    rewind: true,
    arrows: true,
    autoplay: true,
    interval: 2000,
    type: "slide",
    perMove: 1,
    direction: "ltr",
    width: "85vw",
    gap: 1,
    infinity: true,
  });

  const StyledSplide = styled(Splide)`
    .splide__arrow--prev {
      margin-right: 100px;
    }
    .splide__arrow--next {
      margin-left: 10px;
    }
  `;

  console.log(data);

  return (
    <>
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
        }}
      >
        {data.slice(0, 1).map((datas) => {
          return (
            <>
              <h1># Projects of {datas.labname} Laboratory</h1>;
              <Link to={`/addproject/${datas.labcode}`} key={datas.id}>
                <button className="addachieve-button fourth">
                  Add Projects
                </button>
              </Link>
            </>
          );
        })}
      </div>
      <br />
      <div
        style={{ position: "relative", height: "auto", width: "100vw" }}
      ></div>
      <div className="project-main-container">
        <center>
          <Splide options={options}>
            {data.map((datas) => {
              return (
                <>
                  <SplideSlide>
                    <div className="project-card">
                      <img
                        src={`http://localhost:5000/img/${datas.pro_image}`}
                        alt=""
                        style={{
                          objectFit: "cover",
                          height: "  30%",
                          width: "auto",
                          aspectRatio: "3/2",
                        }}
                      />
                      <div className="project-heading">{datas.pro_name}</div>
                    </div>
                  </SplideSlide>
                </>
              );
            })}
          </Splide>
        </center>
      </div>
    </>
  );
};

export default Projects;
