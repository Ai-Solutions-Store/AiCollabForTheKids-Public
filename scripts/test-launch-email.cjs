// ═══════════════════════════════════════════════════════════════
// FOR THE KIDS - TEST LAUNCH EMAIL
// Gospel Version: V1.3 (Ethics Override - 60/30/10)
// Created: December 17, 2025
// Purpose: Send test launch email to founder
// ═══════════════════════════════════════════════════════════════

const path = require('path');
require(path.join(__dirname, '../api/node_modules/dotenv')).config({ path: path.join(__dirname, '../api/.env') });
const { sendLaunchEmail } = require(path.join(__dirname, '../api/services/email'));

async function testLaunchEmail() {
  console.log('');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('FOR THE KIDS - TEST LAUNCH EMAIL');
  console.log('Sending to: joshlcoleman@gmail.com');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('');

  try {
    await sendLaunchEmail(
      'joshlcoleman@gmail.com',
      'Joshua',
      'FOUNDER'
    );

    console.log('✅ Test email sent successfully!');
    console.log('');
    console.log('📧 Check your inbox: joshlcoleman@gmail.com');
    console.log('📊 Check SendGrid dashboard: https://app.sendgrid.com');
    console.log('');
    console.log('If email looks good, run: node scripts/send-launch-email.js');
    console.log('');
    console.log('FOR THE KIDS. ALWAYS.');
    console.log('');
  } catch (error) {
    console.error('');
    console.error('❌ TEST FAILED:', error.message);
    console.error('');
    console.error('Troubleshooting:');
    console.error('1. Verify SENDGRID_API_KEY in api/.env');
    console.error('2. Verify sender domain: noreply@aidoesitall.website');
    console.error('3. Check SendGrid dashboard for errors');
    console.error('');
    process.exit(1);
  }
}

testLaunchEmail();
