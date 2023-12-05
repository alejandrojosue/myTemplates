import Cards from './components/cards/Cards'
import Layout from './layout/Layout'
import { HashRouter as Router, Routes, Route } from "react-router-dom"
import Datatable from './components/datatable/Datatable'
import CollapsibleTable from './components/table/CollapsibleTable'
import ColumnGroupingTable from './components/table/ColumnGroupingTable'
import Table from './components/table/Table'
import Index from './pages/sales/index'
import Home from './pages/Index'
import Create from './pages/sales/create'
import Unauthorized from './pages/unauthorized/Unauthorized'
function App() {
  return (
    <Router>
      <Routes basename="/myTemplates">
        <Route index element={<Home />} />
        <Route path='sales'>
          <Route index element={<Index />} />
          <Route path='new' element={<Create />} />
        </Route>
        {/* <Route path="datatable"
          element={
            <Layout title={'Datatable'} children={<Datatable />} />
          } />
          <Route path="cards"
          element={
            <Layout title={'Cartas'} children={<Cards />} />
          } />
          <Route path="collapsibleTable"
          element={
            <Layout title={'Tablas'} children={<CollapsibleTable />} />
          } />
        <Route path="columnGroupingTable"
          element={
            <Layout title={'Tablas'} children={<ColumnGroupingTable />} />
          } />
        <Route path="table"
          element={
            <Layout title={'Tablas'} children={<Table />} />
          } /> */}
        <Route path='unauthorized' element={<Layout children={'unauthorized'} />} />
        <Route path='*' element={<Layout children={'404 Not Found'} />} />
      </Routes>
    </Router>
  )
}

export default App
