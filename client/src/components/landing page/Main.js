import React from 'react'
import Navbar from './Navbar'
import Home from './Home'
import Labs from './Labs'
import { useEffect } from 'react'

const Main = () => {


  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])


  return (
    <>
      <Navbar />
      <Home />
      <Labs />
    </>
  )
}

export default Main