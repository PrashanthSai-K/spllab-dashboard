import React from 'react';
import axios from 'axios';
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../../css/lab.css";

const Alllabs = () => {
  
    const [labname, setLabname] = useState("ELLO");

    const [labData, setLabData] = useState([]);

    const hello = async () => {

        try {
            const data = { "labname": labname }

            const req = await axios.post("http://192.168.1.4:5000/upload", data);
            console.log(req);
        } catch (er) {
            console.log(er)
        }

    }

    useEffect(() => {
        async function fetchData() {
            await axios.get("http://localhost:5000/lablist")
                .then((response) => { setLabData(response.data) })
                .catch((err) => { console.log(err) });
        }
        fetchData();
    })


    return (
        <section className="category">

            <h1 className="heading"># INOVATIVE LABS</h1>
            <div className="box-container">
                {labData.map((data) => {

                    return (
                        <Link to={`/labpage/${data.labcode}`}>  
                            <div className="box">
                                <img src="images/category-1.jpg" alt="" />
                                <h5>{data.labname}</h5> <br /><br /><br /> 
                                <a href="https://cloud.bitsathy.ac.in" target="_blank" className="btn1">read more</a>
                            </div>
                        </Link>
                    )
                })}


            </div>

        </section>


    )

}

export default Alllabs