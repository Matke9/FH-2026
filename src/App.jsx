import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import './App.css'
import Iskustva from './components/Iskustva/Iskustva'
import Partneri from './components/Partneri/Partneri'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Partneri />
  );
}

export default App
