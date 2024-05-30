const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const os = require('os');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
let previewCounter = 0;

app.use(cors());
app.use(bodyParser.json());

app.post('/preview', (req, res) => {
    const content = req.body.content;
    if (!content) {
        return res.status(400).send({ error: 'Content is required' });
    }

    previewCounter++;
    const previewFilename = `preview-${previewCounter}.html`;
    const previewFilePath = path.join(os.tmpdir(), previewFilename);

    fs.writeFile(previewFilePath, content, (err) => {
        if (err) {
            console.error('Error writing preview file:', err);
            return res.status(500).send({ error: 'Failed to generate preview' });
        } else {
            const previewUrl = `${req.protocol}://${req.get('host')}/preview/${previewFilename}`;
            console.log(`Preview generated: ${previewUrl}`);
            return res.send({ url: previewUrl });
        }
    });
});

app.use('/preview', express.static(os.tmpdir()));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
