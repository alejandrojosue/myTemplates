import Datatable from "../../components/datatable/Datatable";
import Layout from '../../layout/Layout'
import { useState } from 'react'
import useFetch from '../../hooks/useFetch'
import { productMapper } from "../../maper/mapper";
const Create = () => {
    const { data, loading, error, handleEndpoint } = useFetch(`productos?filters[$and][0][existencia][$gt]=0&filters[$and][1][activo][$eq]=true`)
    document.title = 'Create sale'
    const COLUMNS = [
        { field: 'id', headerName: 'ID', width: 1, hideable: false },
        {
            field: 'productSku',
            headerName: 'Código Producto',
            sortable: false,
            width: 170,
            editable: true,
            valueSetter: params => {
                const product = productMapper(data).find(({ sku }) => sku === params.value)
                console.log("🚀 ~ file: create.jsx:22 ~ Create ~ product:", product)
                if (product) {
                    params.row = {
                        id: params.row.id,
                        productSku: params.value,
                        productName: product.name,
                        quantity: 1,
                        unitPrice: product.unitPrice,
                        tax: product.tax,
                        discount: product.discount,
                        max: product.stock
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
                ((params.row.quantity * params.row.unitPrice * (1 + params.row.tax - params.row.discount) || 0)).toFixed(2),
        }
    ]
    if (error) return <Layout><span className="display-3">Error</span></Layout>
    return <Layout title={'Crear Venta'}>
        <Datatable _columns={COLUMNS} _loading={loading} />
    </Layout>

}

export default Create