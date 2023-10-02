document.addEventListener('DOMContentLoaded', function () {
  const csvFileInput = document.getElementById('csvFile')
  const convertBtn = document.getElementById('convertBtn')
  const pdfContent = document.getElementById('pdfContent')

  convertBtn.addEventListener('click', function () {
    const file = csvFileInput.files[0]
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          const data = results.data
          generatePDF(data)
        },
      })
    }
  })

  function generatePDF(data) {
    const doc = new jsPDF()

    let y = 10

    data.forEach((row) => {
      let x = 10
      for (const key in row) {
        if (row.hasOwnProperty(key)) {
          doc.text(x, y, `${key}: ${row[key]}`)
          y += 10
        }
      }
      y += 10
    })

    doc.save('converted.pdf')
    pdfContent.innerHTML = '<p>PDF generated and downloaded.</p>'
  }
})
