import axios from 'axios';
import React, { useEffect, useState } from 'react';
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
import '../../css/project.css'

const Projects = () => {

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

    const [ref, inView] = useInView();

    const control = useAnimation();
    const boxVariant = {
        visible:{
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
        hidden:{
            opacity: 0, scale: 0.5
        }
    }
    useEffect(() =>{
        if(inView){
            control.start('visible')
        }else{
            control.start('hidden')
        }
    },[control, inView])

    console.log(inView)
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
                        slidesPerView={'auto'}
                        coverflowEffect={{
                            rotate: 0,
                            stretch: 0,
                            depth: 100,
                            modifier: 2.5,
                        }}
                        pagination={{ el: '.swiper-pagination', clickable: true }}
                        navigation={{
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                            clickable: true,
                        }}
                        modules={[EffectCoverflow, Pagination, Navigation]}
                        className="swiper_container"
                    >
                        {data.map((item) => {
                            return (
                                <div 
                                    
                                >
                                    <SwiperSlide>
                                        <motion.div class="blog-post" key={item.id}
                                            initial='hidden'
                                            animate={control}
                                            variants={boxVariant}
                                        >
                                            <img src={`http://localhost:5000/img/${item.pro_image}`} alt="Man" style={{ width: '90%' }} />
                                            <a href="https://youtu.be/SdNaoYS_6Fo" target="_blank" class="category">
                                                {item.labname}
                                            </a>
                                            <div class="text-content">
                                                <h2 class="post-title">
                                                    {item.pro_name}
                                                    {item.pro_desc}
                                                </h2>
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
                                <ion-icon name="arrow-forward-outline"></ion-icon>
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