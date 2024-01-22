import { useState } from 'react'
import Button from '@mui/material/Button'
import PropTypes from 'prop-types'
import {
  DataGrid,
  GridToolbarContainer,
  // GridToolbarExport,
  GridRowModes,
  GridActionsCellItem,
  // GridRowEditStopReasons,
  GridCellEditStopReasons,
  // GridCellEditStartReasons,
} from '@mui/x-data-grid'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import SaveIcon from '@mui/icons-material/Save'
import SaveAlt from '@mui/icons-material/SaveAlt'
import CancelIcon from '@mui/icons-material/Close'

CustomToolbar.propTypes = {
  rows: PropTypes.array.isRequired,
  setRows: PropTypes.func.isRequired,
  setRowModesModel: PropTypes.func.isRequired,
  rowsCount: PropTypes.number.isRequired,
  columns: PropTypes.array.isRequired,
  handleAmount: PropTypes.func.isRequired,
};

function CustomToolbar(props) {
  const { rows, setRows, setRowModesModel, rowsCount, columns, handleAmount } = props
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

  const handleSave = () => {
    document.getElementById('btnModal').attributes['data-bs-target'].nodeValue = '#exampleModal'
    handleAmount(rows?.reduce((acc, value) => { return acc + value.quantity * value.unitPrice * (1 + value.tax - value.discount) }, 0).toFixed(2))
    document.querySelector('#payment-money').value = (0).toFixed(2)
    document.querySelector('#change-money').value = (0).toFixed(2)
    document.querySelector('#payment-method').value = 'Efectivo'
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
      <Button id='btnModal' color="primary" startIcon={<SaveAlt />}
        data-bs-toggle="modal" data-bs-target="#ModalPay"
        onClick={handleSave}>
        Guardar Pago Completo
      </Button>
      {/* <Button color="primary" startIcon={<SearchIcon />}
        data-bs-toggle="modal" data-bs-target="#ModalSeekProduct"
      >
        Buscar Producto
      </Button> */}
    </GridToolbarContainer>
  )
}

Datatable.propTypes = {
  rows: PropTypes.array.isRequired,
  setRows: PropTypes.func.isRequired,
  _columns: PropTypes.array.isRequired,
  handleAmount: PropTypes.func.isRequired,
  _loading: PropTypes.bool.isRequired,
};

export default function Datatable({ rows = [], setRows, _columns = [], handleAmount, _loading = false }) {

  // const [rows, setRows] = useState(_rows)
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

  // const handleEditKeyDown = (params, e) => {
  //   if (params.field === _columns[1].field) {

  //   }
  // }

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
            key={`GridActionsCellItem-SaveIcon-${id}`}
            onClick={handleSaveClick(id)}
          />,
          <GridActionsCellItem
            icon={<CancelIcon />}
            label="Cancel"
            key={`GridActionsCellItem-CancelIcon-${id}`}
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
          key={`GridActionsCellItem-EditIcon-${id}`}
          onClick={handleEditClick(id)}
          color="inherit"
        />,
        <GridActionsCellItem
          className="text-danger"
          icon={<DeleteIcon />}
          key={`GridActionsCellItem-DeleteIcon-${id}`}
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
          toolbar: { rows, setRows, setRowModesModel, rowsCount: rows.length, columns: _columns, handleAmount },
        }}
        // loading={loading}
        pageSizeOptions={[10]}
        initialState={{
          ...rows.initialState,
          pagination: {
            paginationModel: { pageSize: 10, page: 0 }
          },
        }}
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
        <div className="col-12 col-sm-2 col-lg-4"></div>
        <div className="col-12 col-sm-5 col-lg-4"></div>
        <div className="col-12 col-sm-5 col-lg-4 d-flex flex-column">
          <div className="d-flex justify-content-end">
            <span className="fw-bold fs-5 px-2 px-2">Subtotal: </span>
            <span className='fs-5 w-50'>L. {rows.reduce((acc, value) => { return acc + value.quantity * value.unitPrice }, 0).toFixed(2)}</span>
          </div>
          <div className="d-flex justify-content-end">
            <span className="fw-bold fs-5 px-2">ISV: </span>
            <span className='fs-5 w-50'>L. {rows.reduce((acc, value) => { return acc + value.quantity * value.unitPrice * value.tax }, 0).toFixed(2)}</span>
          </div>
          <div className="d-flex justify-content-end">
            <span className="fw-bold fs-5 px-2">Descuento: </span>
            <span className='fs-5 w-50'>L. {rows.reduce((acc, value) => { return acc + value.quantity * value.unitPrice * value.discount }, 0).toFixed(2)}</span>
          </div>
          <div className="d-flex justify-content-end">
            <span className="fw-bold fs-5 px-2">Monto Total: </span>
            <span className='fs-5 w-50'>L. {rows.reduce((acc, value) => { return acc + value.quantity * value.unitPrice * (1 + value.tax - value.discount) }, 0).toFixed(2)}</span>
          </div>
        </div>
      </div>
    </>
  )
}