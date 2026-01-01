const https = require('https');
const fs = require('fs');
const path = require('path');

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
          const result = JSON.parse(data);
          resolve({ status: res.statusCode, result });
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
  console.log('Creating "Beware of Smartphone Zombies" products...\n');
  console.log('Using image URL:', IMAGE_URL);

  const results = [];

  // 1. Create T-Shirt (Bella+Canvas 3001)
  console.log('\n=== Creating T-SHIRT ===');
  const tshirt = await createProduct({
    sync_product: {
      name: 'Beware of Smartphone Zombies - T-Shirt',
      thumbnail: IMAGE_URL
    },
    sync_variants: [
      // Black S-3XL - Prices cover: base cost + ~$5 shipping + 15% tax buffer
      { variant_id: 5530, retail_price: '24.99', files: [{ type: 'front', url: IMAGE_URL }] }, // Black S - $11.69 cost
      { variant_id: 5531, retail_price: '24.99', files: [{ type: 'front', url: IMAGE_URL }] }, // Black M
      { variant_id: 5532, retail_price: '24.99', files: [{ type: 'front', url: IMAGE_URL }] }, // Black L
      { variant_id: 5533, retail_price: '24.99', files: [{ type: 'front', url: IMAGE_URL }] }, // Black XL
      { variant_id: 5534, retail_price: '29.99', files: [{ type: 'front', url: IMAGE_URL }] }, // Black 2XL - $13.69
      { variant_id: 5535, retail_price: '32.99', files: [{ type: 'front', url: IMAGE_URL }] }, // Black 3XL - $15.69
    ]
  });
  console.log('T-Shirt Status:', tshirt.status);
  if (tshirt.result?.code === 200) {
    console.log('SUCCESS! Product ID:', tshirt.result.result.id);
    results.push({ type: 'T-Shirt', id: tshirt.result.result.id, success: true });
  } else {
    console.log('Error:', JSON.stringify(tshirt.result, null, 2));
    results.push({ type: 'T-Shirt', success: false, error: tshirt.result });
  }

  // 2. Create Hoodie (Gildan 18500)
  console.log('\n=== Creating HOODIE ===');
  const hoodie = await createProduct({
    sync_product: {
      name: 'Beware of Smartphone Zombies - Hoodie',
      thumbnail: IMAGE_URL
    },
    sync_variants: [
      // Black S-3XL - Prices cover: base cost + ~$6 shipping + 15% tax buffer
      { variant_id: 1296, retail_price: '44.99', files: [{ type: 'front', url: IMAGE_URL }] }, // Black S - $22.19
      { variant_id: 1298, retail_price: '44.99', files: [{ type: 'front', url: IMAGE_URL }] }, // Black M
      { variant_id: 1300, retail_price: '44.99', files: [{ type: 'front', url: IMAGE_URL }] }, // Black L
      { variant_id: 1302, retail_price: '44.99', files: [{ type: 'front', url: IMAGE_URL }] }, // Black XL
      { variant_id: 1304, retail_price: '49.99', files: [{ type: 'front', url: IMAGE_URL }] }, // Black 2XL - $24.19
      { variant_id: 1306, retail_price: '54.99', files: [{ type: 'front', url: IMAGE_URL }] }, // Black 3XL - $26.19
    ]
  });
  console.log('Hoodie Status:', hoodie.status);
  if (hoodie.result?.code === 200) {
    console.log('SUCCESS! Product ID:', hoodie.result.result.id);
    results.push({ type: 'Hoodie', id: hoodie.result.result.id, success: true });
  } else {
    console.log('Error:', JSON.stringify(hoodie.result, null, 2));
    results.push({ type: 'Hoodie', success: false, error: hoodie.result });
  }

  // 3. Create Kiss-Cut Stickers
  console.log('\n=== Creating STICKERS ===');
  const stickers = await createProduct({
    sync_product: {
      name: 'Beware of Smartphone Zombies - Sticker',
      thumbnail: IMAGE_URL
    },
    sync_variants: [
      // Various sizes - Prices cover: base + shipping + tax buffer
      { variant_id: 10163, retail_price: '4.99', files: [{ type: 'default', url: IMAGE_URL }] }, // 3x3" - $2.29
      { variant_id: 10164, retail_price: '6.99', files: [{ type: 'default', url: IMAGE_URL }] }, // 4x4" - $2.79
      { variant_id: 10165, retail_price: '8.99', files: [{ type: 'default', url: IMAGE_URL }] }, // 5.5x5.5" - $3.99
    ]
  });
  console.log('Stickers Status:', stickers.status);
  if (stickers.result?.code === 200) {
    console.log('SUCCESS! Product ID:', stickers.result.result.id);
    results.push({ type: 'Stickers', id: stickers.result.result.id, success: true });
  } else {
    console.log('Error:', JSON.stringify(stickers.result, null, 2));
    results.push({ type: 'Stickers', success: false, error: stickers.result });
  }

  // 4. Create Phone Cases (iPhone)
  console.log('\n=== Creating PHONE CASES ===');
  const phoneCases = await createProduct({
    sync_product: {
      name: 'Beware of Smartphone Zombies - Phone Case',
      thumbnail: IMAGE_URL
    },
    sync_variants: [
      // iPhone cases - Tough case style
      { variant_id: 11482, retail_price: '29.99', files: [{ type: 'default', url: IMAGE_URL }] }, // iPhone 14
      { variant_id: 11484, retail_price: '29.99', files: [{ type: 'default', url: IMAGE_URL }] }, // iPhone 14 Pro
      { variant_id: 11488, retail_price: '29.99', files: [{ type: 'default', url: IMAGE_URL }] }, // iPhone 14 Pro Max
      { variant_id: 11478, retail_price: '29.99', files: [{ type: 'default', url: IMAGE_URL }] }, // iPhone 13
      { variant_id: 11474, retail_price: '29.99', files: [{ type: 'default', url: IMAGE_URL }] }, // iPhone 12
    ]
  });
  console.log('Phone Cases Status:', phoneCases.status);
  if (phoneCases.result?.code === 200) {
    console.log('SUCCESS! Product ID:', phoneCases.result.result.id);
    results.push({ type: 'Phone Cases', id: phoneCases.result.result.id, success: true });
  } else {
    console.log('Error:', JSON.stringify(phoneCases.result, null, 2));
    results.push({ type: 'Phone Cases', success: false, error: phoneCases.result });
  }

  // Summary
  console.log('\n============================');
  console.log('=== CREATION SUMMARY ===');
  console.log('============================');
  results.forEach(r => {
    if (r.success) {
      console.log(`✓ ${r.type}: Created (ID: ${r.id})`);
    } else {
      console.log(`✗ ${r.type}: Failed`);
    }
  });

  // Save results
  fs.writeFileSync(
    path.join(__dirname, 'products-created.json'),
    JSON.stringify(results, null, 2)
  );
  console.log('\nResults saved to products-created.json');
}

main().catch(console.error);
