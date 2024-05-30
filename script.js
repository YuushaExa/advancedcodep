let files = {};

function createFile() {
    const fileName = document.getElementById('new-file-name').value;
    if (fileName) {
        files[fileName] = '';
        displayFiles();
        document.getElementById('new-file-name').value = '';
    }
}

function createFolder() {
    const folderName = document.getElementById('new-folder-name').value;
    if (folderName) {
        files[folderName] = {};
        displayFiles();
        document.getElementById('new-folder-name').value = '';
    }
}

function displayFiles() {
    const fileList = document.getElementById('file-list');
    fileList.innerHTML = '';
    for (let file in files) {
        const li = document.createElement('li');
        li.textContent = file;
        li.onclick = () => openFile(file);
        fileList.appendChild(li);
    }
}

function openFile(fileName) {
    const editor = document.getElementById('editor');
    editor.value = files[fileName];
    editor.oninput = () => {
        files[fileName] = editor.value;
        updateIframe();
    };
    updateIframe();
}

function updateIframe() {
    const iframe = document.getElementById('webview');
    iframe.srcdoc = document.getElementById('editor').value;
}

document.addEventListener('DOMContentLoaded', displayFiles);
