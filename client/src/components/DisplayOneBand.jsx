import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';


const DisplayOneBand = (props) => {
    const {id} = useParams();
    const [oneBand, setOneBand] = useState({});
    const navigate = useNavigate();

    useEffect (() => {
        axios.get(`http://localhost:8000/api/findOneBand/${id}`)
        .then((res) => {
            console.log(res)
            console.log(res.data)
            // Clear state with the next line
            setOneBand(res.data);
        })
        .catch ((err) => {
            console.log(err.response.data);
        })

    }, [id])


    const deleteHandler = () => {
        axios.delete(`http://localhost:8000/api/deleteBand/${id}`)
        .then((res) => {
            console.log(res.data)
            navigate('/displayAllBands')
        })
        .catch ((err) => {
            console.log(err.response.data);
        })
    }

    return(
        <div className='displayOne-page'>
            <Link to={"/displayAllBands"}><button className='home-btn'>Home</button></Link>
            <Link to={`/band/updateBand/${id}`}><button className='update-rec-btn'>Update</button></Link>
            <h2 className='displayOne-header'>{oneBand.name}</h2>
            <p>Gig Rate: {oneBand.gigRate}</p>
            <p>Achievements: {oneBand.achievements}</p>
            <button className='delete-btn' onClick={deleteHandler}>Delete Band</button>
        </div>
    )
}

export default DisplayOneBand;