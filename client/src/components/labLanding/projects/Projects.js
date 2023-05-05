import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useAnimation } from 'framer-motion';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { EffectCoverflow, Pagination, Navigation } from 'swiper';
import '../../../css/project.css'

const Projects = () => {


    //To handle slides preview for different sizes
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    const handleResize = () => {
        setScreenWidth(window.innerWidth);
    }

    const slidePreview = screenWidth < 768 ? '1' : 2.5;
    const offset = null;

    //To handle auto click event for swiper

    const divRef = useRef(null);

    useEffect(() => {
        const intervalId = setInterval(() => {
          divRef.current.click();
        }, 3000);
    
        return () => clearInterval(intervalId);
      }, []);

    //To get Data for projects 
    const { id } = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        async function getdata() {
            await axios.get(`http://localhost:5000/labproject/${id}`)
                .then(response => setData(response.data))
                .catch(error => console.log(error))
        }
        getdata()
    }, [])

    console.log(data)
    //To use Animation
    const [ref, inView] = useInView();

    const control = useAnimation();
    const boxVariant = {
        visible: {
            opacity: 1, scale: 1,
            duration: {
                duration: 0.3,
                ease: [0, 0.71, 0.2, 1.01],
                scale: {
                    type: "spring",
                    damping: 5,
                    stiffness: 100,
                    restDelta: 0.001
                }
            }
        },
        hidden: {
            opacity: 0, scale: 0.5
        }
    }
    useEffect(() => {
        if (inView) {
            control.start('visible')
        } else {
            control.start('hidden')
        }
    }, [control, inView])


    return (
        <>
            <br />
            <center><h1># Projects of Cloud Computing Laboratory</h1></center>
            <br />
            <center>
                <motion.div className='pro-cont' ref={ref}>
                    {data.length > 0 && (<Swiper
                        effect={'coverflow'}
                        grabCursor={true}
                        centeredSlides={true}
                        loop={true}
                        slidesPerView={slidePreview}
                        
                        coverflowEffect={{
                            rotate: 0,
                            stretch: 0,
                            depth: 100,
                            modifier: 2.5,
                        }}
                        breakpoints={{
                            600: { // set the breakpoint at 768px screen width
                                slidesPerView: 'auto' // set the number of slides per view for smaller screens
                            }
                        }}
                        pagination={{ el: '.swiper-pagination', clickable: true }}
                        navigation={{
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                            clickable: true,
                        }}
                        modules={[EffectCoverflow, Pagination, Navigation]}
                        // className="swiper_container"
                    >
                        {data.map((item) => {
                            return (
                                <div>
                                    <SwiperSlide>
                                        <motion.div class="project-card" key={item.id}
                                            initial='hidden'
                                            animate={control}
                                            variants={boxVariant}
                                            style={{backgroundImage:`url(http://localhost:5000/img/${item.pro_image})`, backgroundSize:'cover', backgroundPosition:'center'}}
                                        >
                                            <div className="lab-heading">{item.labname}</div>

                                            <div class="project-content">
                                                <div>
                                                    {item.pro_name}
                                                    {item.pro_desc}
                                                </div>
                                                <div class="tags">
                                                    <a href="" target="_blank" >#achieve</a>
                                                    <a href="" target="_blank" >#more</a>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </SwiperSlide>
                                </div>
                            )
                        })}

                        <div className="slider-controler">
                            <div className="swiper-button-prev slider-arrow">
                                <ion-icon name="arrow-back-outline"></ion-icon>
                            </div>
                            <div className="swiper-button-next slider-arrow">
                                <ion-icon ref={divRef} name="arrow-forward-outline"></ion-icon>
                            </div>
                            <div className="swiper-pagination"></div>
                        </div>
                    </Swiper>)}

                </motion.div>
            </center>
        </>
    )
}

export default Projects