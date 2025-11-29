# Firestore Security Rules Setup

## Step 1: Go to Firebase Console

1. Go to https://console.firebase.google.com/
2. Select your project: **amer-trading**
3. Click **Firestore Database** in the left menu
4. Click the **Rules** tab

## Step 2: Copy and Paste These Rules

Replace the existing rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Products - public can read active products, admins can write
    match /products/{productId} {
      // Anyone can read active products
      allow read: if resource.data.active == true;
      // Only authenticated admins can write (create/update/delete)
      // Note: Admin authentication is handled by NextAuth in your Next.js app
      // The API routes check for admin session before allowing writes
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

## Step 3: Publish Rules

1. Click **"Publish"** button
2. Wait for confirmation

## Important Notes

- **Admin authentication** is handled by NextAuth.js in your Next.js application
- The API routes (`/api/admin/products/*`) check for admin sessions before allowing writes
- Firestore rules are set to `false` for writes because all admin operations go through your Next.js API which handles authentication
- Public users can read active products (for the product catalog)
- Anyone can create orders (for checkout functionality)

## Testing

After setting up rules:
1. Go to `/admin/products` on your website
2. Login as admin
3. Try adding a product
4. Check Firebase Console → Firestore → `products` collection to see your product!

