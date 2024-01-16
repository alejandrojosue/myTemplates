import Datatable from "../../components/datatable/Datatable";
import Layout from '../../layout/Layout'
import { useState } from 'react'
import useFetch from '../../hooks/useFetch'
import { productMapper } from "../../mapper/mapper";
import ModalPay from "../../components/modal/ModalPay";
import ModalSeekProduct from "../../components/modal/ModalSeekProduct";
const Create = () => {
    const { data, loading, error, handleEndpoint, handleMethod, handleSendData } = useFetch(`productos?filters[existencia][$gt]=0&filters[activo][$eq]=true`)
    const [amount, setAmount] = useState(0.00)
    const [rows, setRows] = useState([])
    const handleAmount = (amount) => setAmount(amount)

    const COLUMNS = [
        { field: 'id', headerName: 'ID', width: 1, hideable: false },
        {
            field: 'productSku',
            headerName: 'Código Producto',
            sortable: false,
            width: 170,
            editable: true,
            valueSetter: params => {
                handleEndpoint(`productos?filters[$and][0][existencia][$gt]=0&filters[$and][1][activo][$eq]=true&filters[$and][2][codigo][$eq]=${params.value}`)
                const product = (data && data.length) ? productMapper(data) : null
                if (product) {
                    params.row = {
                        id: params.row.id,
                        productID: product[0].id,
                        productSku: params.value,
                        productName: product[0].name,
                        quantity: 1,
                        unitPrice: product[0].unitPrice,
                        tax: product[0].tax,
                        discount: product[0].discount,
                        max: product[0].stock
                    }
                }
                return params.row
            }
        },
        {
            field: 'productName',
            headerName: 'Producto',
            sortable: false,
            minWidth: 200,
            flex: 1,
        },
        {
            field: 'quantity',
            headerName: 'Cantidad',
            type: 'number',
            sortable: false,
            width: 110,
            editable: true,
            valueGetter: params => params.row.quantity ? params.row.quantity : 1,
            valueSetter: params => {
                if (params.row.max) {
                    if (params.value > params.row.max) {
                        return { ...params.row, quantity: params.row.max }
                    } else if (params.value < 1) {
                        return { ...params.row, quantity: 1 }
                    }
                }
                return { ...params.row, quantity: params.value }
            }
        }, {
            field: 'unitPrice',
            headerName: 'Precio',
            type: 'number',
            sortable: false,
            width: 110,
        }, {
            field: 'discount',
            headerName: 'Descuento',
            type: 'number',
            sortable: false,
            width: 110,
        }, {
            field: 'tax',
            headerName: 'ISV',
            type: 'number',
            sortable: false,
            width: 110,
        },
        {
            field: 'subtotal',
            headerName: 'Subtotal',
            description: 'Subtotal de la fila, incluyendo impuestos y descuentos.',
            sortable: false,
            type: 'number',
            width: 160,
            valueGetter: (params) =>
                ((params.row.quantity * params.row.unitPrice * (1 + params.row.tax - params.row.discount) || 0)).toFixed(2).replace('.', ','),
        }
    ]
    return <Layout title={'Crear Venta'} error={error}>
        <ModalPay amount={amount} rows={rows} data={data}
            handleEndpoint={handleEndpoint}
            handleMethod={handleMethod}
            handleSendData={handleSendData} />
        <ModalSeekProduct />
        <Datatable rows={rows} setRows={setRows} _columns={COLUMNS} _loading={loading} handleAmount={handleAmount} />
    </Layout>
}

export default Create