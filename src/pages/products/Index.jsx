import { useEffect, useState } from 'react'
import DataGrid from '../../components/datatable/Datagrid'
import Layout from '../../layout/Layout'
import { productStatus } from '../../models/Product_'
import ProductRepository from '../../repositories/ProductRepository'
import ProductService from '../../services/ProductService'
const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'nombre', headerName: 'Nombre del Producto', description: 'Nombre del Producto', minWidth: 250, flex: .5, editable: true },
    { field: 'precio_venta', headerName: 'Precio de Venta', description: 'Precio de Venta', type: 'number', with: 70 },
    { field: 'descripcion', headerName: 'Descripción del Producto', description: 'Descripción del Producto', flex: 1 },
    { field: 'existencia', headerName: 'Existencia', type: 'number', description: 'Existencia', with: 70 },
    {
        field: 'activo', headerName: 'Estado', align: 'center', width: 75,
        renderCell: params => <div className={`cellWithStatus ${params.row.activo}`}>
            {productStatus[params.row.activo]}
        </div>
    },
]

const Index = () => {
    const productRepository = new ProductRepository()
    const productService = new ProductService(productRepository)
    const [rows, setRows] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const products = await productService.getAllProducts()
                setRows(products)
            } catch (error) {
                console.error('Error fetching products:', error.message)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])
    return <Layout title={'Listado de Productos'} loading={loading}>
        <DataGrid columns={columns} rows={rows} />
    </Layout>
}

export default Index