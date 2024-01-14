import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import IndexSales from './pages/sales/Index'
import IndexProducts from './pages/products/Index';
import Home from './pages/Index'
import CreateSale from './pages/sales/Create'
import NotFound from './pages/notFound/NotFound'
import { useEffect } from 'react'
import Login from './pages/login/Login'
import ProtectedRouted from './auth/ProtectedRouted'
import ProductView from './pages/products/View'
import SalesView from './pages/sales/View'
function App() {
  // Rutas en las que se debe evitar la recarga o salida
  const pathsPrevent = [
    '/sales/new',
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
          <Route index element={<Home />} />
          <Route path='home' element={<Home />} />
          <Route path='sales'>
            <Route index element={<IndexSales />} />
            <Route path=':id' element={<SalesView />} />
            <Route path='new' element={<CreateSale />} />
          </Route>
          <Route path='products'>
            <Route index element={<IndexProducts />} />
            <Route path=':id' element={<ProductView />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
