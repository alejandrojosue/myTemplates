import { useState } from "react"
import { userMapper } from "../../mapper/mapper"
import { PayMethod, Status } from "../../models/Sale"

const ModalPay = ({ amount, rows, data, handleEndpoint, handleSendData, handleMethod }) => {
    const [customerID, setCustomerID] = useState('')
    const [customerRTN, setCustomerRTN] = useState('')
    const [customerName, setCustomerName] = useState('')

    const handleCustomer = e => {
        setCustomerName('')
        if ((e.target.value.trim()).length === 14) {
            handleEndpoint(`users?populate=role&filters[role][name][$eq]=Clientes&filters[blocked]=false&filters[confirmed]=true&filters[RTN][$eq]=${(e.target.value).trim()}`)
            const customer = (data && data.length) ? userMapper(data) : null
            if (customer && customer[0].firstName) {
                setCustomerID(customer[0].id)
                setCustomerRTN(customer[0].rtn)
                setCustomerName(customer[0].firstName + ' ' + customer[0].lastName)
            } else setCustomerName('')
        }
    }

    const handleSelect = e => {
        if (e.target.value !== PayMethod.Efectivo) {
            document.getElementById('payment-money').value = amount
            document.querySelector('#payment-money').disabled = true
            document.getElementById('change-money').value = (0).toFixed(2)
        } else {
            document.querySelector('#payment-money').disabled = false
            document.getElementById('payment-money').value = (0).toFixed(2)
        }
    }

    const handleProcess = (e) => {
        e.preventDefault()
        if (!rows.length) {
            alert('No ha añadido ningún producto aún!')
            return
        }

        if (!PayMethod[document.querySelector('#payment-method').value]) {
            alert('Método de Pago no Admitido! \n Debe recargar la página para reconfigurar los métodos de pago.')
            return
        }
        document.querySelector('#customer-id').disabled = true
        handleMethod('POST')
        handleSendData({
            data: {
                noFactura: /*id_Deleted = */ 33,
                cliente: {
                    id: parseInt(customerID)
                },
                metodoPago: PayMethod[document.querySelector('#payment-method').value],
                estado: Status.Pagada,
                vendedor: {
                    id: /*Carlos = */ 7
                },
                detalleVentas: rows.map(({ productID, quantity, unitPrice, tax, discount }) => {
                    if ([productID, quantity, unitPrice, tax, discount].includes(undefined))
                        return
                    return {
                        cantidad: quantity,
                        precio: unitPrice,
                        descuento: discount,
                        isv: tax,
                        producto: {
                            id: parseInt(productID)
                        }
                    }
                })
            }
        })
        handleEndpoint('ventas')
    }

    return <>
        <div className="modal fade" id="ModalPay" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Total a Pagar: L. {amount}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleProcess}>
                            <div>
                                <label className="col-form-label">RTN Cliente:</label>
                                <input pattern="[0-9]+" title="Ingrese solamente números" type="text" required className="form-control"
                                    id="customer-id"
                                    maxLength={14}
                                    minLength={14}
                                    defaultValue={customerRTN}
                                    onChange={handleCustomer} />
                                <input type="text" required value={customerName} disabled className="form-control mt-1" id="customer-name" placeholder="Nombre de Cliente" />
                            </div>
                            <div>
                                <label className="col-form-label">Método de Pago (L.):</label>
                                <select required
                                    key={'select-efectivo-se'}
                                    className="form-select" id="payment-method"
                                    defaultValue="Efectivo"
                                    onChange={handleSelect}>
                                    {Object.values(PayMethod).map(value => <option value={value} key={`select-efectivo-se${value}`}>{value}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="col-form-label">Cantidad Recibida (L.):</label>
                                <input type="number"
                                    step="0.01"
                                    defaultValue={0}
                                    min={amount} required className="form-control"
                                    id="payment-money"
                                    onChange={e => document.getElementById('change-money').value = (e.target.value - amount).toFixed(2)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="col-form-label">Cantidad de Cambio (L.):</label>
                                <input type="number" disabled className="form-control" id="change-money" />
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

export default ModalPay