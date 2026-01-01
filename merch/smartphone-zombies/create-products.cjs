const fs = require('fs');
const https = require('https');

const PRINTFUL_TOKEN = '8w0aEaLpFfMLazoZCn1HLDammvgogflu6h4fDl8a';
const STORE_ID = '16490958';
const IMAGE_PATH = 'C:\\Users\\t55o\\Desktop\\238789305.png';

// Read and encode image
const imageBuffer = fs.readFileSync(IMAGE_PATH);
const base64Image = imageBuffer.toString('base64');

console.log('Image size:', imageBuffer.length, 'bytes');
console.log('Creating "Beware of Smartphone Zombies" products...\n');

// Product configurations with pricing (covers cost + shipping + tax buffer)
const products = [
  {
    name: 'T-Shirt',
    product_id: 71, // Bella + Canvas 3001
    variant_id: 4012, // Black S
    retail_price: '24.99',
    files: [{ type: 'front', url: `data:image/png;base64,${base64Image}` }]
  }
];

// Create sync product
const syncProduct = {
  sync_product: {
    name: 'Beware of Smartphone Zombies - T-Shirt',
    thumbnail: `data:image/png;base64,${base64Image}`
  },
  sync_variants: [
    // Black T-shirts S-3XL (Bella+Canvas 3001)
    { variant_id: 5530, retail_price: '24.99', files: [{ type: 'front', url: `data:image/png;base64,${base64Image}` }] }, // Black S
    { variant_id: 5531, retail_price: '24.99', files: [{ type: 'front', url: `data:image/png;base64,${base64Image}` }] }, // Black M
    { variant_id: 5532, retail_price: '24.99', files: [{ type: 'front', url: `data:image/png;base64,${base64Image}` }] }, // Black L
    { variant_id: 5533, retail_price: '24.99', files: [{ type: 'front', url: `data:image/png;base64,${base64Image}` }] }, // Black XL
    { variant_id: 5534, retail_price: '29.99', files: [{ type: 'front', url: `data:image/png;base64,${base64Image}` }] }, // Black 2XL
    { variant_id: 5535, retail_price: '32.99', files: [{ type: 'front', url: `data:image/png;base64,${base64Image}` }] }, // Black 3XL
  ]
};

const postData = JSON.stringify(syncProduct);

console.log('Payload size:', Buffer.byteLength(postData), 'bytes');
console.log('Creating T-Shirt product...');

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
        console.log('\n=== T-SHIRT CREATED ===');
        console.log('Product ID:', result.result.id);
      }
    } catch(e) {
      console.log('Response:', data);
    }
  });
});

req.on('error', (e) => console.error('Error:', e.message));
req.write(postData);
req.end();
