import './products.scss'
import { Link, useParams } from 'react-router-dom'
import useProductService from '../../hooks/useProductService'
import Layout from '../../layout/Layout'
import { useEffect } from 'react'
import lang from '../../languages/index'

const View = () => {
    const { products, loading, error, getById } = useProductService()
    const { id } = useParams();
    // eslint-disable-next-line
    useEffect(() => { getById(id) }, [id])
    return (
        <Layout title={`${lang.pages.Products.View.title}${id}`} loading={loading} error={error}>
            <div className="row  px-3">
                <div className="col-12">
                    <div className="row">
                        <div className="detail-title d-flex justify-content-end">
                            <p className="title"></p>
                            <label className="status fw-bold d-flex">
                                {lang.pages.Products.View.label.status}: &nbsp;
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
                            <label htmlFor="nombre">{lang.pages.Products.View.label.name}:</label>
                            <input className="input1" type="text" value={products.nombre && products.nombre} readOnly />
                        </div>
                        <div className="form col-12 col-sm-6 col-lg-4">
                            <label htmlFor="id">{lang.pages.Products.View.label.sku}:</label>
                            <input className="input1" type="text" value={products.codigo && products.codigo} readOnly />
                        </div>
                        <div className="form col-12 col-sm-6 col-lg-4">
                            <label htmlFor="precioc">{lang.pages.Products.View.label['purchase-price']}:</label>
                            <input className="input1" type="number" value={products.precio_compra && products.precio_compra} readOnly />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form col-12 col-sm-12 col-lg-8">
                            <label className="label1" htmlFor="descripcion">{lang.pages.Products.View.label.description}:</label>
                            <input className="input2" type="text" value={products.descripcion && products.descripcion} readOnly />
                        </div>
                        <div className="form col-12 col-sm-12 col-lg-4">
                            <label className="label1" htmlFor="preciov">{lang.pages.Products.View.label['sale-price']}:</label>
                            <input className="input3" type="number" value={products.precio_venta && products.precio_venta} readOnly />
                        </div>
                    </div>
                    <div className="row">
                        <img className="col-12 col-sm-12 col-lg-8" src={products && (products.imgUrl)} alt="Mi Imagen" />
                        <div className="col-12 col-sm-12 col-lg-4">
                            <div className="row">
                                <div className="form col-6">
                                    <label htmlFor="isv">{lang.pages.Products.View.label.tax}:</label>
                                    <input type="number" value={products.isv && products.isv} readOnly />
                                </div>
                                <div className="form col-6">
                                    <label htmlFor="descuento">{lang.pages.Products.View.label.discount}:</label>
                                    <input type="number" value={products.descuento && products.descuento} readOnly />
                                </div>
                            </div>
                            <div className="form w-100">
                                <label htmlFor="existencia">{lang.pages.Products.View.label.stock}:</label>
                                <input type="number" value={products.existencia && products.existencia} readOnly />
                            </div>
                            <div className="form w-100">
                                <label className="label3" htmlFor="model">{lang.pages.Products.View.label.model}:</label>
                                <input type="text" value={products.modelo && products.modelo} readOnly />
                            </div>
                            <div className="form w-100">
                                <label htmlFor="marca">{lang.pages.Products.View.label.brand}:</label>
                                <input type="text" value={products.marca && products.marca.nombre} readOnly />
                            </div>
                            <Link className="text-decoration-none btn btn-outline-primary m-auto w-100" to="/products">
                                {lang.pages.Products.View.Link}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default View