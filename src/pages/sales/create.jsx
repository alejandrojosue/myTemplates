import Datatable from "../../components/datatable/Datatable";
import Layout from '../../layout/Layout'
import { useState } from 'react'
import useFetch from '../../hooks/useFetch'
import { productMapper } from "../../maper/mapper";
const Create = () => {
    const { data, loading, error, handleEndpoint } = useFetch(`productos?filters[activo]=true&populate=deep`)
    document.title = 'Create'
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
                    const aux = {
                        id: params.row.id,
                        productSku: params.value,
                        productName: product.name,
                        quantity: 1,
                        unitPrice: product.unitPrice,
                        tax: product.tax,
                        discount: product.discount,
                    }
                    params.row = aux
                }
                // if (params.value == '1234') {
                //     const aux = {
                //         id: params.row.id,
                //         productSku: params.value,
                //         productName: 'P1 ' + params.value,
                //         quantity: 1,
                //         unitPrice: 200,
                //         tax: .15,
                //         discount: .1,
                //     }
                //     params.row = aux
                // } else if (params.value == '12345') {
                //     const aux = {
                //         id: params.row.id,
                //         productSku: params.value,
                //         productName: 'P1 ' + params.value,
                //         quantity: 1,
                //         unitPrice: 300,
                //         tax: .15,
                //         discount: 0,
                //     }
                //     params.row = aux
                // }
                // console.log(params.row)
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
            valueGetter: params => params.row.quantity ? params.row.quantity : 1
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
                (params.row.quantity * params.row.unitPrice * (1 + params.row.tax - params.row.discount)).toFixed(2),
        }
    ]
    if (error) return <Layout><span className="display-3">Error</span></Layout>
    return <Layout title={'Crear Sale'}>
        <Datatable _columns={COLUMNS} _loading={loading} />
    </Layout>

}

export default Create