import React, {useState} from 'react';
import axios from 'axios'
import {useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';

const CreateBand = (props) => {
    const{bandList, setBandList} = props;

    const [name, setName] = useState("");
    const [gigRate, setGigRate] = useState("");
    const [achievements, setAchievements] = useState("");
    const [errors, setErrors] = useState({})
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault()
        const newBand = {name, gigRate, achievements}
        axios.post("http://localhost:8000/api/createBand", newBand)
            .then((res) => {
                console.log(res)
                console.log(res.data);
                // These next 3 lines will reset the form to empty on refresh or submit
                setName("");
                setGigRate("");
                setAchievements("");
                setErrors({})
                // Using the spread operator(...) to make a copy of everything inside state
                setBandList([...bandList, res.data])
                navigate('/displayAllBands')
            })
            .catch((err) => {
                console.log(err.response.data.errors);
                setErrors(err.response.data.errors)
            })
    }

    return (

        // FORM

        <div className='admit-form'>
            <Link to={"/displayAllBands"}><button className='home-btn'>Home</button></Link>
            <h2>Create Band</h2>
            <form onSubmit={submitHandler}>

                <div className='form-fields'>
                    <label>Band Name: </label>
                    <input type="text" onChange={(e) => setName(e.target.value)} value={name}/>
                    {
                    errors.name?
                    <p className='errors'>{errors.name.message}</p>:
                    null
                }
                </div>

                <br/>

                <div className='form-fields'>
                    <label>Gig Rate: $ </label>
                    <input type="number" onChange={(e) => setGigRate(e.target.value)} value={gigRate}/>
                    {
                    errors.gigRate?
                    <p className='errors'>{errors.gigRate.message}</p>:
                    null
                }
                </div>

                <br/>

                <div className='form-fields'>
                <label>Achievements </label>
                    <textarea rows="4" cols="50" onChange={(e) => setAchievements(e.target.value)} value={achievements}/>
                    {
                    errors.achievements?
                    <p className='errors'>{errors.achievements.message}</p>:
                    null
                }
                </div>

                <br/>

                <button className='submit-btn'>Create Band</button>

            </form>
        </div>
)}

export default CreateBand;