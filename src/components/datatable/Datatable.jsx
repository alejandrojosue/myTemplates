import { useState } from 'react'
import Button from '@mui/material/Button'
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridRowModes,
  GridActionsCellItem,
  GridRowEditStopReasons,
  GridCellEditStopReasons,
  GridCellEditStartReasons,
} from '@mui/x-data-grid'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import SaveIcon from '@mui/icons-material/Save'
import SaveAlt from '@mui/icons-material/SaveAlt'
import CancelIcon from '@mui/icons-material/Close'

function CustomToolbar(props) {
  const { setRows, setRowModesModel, rowsCount, columns } = props
  const handleClick = () => {
    const initialValues = {};
    columns.forEach(column => {
      const { field, valueGetter } = column;
      if (!valueGetter) {
        initialValues[field] = '';
      } //else if (type === 'number') initialValues[field] = 0
    })

    initialValues.id = rowsCount + 1
    setRows((oldRows) => [{ ...initialValues, isNew: true }, ...oldRows])
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [initialValues.id]: { mode: GridRowModes.Edit, fieldToFocus: columns[1].field },
    }))
  }
  return (
    <GridToolbarContainer>
      {/* <GridToolbarExport
        csvOptions={{
          fileName: 'exportCSV',
          delimiter: '',
          utf8WithBom: true,
        }}
        printOptions={{
          hideFooter: true,
          hideToolbar: true,
        }}
      /> */}
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Agregar Item
      </Button>
      <Button color="primary" startIcon={<SaveAlt />} onClick={() => { }}>
        Guardar
      </Button>
    </GridToolbarContainer>
  )
}

export default function Datatable({ _rows = [], _columns = [], _loading = false }) {

  const [rows, setRows] = useState(_rows)
  // const [loading, setLoading] = useState(false)
  const [rowModesModel, setRowModesModel] = useState({})

  const validateNotNull = (obj) => {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (obj[key].toString().trim() === '') {
          return key
        }
      }
    }
    return null
  }

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridCellEditStopReasons.cellFocusOut) {
      event.defaultMuiPrevented = true
    }
  }

  const handleEditKeyDown = (params, e) => {
    if (params.field === _columns[1].field) {

    }
  }

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } })
  }

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } })
  }

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id))
  }

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    })

    const editedRow = rows.find((row) => row.id === id)
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id))
    }
  }

  const processRowUpdate = (newRow) => {
    const fieldEmpty = validateNotNull(newRow)
    const updatedRow = { ...newRow, isNew: false }
    if (fieldEmpty) {
      // alert(`Falta llenar el campo ${fieldEmpty.toUpperCase()}`)
      alert('Datos inválidos!')
      return
    }
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)))
    return updatedRow
  }

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel)
  }

  const ACTIONS = [{
    field: 'actions',
    type: 'actions',
    headerName: '',
    width: 100,
    cellClassName: 'actions',
    getActions: ({ id }) => {
      const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit

      if (isInEditMode) {
        return [
          <GridActionsCellItem
            icon={<SaveIcon />}
            label="Save"
            className='text-primary'
            onClick={handleSaveClick(id)}
          />,
          <GridActionsCellItem
            icon={<CancelIcon />}
            label="Cancel"
            className="text-secondary"
            onClick={handleCancelClick(id)}
            color="inherit"
          />,
        ]
      }

      return [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          className="text-success"
          onClick={handleEditClick(id)}
          color="inherit"
        />,
        <GridActionsCellItem
          className="text-danger"
          icon={<DeleteIcon />}
          label="Delete"
          onClick={handleDeleteClick(id)}
          color="inherit"
        />,
      ]
    },
  }]
  return (
    <>
      <DataGrid style={{ height: 400, overflowX: 'scroll', overflowY: 'hidden' }}
        rows={rows}
        columns={_columns.concat(ACTIONS)}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        // onCellKeyDown={handleEditKeyDown}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: CustomToolbar
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel, rowsCount: rows.length, columns: _columns },
        }}
        // loading={loading}
        pageSizeOptions={[5]}
        // initialState={{
        //   ...rows.initialState,
        //   pagination: {
        //     paginationModel: { pageSize: 5, page: 0 }
        //   },
        // }}
        loading={_loading}
        // rowCount={100}
        // autoHeight 
        // checkboxSelection
        disableColumnMenu
        // disableColumnFilter
        // disableColumnSelector
        disableRowSelectionOnClick
      />
      <div className="row p-3">
        <div className="col-12 col-sm-4 col-lg-4"></div>
        <div className="col-12 col-sm-4 col-lg-4"></div>
        <div className="col-12 col-sm-4 col-lg-4 d-flex flex-column">
          <div className="d-flex justify-content-end">
            <span className="fw-bold fs-5 px-2 px-2">Subtotal: </span>
            <span className='fs-5 w-50'>L. {rows?.reduce((acc, value) => { return acc + value.quantity * value.unitPrice }, 0).toFixed(2)}</span>
          </div>
          <div className="d-flex justify-content-end">
            <span className="fw-bold fs-5 px-2">ISV: </span>
            <span className='fs-5 w-50'>L. {rows?.reduce((acc, value) => { return acc + value.quantity * value.unitPrice * value.tax }, 0).toFixed(2)}</span>
          </div>
          <div className="d-flex justify-content-end">
            <span className="fw-bold fs-5 px-2">Descuento: </span>
            <span className='fs-5 w-50'>L. {rows?.reduce((acc, value) => { return acc + value.quantity * value.unitPrice * value.discount }, 0).toFixed(2)}</span>
          </div>
          <div className="d-flex justify-content-end">
            <span className="fw-bold fs-5 px-2">Monto Total: </span>
            <span className='fs-5 w-50'>L. {rows?.reduce((acc, value) => { return acc + value.quantity * value.unitPrice * (1 + value.tax - value.discount) }, 0).toFixed(2)}</span>
          </div>
        </div>
      </div>
    </>
  )
}
