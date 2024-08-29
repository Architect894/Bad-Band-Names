import React, { useState, useEffect } from 'react';
import DisplayAllBands from '../components/DisplayAllBands';
import CreateBand from '../components/CreateBand';



const HomePage = () => {
    const [bandList, setBandList] = useState([]);

    return (
        <>
            <DisplayAllBands bandList = {bandList} setBandList = {setBandList}/>
        </>
)}

export default HomePage;