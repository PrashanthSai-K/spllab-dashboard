import React, { useState, useEffect } from 'react';
import '../../css/lab.css';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Labs = () => {

    const [labData, setLabData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            await axios.get("http://localhost:5000/lablist")
                .then((response) => { setLabData(response.data) })
                .catch((err) => { console.log(err) });
        }
        fetchData();
    },[])

    return (
        <section className="category">

            <h1 className="heading"># INOVATIVE LABS</h1>
            <div className="box-container">
                {labData.slice(0,8).map((data) => {

                    return (
                        <Link to={`/labpage/${data.labcode}/#labhome-section`}>  
                            <div className="box">
                                <img src="images/category-1.jpg" alt="" />
                                <h5>{data.labname}</h5> <br /><br /><br /> 
                                <a href="https://cloud.bitsathy.ac.in" target="_blank" className="btn1">read more</a>
                            </div>
                        </Link>
                    )
                })}
                <Link to={'/alllabs'}>

                <div className="box">
                    <img src="./images/circle-arrow-right-solid.svg" alt="" />
                    <p></p>
                    <a href="#" className="btn1">view all labs</a>
                </div>
                </Link>
            </div>
        </section>
    )
}

export default Labs