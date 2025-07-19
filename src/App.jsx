import React from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import AddNote from './components/AddNote'
import LandingPage from './components/LandingPage'
import ShowNotes from './components/ShowNotes'
import UpdateNote from './components/UpdateNotes'
import DeleteNote from './components/DeleteNotes'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/addNote' element={<AddNote />} />
        <Route path='/showNotes' element={<ShowNotes />} />
        <Route path='/updateNotes' element={<UpdateNote />} />
        <Route path='/deleteNotes' element={<DeleteNote />} /> 
      </Routes>
    </Router>
  )
}

export default App
