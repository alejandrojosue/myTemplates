import Cards from './components/cards/Cards'
import Layout from './layout/Layout'
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Datatable from './components/datatable/Datatable'
import CollapsibleTable from './components/table/CollapsibleTable';
import ColumnGroupingTable from './components/table/ColumnGroupingTable';
import Table from './components/table/Table';
import Index from './page';
function App() {
  return (
    <Router>
      <Routes basename="/myTemplates">
        <Route path=''
          element={
            <Layout title={'Index'} content={<Index />} />
          } />
        <Route path="datatable"
          element={
            <Layout title={'Datatable'} content={<Datatable />} />
          } />
        <Route path="cards"
          element={
            <Layout title={'Cartas'} content={<Cards />} />
          } />
        <Route path="collapsibleTable"
          element={
            <Layout title={'Tablas'} content={<CollapsibleTable />} />
          } />
        <Route path="columnGroupingTable"
          element={
            <Layout title={'Tablas'} content={<ColumnGroupingTable />} />
          } />
        <Route path="table"
          element={
            <Layout title={'Tablas'} content={<Table />} />
          } />
        <Route path='*' element={<Layout content={'404 Not Found'} />} />
      </Routes>
    </Router>
  )
}

export default App
