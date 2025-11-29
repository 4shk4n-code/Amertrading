# Firebase Production Setup - Step by Step Guide

## Part 1: Firestore Security Rules

### Step 1: Open Firebase Console
1. Go to https://console.firebase.google.com/
2. Sign in with your Google account
3. Select your project: **amer-trading**

### Step 2: Navigate to Firestore Rules
1. In the left sidebar, click **"Firestore Database"**
2. Click the **"Rules"** tab at the top

### Step 3: Copy the Rules
Copy the entire content from `FIRESTORE_RULES.txt` file (or see below):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Products - public can read active products, admins can write
    match /products/{productId} {
      // Anyone can read active products
      allow read: if resource.data.active == true;
      // Only authenticated admins can write (create/update/delete)
      allow write: if false; // Disabled - all writes go through Next.js API with admin auth
    }
    
    // Orders - anyone can create, only admins can read/update
    match /orders/{orderId} {
      // Anyone can create orders (for checkout)
      allow create: if true;
      // Only admins can read/update/delete (handled by Next.js API)
      allow read, update, delete: if false; // Disabled - all admin ops go through Next.js API
    }
  }
}
```

### Step 4: Paste and Publish
1. **Delete** all existing rules in the editor
2. **Paste** the rules above
3. Click **"Publish"** button
4. Wait for confirmation: "Rules published successfully"

✅ **Rules are now active!**

---

## Part 2: Add Firebase Service Account Key to Production Server

### Step 1: Get Your Service Account Key (if you don't have it)

1. Go to Firebase Console: https://console.firebase.google.com/
2. Select project: **amer-trading**
3. Click ⚙️ **Settings** (gear icon) → **Project settings**
4. Click **"Service accounts"** tab
5. Click **"Generate new private key"**
6. Click **"Generate key"** in the popup
7. A JSON file downloads (e.g., `amer-trading-firebase-adminsdk-xxxxx.json`)

### Step 2: Format the Key for .env File

Open the downloaded JSON file. It looks like this:

```json
{
  "type": "service_account",
  "project_id": "amer-trading",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "...",
  ...
}
```

**Convert it to a single line:**
- Remove all line breaks
- Keep it as valid JSON
- It should be one continuous string

### Step 3: Add to Production Server (.env file)

#### Option A: Using SSH (Recommended)

1. **SSH into your VPS:**
   ```bash
   ssh root@your-server-ip
   ```

2. **Navigate to your project:**
   ```bash
   cd /var/www/amertrading-web
   ```

3. **Open the .env file:**
   ```bash
   nano .env
   ```
   (or use `vi .env` if you prefer)

4. **Add this line at the end:**
   ```env
   FIREBASE_SERVICE_ACCOUNT_KEY='{"type":"service_account","project_id":"your-project-id","private_key_id":"your-private-key-id","private_key":"-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n","client_email":"your-service-account@your-project.iam.gserviceaccount.com","client_id":"your-client-id","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"https://www.googleapis.com/robot/v1/metadata/x509/your-service-account%40your-project.iam.gserviceaccount.com","universe_domain":"googleapis.com"}'
   ```
   
   **⚠️ IMPORTANT:** Replace all placeholder values with your actual Firebase service account key JSON (from Step 1). The entire JSON should be on one line.

5. **Save and exit:**
   - Press `Ctrl + X`
   - Press `Y` to confirm
   - Press `Enter` to save

#### Option B: Using SCP (Copy from Local)

1. **On your local machine, create a file with the key:**
   ```bash
   echo "FIREBASE_SERVICE_ACCOUNT_KEY='YOUR_JSON_KEY_HERE'" >> firebase-env.txt
   ```

2. **Copy to server:**
   ```bash
   scp firebase-env.txt root@your-server-ip:/var/www/amertrading-web/
   ```

3. **On server, append to .env:**
   ```bash
   ssh root@your-server-ip
   cd /var/www/amertrading-web
   cat firebase-env.txt >> .env
   rm firebase-env.txt
   ```

### Step 4: Verify the Key is Added

On your server, run:
```bash
cd /var/www/amertrading-web
grep FIREBASE_SERVICE_ACCOUNT_KEY .env
```

You should see the key line. If it's there, ✅ good!

### Step 5: Restart Your Application

```bash
cd /var/www/amertrading-web
pm2 restart all
# OR if using npm:
# npm run build
# pm2 restart ecosystem.config.js
```

### Step 6: Test Firebase Connection

On your server, run:
```bash
cd /var/www/amertrading-web
npm run test:firebase
```

You should see:
```
✓ Firebase initialized with service account for project: amer-trading
✓ Can read from 'products' collection
✓ Can write to 'products' collection
```

---

## Quick Reference

### Your Firebase Project Details:
- **Project ID:** `amer-trading`
- **Service Account Email:** `firebase-adminsdk-fbsvc@amer-trading.iam.gserviceaccount.com`

### Important Files:
- **Local:** `.env.local` (already configured ✅)
- **Production:** `.env` on your VPS (needs configuration)

### Collections in Firestore:
- `products` - Product catalog
- `orders` - Customer orders

---

## Troubleshooting

### Error: "Could not load the default credentials"
- Check that `FIREBASE_SERVICE_ACCOUNT_KEY` is in your `.env` file
- Make sure the JSON is on one line and wrapped in single quotes
- Restart your application after adding the key

### Error: "Permission denied"
- Check Firestore security rules are published
- Verify rules match the ones in `FIRESTORE_RULES.txt`

### Products not showing on website
- Make sure products have `active: true` in Firestore
- Check browser console for errors
- Verify Firebase is initialized correctly

---

## Security Notes

⚠️ **IMPORTANT:**
- Never commit `.env` or `.env.local` to Git
- Keep your service account key secret
- Only share with trusted team members
- Rotate keys if compromised

✅ **Your `.gitignore` should already exclude `.env*` files**

