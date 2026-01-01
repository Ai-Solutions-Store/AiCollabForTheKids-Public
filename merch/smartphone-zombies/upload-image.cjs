const fs = require('fs');
const https = require('https');
const path = require('path');

const PRINTFUL_TOKEN = '8w0aEaLpFfMLazoZCn1HLDammvgogflu6h4fDl8a';
const STORE_ID = '16490958';
const IMAGE_PATH = 'C:\\Users\\t55o\\Desktop\\238789305.png';

// Read and encode image
const imageBuffer = fs.readFileSync(IMAGE_PATH);
const base64Image = imageBuffer.toString('base64');

console.log('Image size:', imageBuffer.length, 'bytes');
console.log('Uploading to Printful file library...');

// Printful expects just the base64 string without the data URI prefix
const postData = JSON.stringify({
  type: 'default',
  url: `data:image/png;base64,${base64Image}`
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
    console.log('Status:', res.statusCode);
    try {
      const result = JSON.parse(data);
      console.log('Result:', JSON.stringify(result, null, 2));
      if (result.code === 200) {
        console.log('\n=== FILE UPLOADED SUCCESSFULLY ===');
        console.log('File ID:', result.result.id);
        console.log('Preview URL:', result.result.preview_url);
        console.log('File URL:', result.result.url);
        // Save the file info for product creation
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
req.write(postData);
req.end();
