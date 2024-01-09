import './productView.scss'
import { Link, useParams } from 'react-router-dom'
import useProductService from '../../hooks/useProductService'
import Layout from '../../layout/Layout'
import { useEffect } from 'react';
const ProductView = () => {
    const { products, loading, error, getById } = useProductService()
    const { id } = useParams();
    useEffect(() => { getById(id) }, [])
    return (
        <Layout title={`Producto #${id}`} loading={loading} error={error}>
            <div className="details">
                <div className="detail-title">
                    <p className="title"></p>
                    <label className="status">
                        Activo: &nbsp;
                        <input
                            type="checkbox"
                            checked={products.length && products[0].activo}
                            className="chekbox1"
                            readOnly />
                    </label>
                </div>
                <div className="detail-content col-100">
                    <div className="form">
                        <label htmlFor="id">Código:</label>
                        <input className="input1" type="text" value={products.length && products[0].SKU} readOnly />
                    </div>
                    <div className="form">
                        <label htmlFor="nombre">Nombre:</label>
                        <input className="input1" type="text" value={products.length && products[0].nombre} readOnly />
                    </div>
                    <div className="form">
                        <label htmlFor="precioc">Precio de Compra:</label>
                        <input className="input1" type="number" value={products.length && products[0].precio_compra} readOnly />
                    </div>
                    <div className="form">
                        <label className="label1" htmlFor="descripcion">Descripción:</label>
                        <input className="input2" type="text" value={products.length && products[0].descripcion} readOnly />
                    </div>
                    <div className="form">
                        <label className="label1" htmlFor="preciov">Precio de venta:</label>
                        <input className="input3" type="number" value={products.length && products[0].precio_venta} readOnly />
                    </div>
                    <img className="col-50" src={products.length && (products[0].imgUrl)} alt="Mi Imagen" />
                    <div className="detail-content">
                        <div className="form">
                            <label className="label3" htmlFor="model">Modelo:</label>
                            <input type="text" value={''} readOnly />
                        </div>
                        <div className="form">
                            <label htmlFor="isv">ISV:</label>
                            <input type="number" value={products.length && products[0].isv} readOnly />

                        </div>
                        <div className="form">
                            <label htmlFor="descuento">Descuento:</label>
                            <input type="number" value={products.length && products[0].descuento} readOnly />
                        </div>
                        <div className="form">
                            <label htmlFor="existencia col-30">Existencia:</label>
                            <input type="number" value={products.length && products[0].existencia} readOnly />
                        </div>
                        <div className="form">
                            <label htmlFor="marca">Marca:</label>
                            <input type="text" value={''} readOnly />
                        </div>
                        <Link className="btn" to="/products">
                            Regresar
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ProductView