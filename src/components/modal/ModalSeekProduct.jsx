import Datatable from "../table/Table"

const ModalSeekProduct = ({ handleProductName = null }) => {

    return <>
        <div className="modal fade" id="ModalSeekProduct" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">
                            Buscar Producto
                        </h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form >
                            <div>
                                <label className="col-form-label">Nombre del Producto:</label>
                                <input type="text" required
                                    pattern="[a-zA-Z]+" className="form-control mt-1" id="product-name" placeholder="Nombre del Producto" />
                            </div>
                            <div>
                                <label className="col-form-label">Productos que Coinciden:</label>
                                <Datatable
                                    columnsNames={[
                                        'CODIGO', 'PRODUCTO'
                                    ]}
                                    rows={[
                                        {
                                            CODIGO: 12345678909876,
                                            PRODUCTO: 'Product 1d  daisdiuasdiasbdoibasidiuasiudsa final'
                                        },
                                        {
                                            CODIGO: 12345678909876,
                                            PRODUCTO: 'Product 1d  daisdiuasdiasbdoibasidiuasiudsa final'
                                        },
                                        {
                                            CODIGO: 12345678909876,
                                            PRODUCTO: 'Product 1d  daisdiuasdiasbdoibasidiuasiudsa final'
                                        },
                                        {
                                            CODIGO: 12345678909876,
                                            PRODUCTO: 'Product 1d  daisdiuasdiasbdoibasidiuasiudsa final'
                                        },
                                        {
                                            CODIGO: 12345678909876,
                                            PRODUCTO: 'Product 1d  daisdiuasdiasbdoibasidiuasiudsa final'
                                        },
                                        {
                                            CODIGO: 12345678909876,
                                            PRODUCTO: 'Product 1d  daisdiuasdiasbdoibasidiuasiudsa final'
                                        },
                                        {
                                            CODIGO: 12345678909876,
                                            PRODUCTO: 'Product 1d  daisdiuasdiasbdoibasidiuasiudsa final'
                                        },
                                    ]}
                                />
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                <button type="submit" className="btn btn-primary">Procesar Venta</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default ModalSeekProduct