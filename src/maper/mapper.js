import Category from "../models/Category"
import Product, { productStatus } from "../models/Product"
import Sale, { PayMethod, Status } from "../models/Sale"
import SaleDetail from "../models/SaleDetail"
import User from "../models/user/User"

const categoryMapper = (data) => {
    try {
        return data?.map(value => (
            new Category(
                value.attributes?.Name,
                value.attributes?.Description
            )
        ))
    } catch (error) {
        console.error(error)
    }
}

const saleMapper = (data) => {
    if (!data) return
    try {
        return data?.map(value => (
            new Sale(
                value.id,
                new Date(value.attributes.createdAt)
                    .toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    }),
                value.attributes.noFactura,
                Status[value.attributes.estado],
                `${value.attributes.cliente.data?.attributes.nombre} ${value.attributes.cliente.data?.attributes.apellido}`,
                `${value.attributes.vendedor.data?.attributes.nombre} ${value.attributes.vendedor.data?.attributes.apellido}`,
                PayMethod[value.attributes.metodoPago],
                value.attributes.detalleVentas?.map(detail => (
                    new SaleDetail(
                        detail.id,
                        detail.producto?.data?.attributes.codigo,
                        detail.producto?.data?.attributes.nombre,
                        detail.cantidad,
                        detail.precio,
                        detail.descuento,
                        detail.isv
                    )
                ))
            )
        ))
    } catch (error) {
        console.error(error)
    }
}

const saleReportMapper = (data) => {
    if (!data) return
    try {
        return data?.map(value => {

            return {
                "No. Factura": value.attributes.noFactura,
                Fecha: new Date(value.attributes.createdAt)
                    .toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    }),
                Estado: value.attributes.estado,
                "Método de Pago": value.attributes.metodoPago,
                "Nombre Cliente": `${value.attributes.cliente.data?.attributes.nombre} ${value.attributes.cliente.data?.attributes.apellido}`,
                "Nombre Vendedor": `${value.attributes.vendedor.data?.attributes.nombre} ${value.attributes.vendedor.data?.attributes.apellido}`,
                Subtotal: value.attributes.detalleVentas?.reduce((acc, detail) => (acc + detail.cantidad * detail.precio), 0).toFixed(2).replace('.', ','),
                "Impuesto Total": value.attributes.detalleVentas?.reduce((acc, detail) => (acc + detail.cantidad * detail.precio * detail.isv), 0).toFixed(2).replace('.', ','),
                "Descuento Total": value.attributes.detalleVentas?.reduce((acc, detail) => (acc + detail.cantidad * detail.precio * detail.descuento), 0).toFixed(2).replace('.', ','),
                "Monto Total": value.attributes.detalleVentas?.reduce((acc, detail) => (acc + detail.cantidad * detail.precio * (1 + detail.isv - detail.descuento)), 0).toFixed(2).replace('.', ',')

            }
        })
    } catch (error) {
        console.error(error)
    }
}

const productMapper = (data) => {
    if (!data) return
    try {
        return data?.map(value => {
            return new Product(
                value.id,
                value.attributes?.nombre,
                value.attributes?.codigo,
                value.attributes?.descripcion,
                value.attributes?.marca?.data?.attributes?.nombre,
                value.attributes?.isv,
                value.attributes?.descuento,
                value.attributes?.precio_venta,
                value.attributes?.precio_compra,
                value.attributes?.existencia,
                value.attributes?.img?.data?.attributes?.url ? value.attributes?.img?.data?.attributes?.url : value.attributes?.img?.data?.attributes?.formats?.thumbnail?.url,
                productStatus[(value.attributes?.activo)?.toString()]
            )
        })
    } catch (error) {
        console.error(error.message)
        console.log(error.stack)
    }
}

const userMapper = (data) => {
    if (!data) return
    try {
        return data.map(value => {
            return new User(
                value.id,
                value.email,
                value.nombre,
                value.apellido,
                value.RTN,
                value.jurado,
                value.role?.id,
                value.role?.name
            )
        })
    } catch (error) {
        console.error(error)
    }
}

export {
    categoryMapper,
    saleMapper,
    saleReportMapper,
    productMapper,
    userMapper,
}