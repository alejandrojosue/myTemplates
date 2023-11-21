import './App.css'
import Cards from './components/cards/Cards'
import Layout from './layout/Layout'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Datatable from './components/datatable/Datatable'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="myTemplates/test"
          element={
            <Layout title={'Hola mundo'} content={<Datatable />} />
          } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
