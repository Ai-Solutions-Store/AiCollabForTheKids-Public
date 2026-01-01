/**
 * AI Solutions Store - Square Webhook Handler
 * Cloudflare Worker that receives Square webhooks and triggers product delivery
 *
 * Products: 13 total (7 software + 6 merch)
 * Delivery: Email with step-by-step setup instructions
 *
 * FOR THE KIDS - 60% to Verified Pediatric Charities
 */

// Product catalog with delivery info
const PRODUCTS = {
  // Software products - by price (cents)
  29900: { id: 'claude-droid', name: 'Claude Droid', type: 'software' },
  49900: { id: 'income-droid', name: 'Income Droid', type: 'software' },
  19900: { id: 'marketing-engine', name: 'Marketing Engine', type: 'software' },
  39900: { id: 'jules-ai', name: 'Jules AI', type: 'software' },
  59900: { id: 'affiliate-system', name: 'Affiliate System', type: 'software' },
  249900: { id: 'dating-platform', name: 'YouAndINotAI Dating Platform', type: 'software' },
  9900: { id: 'consultation', name: 'AI Consultation - 30 min', type: 'consultation' },
  // Merch products - Printful auto-fulfills these
  2999: { id: 'anti-ai-tee', name: 'Anti-AI T-Shirt', type: 'merch' },
  5499: { id: 'anti-ai-hoodie', name: 'Anti-AI Hoodie', type: 'merch' },
  2499: { id: 'kid-ai-tee', name: 'Kid AI Creator T-Shirt', type: 'merch' },
  1999: { id: 'anti-ai-mug', name: 'Human Verified Coffee Mug', type: 'merch' },
  999: { id: 'sticker-pack', name: 'Anti-AI Sticker Pack', type: 'merch' },
  8999: { id: 'merch-bundle', name: 'Ultimate Merch Bundle', type: 'merch' },
};

// Email templates by product type
function getEmailTemplate(product, payment, customerEmail) {
  const orderId = payment.id;
  const amount = (payment.amount_money.amount / 100).toFixed(2);
  const date = new Date().toLocaleDateString();

  if (product.type === 'merch') {
    return {
      subject: `Order Confirmed: ${product.name} - AI Solutions Store`,
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h1 style="color: #078EFA;">Order Confirmed!</h1>
  <p>Thank you for your purchase of <strong>${product.name}</strong>!</p>

  <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
    <h2 style="color: #CC785C;">What Happens Next</h2>
    <ol>
      <li><strong>Production:</strong> Your order is being printed by Printful (1-3 business days)</li>
      <li><strong>Shipping:</strong> You'll receive tracking info via email when shipped</li>
      <li><strong>Delivery:</strong> Standard shipping takes 5-10 business days</li>
    </ol>
  </div>

  <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
    <h2 style="color: #CC785C;">Order Details</h2>
    <p>Product: ${product.name}<br>
    Amount: $${amount}<br>
    Order ID: ${orderId}<br>
    Date: ${date}</p>
  </div>

  <p>Questions? Email <a href="mailto:support@youandinotai.com">support@youandinotai.com</a></p>

  <hr style="margin: 30px 0;">
  <p style="font-size: 12px; color: #666;"><em>60% of this purchase supports Verified Pediatric Charities. FOR THE KIDS!</em></p>
</body>
</html>`
    };
  }

  if (product.type === 'consultation') {
    return {
      subject: `Book Your Consultation - AI Solutions Store`,
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h1 style="color: #078EFA;">Your Consultation is Ready!</h1>
  <p>Thank you for purchasing a 30-minute AI Strategy Consultation!</p>

  <div style="background: #078EFA; color: white; padding: 20px; border-radius: 5px; margin: 20px 0; text-align: center;">
    <h2 style="margin: 0;">Book Your Session Now</h2>
    <p style="font-size: 18px;"><a href="https://calendly.com/joshlcoleman/30min" style="color: white; text-decoration: underline;">https://calendly.com/joshlcoleman/30min</a></p>
  </div>

  <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
    <h2 style="color: #CC785C;">Before Your Call</h2>
    <p>Please prepare:</p>
    <ul>
      <li>Your current business/project overview</li>
      <li>Specific challenges you want to address</li>
      <li>What AI automation outcomes you're hoping for</li>
      <li>Your technical comfort level (beginner/intermediate/advanced)</li>
    </ul>
  </div>

  <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
    <h2 style="color: #CC785C;">What We'll Cover</h2>
    <ul>
      <li>AI automation strategy for your business</li>
      <li>Tool recommendations based on your needs</li>
      <li>Implementation roadmap</li>
      <li>Q&A and next steps</li>
    </ul>
  </div>

  <p>Order ID: ${orderId} | Amount: $${amount}</p>
  <hr style="margin: 30px 0;">
  <p style="font-size: 12px; color: #666;"><em>60% of this purchase supports Verified Pediatric Charities.</em></p>
</body>
</html>`
    };
  }

  // Software products
  const repoName = product.id;
  const githubUrl = `https://github.com/Ai-Solutions-Store/${repoName}`;

  return {
    subject: `Access Your ${product.name} - AI Solutions Store`,
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h1 style="color: #078EFA;">Your ${product.name} is Ready!</h1>
  <p>Thank you for your purchase! Here's everything you need to get started:</p>

  <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
    <h2 style="color: #CC785C;">Step 1: Get GitHub Access</h2>
    <p><strong>Repository:</strong> <a href="${githubUrl}">${githubUrl}</a></p>
    <p>A GitHub invitation will be sent to <strong>${customerEmail}</strong> within 24 hours.</p>
    <p>If you don't receive it, email support@youandinotai.com with your GitHub username.</p>
  </div>

  <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
    <h2 style="color: #CC785C;">Step 2: Clone & Install</h2>
    <pre style="background: #141413; color: #00ff00; padding: 15px; border-radius: 5px; overflow-x: auto;">
git clone ${githubUrl}.git
cd ${repoName}
npm install
cp .env.example .env
    </pre>
  </div>

  <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
    <h2 style="color: #CC785C;">Step 3: Configure</h2>
    <p>Edit your <code>.env</code> file with your API keys:</p>
    <ul>
      <li><strong>OpenAI:</strong> <a href="https://platform.openai.com/api-keys">Get API Key</a></li>
      <li><strong>Gemini:</strong> <a href="https://aistudio.google.com/app/apikey">Get API Key</a></li>
      <li><strong>Replicate:</strong> <a href="https://replicate.com/account/api-tokens">Get API Token</a></li>
    </ul>
  </div>

  <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
    <h2 style="color: #CC785C;">Step 4: Run</h2>
    <pre style="background: #141413; color: #00ff00; padding: 15px; border-radius: 5px;">npm start</pre>
    <p>Full documentation is in the <code>README.md</code> file.</p>
  </div>

  <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
    <h2 style="color: #CC785C;">Need Help?</h2>
    <p>Email: <a href="mailto:support@youandinotai.com">support@youandinotai.com</a></p>
    <p>GitHub Issues: <a href="${githubUrl}/issues">${githubUrl}/issues</a></p>
  </div>

  <hr style="margin: 30px 0;">
  <p style="font-size: 12px; color: #666;">
    Order: ${product.name}<br>
    Amount: $${amount}<br>
    ID: ${orderId}<br>
    Date: ${date}
  </p>
  <p style="font-size: 12px; color: #666;"><em>60% of this purchase supports Verified Pediatric Charities. FOR THE KIDS!</em></p>
</body>
</html>`
  };
}

// Verify Square webhook signature
async function verifySignature(body, signature, secret) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(body));
  const base64 = btoa(String.fromCharCode(...new Uint8Array(sig)));
  return base64 === signature;
}

// Send email via SendGrid
async function sendEmail(to, subject, html, env) {
  const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.SENDGRID_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
      from: { email: 'noreply@ai-solutions.store', name: 'AI Solutions Store' },
      subject: subject,
      content: [{ type: 'text/html', value: html }]
    })
  });

  return response.ok;
}

// Log to owner via Twilio SMS (optional)
async function notifyOwner(message, env) {
  if (!env.TWILIO_ACCOUNT_SID) return;

  const url = `https://api.twilio.com/2010-04-01/Accounts/${env.TWILIO_ACCOUNT_SID}/Messages.json`;
  const auth = btoa(`${env.TWILIO_ACCOUNT_SID}:${env.TWILIO_AUTH_TOKEN}`);

  await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      From: env.TWILIO_PHONE_NUMBER,
      To: env.OWNER_PHONE,
      Body: message.substring(0, 160)
    })
  });
}

