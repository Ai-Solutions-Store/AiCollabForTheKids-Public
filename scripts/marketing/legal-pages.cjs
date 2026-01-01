/**
 * Legal Pages Content Generator
 * Generates comprehensive legal documentation for AI Solutions Store
 *
 * Contents:
 * 1. Privacy Policy
 * 2. Terms of Service
 * 3. Refund Policy
 * 4. GDPR Compliance Text
 * 5. Cookie Policy
 * 6. Disclaimer
 *
 * For AI software products sold through AI Solutions Store
 *
 * FOR THE KIDS - 60/30/10 Gospel Model
 */

const fs = require('fs');
const path = require('path');

// Configuration
const LOGS_DIR = 'C:\\AiCollabForTheKids\\logs';
const LEGAL_DIR = path.join(LOGS_DIR, 'legal-pages');
const LOG_FILE = path.join(LOGS_DIR, 'legal-pages-generator.log');

// Company Information
const COMPANY = {
    name: 'AI Solutions Store',
    legalName: 'AI Solutions Store LLC',
    website: 'https://ai-solutions.store',
    email: 'legal@ai-solutions.store',
    supportEmail: 'support@ai-solutions.store',
    privacyEmail: 'privacy@ai-solutions.store',
    dpoEmail: 'dpo@ai-solutions.store',
    address: 'AI Solutions Store, Remote-First Organization',
    mission: 'FOR THE KIDS - 60% of all revenue goes directly to verified pediatric charities',
    model: '60/30/10 Gospel Model (60% charity, 30% operations, 10% growth)'
};

// Products
const PRODUCTS = [
    'Claude Droid - YouTube Automation',
    'Income Droid - Revenue Generation',
    'Marketing Engine - 24/7 Marketing Automation',
    'Jules AI - Personal AI Assistant',
    'Affiliate System - Partner Management',
    'Dating Platform - AI-Enhanced Matching'
];

// Ensure directories exist
if (!fs.existsSync(LOGS_DIR)) {
    fs.mkdirSync(LOGS_DIR, { recursive: true });
}
if (!fs.existsSync(LEGAL_DIR)) {
    fs.mkdirSync(LEGAL_DIR, { recursive: true });
}

function log(message) {
    const timestamp = new Date().toISOString();
    const entry = `[${timestamp}] ${message}\n`;
    fs.appendFileSync(LOG_FILE, entry);
    console.log(entry.trim());
}

