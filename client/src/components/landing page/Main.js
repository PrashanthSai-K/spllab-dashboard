import React from 'react'
import Navbar from './Navbar'
import Home from './Home'
import Labs from './Labs'
import { useEffect, useLayoutEffect } from 'react'

const Main = () => {


  useLayoutEffect(() => {
    window.scrollTo(0, window.pageYOffset - 30)

  })

  return (
    <>
      <Navbar />
      <Home />
      <Labs />
    </>
  )
}

export default Main