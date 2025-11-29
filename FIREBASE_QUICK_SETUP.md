# Quick Firebase Setup for Admin Product Management

## Step 1: Get Your Firebase Project ID

1. Go to https://console.firebase.google.com/
2. Sign in and select/create your project
3. Click ⚙️ (Settings) → **Project settings**
4. Copy your **Project ID** (e.g., `amertrading-web-12345`)

## Step 2: Get Service Account Key (Required for Admin SDK)

1. In Firebase Console, go to ⚙️ **Project settings**
2. Click the **"Service accounts"** tab
3. Click **"Generate new private key"**
4. Click **"Generate key"** in the popup
5. A JSON file will download (e.g., `amertrading-web-firebase-adminsdk-xxxxx.json`)

## Step 3: Add to .env.local

Open the downloaded JSON file and copy its entire contents.

Then add to your `.env.local` file:

```env
FIREBASE_SERVICE_ACCOUNT_KEY='{"type":"service_account","project_id":"your-project-id","private_key_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n","client_email":"...","client_id":"...","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"..."}'
```

**Important:** 
- Keep the entire JSON on ONE line
- Wrap it in single quotes `'...'`
- Make sure all quotes inside are escaped or use single quotes

## Step 4: Set Firestore Security Rules

1. In Firebase Console, go to **Firestore Database** → **Rules**
2. Replace with these rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Products - public can read active products, only admins can write
    match /products/{productId} {
      allow read: if resource.data.active == true || request.auth != null;
      allow write: if request.auth != null; // Admin authentication required
    }
    
    // Orders - anyone can create, only admins can read/update
    match /orders/{orderId} {
      allow create: if true; // Anyone can create orders
      allow read, update, delete: if request.auth != null; // Only admins
    }
  }
}
```

3. Click **"Publish"**

## Step 5: Test It!

1. Restart your dev server: `npm run dev`
2. Go to `/admin/products` (login required)
3. Click "Add New Product"
4. Fill in product details and save
5. Check Firebase Console → Firestore → `products` collection to see your product!

## Troubleshooting

- **Error: "Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY"**: Make sure the JSON is on one line and wrapped in single quotes
- **Error: "Permission denied"**: Check Firestore security rules
- **Products not showing**: Make sure `active: true` is set on products

