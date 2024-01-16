import Layout from '../../layout/Layout';
import useRetunService from '../../hooks/useReturnService'
import { useEffect } from 'react';
import { ReturnStatus } from '../../models/Return';
import { Link } from 'react-router-dom';
import DataGrid_ from '../../components/datatable/Datagrid';
const columns = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'noFactura', headerName: 'No. Factura', type: 'number', description: 'Número de la factura', align: 'center', with: 80 },
    { field: 'fecha', headerName: 'Fecha', align: 'center', with: 90 },
    {
        field: 'vendedor', headerName: 'Nombre del Vendedor', description: 'Nombre del Vendedor', width: 180, flex: 1,
        renderCell: params => `${params.row.vendedor.firstName} ${params.row.vendedor.lastName}`
    },
    {
        field: 'estado', headerName: 'Estado', align: 'center', width: 85,
        renderCell: params => <div className={`cellWithStatus ${ReturnStatus[params.row.estado]}`}>
            {ReturnStatus[params.row.estado]}
        </div>
    }, {
        field: 'action', headerName: 'Acción', align: 'center', width: 75,
        renderCell: params => <Link to={`/returns/${params.row.id}`} className='text-decoration-none btn btn-outline-primary'>Ver</Link>
    },
]
const Index = () => {
    const { returns, loading, error, getAll } = useRetunService()
    useEffect(() => {
        getAll()
    }, [])
    return (
        <Layout title={'Devoluciones'} loading={loading} error={error} link='/home'>
            <DataGrid_ columns={columns} rows={returns} />
        </Layout>
    )
}
export default Index