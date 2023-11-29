import * as React from 'react'
import Button from '@mui/material/Button'
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridRowModes,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Close'
import { useState } from 'react'

const initialRows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 10, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 11, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 12, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 13, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 14, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 16, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 17, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 18, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 19, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 20, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 21, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 22, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 23, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 24, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 25, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 26, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 27, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 28, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 29, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 30, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 15, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
]

function CustomToolbar(props) {
  const { setRows, setRowModesModel, rowsCount } = props
  const id = rowsCount + 1
  const handleClick = () => {
    setRows((oldRows) => [{ id, lastName: '', firstName: '', age: '', isNew: true }, ...oldRows])
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'firstName' },
    }))
  }
  return (
    <GridToolbarContainer>
      <GridToolbarExport
        csvOptions={{
          fileName: 'exportCSV',
          delimiter: '',
          utf8WithBom: true,
        }}
        printOptions={{
          hideFooter: true,
          hideToolbar: true,
        }}
      />
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  )
}

export default function Datatable({ _rows = [], _columns = [] }) {

  const [rows, setRows] = useState(initialRows)
  const [loading, setLoading] = useState(false)
  const [rowModesModel, setRowModesModel] = useState({})

  const validateNotNull = (obj) => {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (obj[key] === '') {
          return key
        }
      }
    }
    return null
  }

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true
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
      alert(`Falta llenar el campo ${fieldEmpty.toUpperCase()}`)
      return
    }
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)))
    alert('Tabla Actualizada!')
    return updatedRow
  }

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel)
  }

  const COLUMNS = [
    { field: 'id', headerName: 'ID', width: 10, hideable: false },
    {
      field: 'firstName',
      headerName: 'First name',
      width: 150,
      editable: true
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 150,
      editable: true,
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
      field: 'Total',
      headerName: 'Total',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.age * 2 || 0}`,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
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
    },
  ]
  // const COLUMNS = [
  //   {
  //     field: 'id', headerName: 'ID',
  //     sortable: false,
  //     width: 10
  //   },
  //   {
  //     field: 'sku',
  //     headerName: 'Código',
  //     width: 100,
  //     editable: true,
  //     sortable: false,
  //   },
  //   {
  //     field: 'name',
  //     headerName: 'Nombre Producto',
  //     width: 150,
  //     sortable: false,
  //     editable: true,
  //   },
  //   {
  //     field: 'quantity',
  //     headerName: 'Cantidad',
  //     type: 'number',
  //     sortable: false,
  //     width: 110,
  //     editable: true,
  //   },

  //   {
  //     field: 'unitPrice',
  //     headerName: 'Precio',
  //     type: 'number',
  //     sortable: false,
  //     width: 110,
  //     editable: true,
  //   },
  //   {
  //     field: 'subtotal',
  //     headerName: 'SubTotal',
  //     description: 'This column has a value getter and is not sortable.',
  //     type: 'number',
  //     sortable: false,
  //     width: 160,
  //     valueGetter: (params) =>
  //       `L. ${params.row.quantity * params.row.unitPrice * 1.15 || 0}`,
  //   },
  //   {
  //     field: 'actions',
  //     type: 'actions',
  //     headerName: 'Actions',
  //     width: 100,
  //     cellClassName: 'actions',
  //     getActions: ({ id }) => {
  //       const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit

  //       if (isInEditMode) {
  //         return [
  //           <GridActionsCellItem
  //             icon={<SaveIcon />}
  //             label="Save"
  //             className='text-primary'
  //             onClick={handleSaveClick(id)}
  //           />,
  //           <GridActionsCellItem
  //             icon={<CancelIcon />}
  //             label="Cancel"
  //             className="text-secondary"
  //             onClick={handleCancelClick(id)}
  //             color="inherit"
  //           />,
  //         ]
  //       }

  //       return [
  //         <GridActionsCellItem
  //           icon={<EditIcon />}
  //           label="Edit"
  //           className="text-success"
  //           onClick={handleEditClick(id)}
  //           color="inherit"
  //         />,
  //         <GridActionsCellItem
  //           className="text-danger"
  //           icon={<DeleteIcon />}
  //           label="Delete"
  //           onClick={handleDeleteClick(id)}
  //           color="inherit"
  //         />,
  //       ]
  //     },
  //   },
  // ]

  // setInterval(() => {
  //   setLoading(false)
  //   setRows([...initialRows])
  // }, 5000)
  document.title = 'Datatable'
  return (
    <DataGrid style={{ height: 400, overflowX: 'scroll', overflowY: 'hidden' }}
      rows={rows}
      columns={COLUMNS}
      editMode="row"
      rowModesModel={rowModesModel}
      onRowModesModelChange={handleRowModesModelChange}
      onRowEditStop={handleRowEditStop}
      processRowUpdate={processRowUpdate}
      slots={{
        toolbar: CustomToolbar
      }}
      slotProps={{
        toolbar: { setRows, setRowModesModel, rowsCount: rows.length },
      }}
      loading={loading}
      pageSizeOptions={[5, 10, 25, 100]}
      initialState={{
        ...rows.initialState,
        pagination: {
          paginationModel: { pageSize: 5, page: 0 }
        },
      }}
    // rowCount={100}
    // autoHeight 
    // checkboxSelection
    // disableColumnMenu
    // disableColumnFilter
    // disableColumnSelector
    />
  )
}
