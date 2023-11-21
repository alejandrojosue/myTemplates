import './App.css'
import Cards from './components/cards/Cards'
import Layout from './layout/Layout'
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Datatable from './components/datatable/Datatable'
function App() {
  return (
    <Router>
      <Routes basename="/myTemplates">
        <Route path=''
          element={
            <Layout title={'Hola mundo'} content={<Cards />} />
          } />
        <Route path="datatable"
          element={
            <Layout title={'Hola mundo'} content={<Datatable />} />
          } />
        <Route path="cards"
          element={
            <Layout title={'Hola mundo'} content={<Cards />} />
          } />
        <Route path='*' element={<Layout content={'404 Not Found'} />} />
      </Routes>
    </Router>
  )
}

export default App
