import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <>
    <Link to="/investor">Investing</Link>
    <Link to="/trader">Trading</Link>
    </>

  )
}

export default Navbar