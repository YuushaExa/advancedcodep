// script.js
let files = {};
let currentFile = null;

function createFile() {
    const fileName = prompt("Enter file name:");
    if (fileName) {
        files[fileName] = "";
        currentFile = fileName;
        updateFileList();
        updateEditor();
    }
}

function updateFileList() {
    const fileList = document.getElementById("file-list");
    fileList.innerHTML = "";
    for (let file in files) {
        const li = document.createElement("li");
        li.textContent = file;
        li.onclick = () => selectFile(file);
        fileList.appendChild(li);
    }
}

function selectFile(file) {
    currentFile = file;
    updateEditor();
}

function updateEditor() {
    const editor = document.getElementById("editor");
    if (currentFile) {
        editor.value = files[currentFile];
    }
}

function updateContent() {
    const editor = document.getElementById("editor");
    if (currentFile) {
        files[currentFile] = editor.value;
    }
    updateOutput();
}

function updateOutput() {
    const output = document.getElementById("output").contentWindow.document;
    output.open();
    output.write(files[currentFile] || "");
    output.close();
}

document.addEventListener("DOMContentLoaded", () => {
    createFile();
});
