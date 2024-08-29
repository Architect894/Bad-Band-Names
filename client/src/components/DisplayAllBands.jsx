import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';


const DisplayAllBands = (props) => {
    const {bandList, setBandList} = props;

    useEffect(() => {
        axios.get("http://localhost:8000/api/findAllBands")
        .then ((res) => {
            console.log(res)
            console.log(res.data)
            setBandList(res.data)
        })
        .catch ((err) => {
            console.log(err);
        })
}, [])

    return(

        <div>
            
            <Link to={"/createBand"}><button className='admit-btn'>Create Band</button></Link>
            <Link to={"/"}><button className='logout-btn'>Logout</button></Link>
            <h2>
                All Bands:
            </h2>
            {
                bandList.map((band, index) => (
                    // Getting band by _id
                    <div className='display-all-bx' key={band._id}>
                        <Link to={`/band/${band._id}`}>{band.name}</Link>
                        <p>Gig Rate: {band.gigRate}</p>
                        <p>Achievments: {band.achievements}</p>
                        <Link to={`/band/${band._id}/edit`}><button className='edit-btn'>Edit</button></Link>
                    </div>
                ))

            }
        </div>
    )
}

export default DisplayAllBands;