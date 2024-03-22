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
import lang from '../../languages/index'

const columns = [
    { field: 'id', headerName: lang.pages.Products.Index.table['columns-headerName'][0], width: 70 },
    { field: 'nombre', headerName: lang.pages.Products.Index.table['columns-headerName'][1], description: 'Nombre del Producto', minWidth: 250, flex: .5, editable: true },
    { field: 'precio_venta', headerName: lang.pages.Products.Index.table['columns-headerName'][2], description: 'Precio de Venta', type: 'number', with: 70 },
    { field: 'descripcion', headerName: lang.pages.Products.Index.table['columns-headerName'][3], description: 'Descripción del Producto', flex: 1 },
    { field: 'existencia', headerName: lang.pages.Products.Index.table['columns-headerName'][4], type: 'number', description: 'Existencia', with: 70 },
    {
        field: 'activo', headerName: lang.pages.Products.Index.table['columns-headerName'][5], align: 'center', width: 75,
        renderCell: params => <div className={`cellWithStatus ${params.row.activo}`}>
            {productStatus[params.row.activo]}
        </div>
    }, {
        field: 'action', headerName: lang.pages.Products.Index.table['columns-headerName'][6], align: 'center', width: 75,
        renderCell: params => <Link to={`/products/${params.row.id}`} className='text-decoration-none btn btn-outline-primary'>Ver</Link>
    },
]

const IndexProducts = () => {
    const { loading, error, products, handleProductsList, getAllProducts } = useProductService()
    useEffect(() => {
        getAllProducts()
        // eslint-disable-next-line 
    }, [])
    return <Layout title={lang.pages.Products.Index.title} error={error} loading={loading}>
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