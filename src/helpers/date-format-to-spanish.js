const dateFormatToSpanish = (_date = '', isEnd = false) => {
    const date = new Date(_date)
    const daysByMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    const monthName = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    const month = date.getMonth()
    const year = date.getFullYear()
    if (isEnd)
        return `${daysByMonth[month]} de ${monthName[month]} del ${year} `
    return `01 de ${monthName[month]} del ${year} `

}
export default dateFormatToSpanish