import './sales.scss'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import useSaleServices from '../../hooks/useSaleServices'
import Layout from '../../layout/Layout'
import Details from '../../components/table/Details'
import lang from '../../languages/index'
const View = () => {
    const { id } = useParams();
    const { sales, loading, error, getByNInvoice } = useSaleServices()
    useEffect(() => {
        getByNInvoice(id);
        // eslint-disable-next-line 
    }, [id])

    return (
        <Layout title={lang.pages.Sales.View.title + id} loading={loading} error={error}>
            <div className="row">
                <div className="formInput col-12 col-sm-6 col-lg-3 mb-1">
                    <label>Cliente:</label>
                    <input type='text' className='col-12'
                        value={sales.length && sales[0].cliente ? `${sales[0].cliente.firstName} ${sales[0].cliente.lastName}` : ''}
                        readOnly />
                </div>
                <div className="formInput col-12 col-sm-6 col-lg-3 mb-1">
                    <label>Vendedor:</label>
                    <input type='text' className='col-12'
                        value={sales.length && sales[0].vendedor ? `${sales[0].vendedor.firstName} ${sales[0].vendedor.lastName}` : ''}
                        readOnly />
                </div>
                <div className="formInput col-12 col-sm-6 col-lg-3 mb-1">
                    <label>Fecha de Emisión:</label>
                    <input type='text' className='col-12'
                        value={sales.length && sales[0].fecha ? sales[0].fecha : ''}
                        readOnly />
                </div>
                <div className="formInput col-12 col-sm-6 col-lg-3 mb-1">
                    <label>Monto Total:</label>
                    <input type='text' className='col-12'
                        value={`L. ${sales.length && sales[0].detalleVentas ? sales[0].detalleVentas.reduce((acc, detail) => (acc + detail.precio * detail.cantidad * (1 + detail.isv - detail.descuento)), 0).toFixed(2) : 0}`}
                        readOnly />
                </div>
                <div className="formInput col-12 col-sm-6 col-lg-3 mb-1">
                    <label>Descuento Total:</label>
                    <input type='text' className='col-12'
                        value={`L. ${sales.length && sales[0].detalleVentas ? sales[0].detalleVentas.reduce((acc, detail) => (acc + detail.precio * detail.cantidad * (detail.descuento)), 0).toFixed(2) : 0}`}
                        readOnly />
                </div>
                <div className="formInput col-12 col-sm-6 col-lg-3 mb-1">
                    <label>Impuesto Total:</label>
                    <input type='text' className='col-12'
                        value={`L. ${sales.length && sales[0].detalleVentas ? sales[0].detalleVentas.reduce((acc, detail) => (acc + detail.precio * detail.cantidad * (detail.isv)), 0).toFixed(2) : 0}`}
                        readOnly />
                </div>
            </div>
            <div className="row">
                <div className="formInput">
                    <label className='fw-bold text-secondary pb-2'>Detalle Factura:</label>
                    <Details details={sales.length ? sales[0].detalleVentas : []} />
                </div>
            </div>
            <div className="row px-3">
                <a href="/sales" className='btn btn-outline-primary text-decoration-none col-12 col-sm-6 col-lg-3'>Regresar</a>
            </div>
        </Layout>
    )
}

export default View