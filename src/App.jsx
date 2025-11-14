import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'

import Home from './pages/Home'
import Calculator from './pages/Calculator'
import Animetion from './pages/Animetion'
import Components from './pages/Components'
import ForwardToHome from './pages/ForwardToHome'
import Todos from './pages/Todos'

import './App.css'
import Products from './pages/Products'
import { useEffect, useState } from 'react'
import { fetchProducts } from './data/products'
import Carts from './pages/Carts'
import Login from './pages/Login'

function App() {
  const [token, setToken] = useState('x')
  const [role, setRole] = useState('')

  const [products, setProduct] = useState([])
  const [carts, setCarts] = useState([])

  useEffect(() => setProduct(fetchProducts()), [])
  useEffect(() => console.log('Products:', products), [products])


  if(token === '') {
  return (
    <Login setToken={setToken} setRole={setRole} /> 
  )} else{
  

  return (
    <BrowserRouter basename="/csi205/">
      <Routes>
        <Route element={<AppLayout products={products} carts={carts} setToken={setToken}/>}>
          <Route path="home" element={<Home />} />
          <Route path="calculator" element={<Calculator />} />
          <Route path="animetion" element={<Animetion />} />
          <Route path="components" element={<Components />} />
          <Route path="todos" element={<Todos />} />
          <Route path="products" element={<Products products={products} carts={carts} setCarts={setCarts} />} />
          <Route path="Carts" element={<Carts carts={carts} setCarts={setCarts} />} />
          
          <Route path="*" element={<ForwardToHome />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}  
  }

export default App