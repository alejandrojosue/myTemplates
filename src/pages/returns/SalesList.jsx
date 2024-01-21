import Layout from '../../layout/Layout';
import DataGrid_ from '../../components/datatable/Datagrid';
import useSaleServices from '../../hooks/useSaleServices'
import { Link } from 'react-router-dom';

const columns = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'noFactura', headerName: 'No. Factura', type: 'number', description: 'Número de la factura', align: 'center', with: 80 },
    { field: 'fecha', headerName: 'Fecha', align: 'center', with: 90 },
    {
        field: 'RTN', headerName: 'RTN del Cliente', description: 'Nombre del Vendedor', width: 140,
        renderCell: params => {
            return params.row.cliente.rtn
        }
    },
    {
        field: 'cliente', headerName: 'Nombre del Cliente', description: 'Nombre del Vendedor', width: 250,
        renderCell: params => `${params.row.cliente.firstName} ${params.row.cliente.lastName}`
    },
    {
        field: 'vendedor', headerName: 'Nombre del Vendedor', description: 'Nombre del Vendedor', width: 250,
        renderCell: params => `${params.row.vendedor.firstName} ${params.row.vendedor.lastName}`
    },
    {
        field: 'action', headerName: 'Acción', align: 'center', width: 75,
        renderCell: params => <Link to={`/returns/new/${params.row.id}`} className='text-decoration-none btn btn-outline-primary'>Crear</Link>
    }
]

const SalesList = () => {
    const { sales, error, loading, getByRTNCustomer } = useSaleServices()

    return (
        <Layout
            title={'Crear Devolución'}
            link='/returns'
            error={error}
            loading={loading}
        >
            <div className="row mb-2">
                <div className="col-12 col-sm-6 col-lg-4">
                    <label className="form-label text-secondary">RTN Cliente:</label>
                    <input type="text"
                        className="form-control"
                        onChange={(e) => {
                            if ((e.target.value).trim() !== '')
                                getByRTNCustomer((e.target.value).trim())
                        }}
                        maxLength={14}
                        placeholder="Ingrese RTN Cliente" />
                </div>
            </div>
            <DataGrid_ columns={columns} rows={sales} />
        </Layout>
    )
}

export default SalesList