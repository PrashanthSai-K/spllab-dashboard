import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../css/Project.css";

const Projects = () => {
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

  return (
    <>
      <br />
      <h1>Projects of Cloud Computing Laboratory</h1>
      <br />
      <div className="main-project">
        {data.map((item) => {
          return (
            <div
              key={item.id}
              className="project-card"
              style={{
                background: `url(http://localhost:5000/img/${item.pro_image})`,
                backgroundSize: "100%",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              <div className="overlay">
                <div className="project-card-content">
                  <h1 className="labcode" >{item.labname}
                  <div className="line" ></div>
                  </h1>
                  <h2>{item.pro_name}</h2>
                  <h2 className="project-description">{item.pro_desc}</h2>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Projects;
