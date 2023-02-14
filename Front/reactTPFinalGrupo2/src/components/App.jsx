import { Routes, Route } from 'react-router-dom'
import { Secundario } from './Secundario'
import { useState, useEffect } from 'react'
import * as API from '../services/service'
import {v4 as uuidv4 } from 'uuid'
import { Button } from 'react-bootstrap';

function App() {
const [departamentos, setDepartamentos] = useState([])

useEffect(() => {
  API.getDepartamentos().then(setDepartamentos)
}, [])

useEffect(() => {
  console.log(uuidv4());
}, [])

  return (
  <>
  <p>Esta es mi pantalla principal.</p>
  <Routes>
    <Route path='/' element={<Secundario />}></Route>
  </Routes>

  <Button variant="primary">Primary</Button>{' '}
  <Button variant="secondary">Secondary</Button>{' '}
  <Button variant="success">Success</Button>{' '}
  <Button variant="warning">Warning</Button>{' '}
  <Button variant="danger">Danger</Button>{' '}
  <Button variant="info">Info</Button>{' '}
  <Button variant="light">Light</Button>{' '}
  <Button variant="dark">Dark</Button> <Button variant="link">Link</Button>
  
  <p>Departamentos: </p>
  {departamentos.map((departamento) => (
    <p key={uuidv4()}>ID: {departamento.id}. Nombre: {departamento.nombre}.</p>
  ))}
  </>
  )
}

export default App
