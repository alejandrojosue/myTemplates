import './returns.scss'
import Layout from '../../layout/Layout'
import useSaleServices from '../../hooks/useSaleServices'
import useReturnService from '../../hooks/useReturnService'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Table from '@mui/material/Table'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
const Create = () => {
    const { sales, error: errorSale, loading: loadingSale, getByNInvoice } = useSaleServices()
    const { error: errorReturn, createReturn } = useReturnService()
    const { ninvoice } = useParams()
    const [invoiceItems, setInvoiceItems] = useState([])

    useEffect(() => {
        getByNInvoice(ninvoice)
    }, [getByNInvoice, ninvoice])

    useEffect(() => {
        if (errorReturn) alert(errorReturn)
    }, [errorReturn])

    const handleAddItem = ({ producto, cantidad, precio }, index) => {
        const newItem = {
            producto, cantidad, precio, quantityVal: cantidad, motivo: '', index
        }
        if (!invoiceItems.find(value => value.index === index))
            setInvoiceItems([...invoiceItems, newItem])
    }

    const handleDeleteItem = (index) => {
        invoiceItems.splice(index, 1)
        setInvoiceItems([...invoiceItems])
    }

    const handleQuantityChange = (index, value) => {
        if (value) {
            invoiceItems[index].cantidad = parseInt(value)
        }
        setInvoiceItems([...invoiceItems])
        console.log(invoiceItems)
    }

    const handleReasonChange = (index, value) => {
        if (value) {
            invoiceItems[index].motivo = value
        }
        setInvoiceItems([...invoiceItems])
    }

    const saveReturn = () => createReturn(invoiceItems)
    return (
        <Layout
            title={'Crear Devolución'} link='/returns' loading={loadingSale} error={errorSale}>
            <form onSubmit={e => e.preventDefault()} className="row">
                <div className="formInput col-12 col-sm-6 col-lg-3 mb-1">
                    <label>Cliente:</label>
                    <input type='text' className='col-12'
                        value={sales.length ? `${sales[0].cliente.firstName} ${sales[0].cliente.lastName}` : ''}
                        readOnly />
                </div>
                <div className="formInput col-12 col-sm-6 col-lg-3 mb-1">
                    <label>Vendedor:</label>
                    <input type='text' className='col-12'
                        value={sales.length ? `${sales[0].vendedor.firstName} ${sales[0].vendedor.lastName}` : ''}
                        readOnly />
                </div>
                <div className="formInput col-12 col-sm-6 col-lg-3 mb-1">
                    <label>Fecha de Emisión:</label>
                    <input type='text' className='col-12'
                        value={sales.length ? sales[0].fecha : ''}
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
                <div className="formInput container-fluid">
                    <label className="my-1 fw-bold text-secondary">Detalle Factura:</label>
                    <TableContainer component={Paper} className="table">
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell className="tableCell"><b>Código</b></TableCell>
                                    <TableCell className="tableCell"><b>Producto</b></TableCell>
                                    <TableCell className="tableCell"><b>Cantidad</b></TableCell>
                                    <TableCell className="tableCell"><b>P/U</b></TableCell>
                                    <TableCell className="tableCell"><b>Agregar</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sales[0]?.detalleVentas?.map(({ producto, cantidad, precio }, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="tableCell">{producto.codigo}</TableCell>
                                        <TableCell className="tableCell">{producto.nombre}</TableCell>
                                        <TableCell className="tableCell">{cantidad}</TableCell>
                                        <TableCell className="tableCell">{precio}</TableCell>
                                        <TableCell className="tableCell">
                                            <div className="btn btn-outline-primary"
                                                onClick={() => handleAddItem({ producto, cantidad, precio }, index)}>
                                                <span>+</span>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div className="formInput container-fluid">
                    <label className="fw-bold text-secondary">Productos a Devolver:</label><br />
                    <TableContainer component={Paper} className="table">
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell className="tableCell"><b>Producto</b></TableCell>
                                    <TableCell className="tableCell"><b>Cantidad</b></TableCell>
                                    <TableCell className="tableCell w-300"><b>Motivo Devolución</b></TableCell>
                                    <TableCell className="tableCell"><b>Acción</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {invoiceItems.map(({ producto, cantidad, quantityVal }, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="tableCell">{producto.codigo}</TableCell>
                                        <TableCell className="tableCell">
                                            <input type="number" min={1}
                                                max={quantityVal}
                                                onChange={e => handleQuantityChange(index, e.target.value)}
                                                onKeyDown={e => e.preventDefault()}
                                                defaultValue={cantidad} />
                                        </TableCell>
                                        <TableCell className="tableCell w-300">
                                            <textarea required
                                                minLength={1}
                                                onChange={e => handleReasonChange(index, e.target.value)}
                                                className="w-100"></textarea>
                                        </TableCell>
                                        <TableCell className="tableCell">
                                            <button className="btn btn-outline-danger" onClick={() => handleDeleteItem(index)}>
                                                <DeleteForeverIcon className="icon" />
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div className="container">
                    <div className="row">
                        <button className="btn btn-outline-primary col-12 col-sm-6 col-lg-4 mx-auto"
                            onClick={saveReturn}>Guardar</button>
                        <Link to={'/returns'} className="btn btn-outline-success col-12 col-sm-6 col-lg-4 mx-auto text-decoration-none">Regresar</Link>
                    </div>
                </div>
            </form>
        </Layout>
    )
}

export default Create