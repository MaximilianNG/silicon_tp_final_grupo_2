import { Routes, Route } from 'react-router-dom'
import { Secundario } from './Secundario'
import { useState, useEffect } from 'react'
import * as API from '../services/service'
import {v4 as uuidv4 } from 'uuid'

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

  <p>Departamentos: </p>
  {departamentos.map((departamento) => (
    <p key={uuidv4()}>ID: {departamento.id}. Nombre: {departamento.nombre}.</p>
  ))}
  </>
  )
}

export default App
