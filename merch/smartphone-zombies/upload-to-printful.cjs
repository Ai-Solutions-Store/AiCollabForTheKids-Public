const fs = require('fs');
const https = require('https');
const path = require('path');

const PRINTFUL_TOKEN = '8w0aEaLpFfMLazoZCn1HLDammvgogflu6h4fDl8a';
const STORE_ID = '16490958';
const IMAGE_PATH = 'C:\\Users\\t55o\\Desktop\\238789305.png';

// Read and encode image
const imageBuffer = fs.readFileSync(IMAGE_PATH);
const base64Image = imageBuffer.toString('base64');
const dataUri = `data:image/png;base64,${base64Image}`;

console.log('Image size:', imageBuffer.length, 'bytes');
console.log('Uploading to Printful...');

const postData = JSON.stringify({
  file: dataUri
});

const options = {
  hostname: 'api.printful.com',
  port: 443,
  path: '/files',
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${PRINTFUL_TOKEN}`,
    'X-PF-Store-Id': STORE_ID,
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    console.log('Response:', data);
    const result = JSON.parse(data);
    if (result.code === 200) {
      console.log('\n=== SUCCESS ===');
      console.log('File ID:', result.result.id);
      console.log('Preview URL:', result.result.preview_url);
      // Save the file ID for product creation
      fs.writeFileSync(
        path.join(__dirname, 'printful-file-id.json'),
        JSON.stringify(result.result, null, 2)
      );
    }
  });
});

req.on('error', (e) => console.error('Error:', e.message));
req.write(postData);
req.end();
