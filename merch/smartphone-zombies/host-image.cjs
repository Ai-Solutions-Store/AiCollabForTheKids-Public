const fs = require('fs');
const https = require('https');
const path = require('path');

const IMAGE_PATH = 'C:\\Users\\t55o\\Desktop\\238789305.png';

// Read and encode image
const imageBuffer = fs.readFileSync(IMAGE_PATH);
const base64Image = imageBuffer.toString('base64');

console.log('Image size:', imageBuffer.length, 'bytes');
console.log('Uploading to imgbb.com for public URL...');

// imgbb free API (no key needed for basic upload)
const postData = 'image=' + encodeURIComponent(base64Image);

const options = {
  hostname: 'api.imgbb.com',
  port: 443,
  path: '/1/upload?key=5a5d7c6ebf3eb1c7c3db47a3f0f2e5c1', // Free API key
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
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
      if (result.success) {
        console.log('\n=== IMAGE HOSTED SUCCESSFULLY ===');
        console.log('URL:', result.data.url);
        console.log('Display URL:', result.data.display_url);
        // Save the URL for product creation
        fs.writeFileSync(
          path.join(__dirname, 'image-url.json'),
          JSON.stringify({
            url: result.data.url,
            display_url: result.data.display_url,
            thumb_url: result.data.thumb?.url
          }, null, 2)
        );
        console.log('\nImage URL saved to image-url.json');
      } else {
        console.log('Error:', result);
      }
    } catch(e) {
      console.log('Parse error:', e.message);
      console.log('Raw Response:', data.substring(0, 500));
    }
  });
});

req.on('error', (e) => console.error('Error:', e.message));
req.write(postData);
req.end();
