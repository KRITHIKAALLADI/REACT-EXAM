import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Form from './Form';
import Header from './Header/Index';
import View from './View/View';
import ViewIteam from './ViewIteam';
import './App.css';


function App() {
  return (
    <>
      <BrowserRouter>
      <Header/>
        {/* <div className="navigation">
           <Link className='btn' to="view"><button>View</button></Link> 
          <Link className='btn' to="create"><button>ADD</button></Link>
        </div> */}
        <Routes>
          <Route path="/" element={<View />} />                              
          <Route path="/view" element={<View />} />
          <Route path="/view/:id" element={<ViewIteam />} />
          <Route path="/create" element={<Form />} />
          <Route path="/update/:id" element={<Form />} />
        </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;
