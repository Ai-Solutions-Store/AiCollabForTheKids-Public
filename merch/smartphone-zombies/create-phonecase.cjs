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
  console.log('Creating iPhone Case with correct variant IDs...');
  console.log('Image URL:', IMAGE_URL);

  // Tough iPhone Case variants - base price $13.95
  // Retail price: $29.99 covers cost + shipping (~$5) + tax buffer
  const phoneCase = await createProduct({
    sync_product: {
      name: 'Beware of Smartphone Zombies - iPhone Case',
      thumbnail: IMAGE_URL
    },
    sync_variants: [
      // Popular iPhone models (Glossy)
      { variant_id: 16124, retail_price: '29.99', files: [{ type: 'default', url: IMAGE_URL }] }, // iPhone 14
      { variant_id: 16128, retail_price: '29.99', files: [{ type: 'default', url: IMAGE_URL }] }, // iPhone 14 Plus
      { variant_id: 16126, retail_price: '29.99', files: [{ type: 'default', url: IMAGE_URL }] }, // iPhone 14 Pro
      { variant_id: 16130, retail_price: '29.99', files: [{ type: 'default', url: IMAGE_URL }] }, // iPhone 14 Pro Max
      { variant_id: 15388, retail_price: '29.99', files: [{ type: 'default', url: IMAGE_URL }] }, // iPhone 13
      { variant_id: 15390, retail_price: '29.99', files: [{ type: 'default', url: IMAGE_URL }] }, // iPhone 13 Pro
      { variant_id: 15391, retail_price: '29.99', files: [{ type: 'default', url: IMAGE_URL }] }, // iPhone 13 Pro Max
      { variant_id: 15384, retail_price: '29.99', files: [{ type: 'default', url: IMAGE_URL }] }, // iPhone 12
      { variant_id: 15386, retail_price: '29.99', files: [{ type: 'default', url: IMAGE_URL }] }, // iPhone 12 Pro
      { variant_id: 15387, retail_price: '29.99', files: [{ type: 'default', url: IMAGE_URL }] }, // iPhone 12 Pro Max
    ]
  });

  console.log('\nStatus:', phoneCase.status);
  console.log('Result:', JSON.stringify(phoneCase.result, null, 2));

  if (phoneCase.result?.code === 200) {
    console.log('\n=== PHONE CASE CREATED SUCCESSFULLY ===');
    console.log('Product ID:', phoneCase.result.result.id);
  }
}

main().catch(console.error);
