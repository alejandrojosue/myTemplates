import './MuiDateRange.scss'
import 'rsuite/dist/rsuite-rtl.css'
import { DateRangePicker } from 'rsuite'

const MuiDateRange = ({ onDateRangeChange }) => {

    const handleDateRangeChange = (value) => onDateRangeChange(value)

    return (<DateRangePicker onChange={handleDateRangeChange} />)
}

export default MuiDateRange
