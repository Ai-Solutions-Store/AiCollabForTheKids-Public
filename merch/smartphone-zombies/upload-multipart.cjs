const fs = require('fs');
const https = require('https');
const path = require('path');

const PRINTFUL_TOKEN = '8w0aEaLpFfMLazoZCn1HLDammvgogflu6h4fDl8a';
const STORE_ID = '16490958';
const IMAGE_PATH = 'C:\\Users\\t55o\\Desktop\\238789305.png';

// Read image
const imageBuffer = fs.readFileSync(IMAGE_PATH);
const fileName = path.basename(IMAGE_PATH);

console.log('Image size:', imageBuffer.length, 'bytes');
console.log('Uploading', fileName, 'to Printful...');

// Build multipart form data
const boundary = '----FormBoundary' + Math.random().toString(16).substring(2);
const CRLF = '\r\n';

let body = '';
body += '--' + boundary + CRLF;
body += 'Content-Disposition: form-data; name="file"; filename="' + fileName + '"' + CRLF;
body += 'Content-Type: image/png' + CRLF + CRLF;

const bodyBuffer = Buffer.concat([
  Buffer.from(body, 'utf8'),
  imageBuffer,
  Buffer.from(CRLF + '--' + boundary + '--' + CRLF, 'utf8')
]);

const options = {
  hostname: 'api.printful.com',
  port: 443,
  path: '/files',
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${PRINTFUL_TOKEN}`,
    'X-PF-Store-Id': STORE_ID,
    'Content-Type': 'multipart/form-data; boundary=' + boundary,
    'Content-Length': bodyBuffer.length
  }
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    try {
      const result = JSON.parse(data);
      console.log('Result:', JSON.stringify(result, null, 2));
      if (result.code === 200) {
        console.log('\n=== FILE UPLOADED SUCCESSFULLY ===');
        console.log('File ID:', result.result.id);
        console.log('Preview URL:', result.result.preview_url);
        // Save file info
        fs.writeFileSync(
          path.join(__dirname, 'uploaded-file.json'),
          JSON.stringify(result.result, null, 2)
        );
        console.log('\nFile info saved to uploaded-file.json');
      }
    } catch(e) {
      console.log('Raw Response:', data);
    }
  });
});

req.on('error', (e) => console.error('Error:', e.message));
req.write(bodyBuffer);
req.end();
