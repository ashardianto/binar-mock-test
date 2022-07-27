import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import NewProductModal from '../components/NewProductModal'
import Products from '../components/Products'

const Dashboard = () => {

  return (
    <div>
      <Navbar />
      <Products />
    </div>
  )
}

export default Dashboard
