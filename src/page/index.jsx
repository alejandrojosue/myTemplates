import Table from "../components/table/Table"

const Index = () => <Table prevEndpoint="ventas?populate=cliente,detalleVentas.producto,vendedor" />

export default Index