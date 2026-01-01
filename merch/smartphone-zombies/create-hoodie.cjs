const https = require('https');

const PRINTFUL_TOKEN = '8w0aEaLpFfMLazoZCn1HLDammvgogflu6h4fDl8a';
const STORE_ID = '16490958';
const IMAGE_URL = 'https://files.catbox.moe/g32nml.png';

function createProduct(productData) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(productData);
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
        try {
          resolve({ status: res.statusCode, result: JSON.parse(data) });
        } catch(e) {
          resolve({ status: res.statusCode, raw: data });
        }
      });
    });
    req.on('error', (e) => reject(e));
    req.write(postData);
    req.end();
  });
}

async function main() {
  console.log('Creating Hoodie with correct variant IDs...');
  console.log('Image URL:', IMAGE_URL);

  // Gildan 18500 Black hoodie variants from API
  const hoodie = await createProduct({
    sync_product: {
      name: 'Beware of Smartphone Zombies - Hoodie',
      thumbnail: IMAGE_URL
    },
    sync_variants: [
      // Black S-3XL - Prices cover: base cost + ~$6 shipping + 15% tax buffer
      { variant_id: 5530, retail_price: '44.99', files: [{ type: 'front', url: IMAGE_URL }] }, // Black S - $22.19
      { variant_id: 5531, retail_price: '44.99', files: [{ type: 'front', url: IMAGE_URL }] }, // Black M
      { variant_id: 5532, retail_price: '44.99', files: [{ type: 'front', url: IMAGE_URL }] }, // Black L
      { variant_id: 5533, retail_price: '44.99', files: [{ type: 'front', url: IMAGE_URL }] }, // Black XL
      { variant_id: 5534, retail_price: '49.99', files: [{ type: 'front', url: IMAGE_URL }] }, // Black 2XL - $24.19
      { variant_id: 5535, retail_price: '54.99', files: [{ type: 'front', url: IMAGE_URL }] }, // Black 3XL - $26.19
    ]
  });

  console.log('\nStatus:', hoodie.status);
  console.log('Result:', JSON.stringify(hoodie.result, null, 2));

  if (hoodie.result?.code === 200) {
    console.log('\n=== HOODIE CREATED SUCCESSFULLY ===');
    console.log('Product ID:', hoodie.result.result.id);
  }
}

main().catch(console.error);
