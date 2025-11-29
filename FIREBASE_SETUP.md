# Firebase Setup Guide

## 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select existing project
3. Note your **Project ID**

## 2. Enable Firestore Database

1. In Firebase Console, go to **Firestore Database**
2. Click "Create database"
3. Start in **production mode** (or test mode for development)
4. Choose a location (e.g., `us-central1`)

## 3. Get Service Account Key (Recommended for Server-Side)

1. Go to **Project Settings** → **Service Accounts**
2. Click "Generate new private key"
3. Download the JSON file
4. Copy the entire JSON content and add it to `.env.local` as:

```env
FIREBASE_SERVICE_ACCOUNT_KEY='{"type":"service_account","project_id":"...","private_key_id":"...","private_key":"...","client_email":"...","client_id":"...","auth_uri":"...","token_uri":"...","auth_provider_x509_cert_url":"...","client_x509_cert_url":"..."}'
```

**OR** use Project ID only (simpler, but less secure):

```env
FIREBASE_PROJECT_ID=your-project-id
```

## 4. Set Up Firestore Security Rules

Go to **Firestore Database** → **Rules** and add:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Products - public read, admin write
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null; // Only authenticated admins
    }
    
    // Orders - admin only
    match /orders/{orderId} {
      allow read, write: if request.auth != null; // Only authenticated admins
      allow create: if true; // Anyone can create orders
    }
  }
}
```

## 5. Environment Variables

Add to your `.env.local`:

```env
# Firebase Configuration
FIREBASE_PROJECT_ID=your-project-id
# OR
FIREBASE_SERVICE_ACCOUNT_KEY='{"type":"service_account",...}'
```

## 6. Test the Setup

1. Start the dev server: `npm run dev`
2. Go to `/admin/products` (login required)
3. Try adding a product
4. Check Firebase Console → Firestore to see the data

## Collections Structure

- **products**: Product catalog
  - Fields: name, description, price, stock, images, category, featured, active, etc.
  
- **orders**: Customer orders
  - Fields: orderNumber, customerName, customerEmail, customerPhone, items, total, status, etc.

## Notes

- Firebase Admin SDK is used for server-side operations (API routes)
- No database migrations needed - Firestore is schema-less
- Data is automatically synced across all instances
- You can use Firebase Console to manually add/edit products for testing


