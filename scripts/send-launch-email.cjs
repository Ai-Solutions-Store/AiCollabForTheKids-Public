// ═══════════════════════════════════════════════════════════════
// FOR THE KIDS - LAUNCH EMAIL BLAST SCRIPT
// Gospel Version: V1.3 (Ethics Override - 60/30/10)
// Created: December 17, 2025
// Purpose: Send launch fundraising email to all contacts
// ═══════════════════════════════════════════════════════════════

const path = require('path');
const fs = require('fs');
require(path.join(__dirname, '../api/node_modules/dotenv')).config({ path: path.join(__dirname, '../api/.env') });
const { sendLaunchEmail } = require(path.join(__dirname, '../api/services/email'));

// ─────────────────────────────────────────────────────────────────
// CONTACT LIST (REPLACE WITH YOUR ACTUAL CONTACTS)
// ─────────────────────────────────────────────────────────────────

const contacts = [
  { email: 'joshlcoleman@gmail.com', name: 'Joshua', referralCode: 'FOUNDER' },
  // Add more contacts here in format:
  // { email: 'friend@example.com', name: 'Name', referralCode: 'CODE123' },
];

// ─────────────────────────────────────────────────────────────────
// LOAD CONTACTS FROM CSV (OPTIONAL)
// ─────────────────────────────────────────────────────────────────

function loadContactsFromCSV(filePath) {
  try {
    const csvPath = path.join(__dirname, '..', filePath);
    if (!fs.existsSync(csvPath)) {
      console.log(`⚠️  CSV file not found: ${csvPath}`);
      return [];
    }

    const csvContent = fs.readFileSync(csvPath, 'utf-8');
    const lines = csvContent.split('\n').slice(1); // Skip header

    return lines
      .filter(line => line.trim())
      .map(line => {
        const [email, name, referralCode] = line.split(',').map(s => s.trim());
        return { email, name, referralCode };
      });
  } catch (error) {
    console.error('❌ Error loading CSV:', error.message);
    return [];
  }
}

// ─────────────────────────────────────────────────────────────────
// MAIN CAMPAIGN FUNCTION
// ─────────────────────────────────────────────────────────────────

async function sendLaunchCampaign() {
  console.log('');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('FOR THE KIDS - LAUNCH EMAIL CAMPAIGN');
  console.log('Gospel V1.3: 60% to Verified Pediatric Charities');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('');

  // Option 1: Load from CSV (if exists)
  const csvContacts = loadContactsFromCSV('marketing/contacts-launch.csv');
  const allContacts = csvContacts.length > 0 ? csvContacts : contacts;

  console.log(`📧 Sending launch email to ${allContacts.length} contacts...`);
  console.log('');

  if (allContacts.length === 0) {
    console.error('❌ No contacts found. Add contacts to the script or create marketing/contacts-launch.csv');
    process.exit(1);
  }

  // Verify SendGrid API key
  if (!process.env.SENDGRID_API_KEY) {
    console.error('❌ SENDGRID_API_KEY not found in .env file');
    process.exit(1);
  }

  // Send emails with rate limiting
  let successCount = 0;
  let failCount = 0;

  for (const contact of allContacts) {
    try {
      await sendLaunchEmail(contact.email, contact.name, contact.referralCode);
      successCount++;
      console.log(`✅ [${successCount}/${allContacts.length}] Sent to ${contact.email}`);

      // Rate limit: SendGrid free tier = 100 emails/day
      // Add 50ms delay to avoid hitting rate limits
      await new Promise(resolve => setTimeout(resolve, 50));
    } catch (error) {
      failCount++;
      console.error(`❌ [${failCount} failed] ${contact.email}: ${error.message}`);
    }
  }

  console.log('');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('CAMPAIGN COMPLETE');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log(`✅ Successfully sent: ${successCount}`);
  console.log(`❌ Failed: ${failCount}`);
  console.log(`📊 Success rate: ${((successCount / allContacts.length) * 100).toFixed(1)}%`);
  console.log('');
  console.log('📈 Next Steps:');
  console.log('   1. Monitor SendGrid dashboard for open/click rates');
  console.log('   2. Watch for Pro signups at /upgrade');
  console.log('   3. Send urgency email in 48 hours');
  console.log('');
  console.log('FOR THE KIDS. ALWAYS.');
  console.log('');
}

// ─────────────────────────────────────────────────────────────────
// RUN CAMPAIGN
// ─────────────────────────────────────────────────────────────────

if (require.main === module) {
  sendLaunchCampaign()
    .then(() => process.exit(0))
    .catch(error => {
      console.error('');
      console.error('❌ CAMPAIGN FAILED:', error);
      console.error('');
      process.exit(1);
    });
}

module.exports = { sendLaunchCampaign };
