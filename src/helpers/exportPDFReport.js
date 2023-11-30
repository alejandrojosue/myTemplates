import jsPDF from 'jspdf'
import 'jspdf-autotable'
const exportPDFReport = (data, title) => {
    if (!data.length) return
    const columns = Object.keys(data[0])
    const doc = new jsPDF({ orientation: 'l' })
    doc.setFontSize(18)
    doc.text(title, 10, 10)
    const rows = data.map(row =>
        (columns.map(column => row[column]))
    )
    doc.autoTable({
        startY: 20,
        head: [columns],
        body: rows,
    })
    doc.save(title)
}

export default exportPDFReport