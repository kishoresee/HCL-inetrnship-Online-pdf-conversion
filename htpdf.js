document.getElementById('download').addEventListener('click', function () {
  const content = document.getElementById('content')
  const filename = 'converted.pdf'

  html2pdf().from(content).save(filename)
})