function getFormattedDate() {
    return new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// ============================================================================
// 1. PRIVACY POLICY
// ============================================================================
function generatePrivacyPolicy() {
    const effectiveDate = getFormattedDate();

    return `# Privacy Policy

**${COMPANY.name}**
**Effective Date: ${effectiveDate}**
**Last Updated: ${effectiveDate}**

---

## FOR THE KIDS - Our Commitment

${COMPANY.name} operates under the 60/30/10 Gospel Model, where 60% of all revenue goes directly to verified pediatric charities. Your privacy is equally important to us as our mission to help children in need.

---

## 1. Introduction

Welcome to ${COMPANY.name} ("Company," "we," "us," or "our"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website ${COMPANY.website} and use our AI software products and services.

We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this policy or our practices with regard to your personal information, please contact us at ${COMPANY.privacyEmail}.

---

## 2. Information We Collect

### 2.1 Personal Information You Provide

We collect personal information that you voluntarily provide to us when you:

- Register for an account
- Purchase our AI software products
- Subscribe to our newsletter
- Contact us for support
- Participate in promotions or surveys

**Types of personal information collected may include:**

- **Identity Data:** First name, last name, username
- **Contact Data:** Email address, billing address, phone number
- **Financial Data:** Payment card details, billing information (processed securely via third-party payment processors)
- **Transaction Data:** Purchase history, product licenses, subscription details
- **Technical Data:** IP address, browser type, device information, operating system
- **Usage Data:** How you use our products and services
- **Marketing Data:** Your preferences for receiving marketing communications

### 2.2 Information Automatically Collected

When you access our services, we automatically collect:

- **Log Data:** IP address, browser type, pages visited, time spent, referring URL
- **Device Data:** Device type, operating system, unique device identifiers
- **Location Data:** General geographic location based on IP address
- **Cookie Data:** Information stored via cookies and similar technologies

### 2.3 Information from Third Parties

We may receive information about you from:

- Payment processors (transaction confirmation)
- Analytics providers
- Advertising partners
- Social media platforms (if you connect your account)

---

## 3. How We Use Your Information

We use your personal information for the following purposes:

### 3.1 Service Delivery
- Process your purchases and manage your account
- Provide access to our AI software products
- Deliver product updates and new features
- Provide customer support and respond to inquiries

### 3.2 Business Operations
- Analyze usage patterns to improve our products
- Develop new features and services
- Manage our business operations
- Comply with legal obligations

### 3.3 Communications
- Send transactional emails (receipts, account updates, security alerts)
- Provide product announcements and updates
- Send marketing communications (with your consent)
- Notify you about our charitable initiatives (FOR THE KIDS)

### 3.4 Security and Fraud Prevention
- Protect against unauthorized access
- Detect and prevent fraud
- Enforce our terms and policies
- Maintain the security of our systems

---

## 4. Data Sharing and Disclosure

### 4.1 Service Providers

We share information with third-party service providers who assist us in:

- Payment processing (Stripe, PayPal, Gumroad)
- Email delivery (SendGrid, Mailchimp)
- Analytics (Google Analytics, Mixpanel)
- Cloud hosting (AWS, Google Cloud, Azure)
- Customer support (Zendesk, Intercom)

### 4.2 Legal Requirements

We may disclose your information if required by law, regulation, legal process, or governmental request.

### 4.3 Business Transfers

In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.

### 4.4 With Your Consent

We may share your information for other purposes with your explicit consent.

### 4.5 What We DO NOT Do

- We do NOT sell your personal information
- We do NOT share your data with third parties for their marketing purposes without consent
- We do NOT use your data for purposes incompatible with those disclosed in this policy

---

## 5. Data Retention

We retain your personal information for as long as necessary to:

- Provide our services to you
- Comply with legal obligations
- Resolve disputes
- Enforce our agreements

**Specific retention periods:**
- Account data: Duration of account plus 3 years
- Transaction records: 7 years (legal/tax requirements)
- Marketing preferences: Until you unsubscribe
- Log data: 12 months

---

## 6. Your Privacy Rights

### 6.1 All Users Have the Right To:

- **Access:** Request a copy of your personal information
- **Correction:** Request correction of inaccurate information
- **Deletion:** Request deletion of your personal information
- **Portability:** Request your data in a portable format
- **Opt-out:** Unsubscribe from marketing communications

### 6.2 California Residents (CCPA)

Under the California Consumer Privacy Act, you have additional rights including:
- Right to know what personal information is collected
- Right to delete personal information
- Right to opt-out of sale of personal information (we do not sell data)
- Right to non-discrimination

### 6.3 European Residents (GDPR)

See our dedicated GDPR Compliance section for additional rights under the General Data Protection Regulation.

### 6.4 Exercising Your Rights

To exercise any of these rights, contact us at:
- Email: ${COMPANY.privacyEmail}
- Subject line: "Privacy Rights Request"

We will respond within 30 days (or as required by applicable law).

---

## 7. Security Measures

We implement appropriate technical and organizational measures to protect your information:

- **Encryption:** TLS/SSL encryption for data in transit
- **Access Controls:** Role-based access to personal data
- **Secure Storage:** Encrypted databases and secure cloud infrastructure
- **Regular Audits:** Security assessments and penetration testing
- **Employee Training:** Privacy and security awareness programs
- **Incident Response:** Procedures for handling data breaches

---

## 8. Children's Privacy

Our services are not directed to children under 13 years of age. We do not knowingly collect personal information from children under 13. If we discover that a child under 13 has provided us with personal information, we will delete it immediately.

**Important Note:** While our mission is "FOR THE KIDS" through charitable donations, our software products are designed for adult users and businesses.

---

## 9. International Data Transfers

If you are located outside the United States, your information may be transferred to and processed in the United States or other countries. We ensure appropriate safeguards are in place for international transfers, including:

- Standard Contractual Clauses (SCCs)
- Privacy Shield compliance where applicable
- Adequate security measures

---

## 10. Third-Party Links

Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies.

---

## 11. Updates to This Policy

We may update this Privacy Policy periodically. We will notify you of material changes by:

- Posting the updated policy on our website
- Updating the "Last Updated" date
- Sending email notification for significant changes

Your continued use of our services after changes constitutes acceptance of the updated policy.

---

## 12. Contact Us

For questions about this Privacy Policy or our privacy practices:

**${COMPANY.name}**
Email: ${COMPANY.privacyEmail}
Support: ${COMPANY.supportEmail}
Website: ${COMPANY.website}

**Data Protection Officer:**
Email: ${COMPANY.dpoEmail}

---

**FOR THE KIDS - 60/30/10 Gospel Model**
*60% of all revenue goes directly to verified pediatric charities.*
*Your privacy matters. Your support changes lives.*

---

*This Privacy Policy is provided for informational purposes. For legal advice, please consult a qualified attorney.*
`;
}

// ============================================================================
// 2. TERMS OF SERVICE
// ============================================================================
function generateTermsOfService() {
    const effectiveDate = getFormattedDate();

    return `# Terms of Service

**${COMPANY.name}**
**Effective Date: ${effectiveDate}**
**Last Updated: ${effectiveDate}**

---

## FOR THE KIDS - Our Mission

By using ${COMPANY.name}, you are supporting our mission to help children in need. 60% of all revenue goes directly to verified pediatric charities through our 60/30/10 Gospel Model.

---

## 1. Agreement to Terms

Welcome to ${COMPANY.name}. These Terms of Service ("Terms") constitute a legally binding agreement between you ("User," "you," or "your") and ${COMPANY.legalName} ("Company," "we," "us," or "our") governing your access to and use of our website at ${COMPANY.website} and all related AI software products, services, and applications (collectively, the "Services").

**BY ACCESSING OR USING OUR SERVICES, YOU AGREE TO BE BOUND BY THESE TERMS. IF YOU DO NOT AGREE TO THESE TERMS, DO NOT USE OUR SERVICES.**

---

## 2. Eligibility

### 2.1 Age Requirements
You must be at least 18 years old or the age of majority in your jurisdiction to use our Services. By using our Services, you represent and warrant that you meet these requirements.

### 2.2 Business Use
If you are using our Services on behalf of a business, you represent that you have the authority to bind that business to these Terms.

### 2.3 Prohibited Users
You may not use our Services if you:
- Have been previously banned from our Services
- Are located in a jurisdiction where our Services are prohibited
- Are on any government sanctions list

---

## 3. Our AI Software Products

### 3.1 Product Offerings

${COMPANY.name} offers AI-powered software products including but not limited to:

${PRODUCTS.map(p => `- ${p}`).join('\n')}

### 3.2 Nature of AI Products

Our products use artificial intelligence and machine learning technologies. You acknowledge that:

- AI outputs may not always be accurate or error-free
- AI-generated content requires human review and oversight
- Results may vary based on inputs, configurations, and use cases
- AI technology is continuously evolving

### 3.3 Intended Use

Our products are designed for legitimate business purposes. You agree to use them in accordance with:
- All applicable laws and regulations
- Third-party terms of service (e.g., YouTube, social media platforms)
- Industry best practices
- These Terms

---

## 4. License Grant

### 4.1 License to Use

Upon valid purchase, we grant you a limited, non-exclusive, non-transferable, revocable license to:

- Access and use the purchased software product
- Use the product for your personal or business purposes
- Create derivative works using AI-generated outputs

### 4.2 License Restrictions

You may NOT:

- Copy, modify, or distribute our software code
- Reverse engineer, decompile, or disassemble our products
- Sublicense, rent, lease, or lend our products
- Use our products to compete directly with us
- Remove or alter any proprietary notices
- Share your license with unauthorized users
- Use our products for illegal purposes
- Circumvent any technical protection measures

### 4.3 License Tiers

License scope depends on your purchase tier:
- **Personal License:** Single user, personal use only
- **Commercial License:** Single user, commercial use allowed
- **Team License:** Multiple users within one organization
- **Enterprise License:** Unlimited users, custom terms

---

## 5. User Accounts

### 5.1 Account Registration

To access certain features, you must create an account. You agree to:

- Provide accurate, complete, and current information
- Maintain the security of your account credentials
- Promptly update any changes to your information
- Accept responsibility for all activity under your account

### 5.2 Account Security

You are responsible for:
- Maintaining password confidentiality
- Logging out from shared devices
- Notifying us immediately of unauthorized access
- All activities that occur under your account

### 5.3 Account Termination

We may suspend or terminate your account if you:
- Violate these Terms
- Engage in fraudulent activity
- Fail to pay applicable fees
- Abuse our Services or support

---

## 6. Payment Terms

### 6.1 Pricing

All prices are listed in USD unless otherwise specified. Prices are subject to change with notice.

### 6.2 Payment Processing

- Payments are processed by third-party providers (Stripe, PayPal, Gumroad)
- You agree to their respective terms of service
- We do not store your complete payment information

### 6.3 Taxes

You are responsible for all applicable taxes. Prices may not include taxes, which will be added at checkout where required.

### 6.4 Subscription Terms

For subscription products:
- Billing occurs on a recurring basis (monthly/yearly)
- You authorize automatic renewals
- Cancel before renewal to avoid charges
- No refunds for partial subscription periods

### 6.5 Revenue Allocation

As part of our 60/30/10 Gospel Model:
- 60% goes to verified pediatric charities
- 30% covers operations
- 10% funds growth and development

---

## 7. Intellectual Property

### 7.1 Our Intellectual Property

All content, features, and functionality of our Services are owned by ${COMPANY.name} and protected by:

- Copyright laws
- Trademark laws
- Patent laws
- Trade secret laws
- Other intellectual property rights

### 7.2 Your Content

You retain ownership of content you create using our products. However, you grant us a license to use your content for:

- Providing and improving our Services
- Marketing and promotional purposes (with anonymization)
- Analytics and research

### 7.3 AI-Generated Content

Content generated by our AI tools:
- May be used by you according to your license
- Should be reviewed for accuracy before use
- May have limitations on exclusive ownership rights
- Must comply with platform-specific rules where published

### 7.4 Trademarks

Our trademarks, logos, and service marks may not be used without written permission. "AI Solutions Store," "FOR THE KIDS," and product names are our trademarks.

---

## 8. Acceptable Use Policy

### 8.1 Permitted Uses

You may use our Services to:
- Create legitimate business content
- Automate authorized workflows
- Generate AI-assisted outputs for lawful purposes
- Improve your productivity and efficiency

### 8.2 Prohibited Uses

You may NOT use our Services to:

**Illegal Activities:**
- Violate any laws or regulations
- Infringe intellectual property rights
- Engage in fraud or deception
- Facilitate illegal transactions

**Harmful Content:**
- Create spam or unsolicited content
- Generate malware or malicious code
- Produce harassment or abusive content
- Create misleading or fake information
- Generate content that exploits children

**Platform Violations:**
- Violate third-party platform terms of service
- Create fake accounts or impersonations
- Manipulate algorithms deceptively
- Engage in coordinated inauthentic behavior

**System Abuse:**
- Attempt to hack or exploit our systems
- Overload our infrastructure
- Scrape or harvest our data
- Interfere with other users' access

---

## 9. Disclaimers

### 9.1 "AS IS" Provision

OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:

- MERCHANTABILITY
- FITNESS FOR A PARTICULAR PURPOSE
- NON-INFRINGEMENT
- ACCURACY OR RELIABILITY

### 9.2 AI Disclaimer

We do not guarantee that AI-generated outputs will be:
- Error-free or accurate
- Suitable for your specific purpose
- Free from bias or inappropriate content
- Compliant with all regulations

### 9.3 Third-Party Services

We are not responsible for:
- Third-party platforms' terms or actions
- Third-party service availability
- Changes to third-party APIs or services

---

## 10. Limitation of Liability

### 10.1 Exclusion of Damages

TO THE MAXIMUM EXTENT PERMITTED BY LAW, ${COMPANY.name.toUpperCase()} SHALL NOT BE LIABLE FOR:

- Indirect, incidental, special, or consequential damages
- Loss of profits, revenue, or data
- Business interruption
- Damages arising from use of our Services

### 10.2 Liability Cap

OUR TOTAL LIABILITY SHALL NOT EXCEED THE GREATER OF:
- The amount you paid us in the 12 months before the claim, OR
- One hundred dollars ($100)

### 10.3 Exceptions

Some jurisdictions do not allow limitation of liability, so these limitations may not apply to you.

---

## 11. Indemnification

You agree to indemnify, defend, and hold harmless ${COMPANY.name}, its officers, directors, employees, and agents from any claims, damages, losses, or expenses (including legal fees) arising from:

- Your use of our Services
- Your violation of these Terms
- Your violation of any rights of third parties
- Content you create or distribute using our Services

---

## 12. Dispute Resolution

### 12.1 Informal Resolution

Before filing any formal dispute, you agree to contact us at ${COMPANY.email} to attempt informal resolution.

### 12.2 Binding Arbitration

Any dispute not resolved informally shall be resolved by binding arbitration in accordance with the rules of the American Arbitration Association.

### 12.3 Class Action Waiver

You waive any right to participate in class actions or class arbitrations.

### 12.4 Governing Law

These Terms are governed by the laws of the State of Delaware, without regard to conflict of law principles.

---

## 13. Changes to Terms

We may modify these Terms at any time. We will notify you of material changes by:

- Posting updated Terms on our website
- Sending email notification
- Displaying notice in our applications

Continued use after changes constitutes acceptance.

---

## 14. General Provisions

### 14.1 Entire Agreement
These Terms constitute the entire agreement between you and ${COMPANY.name}.

### 14.2 Severability
If any provision is found unenforceable, other provisions remain in effect.

### 14.3 Waiver
Failure to enforce any right does not waive that right.

### 14.4 Assignment
You may not assign your rights without our consent. We may assign our rights freely.

### 14.5 Force Majeure
We are not liable for delays due to circumstances beyond our control.

---

## 15. Contact Information

For questions about these Terms:

**${COMPANY.name}**
Email: ${COMPANY.email}
Support: ${COMPANY.supportEmail}
Website: ${COMPANY.website}

---

**FOR THE KIDS - 60/30/10 Gospel Model**
*By using our Services, you support our mission.*
*60% of all revenue goes directly to verified pediatric charities.*

---

*These Terms of Service are provided for informational purposes. For legal advice, please consult a qualified attorney.*
`;
}

// ============================================================================
// 3. REFUND POLICY
// ============================================================================
function generateRefundPolicy() {
    const effectiveDate = getFormattedDate();

    return `# Refund Policy

**${COMPANY.name}**
**Effective Date: ${effectiveDate}**
**Last Updated: ${effectiveDate}**

---

## FOR THE KIDS - Our Commitment

At ${COMPANY.name}, customer satisfaction is our priority. We want you to be completely happy with your purchase. This Refund Policy outlines our fair and transparent approach to refunds.

Remember: 60% of your purchase supports verified pediatric charities through our 60/30/10 Gospel Model.

---

## 1. Our Refund Philosophy

We believe in our products and stand behind their quality. If our AI software products don't meet your expectations, we offer fair refund options. We aim to make every customer experience positive while protecting against abuse.

---

## 2. Refund Eligibility

### 2.1 Digital Software Products (One-Time Purchase)

**30-Day Money-Back Guarantee**

You are eligible for a full refund within 30 days of purchase if:

- The product doesn't function as described
- You encounter technical issues we cannot resolve
- The product is incompatible with your system (where compatibility was claimed)
- You are genuinely unsatisfied with the product

**Refund requests must include:**
- Order number or transaction ID
- Email used for purchase
- Reason for refund request
- Description of any issues encountered

### 2.2 Subscription Products

**Subscription Refunds:**

- **Monthly Subscriptions:** Cancel anytime. No refunds for partial months.
- **Annual Subscriptions:** Prorated refund within first 30 days.
- **Renewal Refunds:** Contact us within 7 days of unwanted renewal for refund.

**To Cancel:**
- Log into your account and cancel
- Email ${COMPANY.supportEmail} with cancellation request
- Cancellation takes effect at end of current billing period

### 2.3 Bundle Products

For product bundles:
- Full refund available within 30 days
- Partial refunds not available (bundle must be returned in full)
- Individual products from bundles cannot be refunded separately

---

## 3. Non-Refundable Items

The following are NOT eligible for refunds:

### 3.1 Services Already Rendered
- Custom development or consulting hours used
- Setup or configuration services completed
- Training sessions already delivered

### 3.2 Subscription Exceptions
- Partial month usage for monthly subscriptions
- Annual subscriptions after 30-day period (unless specified)

### 3.3 Abuse Prevention
- Multiple refund requests for the same product
- Refund requests after substantial use of the product
- Accounts showing patterns of refund abuse
- Products purchased with intent to refund after use

### 3.4 Third-Party Fees
- Payment processor fees (non-recoverable)
- Currency conversion fees
- Bank charges

### 3.5 Promotional Items
- Free products or samples
- Heavily discounted promotional items (may have different terms)
- Bonus items included with purchases

---

## 4. Refund Process

### 4.1 How to Request a Refund

**Step 1:** Send an email to ${COMPANY.supportEmail} with subject line: "Refund Request - [Order Number]"

**Step 2:** Include the following information:
- Full name on the order
- Email address used for purchase
- Order number or transaction ID
- Product(s) for which you're requesting a refund
- Reason for the refund request
- Any relevant details or issues encountered

**Step 3:** Wait for our response (typically within 2-3 business days)

### 4.2 Review Process

Upon receiving your request:
1. We verify your purchase information
2. We review your account history
3. We may contact you for additional information
4. We make a determination based on this policy
5. We notify you of the decision

### 4.3 Refund Timeline

**Processing Time:**
- Decision: 2-3 business days
- Refund processing: 5-7 business days after approval
- Funds appearing in your account: 5-10 business days (depends on your bank)

**Refund Methods:**
- Original payment method (preferred)
- Store credit (if original method unavailable)
- Alternative payment (in exceptional circumstances)

---

## 5. Chargebacks and Disputes

### 5.1 Our Request

Before filing a chargeback with your bank or payment provider, please:
1. Contact us at ${COMPANY.supportEmail}
2. Allow us to resolve your issue directly
3. Give us the opportunity to issue a refund

Chargebacks damage our ability to support pediatric charities (our 60/30/10 mission).

### 5.2 Chargeback Consequences

If a chargeback is filed:
- Your account may be suspended pending resolution
- Access to all products may be revoked
- Future purchases may be declined
- We may contest fraudulent chargebacks

### 5.3 Friendly Fraud

We take friendly fraud seriously. Fraudulent chargebacks may result in:
- Account termination
- Collection efforts for damages
- Reporting to fraud prevention services

---

## 6. Product-Specific Policies

### 6.1 Claude Droid (YouTube Automation)
- Full 30-day guarantee
- Must not have generated more than 100 videos for refund eligibility
- Refunds processed after API key deactivation

### 6.2 Income Droid (Revenue Generation)
- Full 30-day guarantee
- Revenue generated using the tool is yours to keep
- Refund processed normally

### 6.3 Marketing Engine (24/7 Automation)
- Full 30-day guarantee
- Campaigns created remain yours
- Account access revoked upon refund

### 6.4 Jules AI (Personal Assistant)
- Full 30-day guarantee
- Conversation history may be deleted upon refund
- API access revoked

### 6.5 Affiliate System
- Full 30-day guarantee
- Commissions earned are unaffected
- System access revoked upon refund

### 6.6 Enterprise/Custom Solutions
- Custom refund terms per agreement
- Contact sales for specific policies
- Typically handled on case-by-case basis

---

## 7. Technical Issues

### 7.1 Troubleshooting First

Before requesting a refund for technical issues:
1. Check our documentation and FAQ
2. Verify system requirements
3. Contact support for assistance
4. Allow us to attempt to resolve the issue

We can often fix technical problems and want to ensure you can enjoy our products.

### 7.2 Unresolvable Issues

If we cannot resolve a legitimate technical issue:
- Full refund will be provided
- We may offer an alternative product
- We value your feedback for improvement

---

## 8. International Customers

### 8.1 Currency

Refunds are processed in the original purchase currency. Exchange rate differences may result in slightly different amounts.

### 8.2 International Fees

We cannot refund:
- International transaction fees
- Currency conversion costs
- Bank wire fees (if applicable)

### 8.3 EU Customers

EU customers have additional rights under consumer protection laws. See our GDPR Compliance documentation.

**14-Day Cooling-Off Period:**
EU consumers may cancel digital purchases within 14 days, unless you have explicitly consented to immediate delivery and acknowledged waiver of cooling-off rights.

---

## 9. Exceptions and Appeals

### 9.1 Exceptional Circumstances

We consider exceptions for:
- Medical emergencies
- Natural disasters
- Documented financial hardship
- Other extraordinary circumstances

Contact us with documentation to discuss options.

### 9.2 Appeal Process

If your refund request is denied:
1. Reply to the denial email with additional information
2. Request escalation to a supervisor
3. Provide any documentation supporting your case
4. Allow 5 business days for appeal review

---

## 10. Changes to This Policy

We may update this Refund Policy periodically. Changes will:
- Be posted on our website
- Take effect immediately for new purchases
- Not affect existing orders or guarantees

---

## 11. Contact Us

For refund requests or questions:

**${COMPANY.name}**
Email: ${COMPANY.supportEmail}
Subject: Refund Request - [Order Number]
Website: ${COMPANY.website}/support

**Response Time:** 2-3 business days

---

**FOR THE KIDS - 60/30/10 Gospel Model**
*Your satisfaction matters to us.*
*60% of all revenue goes directly to verified pediatric charities.*
*Thank you for supporting our mission to help children in need.*

---

*This Refund Policy is provided for informational purposes. For legal advice, please consult a qualified attorney.*
`;
}

// ============================================================================
// 4. GDPR COMPLIANCE TEXT
// ============================================================================
function generateGDPRCompliance() {
    const effectiveDate = getFormattedDate();

    return `# GDPR Compliance Statement

**${COMPANY.name}**
**Effective Date: ${effectiveDate}**
**Last Updated: ${effectiveDate}**

---

## FOR THE KIDS - Privacy and Protection

${COMPANY.name} is committed to protecting the privacy and personal data of all individuals, especially our European customers. This document outlines our compliance with the General Data Protection Regulation (GDPR).

---

## 1. Introduction to GDPR

The General Data Protection Regulation (EU) 2016/679 ("GDPR") is a comprehensive data protection law that applies to:

- Organizations established in the European Union (EU)
- Organizations outside the EU that offer goods/services to EU residents
- Organizations that monitor the behavior of EU residents

${COMPANY.name} processes personal data of EU residents and is committed to full GDPR compliance.

---

## 2. Our Role Under GDPR

### 2.1 Data Controller

${COMPANY.name} acts as the **Data Controller** for personal data collected directly from you, including:

- Account registration information
- Purchase and payment information
- Customer support communications
- Newsletter subscriptions
- Website usage data

### 2.2 Data Processor

When using third-party services, we act as a **Data Controller** and they act as **Data Processors** on our behalf. We ensure all processors comply with GDPR requirements.

---

## 3. Lawful Basis for Processing

We process personal data only when we have a valid legal basis:

### 3.1 Consent (Article 6(1)(a))
- Marketing communications
- Newsletter subscriptions
- Non-essential cookies
- Optional data collection

**You can withdraw consent at any time.**

### 3.2 Contract Performance (Article 6(1)(b))
- Processing purchases
- Providing licensed software
- Customer account management
- Customer support services

### 3.3 Legal Obligation (Article 6(1)(c))
- Tax and accounting records
- Fraud prevention
- Legal compliance requirements
- Regulatory reporting

### 3.4 Legitimate Interests (Article 6(1)(f))
- Service improvement
- Security measures
- Business analytics (anonymized)
- Fraud prevention

**We conduct legitimate interest assessments to ensure processing doesn't override your rights.**

---

## 4. Your Rights Under GDPR

As a data subject in the EU/EEA, you have the following rights:

### 4.1 Right of Access (Article 15)
You have the right to:
- Confirm whether we process your personal data
- Obtain a copy of your personal data
- Receive information about how your data is processed

**How to exercise:** Email ${COMPANY.privacyEmail} with subject "GDPR Access Request"

### 4.2 Right to Rectification (Article 16)
You have the right to:
- Correct inaccurate personal data
- Complete incomplete personal data

**How to exercise:** Update your account or email ${COMPANY.privacyEmail}

### 4.3 Right to Erasure ("Right to be Forgotten") (Article 17)
You have the right to request deletion of your data when:
- Data is no longer necessary for original purpose
- You withdraw consent
- You object to processing
- Data was unlawfully processed
- Legal obligation requires deletion

**Exceptions:** We may retain data for legal compliance, legal claims, or public interest.

**How to exercise:** Email ${COMPANY.privacyEmail} with subject "GDPR Erasure Request"

### 4.4 Right to Restriction (Article 18)
You have the right to restrict processing when:
- You contest data accuracy
- Processing is unlawful but you don't want deletion
- We no longer need the data but you need it for legal claims
- You've objected to processing pending verification

**How to exercise:** Email ${COMPANY.privacyEmail} with subject "GDPR Restriction Request"

### 4.5 Right to Data Portability (Article 20)
You have the right to:
- Receive your data in a structured, common format (JSON, CSV)
- Transmit data to another controller
- Have data transmitted directly between controllers (where feasible)

**How to exercise:** Email ${COMPANY.privacyEmail} with subject "GDPR Portability Request"

### 4.6 Right to Object (Article 21)
You have the right to object to:
- Processing based on legitimate interests
- Direct marketing (absolute right)
- Processing for research/statistics

**How to exercise:** Email ${COMPANY.privacyEmail} with subject "GDPR Objection"

### 4.7 Rights Related to Automated Decision-Making (Article 22)
You have the right to:
- Not be subject to solely automated decisions with legal effects
- Obtain human intervention
- Express your point of view
- Contest the decision

**Note:** We do not make solely automated decisions with legal or significant effects.

---

## 5. Data Subject Request Process

### 5.1 How to Submit a Request

**Email:** ${COMPANY.privacyEmail}
**Subject Line:** "GDPR [Type] Request - [Your Name]"

**Include:**
- Your full name
- Email address associated with your account
- Specific request type
- Any relevant details

### 5.2 Identity Verification

To protect your data, we must verify your identity before processing requests. We may ask for:
- Confirmation from your registered email
- Order numbers or account details
- Additional verification for sensitive requests

### 5.3 Response Timeline

- **Acknowledgment:** Within 3 business days
- **Completion:** Within 30 days (may extend to 90 days for complex requests)
- **Notification:** If extension needed, we'll inform you within 30 days

### 5.4 Fees

- Most requests are free
- We may charge reasonable fees for manifestly unfounded or excessive requests
- We will inform you of any fees before processing

---

## 6. International Data Transfers

### 6.1 Transfer Mechanisms

When transferring data outside the EU/EEA, we use:

**Standard Contractual Clauses (SCCs):**
- EU Commission-approved contracts
- Binding processors to EU-level protections
- Regular compliance reviews

**Adequacy Decisions:**
- Transfers to countries with adequate protection
- As determined by EU Commission

### 6.2 US Data Transfers

For transfers to the United States, we implement:
- Standard Contractual Clauses
- Supplementary technical measures
- Enhanced encryption and access controls
- Data minimization practices

### 6.3 Third-Party Processors

Our key processors and their locations:
- **Stripe (Payment):** US - SCCs in place
- **AWS (Hosting):** EU region available - Data Processing Agreement
- **SendGrid (Email):** US - SCCs in place
- **Google Analytics:** EU data processing options enabled

---

## 7. Data Protection by Design and Default

### 7.1 Privacy by Design

We incorporate data protection into all processing activities:

- **Minimization:** Collect only necessary data
- **Purpose Limitation:** Use data only for specified purposes
- **Storage Limitation:** Delete data when no longer needed
- **Security:** Implement appropriate technical measures
- **Transparency:** Clear privacy notices and policies

### 7.2 Privacy by Default

Default settings protect privacy:
- Marketing opt-in (not opt-out)
- Minimal data collection on registration
- Privacy-friendly analytics configuration
- Secure default configurations

---

## 8. Data Processing Records

As required by Article 30, we maintain records of:

- Categories of data processed
- Purposes of processing
- Categories of data subjects
- Categories of recipients
- International transfers
- Retention periods
- Security measures

These records are available to supervisory authorities upon request.

---

## 9. Data Protection Impact Assessments

We conduct Data Protection Impact Assessments (DPIAs) when:

- Introducing new processing activities
- Processing presents high risk to rights
- Using new technologies
- Large-scale processing of sensitive data

DPIAs are documented and reviewed regularly.

---

## 10. Data Breach Notification

### 10.1 Internal Procedures

In the event of a data breach:
1. Immediate containment and investigation
2. Risk assessment
3. Notification decisions
4. Remediation measures
5. Documentation

### 10.2 Supervisory Authority Notification

We notify relevant supervisory authorities within 72 hours of becoming aware of a breach that poses risk to individuals.

### 10.3 Data Subject Notification

We notify affected individuals without undue delay when a breach is likely to result in high risk to their rights and freedoms.

---

## 11. Data Protection Officer

### 11.1 Contact Information

**Data Protection Officer**
${COMPANY.name}
Email: ${COMPANY.dpoEmail}

### 11.2 DPO Responsibilities

Our DPO:
- Monitors GDPR compliance
- Advises on data protection obligations
- Serves as contact for supervisory authorities
- Handles data subject requests
- Conducts internal audits

---

## 12. Supervisory Authority

### 12.1 Right to Lodge Complaint

You have the right to lodge a complaint with a supervisory authority if you believe your data protection rights have been violated.

### 12.2 Lead Supervisory Authority

For EU-wide issues, you may contact:
- Your local Data Protection Authority
- The authority in the EU country where the issue occurred

**Find Your Authority:** [https://edpb.europa.eu/about-edpb/board/members_en](https://edpb.europa.eu/about-edpb/board/members_en)

---

## 13. Children's Data

We do not knowingly collect data from children under 16 in the EU (or the applicable age in member states). If we discover such data has been collected, we will delete it promptly.

**Note:** While our mission is "FOR THE KIDS" through charitable donations, our products are for adult users.

---

## 14. Cookie Compliance

See our Cookie Policy for detailed information on:
- Types of cookies used
- Cookie consent mechanisms
- How to manage cookie preferences
- Third-party cookies

We use a compliant cookie consent banner for EU visitors.

---

## 15. Updates to This Statement

We review and update this GDPR Compliance Statement:
- At least annually
- When regulations change
- When our processing activities change

Updates are posted on our website with the new effective date.

---

## 16. Contact Us

**For GDPR-related inquiries:**

**${COMPANY.name}**
Data Protection Officer: ${COMPANY.dpoEmail}
General Privacy: ${COMPANY.privacyEmail}
Website: ${COMPANY.website}

---

**FOR THE KIDS - 60/30/10 Gospel Model**
*Protecting your data. Supporting our mission.*
*60% of all revenue goes directly to verified pediatric charities.*

---

*This GDPR Compliance Statement is provided for informational purposes. For legal advice regarding GDPR compliance, please consult a qualified legal professional specializing in data protection law.*
`;
}

// ============================================================================
// 5. COOKIE POLICY
// ============================================================================
function generateCookiePolicy() {
    const effectiveDate = getFormattedDate();

    return `# Cookie Policy

**${COMPANY.name}**
**Effective Date: ${effectiveDate}**
**Last Updated: ${effectiveDate}**

---

## FOR THE KIDS - Transparency in Everything We Do

At ${COMPANY.name}, we believe in complete transparency. This Cookie Policy explains how we use cookies and similar technologies on our website ${COMPANY.website}.

---

## 1. What Are Cookies?

Cookies are small text files stored on your device (computer, tablet, or mobile phone) when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.

### 1.1 How Cookies Work

1. You visit our website
2. Our server sends a small file to your browser
3. Your browser stores the file on your device
4. When you return, the browser sends the cookie back to our server
5. We use this information to recognize you and improve your experience

### 1.2 Similar Technologies

This policy also covers similar technologies:
- **Pixel tags/Web beacons:** Tiny images that track page visits
- **Local storage:** Browser storage for website data
- **Session storage:** Temporary browser storage
- **Fingerprinting:** Device identification techniques (we minimize this)

---

## 2. Types of Cookies We Use

### 2.1 By Duration

**Session Cookies:**
- Temporary cookies deleted when you close your browser
- Used for essential functions like shopping carts
- No personal data retention

**Persistent Cookies:**
- Remain on your device for a set period
- Used for preferences and returning user recognition
- Deleted after expiration or when you clear them

### 2.2 By Source

**First-Party Cookies:**
- Set by ${COMPANY.name}
- Used for core website functionality
- We control the data collected

**Third-Party Cookies:**
- Set by external services we use
- Used for analytics, advertising, social features
- Governed by third-party privacy policies

---

## 3. Categories of Cookies

### 3.1 Strictly Necessary Cookies

**Purpose:** Essential for website operation

These cookies are required for our website to function. They enable:
- User authentication and login
- Shopping cart functionality
- Security features
- Load balancing

**Consent:** Not required (essential for service)

| Cookie Name | Provider | Purpose | Duration |
|-------------|----------|---------|----------|
| session_id | ${COMPANY.name} | User session | Session |
| csrf_token | ${COMPANY.name} | Security | Session |
| cart_items | ${COMPANY.name} | Shopping cart | 7 days |

### 3.2 Functionality Cookies

**Purpose:** Remember your preferences

These cookies remember choices you make, such as:
- Language preferences
- Region/location
- Display preferences
- Username for returning users

**Consent:** Required in EU/EEA

| Cookie Name | Provider | Purpose | Duration |
|-------------|----------|---------|----------|
| language | ${COMPANY.name} | Language preference | 1 year |
| theme | ${COMPANY.name} | Light/dark mode | 1 year |
| returning_user | ${COMPANY.name} | Welcome back message | 30 days |

### 3.3 Analytics Cookies

**Purpose:** Understand how visitors use our site

These cookies help us:
- Count visitors and page views
- See how visitors navigate our site
- Identify popular content
- Find and fix problems

**Consent:** Required

| Cookie Name | Provider | Purpose | Duration |
|-------------|----------|---------|----------|
| _ga | Google Analytics | User identification | 2 years |
| _gid | Google Analytics | User identification | 24 hours |
| _gat | Google Analytics | Rate limiting | 1 minute |
| mp_* | Mixpanel | Analytics tracking | 1 year |

### 3.4 Marketing/Advertising Cookies

**Purpose:** Deliver relevant advertisements

These cookies:
- Track visitors across websites
- Display relevant ads
- Measure advertising effectiveness
- Limit ad frequency

**Consent:** Required

| Cookie Name | Provider | Purpose | Duration |
|-------------|----------|---------|----------|
| _fbp | Facebook | Ad targeting | 90 days |
| ads/ga-audiences | Google Ads | Remarketing | Session |
| fr | Facebook | Ad delivery | 90 days |

### 3.5 Social Media Cookies

**Purpose:** Enable social sharing features

These cookies:
- Allow content sharing on social platforms
- Enable social login options
- Track social interactions

**Consent:** Required

| Cookie Name | Provider | Purpose | Duration |
|-------------|----------|---------|----------|
| li_sugr | LinkedIn | Social features | 90 days |
| twitter_sess | Twitter | Share functionality | Session |

---

## 4. Third-Party Services

We use the following third-party services that may set cookies:

### 4.1 Analytics

**Google Analytics**
- Purpose: Website analytics
- Privacy Policy: [https://policies.google.com/privacy](https://policies.google.com/privacy)
- Opt-out: [https://tools.google.com/dlpage/gaoptout](https://tools.google.com/dlpage/gaoptout)

**Mixpanel**
- Purpose: Product analytics
- Privacy Policy: [https://mixpanel.com/legal/privacy-policy](https://mixpanel.com/legal/privacy-policy)

### 4.2 Payment Processing

**Stripe**
- Purpose: Payment processing
- Privacy Policy: [https://stripe.com/privacy](https://stripe.com/privacy)
- Note: Essential cookies for payment security

**PayPal**
- Purpose: Payment processing
- Privacy Policy: [https://www.paypal.com/privacy](https://www.paypal.com/privacy)

### 4.3 Marketing

**Facebook Pixel**
- Purpose: Advertising, remarketing
- Privacy Policy: [https://www.facebook.com/privacy](https://www.facebook.com/privacy)
- Controls: [https://www.facebook.com/ads/preferences](https://www.facebook.com/ads/preferences)

**Google Ads**
- Purpose: Advertising
- Privacy Policy: [https://policies.google.com/privacy](https://policies.google.com/privacy)
- Controls: [https://adssettings.google.com](https://adssettings.google.com)

### 4.4 Customer Support

**Intercom/Zendesk**
- Purpose: Live chat, support
- Note: Session cookies for chat functionality

---

## 5. Your Cookie Choices

### 5.1 Cookie Consent Banner

When you first visit our website, you'll see a cookie consent banner. You can:
- **Accept All:** Enable all cookies
- **Reject Non-Essential:** Allow only necessary cookies
- **Customize:** Choose specific cookie categories

### 5.2 Changing Your Preferences

You can change your cookie preferences at any time:
1. Click the "Cookie Settings" link in our footer
2. Adjust your preferences in the popup
3. Save your new settings

### 5.3 Browser Controls

You can control cookies through your browser:

**Google Chrome:**
Settings > Privacy and Security > Cookies

**Mozilla Firefox:**
Settings > Privacy & Security > Cookies

**Safari:**
Preferences > Privacy > Cookies

**Microsoft Edge:**
Settings > Privacy > Cookies

**Note:** Blocking essential cookies may prevent our website from functioning properly.

### 5.4 Do Not Track

We honor Do Not Track (DNT) browser signals. When enabled:
- We minimize analytics tracking
- We disable non-essential cookies
- We respect your privacy preference

### 5.5 Opt-Out Links

- **Google Analytics Opt-out:** [https://tools.google.com/dlpage/gaoptout](https://tools.google.com/dlpage/gaoptout)
- **Facebook Ads:** [https://www.facebook.com/ads/preferences](https://www.facebook.com/ads/preferences)
- **Google Ads:** [https://adssettings.google.com](https://adssettings.google.com)
- **Network Advertising Initiative:** [https://optout.networkadvertising.org](https://optout.networkadvertising.org)
- **Digital Advertising Alliance:** [https://optout.aboutads.info](https://optout.aboutads.info)

---

## 6. EU/EEA Visitors (Cookie Consent under GDPR)

If you're in the European Union or European Economic Area:

### 6.1 Consent Requirements

- We obtain explicit consent before setting non-essential cookies
- You can withdraw consent at any time
- We don't use pre-ticked consent boxes
- We provide clear information about each cookie type

### 6.2 Consent Records

We maintain records of:
- When consent was given
- What was consented to
- How consent was provided
- When consent was withdrawn (if applicable)

---

## 7. California Visitors (CCPA)

If you're a California resident:

- We disclose our cookie practices in this policy
- You can opt-out of "sale" of personal information
- We honor Do Not Track signals
- See our Privacy Policy for additional CCPA rights

---

## 8. Children's Privacy

Our website is not directed at children under 13 (or 16 in the EU). We do not knowingly use cookies to collect information from children.

---

## 9. Updates to This Policy

We may update this Cookie Policy periodically. Changes will be:
- Posted on our website
- Reflected in the "Last Updated" date
- Communicated through our cookie banner (for material changes)

---

## 10. Contact Us

For questions about our cookie practices:

**${COMPANY.name}**
Email: ${COMPANY.privacyEmail}
Website: ${COMPANY.website}

---

**FOR THE KIDS - 60/30/10 Gospel Model**
*Transparency in everything we do.*
*60% of all revenue goes directly to verified pediatric charities.*

---

*This Cookie Policy is provided for informational purposes. For legal advice, please consult a qualified attorney.*
`;
}

// ============================================================================
// 6. DISCLAIMER
// ============================================================================
function generateDisclaimer() {
    const effectiveDate = getFormattedDate();

    return `# Disclaimer

**${COMPANY.name}**
**Effective Date: ${effectiveDate}**
**Last Updated: ${effectiveDate}**

---

## FOR THE KIDS - Honest and Transparent

At ${COMPANY.name}, we believe in honesty and transparency. This Disclaimer outlines important information about our AI software products and services. Please read carefully before using our products.

---

## 1. General Disclaimer

### 1.1 "As Is" Basis

THE INFORMATION, SOFTWARE, PRODUCTS, AND SERVICES PROVIDED BY ${COMPANY.name.toUpperCase()} ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED.

We make no representations or warranties regarding:
- Accuracy or completeness of information
- Reliability or availability of services
- Error-free operation of software
- Suitability for your specific purposes
- Results you may achieve

### 1.2 Use at Your Own Risk

Your use of ${COMPANY.name} products and services is at your sole risk. We are not responsible for any:
- Decisions made based on our products
- Losses incurred from using our software
- Results that differ from expectations
- Third-party actions or content

---

## 2. AI Software Disclaimer

### 2.1 Nature of AI Technology

Our products use artificial intelligence and machine learning technologies. It is important to understand that:

**AI Limitations:**
- AI systems can make mistakes
- Outputs may contain errors, inaccuracies, or biases
- AI cannot replace human judgment and oversight
- Results vary based on inputs and configurations
- AI technology is continuously evolving

**Not Professional Advice:**
AI-generated content from our products is NOT:
- Legal advice
- Financial advice
- Medical advice
- Professional counsel of any kind

Always consult qualified professionals for important decisions.

### 2.2 Human Oversight Required

You must:
- Review all AI-generated content before use
- Verify accuracy of AI outputs
- Make final decisions yourself
- Not rely solely on AI for critical matters
- Maintain appropriate human oversight

### 2.3 No Guarantee of Results

We do not guarantee that our AI products will:
- Produce specific results
- Generate revenue or income
- Achieve particular outcomes
- Work for every use case
- Meet all your expectations

Individual results vary significantly based on many factors.

---

## 3. Product-Specific Disclaimers

### 3.1 Claude Droid (YouTube Automation)

**Platform Compliance:**
- You are responsible for complying with YouTube's Terms of Service
- YouTube policies may change at any time
- Account actions by YouTube are not our responsibility
- Content must follow YouTube Community Guidelines

**Content Ownership:**
- You are responsible for content created
- Ensure you have rights to all materials used
- AI-generated content may have copyright implications
- Verify content before publishing

### 3.2 Income Droid (Revenue Generation)

**No Income Guarantees:**
- We do not guarantee any specific income
- Results depend on many factors outside our control
- Past results do not guarantee future performance
- Individual outcomes vary significantly

**Your Responsibility:**
- You must provide effort and implementation
- Success depends on market conditions
- Compliance with laws is your responsibility
- Business risks are yours to manage

### 3.3 Marketing Engine (24/7 Automation)

**Platform Terms:**
- You must comply with all platform terms of service
- Social media policies change frequently
- Account restrictions are your responsibility
- We are not liable for platform actions

**Content Responsibility:**
- Marketing claims must be truthful
- FTC disclosure requirements apply
- You are responsible for compliance
- Review all automated content

### 3.4 Jules AI (Personal Assistant)

**Not a Replacement:**
- Jules AI is not a replacement for professional services
- Do not rely on AI for critical decisions
- Verify important information independently
- Use for assistance, not final authority

### 3.5 Dating Platform

**User Responsibility:**
- Safety in meeting others is your responsibility
- Verify identities and intentions independently
- We do not guarantee matches or outcomes
- Use common sense and caution

---

## 4. Earnings and Income Disclaimer

### 4.1 No Earning Guarantees

${COMPANY.name} makes NO guarantees regarding earnings or income.

**Important Facts:**
- There is no guarantee you will earn money
- Success requires work, skill, and market conditions
- Many factors affect business outcomes
- Past performance doesn't guarantee future results
- Individual results vary dramatically

### 4.2 Testimonials and Examples

Any income examples, case studies, or testimonials:
- Represent individual experiences only
- Are not guarantees of typical results
- May not reflect average outcomes
- Include exceptional cases
- Should not be relied upon for expectations

### 4.3 Your Success Factors

Results depend on:
- Your effort and dedication
- Your skills and experience
- Market conditions
- Competition
- Many other factors

We provide tools; success is up to you.

---

## 5. Third-Party Disclaimer

### 5.1 Third-Party Services

We use and integrate with third-party services. We are not responsible for:
- Third-party availability or reliability
- Changes to third-party terms or APIs
- Third-party data practices
- Actions taken by third parties
- Third-party content or products

### 5.2 Third-Party Links

Our website may contain links to external sites. We:
- Do not endorse external content
- Are not responsible for external sites
- Do not control third-party practices
- Recommend reviewing their policies

### 5.3 Affiliates and Partners

We may have affiliate relationships. We:
- May receive compensation for referrals
- Disclose material relationships
- Strive to recommend quality products
- Cannot guarantee partner performance

---

## 6. Legal Disclaimer

### 6.1 Not Legal Advice

Nothing on our website or in our products constitutes legal advice. Our content is for informational purposes only.

**You should:**
- Consult qualified attorneys for legal matters
- Not rely on our content for legal decisions
- Understand laws vary by jurisdiction
- Seek professional legal counsel

### 6.2 Not Financial Advice

We do not provide financial advice. Our products and content:
- Are for informational purposes
- Do not constitute investment recommendations
- Should not replace professional financial advice
- Do not guarantee financial outcomes

### 6.3 Not Professional Advice

Our products do not replace:
- Medical professionals
- Legal counsel
- Financial advisors
- Tax professionals
- Other licensed professionals

---

## 7. Technical Disclaimer

### 7.1 Software Functionality

We cannot guarantee:
- Uninterrupted service
- Error-free operation
- Compatibility with all systems
- Security from all threats
- Continuous availability

### 7.2 Data and Results

We are not responsible for:
- Data loss or corruption
- Incorrect calculations or outputs
- System failures or crashes
- Integration issues
- User errors

### 7.3 Updates and Changes

We may:
- Update software at any time
- Change features or functionality
- Discontinue products or services
- Modify pricing or terms
- Alter API functionality

---

## 8. Charitable Mission Disclaimer

### 8.1 60/30/10 Gospel Model

Our commitment to donate 60% of revenue to pediatric charities:
- Represents our intention and goal
- Is based on net revenue calculations
- May vary based on business conditions
- Does not constitute a legal obligation to purchasers
- Is administered through our charitable giving program

### 8.2 Charitable Organizations

We partner with verified charities but:
- Cannot guarantee how donations are used
- Do not control charitable organizations
- Recommend independent research on charities
- Reserve the right to change partner organizations

### 8.3 FOR THE KIDS

"FOR THE KIDS" is our mission statement representing:
- Our commitment to helping children
- Our charitable donation model
- Our business values
- Our community purpose

It does not mean our products are for children (they are for adult users).

---

## 9. Views and Opinions

### 9.1 Personal Views

Views expressed in our content:
- Are those of individual authors
- May not represent official company positions
- Are subject to change
- Are for informational purposes

### 9.2 Accuracy of Information

We strive for accuracy but:
- Information may become outdated
- Errors may occur
- We cannot verify all facts
- Updates may be delayed

---

## 10. Limitation of Liability

### 10.1 Maximum Extent Permitted

TO THE FULLEST EXTENT PERMITTED BY LAW, ${COMPANY.name.toUpperCase()} AND ITS AFFILIATES SHALL NOT BE LIABLE FOR:

- Direct, indirect, incidental, special, or consequential damages
- Loss of profits, revenue, data, or use
- Business interruption
- Any damages arising from:
  - Use or inability to use our products
  - Errors or omissions in content
  - Unauthorized access to data
  - Third-party actions
  - Any other matter related to our services

### 10.2 Liability Cap

In no event shall our liability exceed the amount you paid us in the 12 months preceding the claim, or $100, whichever is greater.

---

## 11. Indemnification

You agree to indemnify and hold harmless ${COMPANY.name}, its officers, directors, employees, and agents from any claims, damages, or expenses arising from:
- Your use of our products
- Your violation of these terms
- Your violation of any rights of others
- Content you create or share

---

## 12. Governing Law

This Disclaimer is governed by the laws of the State of Delaware, without regard to conflict of law principles.

---

## 13. Changes to This Disclaimer

We may update this Disclaimer at any time. Changes are effective when posted. Your continued use constitutes acceptance.

---

## 14. Contact Us

For questions about this Disclaimer:

**${COMPANY.name}**
Email: ${COMPANY.email}
Website: ${COMPANY.website}

---

**FOR THE KIDS - 60/30/10 Gospel Model**
*Honest. Transparent. Mission-driven.*
*60% of all revenue goes directly to verified pediatric charities.*

---

*This Disclaimer is provided for informational purposes. For legal advice, please consult a qualified attorney. Nothing herein creates any legal obligations beyond what is stated in our Terms of Service.*
`;
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================
async function generateAllLegalPages() {
    log('='.repeat(60));
    log('Legal Pages Generator - Starting');
    log(`Mission: ${COMPANY.mission}`);
    log('='.repeat(60));

    const pages = [
        { name: 'privacy-policy', title: 'Privacy Policy', generator: generatePrivacyPolicy },
        { name: 'terms-of-service', title: 'Terms of Service', generator: generateTermsOfService },
        { name: 'refund-policy', title: 'Refund Policy', generator: generateRefundPolicy },
        { name: 'gdpr-compliance', title: 'GDPR Compliance', generator: generateGDPRCompliance },
        { name: 'cookie-policy', title: 'Cookie Policy', generator: generateCookiePolicy },
        { name: 'disclaimer', title: 'Disclaimer', generator: generateDisclaimer }
    ];

    const results = [];
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];

    for (const page of pages) {
        try {
            log(`Generating: ${page.title}...`);

            const content = page.generator();

            // Save as Markdown file
            const mdFileName = `${page.name}.md`;
            const mdFilePath = path.join(LEGAL_DIR, mdFileName);
            fs.writeFileSync(mdFilePath, content);

            // Also save timestamped version
            const timestampedFileName = `${page.name}-${timestamp}.md`;
            const timestampedFilePath = path.join(LEGAL_DIR, timestampedFileName);
            fs.writeFileSync(timestampedFilePath, content);

            const wordCount = content.split(/\s+/).length;
            const charCount = content.length;

            results.push({
                page: page.title,
                file: mdFilePath,
                timestampedFile: timestampedFilePath,
                wordCount,
                charCount,
                status: 'SUCCESS'
            });

            log(`  - Saved: ${mdFilePath}`);
            log(`  - Backup: ${timestampedFilePath}`);
            log(`  - Words: ${wordCount}, Characters: ${charCount}`);

        } catch (err) {
            log(`ERROR generating ${page.title}: ${err.message}`);
            results.push({
                page: page.title,
                status: 'FAILED',
                error: err.message
            });
        }
    }

    // Generate summary
    log('');
    log('='.repeat(60));
    log('GENERATION SUMMARY');
    log('='.repeat(60));

    let totalWords = 0;
    let totalChars = 0;

    results.forEach(result => {
        if (result.status === 'SUCCESS') {
            totalWords += result.wordCount;
            totalChars += result.charCount;
            log(`[OK] ${result.page}: ${result.wordCount} words`);
        } else {
            log(`[FAIL] ${result.page}: ${result.error}`);
        }
    });

    log('');
    log(`Total Documents: ${results.filter(r => r.status === 'SUCCESS').length}/${pages.length}`);
    log(`Total Words: ${totalWords.toLocaleString()}`);
    log(`Total Characters: ${totalChars.toLocaleString()}`);
    log(`Output Directory: ${LEGAL_DIR}`);

    // Save summary JSON
    const summaryPath = path.join(LEGAL_DIR, 'legal-pages-summary.json');
    const summary = {
        generated: new Date().toISOString(),
        company: COMPANY.name,
        mission: COMPANY.mission,
        documents: results,
        totals: {
            documentsGenerated: results.filter(r => r.status === 'SUCCESS').length,
            totalWords,
            totalCharacters: totalChars
        }
    };
    fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
    log(`Summary saved: ${summaryPath}`);

    log('');
    log('='.repeat(60));
    log('FOR THE KIDS - 60/30/10 Gospel Model');
    log('Legal Pages Generation Complete!');
    log('='.repeat(60));

    return results;
}

// Run if called directly
if (require.main === module) {
    generateAllLegalPages()
        .then(results => {
            console.log('\\nLegal pages generated successfully!');
            process.exit(0);
        })
        .catch(err => {
            console.error('Error generating legal pages:', err);
            process.exit(1);
        });
}

module.exports = {
    generatePrivacyPolicy,
    generateTermsOfService,
    generateRefundPolicy,
    generateGDPRCompliance,
    generateCookiePolicy,
    generateDisclaimer,
    generateAllLegalPages,
    COMPANY
};
