import { useState } from 'react'
import {Routes, Route, Link} from "react-router-dom"
import Welcome from './components/Welcome';
import AllStudents from './components/AllStudents'
import AllCampuses from './components/AllCampuses';
import Form from './components/Form';

function App() {
  

  return (
    <div className='flexColumn appContainer'>
      <nav >
        <Link to='/' className='flex'>Home</Link>
        <Link to='/students' className='flex'>Students</Link>
        <Link to='/campuses'className='flex'>Campuses</Link>
      </nav>
      <main className='flexColumn'> 
        <Routes>
          <Route path='/' element={<Welcome />} />
          <Route path='/students' element={<AllStudents />} />
          <Route path='/campuses' element={<AllCampuses />} />
          <Route path='/form' element={<Form />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
