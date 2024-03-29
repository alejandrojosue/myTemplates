import MuiDateRange from '../DateRange/MuiDateRange'
// eslint-disable-next-line 
const SalesFilters = ({ handlePage, handlePagination, handleDateRange, handleCustomer }) => {
    const _handleDateRange = (selectedDateRange) => {
        if (!selectedDateRange) {
            handlePagination()
        } else {
            handleDateRange(selectedDateRange[0].toString(), selectedDateRange[1].toString())
        }
    }
    return (
        <>
            <div className="col-12 col-sm-6 col-lg-3">
                <label className="form-label text-secondary w-100">Rango de Fecha:</label>
                <MuiDateRange onDateRangeChange={_handleDateRange} />
            </div>
            <div className="col-12 col-sm-6 col-lg-2">
                <label className="form-label text-secondary">RTN Cliente:</label>
                <input type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    onChange={(e) => {
                        if ((e.target.value).trim() !== '')
                            handleCustomer((e.target.value).trim())
                        else handlePagination()
                        handlePage(0)
                    }}
                    maxLength={14}
                    placeholder="Ingrese RTN Cliente" />
            </div></>
    )
}

export default SalesFilters