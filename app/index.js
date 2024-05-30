const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';
let previewCounter = 0;

app.use(bodyParser.json());

app.post('/preview', (req, res) => {
    const content = req.body.content;
    previewCounter++;
    const previewFilename = `preview-${previewCounter}.html`;
    const previewFilePath = path.join(__dirname, previewFilename);

    fs.writeFile(previewFilePath, content, (err) => {
        if (err) {
            console.error('Error writing preview file:', err);
            res.status(500).send({ error: 'Failed to generate preview' });
        } else {
            res.send({ url: `http://${HOST}:${PORT}/${previewFilename}` });
        }
    });
});

app.use(express.static(__dirname));

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

module.exports = app;
