import './products.scss'
import { Link, useParams } from 'react-router-dom'
import useProductService from '../../hooks/useProductService'
import Layout from '../../layout/Layout'
import { useEffect } from 'react';
const View = () => {
    const { products, loading, error, getById } = useProductService()
    const { id } = useParams();
    // eslint-disable-next-line
    useEffect(() => { getById(id) }, [id])
    return (
        <Layout title={`Producto #${id}`} loading={loading} error={error}>
            <div className="row  px-3">
                <div className="col-12">
                    <div className="row">
                        <div className="detail-title d-flex justify-content-end">
                            <p className="title"></p>
                            <label className="status fw-bold d-flex">
                                Activo: &nbsp;
                                <input
                                    type="checkbox"
                                    checked={products.activo && products.activo}
                                    className="chekbox1"
                                    readOnly />
                            </label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form col-12 col-sm-12 col-lg-4">
                            <label htmlFor="nombre">Nombre:</label>
                            <input className="input1" type="text" value={products.nombre && products.nombre} readOnly />
                        </div>
                        <div className="form col-12 col-sm-6 col-lg-4">
                            <label htmlFor="id">Código:</label>
                            <input className="input1" type="text" value={products.codigo && products.codigo} readOnly />
                        </div>
                        <div className="form col-12 col-sm-6 col-lg-4">
                            <label htmlFor="precioc">Precio de Compra:</label>
                            <input className="input1" type="number" value={products.precio_compra && products.precio_compra} readOnly />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form col-12 col-sm-12 col-lg-8">
                            <label className="label1" htmlFor="descripcion">Descripción:</label>
                            <input className="input2" type="text" value={products.descripcion && products.descripcion} readOnly />
                        </div>
                        <div className="form col-12 col-sm-12 col-lg-4">
                            <label className="label1" htmlFor="preciov">Precio de venta:</label>
                            <input className="input3" type="number" value={products.precio_venta && products.precio_venta} readOnly />
                        </div>
                    </div>
                    <div className="row">
                        <img className="col-12 col-sm-12 col-lg-8" src={products && (products.imgUrl)} alt="Mi Imagen" />
                        <div className="col-12 col-sm-12 col-lg-4">
                            <div className="row">
                                <div className="form col-6">
                                    <label htmlFor="isv">ISV:</label>
                                    <input type="number" value={products.isv && products.isv} readOnly />
                                </div>
                                <div className="form col-6">
                                    <label htmlFor="descuento">Descuento:</label>
                                    <input type="number" value={products.descuento && products.descuento} readOnly />
                                </div>
                            </div>
                            <div className="form w-100">
                                <label htmlFor="existencia">Existencia:</label>
                                <input type="number" value={products.existencia && products.existencia} readOnly />
                            </div>
                            <div className="form w-100">
                                <label className="label3" htmlFor="model">Modelo:</label>
                                <input type="text" value={products.modelo && products.modelo} readOnly />
                            </div>
                            <div className="form w-100">
                                <label htmlFor="marca">Marca:</label>
                                <input type="text" value={products.marca && products.marca.nombre} readOnly />
                            </div>
                            <Link className="text-decoration-none btn btn-outline-primary m-auto w-100" to="/products">
                                Regresar
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default View