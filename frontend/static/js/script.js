// in your custom JavaScript file, e.g., script.js
document.addEventListener('DOMContentLoaded', function() {
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const uploadBtn = document.getElementById('upload-btn');

    dropZone.addEventListener('dragover', function(event) {
        event.preventDefault();
        if (event.dataTransfer.types.includes('Files')) {
            dropZone.classList.add('drag-over');
        }
    });

    dropZone.addEventListener('dragleave', function() {
        dropZone.classList.remove('drag-over');
    });

    dropZone.addEventListener('drop', function(event) {
        event.preventDefault();
        dropZone.classList.remove('drag-over');

        const files = event.dataTransfer.files;
        console.log(files)
        if (files.length > 0 && isAudioFile(files[0])) {
            fileInput.files = files;
        } else {
            alert('Please drop an audio file.');
        }
    });

    dropZone.addEventListener('click', function() {
        fileInput.click();
    });

    fileInput.addEventListener('change', function() {
        // Handle the uploaded file here
        if (isAudioFile(this.files[0])) {
            console.log('Audio file uploaded:', this.files[0]);
        } else {
            alert('Please select an audio file.');
            this.value = '';
        }
    });

    uploadBtn.addEventListener('click', function() {
        // Handle the upload process here
        if (fileInput.files.length > 0 && isAudioFile(fileInput.files[0])) {
            const formData = new FormData();
            formData.append('file', fileInput.files[0]);

            fetch('/upload', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(data => {
                console.log(data);
                // Reset the file input
                fileInput.value = '';
            })
            .catch(error => {
                console.error('Error uploading file:', error);
            });

        } else {
            alert('Please select an audio file.');
        }
    });

    function isAudioFile(file) {
        return file.type.startsWith('audio/');
    }
});
