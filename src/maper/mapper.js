import Category from "../models/Category"
import Sale, { PayMethod, Status } from "../models/Sale"
import SaleDetail from "../models/SaleDetail"

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

export {
    categoryMapper,
    saleMapper
}