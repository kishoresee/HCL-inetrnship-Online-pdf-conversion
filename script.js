const pdfFileInput = document.getElementById('pdf-file-input');
const convertButton = document.getElementById('convert-btn');

convertButton.addEventListener('click', convertToWord);

async function convertToWord() {
  const pdfFile = pdfFileInput.files[0];

  if (pdfFile) {
    const pdfBuffer = await pdfFile.arrayBuffer();
    const textContent = await getTextFromPdf(pdfBuffer);

    const htmlContent = `
      <h1>Converted PDF Content</h1>
      <p>${textContent}</p>
    `;

    const wordBlob = new Blob([htmlContent], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(wordBlob);
    downloadLink.download = 'converted.docx';
    downloadLink.click();
  }
}

async function getTextFromPdf(pdfBuffer) {
  const pdf = await pdfjsLib.getDocument({ data: pdfBuffer }).promise;
  const textContent = [];

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();
    
    for (const item of content.items) {
      textContent.push(item.str);
    }
  }

  return textContent.join('\n');
}
