import './products.scss'
import { Link } from 'react-router-dom'
import DataGrid from '../../components/datatable/Datagrid'
import useProductService from '../../hooks/useProductService'
import Layout from '../../layout/Layout'
import { productStatus } from '../../models/Product_'
import { useEffect } from 'react'
import ProductsFilters from '../../components/filters/ProductsFilters'
import Filters from '../../components/filters/Filters'
import { productsReportMapper } from '../../mapper/mapper'
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
    }, {
        field: 'action', headerName: 'Acción', align: 'center', width: 75,
        renderCell: params => <Link to={`/products/${params.row.id}`} className='text-decoration-none btn btn-outline-primary'>Ver</Link>
    },
]

const IndexProducts = () => {
    const { loading, error, products, handleProductsList, getAllProducts } = useProductService()
    useEffect(() => {
        getAllProducts()
    }, [])
    return <Layout title={'Listado de Productos'} error={error} loading={loading}>
        <div className="row pb-2">
            <ProductsFilters key={'filters-products'} handleProducts={handleProductsList} />
            <Filters
                key={'filters'}
                title={'products'}
                data={products && productsReportMapper(products)}
                handlePagination={getAllProducts}
            />
        </div>
        <DataGrid key={'dataGrid'} columns={columns} rows={products} />
    </Layout>
}

export default IndexProducts