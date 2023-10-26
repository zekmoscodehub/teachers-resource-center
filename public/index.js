// Example data for uploaded files - replace with your actual data
const exampleData = [
    { fileName: 'example.pdf' },
    { fileName: 'sample.docx' },
    // Add more data as needed
];

window.addEventListener('load', function () {
    const fileList = document.getElementById('fileList');

    exampleData.forEach(fileData => {
        const row = document.createElement('tr');
        const fileNameCell = document.createElement('td');
        const downloadButtonCell = document.createElement('td');
        const downloadButton = document.createElement('a');

        fileNameCell.textContent = fileData.fileName;
        downloadButton.textContent = 'Download';
        downloadButton.href = 'URL_TO_DOWNLOAD_FILE'; // Replace with the actual download URL

        downloadButtonCell.appendChild(downloadButton);
        row.appendChild(fileNameCell);
        row.appendChild(downloadButtonCell);
        fileList.appendChild(row);
    });
});
