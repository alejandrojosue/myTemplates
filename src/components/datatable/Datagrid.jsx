import { DataGrid } from '@mui/x-data-grid'
// eslint-disable-next-line 
const DataGrid_ = ({ columns, rows = [], paginationOptions = [5, 25, 50] }) => {
    // const handleValueSetter = (params) => console.log('Value set:', params)
    return (
        <div className='w-100' style={{ height: '390px' }}>
            <DataGrid
                rows={rows}
                // eslint-disable-next-line 
                columns={columns.map((column) => ({
                    ...column,
                    valueGetter: (params) => params.row[column.field],
                    // valueSetter: handleValueSetter,
                }))}
                pageSizeOptions={paginationOptions}
                initialState={{
                    ...rows.initialState,
                    pagination: {
                        paginationModel: { pageSize: 5, page: 0 }
                    },
                }}
                disableRowSelectionOnClick
            />
        </div>
    )
}

export default DataGrid_
