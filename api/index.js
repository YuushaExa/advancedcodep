const express = require('express');
const path = require('path');
const fs = require('fs');
const os = require('os');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/preview', (req, res) => {
    const { html, css, js } = req.body;
    const content = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Preview</title>
            <style>${css}</style>
        </head>
        <body>
            ${html}
            <script>${js}<\/script>
        </body>
        </html>
    `;
    const filePath = path.join(__dirname, 'public', 'preview.html');
    fs.writeFileSync(filePath, content, 'utf8');
    const networkInterfaces = os.networkInterfaces();
    const addresses = Object.values(networkInterfaces).flat().filter(details => details.family === 'IPv4' && !details.internal);
    const ip = addresses.length ? addresses[0].address : 'localhost';
    res.send({ url: `http://${ip}:${port}/preview.html` });
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
