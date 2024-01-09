import Layout from './layout/Layout'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Index from './pages/sales/index'
import IndexProducts from './pages/products';
import Home from './pages/Index'
import Create from './pages/sales/create'
import Unauthorized from './pages/unauthorized/Unauthorized'
import { useEffect } from 'react'
import Login from './pages/login/Login'
import ProtectedRouted from './auth/ProtectedRouted'
import ProductView from './pages/products/view'
import List from './pages/sales/list';
function App() {
  // Rutas en las que se debe evitar la recarga o salida
  const pathsPrevent = [
    '/invoices/new',
    '/returns/new',
  ]
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      const msg = '¿Está seguro de cancelar todos los cambios?'
      e.returnValue = msg
      return msg
    }
    if (pathsPrevent.includes(window.location.pathname)) {
      window.addEventListener('beforeunload', handleBeforeUnload)
      return () => window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/" element={<ProtectedRouted />}>
          <Route path='home' element={<Home />} />
          <Route path='list' element={<List />} />
          <Route path='sales'>
            <Route index element={<Index />} />
            <Route path='new' element={<Create />} />
          </Route>
          <Route path='products'>
            <Route index element={<IndexProducts />} />
          </Route>
          <Route path='/products/:id' element={<ProductView />} />
          <Route path='unauthorized' element={<Layout children={<Unauthorized />} />} />
          <Route path='*' element={<Layout children={'404 Not Found'} />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
