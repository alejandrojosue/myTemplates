import lang from '../languages/index'

const dateFormat = (isEnd = false) => {
    const daysByMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    const date = new Date()
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    const month = date.getMonth()
    const year = date.getFullYear()
    const endDatedate = new Date(year, month, daysByMonth[month], 0, 0, 0)
    const startDate = new Date(year, month, 1, 0, 0, 0)
    if (isEnd)
        return `${endDatedate.toLocaleDateString(lang.identifier, options)} `
    return `${startDate.toLocaleDateString(lang.identifier, options)} `

}
export default dateFormat