export default {
  async fetch(request, env) {
    // Only accept POST
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    const url = new URL(request.url);

    // Health check
    if (url.pathname === '/health') {
      return new Response(JSON.stringify({ status: 'ok', service: 'ai-store-webhook' }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Main webhook endpoint
    if (url.pathname !== '/webhook/ai-store') {
      return new Response('Not found', { status: 404 });
    }

    try {
      const body = await request.text();
      const signature = request.headers.get('x-square-hmacsha256-signature');

      // Verify signature (skip in dev)
      if (env.SQUARE_WEBHOOK_SECRET && signature) {
        const valid = await verifySignature(body, signature, env.SQUARE_WEBHOOK_SECRET);
        if (!valid) {
          console.error('Invalid webhook signature');
          return new Response('Forbidden', { status: 403 });
        }
      }

      const event = JSON.parse(body);
      console.log('Webhook received:', event.type);

      // Only handle completed payments
      if (event.type !== 'payment.created' && event.type !== 'payment.updated') {
        return new Response(JSON.stringify({ received: true }), {
          headers: { 'Content-Type': 'application/json' }
        });
      }

      const payment = event.data?.object?.payment;
      if (!payment || payment.status !== 'COMPLETED') {
        return new Response(JSON.stringify({ received: true, status: 'pending' }), {
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Identify product by amount
      const amount = payment.amount_money?.amount;
      const product = PRODUCTS[amount];

      if (!product) {
        console.log('Unknown product amount:', amount);
        // Notify owner of unknown purchase
        await notifyOwner(`Unknown AI Store purchase: $${amount/100}`, env);
        return new Response(JSON.stringify({ received: true, matched: false }), {
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Get customer email from receipt or buyer
      const customerEmail = payment.buyer_email_address ||
                           payment.receipt_email ||
                           env.OWNER_EMAIL; // Fallback

      // Generate and send delivery email
      const template = getEmailTemplate(product, payment, customerEmail);
      const emailSent = await sendEmail(customerEmail, template.subject, template.html, env);

      // Notify owner of sale
      await notifyOwner(`Sale: ${product.name} - $${amount/100} to ${customerEmail}`, env);

      console.log('Delivery email sent:', {
        product: product.name,
        email: customerEmail,
        success: emailSent
      });

      return new Response(JSON.stringify({
        received: true,
        product: product.name,
        emailSent: emailSent,
        mission: 'FOR THE KIDS'
      }), {
        headers: { 'Content-Type': 'application/json' }
      });

    } catch (error) {
      console.error('Webhook error:', error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }
};
