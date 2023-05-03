import React, { useState, useEffect } from 'react';
import '../../css/lab.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';


const Labs = () => {

    const [labData, setLabData] = useState([]);

    const [trigger, setTrigger] =useState(false);

    const { ref, inView } = useInView()

    const boxVariant = {

        visible: {
            scale:1 , transition: {
                type: "spring",
                duration: 2,
                bounce: 0.6
            }
        },
        hidden: {
            scale:0
        }
    }

    const control = useAnimation();

    useEffect(() => {
        async function fetchData() {
            await axios.get("http://localhost:5000/lablist")
                .then((response) => { setLabData(response.data) })
                .catch((err) => { console.log(err) });
        }
        fetchData();
    }, [])



    useEffect(() => {
        if (inView) {
                control.start("visible")
        } else {
            control.start('hidden')
        }
    }, [control, inView])

    console.log()
    return (
        <section className="category">

            <h1 className="heading" ># INOVATIVE LABS</h1>
            <motion.div className="box-container"
                ref={ref}
                
            >
                {labData.slice(0, 8).map((data) => {

                    return (
                        <Link to={`/labpage/${data.labcode}/#labhome-section`} >
                            <motion.div className="box"
                                initial="hidden"
                                variants={boxVariant}
                                animate={control}
                                
                            >
                                <img src="images/category-1.jpg" alt="" />
                                <h5>{data.labname}</h5> <br /><br /><br />
                                <a href="https://cloud.bitsathy.ac.in" target="_blank" className="btn1">read more</a>
                            </motion.div>
                        </Link>
                    )
                })}
                <Link to={'/alllabs'}>

                    <motion.div className="box"
                        initial="hidden"
                        variants={boxVariant}
                        animate={control}
                    >
                        <img src="./images/circle-arrow-right-solid.svg" alt="" />
                        <p></p>
                        <a href="#" className="btn1">view all labs</a>
                    </motion.div>
                </Link>
            </motion.div>
        </section>
    )
}

export default Labs