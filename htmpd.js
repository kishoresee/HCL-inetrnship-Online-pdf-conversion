document
  .getElementById('convertBtn')
  .addEventListener('click', async function () {
    const fileInput = document.getElementById('htmlFileInput')
    if (fileInput.files.length === 0) {
      alert('Please choose an HTML file.')
      return
    }
    const htmlFile = fileInput.files[0]
    const content = await htmlFile.text()
    const filename = 'converted.pdf'
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = content
    html2pdf().from(tempDiv).save(filename)
  })
