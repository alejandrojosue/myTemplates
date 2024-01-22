const dataChartReport = (data, key, field) => {
    const months = ['', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    const getMonthIndex = (date) => parseInt(date.split('/')[1]);
    const getInvoiceTotal = (invoice) => parseFloat(invoice['Monto Total'].replace(',', '.'));

    const filteredData = data.filter(value => value.Estado === 'Pagada' && value[key] === field);

    const monthArrays = Array.from({ length: 4 }, () => []);

    filteredData.forEach(invoice => {
        const monthIndex = getMonthIndex(invoice.Fecha);
        const monthArray = monthArrays[monthIndex === new Date().getMonth() ? 0 : 4 - (new Date().getMonth() - monthIndex)];
        monthArray.push(getInvoiceTotal(invoice));
    });

    const dataChart = monthArrays.map((monthArray, index) => ({
        name: index === 0 ? months[new Date().getMonth()] : months[new Date().getMonth() - index],
        Total: monthArray.reduce((acc, value) => acc + value, 0),
    }));

    return dataChart;
};

export default dataChartReport;
