import { useState } from 'react'
import {Routes, Route, Link} from "react-router-dom"
import Welcome from './components/Welcome';
import AllStudents from './components/AllStudents'
import AllCampuses from './components/AllCampuses';

function App() {
  

  return (
    <div>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/students'>Students</Link>
        <Link to='/campuses'>Campuses</Link>
      </nav>
      <main>
        <Routes>
          <Route path='/' element={<Welcome />} />
          <Route path='/students' element={<AllStudents />} />
          <Route path='/campuses' element={<AllCampuses />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
