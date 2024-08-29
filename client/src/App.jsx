import { useState } from 'react';
import './App.css';
import CreateBand from './components/CreateBand';
import DisplayAllBands from './components/DisplayAllBands';
import DisplayOneBand from './components/DisplayOneBand';
import HomePage from './views/HomePage';
import UpdateBand from './components/UpdateBand';
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const [bandList, setBandList] = useState([]);
  
  return (
    <>
      <h1>Bad Band Names</h1>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/createBand' element={<CreateBand bandList={bandList} setBandList={setBandList} />} />
          <Route path='/band/:id' element={<DisplayOneBand />} />
          <Route path='/band/:id/edit' element={<UpdateBand />} />
          <Route path='/DisplayAllBands' element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
