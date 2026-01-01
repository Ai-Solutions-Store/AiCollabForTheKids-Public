const fs = require('fs');
const https = require('https');

const PRINTFUL_TOKEN = '8w0aEaLpFfMLazoZCn1HLDammvgogflu6h4fDl8a';
const STORE_ID = '16490958';
const IMAGE_PATH = 'C:\\Users\\t55o\\Desktop\\238789305.png';

// Read and encode image
const imageBuffer = fs.readFileSync(IMAGE_PATH);
const base64Image = imageBuffer.toString('base64');
const dataUri = `data:image/png;base64,${base64Image}`;

console.log('Image size:', imageBuffer.length, 'bytes');
console.log('Creating "Beware of Smartphone Zombies" T-Shirt...\n');

// Create sync product - NO thumbnail, base64 in files
const syncProduct = {
  sync_product: {
    name: 'Beware of Smartphone Zombies - T-Shirt'
    // No thumbnail - let Printful generate it
  },
  sync_variants: [
    // Black T-shirts S-3XL (Bella+Canvas 3001)
    // Prices cover cost + shipping + tax buffer (break-even)
    { variant_id: 5530, retail_price: '24.99', files: [{ type: 'front', url: dataUri }] }, // Black S - cost $11.69
    { variant_id: 5531, retail_price: '24.99', files: [{ type: 'front', url: dataUri }] }, // Black M
    { variant_id: 5532, retail_price: '24.99', files: [{ type: 'front', url: dataUri }] }, // Black L
    { variant_id: 5533, retail_price: '24.99', files: [{ type: 'front', url: dataUri }] }, // Black XL
    { variant_id: 5534, retail_price: '29.99', files: [{ type: 'front', url: dataUri }] }, // Black 2XL - cost $13.69
    { variant_id: 5535, retail_price: '32.99', files: [{ type: 'front', url: dataUri }] }, // Black 3XL - cost $15.69
  ]
};

const postData = JSON.stringify(syncProduct);

console.log('Payload size:', Buffer.byteLength(postData), 'bytes');
console.log('Sending to Printful API...');

const options = {
  hostname: 'api.printful.com',
  port: 443,
  path: '/store/products',
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
        console.log('\n=== T-SHIRT CREATED SUCCESSFULLY ===');
        console.log('Product ID:', result.result.id);
        console.log('Variants:', result.result.sync_variants.length);
      }
    } catch(e) {
      console.log('Response:', data);
    }
  });
});

req.on('error', (e) => console.error('Error:', e.message));
req.write(postData);
req.end();
