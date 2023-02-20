import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import * as API from '../services/service'
import {v4 as uuidv4 } from 'uuid'
import { Button } from 'react-bootstrap';
import { Login } from './Login'
import { Admin } from './Admin'
import { Juegos } from './Juegos'
import '../styles/app.css'

function App() {
/* const [departamentos, setDepartamentos] = useState([])

useEffect(() => {
  API.getDepartamentos().then(setDepartamentos)
}, []) */

  return (
  <>
  
  <div className="fullContainer">
    <p className="display-4 text-light text-center bg-gradient">TP Final Grupo 2</p>
    <Routes>
      <Route path='/' element={<Login />}></Route>
      <Route path='/admin' element={<Admin />}></Route>
      <Route path='/juegos' element={<Juegos />}></Route>
    </Routes>
  </div>

{/* 
  <Button variant="primary">Primary</Button>{' '}
  <Button variant="secondary">Secondary</Button>{' '}
  <Button variant="success">Success</Button>{' '}
  <Button variant="warning">Warning</Button>{' '}
  <Button variant="danger">Danger</Button>{' '}
  <Button variant="info">Info</Button>{' '}
  <Button variant="light">Light</Button>{' '}
  <Button variant="dark">Dark</Button> <Button variant="link">Link</Button> */}
  
{/*   <p>Departamentos: </p>
  {departamentos.map((departamento) => (
    <p key={uuidv4()}>ID: {departamento.id}. Nombre: {departamento.nombre}.</p>
  ))} */}
  </>
  )
}

export default App
