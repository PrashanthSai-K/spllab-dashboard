import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const ProjectRequest = () => {

    const [data, setData] = useState({  //State object to store the form values
        name: "",
        labcode: "",
        image: null
    });

    //function to handle the form fields on change
    const handleInputChange = (event) => {
        const { name, value, files } = event.target;
        setData({ ...data, [name]: files ? files[0] : value });
    };



    //function to handle the submit and send data to server
    const formSubmit = async (e) => {
        //Form Data object to send the data to server
        const formData = new FormData();
        e.preventDefault();
        formData.append("labcode", data.labcode)
        formData.append("name", data.name);
        formData.append("image", data.image)

        //Posting my data to server via axios 
        //Using try catch to catch any exception error
        try {
            const res = await axios.post("http://localhost:5000/addprojects", formData);
            console.log(res)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <form encType='multipart/form-data' onSubmit={formSubmit}>
                <label htmlFor="labcode">Labcode</label>
                <input type="text" htmlFor="labcode" onChange={handleInputChange} name="labcode" value={data.labcode} />
                <label htmlFor="name">Projects Name</label>
                <input type="text" htmlFor="name" onChange={handleInputChange} name="name" value={data.name} />
                <label htmlFor="image">Image</label>
                <input type="file" name='image' onChange={handleInputChange} />
                <button type='submit' style={{ width: '100px', height: "30px", backgroundColor: 'red' }}></button>
            </form>
        </>
    )
}

export default ProjectRequest