import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import './App.css'
import Iskustva from './components/Iskustva/Iskustva'
import Partneri from './components/Partneri/Partneri'
import Agenda from './components/agenda/Agenda';
import Home from './pages/Home'

function App() {
  return (
    <div>
      <Partneri />
      <Home />
      <Agenda/>
    </div>
  )

export default App