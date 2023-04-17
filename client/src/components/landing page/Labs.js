import React, { useState } from 'react';
import '../../css/lab.css';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Labs = () => {

    const [labname, setLabname] = useState("ELLO");

    const hello = async () => {

        try {
            const data = { "labname": labname }

            const req = await axios.post("http://localhost:5000/upload", data);
            console.log(req);
        } catch (er) {
            console.log(er)
        }

    }


    return (
        <section className="category">

            <h1 className="heading"># INOVATIVE LABS</h1>
            <div className="box-container">

                <Link to="/labpage/SLB008">
                    <div className="box">
                        <img src="images/category-1.jpg" alt="" />
                        <h5>CLOUD COMPUTING</h5>
                        <a href="https://cloud.bitsathy.ac.in" target="_blank" className="btn1">read more</a>
                    </div>
                </Link>

                <div className="box">
                    <img src="images/category-2.jpg" alt="" />
                    <h5>CYBER SECURITY</h5>
                    <a href="#" className="btn1">read more</a>
                </div>

                <div className="box">
                    <img src="images/category-2.jpg" alt="" />
                    <h5>ARTIFICIAL INTELLIGENCE</h5>
                    <a href="#" className="btn1">read more</a>
                </div>

                <div className="box">
                    <img src="images/category-4.jpg" alt="" />
                    <h5>BLOCKCHAIN</h5>
                    <a href="#" className="btn1">read more</a>
                </div>

                <div className="box">
                    <img src="images/category-1.jpg" alt="" />
                    <h5>IOT</h5>
                    <a href="#" className="btn1">read more</a>
                </div>

                <div className="box">
                    <img src="images/category-2.jpg" alt="" />
                    <h5>INDUSTRIAL IoT</h5>
                    <a href="#" className="btn1">read more</a>
                </div>

                <div className="box">
                    <img src="images/category-2.jpg" alt="" />
                    <h5>EMBEDDED TECHNOLOGY</h5>
                    <a href="#" className="btn1">read more</a>
                </div>
                <div className="box">
                    <img src="images/category-4.jpg" alt="" />
                    <h5>ROBOTICS & AUTOMATION LAB</h5>
                    <a href="#" className="btn1">read more</a>
                </div>

                <div className="box">
                    <img src="images/category-1.jpg" alt="" />
                    <h5>DATA SCIENCE</h5>
                    <a href="#" className="btn1">read more</a>
                </div>

                <div className="box">
                    <img src="images/category-2.jpg" alt="" />
                    <h5>E-MOBILITY LAB</h5>
                    <a href="#" className="btn1">read more</a>
                </div>

                <div className="box">
                    <img src="images/category-4.jpg" alt="" />
                    <h5>HUMAN CENTERED AI LAB</h5>
                    <a href="#" className="btn1">read more</a>
                </div>

                <div className="box">
                    <img src="./images/circle-arrow-right-solid.svg" alt="" />
                    <p></p>
                    <a href="#" className="btn1">view all labs</a>
                </div>

            </div>

        </section>


    )
}

export default Labs