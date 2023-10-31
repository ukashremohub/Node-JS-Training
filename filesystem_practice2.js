const http = require('http');
const fs = require('fs');
const readline = require('readline');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.setHeader('Content-Type', 'text/html'); // Set the response content type to HTML

    const fileStream = fs.createReadStream('networklog.txt');
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    let record = ''; // Move the record variable here
    let records = [];
    let isHeaderPrinted = false;

    rl.on('line', (line) => {
      if (line.trim() === '') {
        if (!isHeaderPrinted) {
          isHeaderPrinted = true;
        } else {
          records.push(record);
        }
        record = '';
      } else {
        record += line + '\n';
      }
    });

    rl.on('close', () => {
      res.write('<html><head><title>Data Table</title></head><body>');
      res.write('<table border="1"><tr><th>ID</th><th>Source</th><th>Destination</th><th>Date</th><th>Status</th><th>Network</th></tr>');

      records.forEach((record) => {
        res.write('<tr>');
        displayRecord(record, res);
        res.write('</tr>');
      });

      res.write('</table></body></html>');
      res.end(); // Close the response stream when all data is sent
    });

    function displayRecord(record, response) {
      const lines = record.split('\n');
      const values = lines.map((line) => {
        const [, value] = line.split(':');
        return value;
      });
      values.forEach((value) => {
        response.write(`<td>${value}</td>`);
      });
    }
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
