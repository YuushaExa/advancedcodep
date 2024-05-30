import { WebContainer } from '@webcontainer/api';

window.addEventListener('load', async () => {
  // Boot the WebContainer
  const webcontainerInstance = await WebContainer.boot();

  // Mount files into the WebContainer
  await webcontainerInstance.mount({
    'index.js': {
      file: {
        contents: `
          const http = require('http');

          const server = http.createServer((req, res) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Hello, World!\\n');
          });

          server.listen(3000, '0.0.0.0', () => {
            console.log('Server running at http://0.0.0.0:3000/');
          });
        `,
      },
    },
    'package.json': {
      file: {
        contents: JSON.stringify({
          name: 'webcontainer-example',
          version: '1.0.0',
          main: 'index.js',
          scripts: {
            start: 'node index.js',
          },
          dependencies: {},
        }),
      },
    },
  });

  // Install dependencies
  let installProcess = await webcontainerInstance.spawn('npm', ['install']);
  await installProcess.exit;

  // Start the server
  let startProcess = await webcontainerInstance.spawn('npm', ['start']);
  startProcess.output.pipeTo(
    new WritableStream({
      write(data) {
        console.log(data);
      },
    })
  );
});
