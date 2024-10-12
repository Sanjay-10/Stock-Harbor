import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Homepage from "./components/homepage/index"
import Navbar from "./components/navbar/index"

function App() {

  return (
    <>
    <Navbar/>
     <Homepage/>
    </>
  )
}

export default App
