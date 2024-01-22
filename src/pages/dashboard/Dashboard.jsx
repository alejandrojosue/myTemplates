import Layout from '../../layout/Layout'
import Widget from '../../components/widget/Widget'
import Datatable from '../../components/table/Table'
import dateFormatToSpanish from '../../helpers/date-format-to-spanish'
import useSaleServices from '../../hooks/useSaleServices'
import { useEffect, useState } from 'react'
const Dashboard = () => {
    const { sales, loading, error, getByCurrentMonth } = useSaleServices()
    const [salesAmount, setSalesAmount] = useState(0)
    const [salesTax, setSalesTax] = useState(0)
    // eslint-disable-next-line
    const [expenses, setExpenses] = useState(0)
    const [rows, setRows] = useState([])


    const handleValuesOfWidgetsSales = () => {
        if (loading) return
        let transaccionsDetails = []
        sales
            .forEach(({ detalleVentas, id, fecha, estado, metodoPago }) => {
                let auxTotal = 0
                let auxTax = 0
                let auxDiscount = 0

                detalleVentas
                    .forEach(({ cantidad, precio, isv, descuento }) => {
                        setSalesAmount(salesAmount + cantidad * precio)
                        setSalesTax(salesTax + cantidad * precio * isv)
                        auxTotal += cantidad * precio * (1 + isv - descuento)
                        auxTax += cantidad * precio * (1 + isv)
                        auxDiscount += cantidad * precio * (1 - descuento)
                    })
                transaccionsDetails.push({
                    'ID Transacción': id,
                    'Fecha': fecha,
                    'Monto Total': 'L.' + auxTotal.toFixed(2),
                    'Impuesto Total': 'L.' + auxTax.toFixed(2),
                    'Descuento Total': 'L.' + auxDiscount.toFixed(2),
                    'Método de Pago': metodoPago,
                    'Estado': estado
                })
            })
        setRows(transaccionsDetails)
    }

    // eslint-disable-next-line
    useEffect(() => { getByCurrentMonth() }, [])
    // eslint-disable-next-line
    useEffect(() => { handleValuesOfWidgetsSales() }, [loading])


    return (
        <Layout title={'Panel de Control'} loading={loading} error={error} link='/home'>
            <div className="row">
                <p className='pb-2'>
                    Movimientos del <strong
                    // onClick={() => handleCurrentDate(false)}
                    >{dateFormatToSpanish(new Date())}</strong>
                    hasta <strong
                    // onClick={() => handleCurrentDate(true)}
                    >{dateFormatToSpanish(new Date(), true)}</strong>
                </p>
                <div className="widgets container-fluid pb-4">
                    <div className="row px-2">
                        <div className="col-12 col-sm-4 p-1 col-lg-4">
                            <Widget type="sale" _value={salesAmount} />
                        </div>
                        <div className="col-6 col-sm-4 p-1 col-lg-4">
                            <Widget type="expense" _value={expenses} />
                        </div>
                        <div className="col-6 col-sm-4 p-1 col-lg-4">
                            <Widget type="tax" _value={salesTax} />
                        </div>
                    </div>
                </div>
                <div className="charts container-fluid">
                    <div className="row px-2">
                        {/* <Featured /> */}
                        {/* <Chart title="Últimos 6 meses (Ingresos)" aspect={6} /> */}
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row px-2">
                        <div className="tableTitle">Últimas 20 Transacciones</div>
                        <Datatable columnsNames={[
                            'ID Transacción',
                            'Fecha',
                            'Monto Total',
                            'Impuesto Total',
                            'Descuento Total',
                            'Método de Pago',
                            'Estado'
                        ]}
                            rows={sales.length ? rows : []} />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard