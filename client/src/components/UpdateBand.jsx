import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';


const UpdateBand = (props) => {
    // Calling id from app.jsx from the routes
    const {id} = useParams();
    const [name, setName] = useState("");
    const [gigRate, setGigRate] = useState("");
    const [achievements, setAchievements] = useState("");
    const [errors, setErrors] = useState({})

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/findOneBand/${id}`)
        .then((res) => {
            console.log(res);
            console.log(res.data);
            setName(res.data.name)
            setGigRate(res.data.gigRate)
            setAchievements(res.data.achievements)
        })
        .catch ((err) => {
            console.log(err);
        })

    }, [id])


    const submitHandler = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/updateBand/${id}`, {
            name,
            gigRate,
            achievements
        })
        .then((res) => {
            console.log(res);
            console.log(res.data)
            navigate(`/band/${id}`)
        })
        .catch ((err) => {
            console.log(err);
            setErrors(err.response.data.errors)
        })
    }

    return (

        // UPDATE FORM

        <div className='update-form'>
            <Link to={"/displayAllBands"}><button className='home-btn'>Home</button></Link>
            <Link to={`/band/${id}`}><button className='details-btn'>Band Details</button></Link>
            <h2>Update Band</h2>
            <form onSubmit={submitHandler}>

                <div className='form-fields'>
                    <label>Name: </label>
                    <input type="text" onChange={(e) => setName(e.target.value)} value={name}/>
                    {
                    errors.name?
                    <p className='errors'>{errors.name.message}</p>:
                    null
                }
                </div>

                <br/>

                <div className='form-fields'>
                    <label>Gig Rate: </label>
                    <input type="number" onChange={(e) => setGigRate(e.target.value)} value={gigRate}/>
                    {
                    errors.gigRate?
                    <p className='errors'>{errors.gigRate.message}</p>:
                    null
                }
                </div>

                <br/>

                <div className='form-fields'>
                <label>Achievements: </label>
                    <textarea rows="4" cols="50" onChange={(e) => setAchievements(e.target.value)} value={achievements}/>
                    {
                    errors.achievements?
                    <p className='errors'>{errors.achievements.message}</p>:
                    null
                }
                </div>

                <br/>

                <button className='submit-btn'>Update Band!</button>

            </form>

        </div>
    )
}

export default UpdateBand;