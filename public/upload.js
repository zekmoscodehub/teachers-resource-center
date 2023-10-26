// Initialize the database
var db = window.sqlitePlugin.openDatabase({ name: 'my.db', location: 'default' });

// Create the 'uploads_table' if it doesn't exist
db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS uploads_table (id INTEGER PRIMARY KEY, fileName TEXT, uploadDate TEXT)');
});

// Function to add a new row to the file list table
function addFileToTable(uploadDate, fileName) {
    const fileList = document.getElementById('fileList');
    const newRow = fileList.insertRow(-1);

    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);

    cell1.innerHTML = uploadDate;
    cell2.innerHTML = fileName;

    // Add a "Delete" button for each file
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function () {
        // Handle file deletion here
        // You can remove the row from the table and delete the file from the database
        newRow.remove();
    });
    cell3.appendChild(deleteButton);
}

// Handle form submission for file upload
document.getElementById('uploadForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const fileInput = document.getElementById('fileInput');
    const fileList = document.getElementById('fileList');

    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const uploadDate = new Date().toLocaleString();

        db.transaction(function (tx) {
            tx.executeSql('INSERT INTO uploads_table (fileName, uploadDate) VALUES (?, ?)', [file.name, uploadDate], function () {
                // Successfully inserted into the database
                addFileToTable(uploadDate, file.name);
                fileInput.value = ''; // Clear the file input
            }, function (tx, error) {
                // Handle database error
                console.error('Error:', error);
            });
        });
    }
});
