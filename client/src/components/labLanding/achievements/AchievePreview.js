import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const AchievePreview = () => {

    const { id } = useParams();

    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            await axios.get(`http://localhost:5000/achievePreview/${id}`)
                .then((response) => setData(response.data))
                .catch(err => console.log(err))
        }
        fetchData();
    },[data])


    return (

        <div>AchievePreview {data.map((datas) => {
            return (
                <>
                    <div>{datas.labname}</div>
                    <div>{datas.comp_name}</div>
                    <img src={`http://localhost:5000/img/${datas.comp_image}`} alt="" style={{width:'20%'}}/>
                </>
            )
        })}</div>

    )
}

export default AchievePreview