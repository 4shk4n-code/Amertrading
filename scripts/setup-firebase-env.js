const fs = require('fs');
const path = require('path');

// IMPORTANT: Replace this with your actual Firebase service account key JSON
// Get it from: Firebase Console > Project Settings > Service Accounts > Generate New Private Key
const firebaseKey = {
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "your-private-key-id",
  "private_key": "-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n",
  "client_email": "your-service-account@your-project.iam.gserviceaccount.com",
  "client_id": "your-client-id",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/your-service-account%40your-project.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
};

const envPath = path.join(process.cwd(), '.env.local');
let envContent = '';

// Read existing .env.local if it exists
if (fs.existsSync(envPath)) {
  envContent = fs.readFileSync(envPath, 'utf8');
}

// Convert JSON to single-line string
const jsonString = JSON.stringify(firebaseKey);

// Update or add FIREBASE_SERVICE_ACCOUNT_KEY
if (envContent.includes('FIREBASE_SERVICE_ACCOUNT_KEY=')) {
  // Replace existing
  envContent = envContent.replace(
    /FIREBASE_SERVICE_ACCOUNT_KEY=.*/m,
    `FIREBASE_SERVICE_ACCOUNT_KEY='${jsonString}'`
  );
} else {
  // Add new
  envContent += `\nFIREBASE_SERVICE_ACCOUNT_KEY='${jsonString}'\n`;
}

// Write back to file
fs.writeFileSync(envPath, envContent, 'utf8');
console.log('✓ Firebase key added to .env.local');
console.log(`  Key length: ${jsonString.length} characters`);

