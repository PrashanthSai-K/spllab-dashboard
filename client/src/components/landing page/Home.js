import React, { useEffect } from 'react';
import '../../css/home.css';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useAnimation } from 'framer-motion';

const Home = () => {

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
    useEffect(()=>{
        if(inView){
            control.start('visible')
        }else{
            control.start('hidden')
        }
    }, [control,inView])


    return (


        <motion.div class="main-container"
            ref={ref}
            initial="hidden"
            variants={boxVariant}
            animate={control}
        >
            <center>
                <div class="home-container" style={{ background: "url(./images/bit.jpg)", backgroundSize: "100%", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
                    <div class="home-content1">Welcome!!</div>
                    <div class="home-content2">Special Laboratory</div>
                    <div class="home-content3">BIT Special Laboratories provide a platform for students to learn, practice, and innovate on the globally sought after skills, beside product development. BIT Special Laboratories established over-and-over the regular labs mandated by the University / AICTE, trains students to participate in internationally reputed competitions.</div>
                    <motion.div
                        whileTap={{ scale: 0.75 }}
                    ><button class="home-button">Explore</button></motion.div>
                </div>
            </center>


        </motion.div >
    )
}

export default Home