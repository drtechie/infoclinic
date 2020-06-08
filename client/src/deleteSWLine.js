const lineNumber = require('line-number');
const fs = require('fs');
const path = require('path')

const SWFile = path.resolve(__dirname, '../build/service-worker.js')
const data = fs.readFileSync(SWFile, 'utf8');

const re = /workbox.routing.registerNavigationRoute[^,]+/g;

const line = lineNumber(data, re)

let lines = data.split('\n');

lines.splice(line[0].number - 1, 4);

lines = lines.join('\n');

fs.writeFile(SWFile, lines, (err) => {
    // In case of a error throw err.
    if (err) throw err;
});

