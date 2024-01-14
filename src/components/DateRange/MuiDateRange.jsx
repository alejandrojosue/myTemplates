import './MuiDateRange.scss'
import 'rsuite/dist/rsuite-rtl.css'
import { DateRangePicker } from 'rsuite'

const MuiDateRange = ({ onDateRangeChange }) => {

    const handleDateRangeChange = (value) => onDateRangeChange(value)

    return (<DateRangePicker onChange={handleDateRangeChange} className='w-100' />)
}

export default MuiDateRange
