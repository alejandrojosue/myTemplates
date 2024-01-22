import { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Loading from './components/backdrop/Loading'

const ProtectedRouted = lazy(() => import('./auth/ProtectedRouted'))
const Login = lazy(() => import('./pages/login/Login'))
const Home = lazy(() => import('./pages/home/Home'))
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'))
const NotFound = lazy(() => import('./pages/notFound/NotFound'))

const IndexSales = lazy(() => import('./pages/sales/Index'))
const IndexProducts = lazy(() => import('./pages/products/Index'))
const IndexReturns = lazy(() => import('./pages/returns/Index'))
const IndexOrders = lazy(() => import('./pages/orders/Index'))
const IndexReport = lazy(() => import('./pages/reports/Index'))
const Profile = lazy(() => import('./pages/profile/Index'))

const ProductView = lazy(() => import('./pages/products/View'))
const SaleView = lazy(() => import('./pages/sales/View'))
const ReturnView = lazy(() => import('./pages/returns/View'))

const CreateSale = lazy(() => import('./pages/sales/Create'))
const CreateOrder = lazy(() => import('./pages/orders/Create'))
const CreateReturn = lazy(() => import('./pages/returns/Create'))

const SalesList = lazy(() => import('./pages/returns/SalesList'))

function App() {
  // Rutas en las que se debe evitar la recarga o salida
  // eslint-disable-next-line 
  const pathsPrevent = [
    '/sales/new',
    '/returns/new/:id',
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
  }, [pathsPrevent])

  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="/" element={<ProtectedRouted />}>
            <Route index element={<Home />} />
            <Route path='home' element={<Home />} />
            <Route path='profile' element={<Profile />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='sales'>
              <Route index element={<IndexSales />} />
              <Route path=':id' element={<SaleView />} />
              <Route path='new' element={<CreateSale />} />
            </Route>
            <Route path='products'>
              <Route index element={<IndexProducts />} />
              <Route path=':id' element={<ProductView />} />
            </Route>
            <Route path='returns'>
              <Route index element={<IndexReturns />} />
              <Route path='new' element={<SalesList />} />
              <Route path='new/:ninvoice' element={<CreateReturn />} />
              <Route path=':id' element={<ReturnView />} />
            </Route>
            <Route path='orders'>
              <Route index element={<IndexOrders />} />
              <Route path='new' element={<CreateOrder />} />
              {/* <Route path=':id' element={<ProductView />} /> */}
            </Route>
            <Route path='reports'>
              <Route index element={<IndexReport />} />
              {/* <Route path=':id' element={<ProductView />} /> */}
            </Route>
            <Route path="dashboard" element={'dashboard'} />
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
