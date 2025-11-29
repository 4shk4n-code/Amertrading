# How to Access Admin Panel and Products

## Step 1: Access Admin Login Page

**Go to your website and add `/admin/signin` to the URL:**

```
https://your-vercel-domain.vercel.app/admin/signin
```

Or if you have a custom domain:
```
https://amertrading.ae/admin/signin
```

## Step 2: Login Credentials

You need to set `ADMIN_USERNAME` and `ADMIN_PASSWORD` in Vercel environment variables.

### Option A: Set Admin Credentials in Vercel

1. Go to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**
2. Add these two variables:

   **Variable 1:**
   - Key: `ADMIN_USERNAME`
   - Value: `admin` (or your preferred username)
   - Environment: ☑ Production ☑ Preview ☑ Development
   - Click **Save**

   **Variable 2:**
   - Key: `ADMIN_PASSWORD`
   - Value: `your-secure-password` (choose a strong password)
   - Environment: ☑ Production ☑ Preview ☑ Development
   - Click **Save**

3. **Redeploy** your site (or push a new commit)

### Option B: Use Google Sign-In (if configured)

If you have `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` set up, you can click "Sign in with Google" on the login page.

## Step 3: Login

1. Go to `/admin/signin`
2. Enter your username and password (from Step 2)
3. Click **"Sign In"**
4. You'll be redirected to `/admin/dashboard`

## Step 4: Access Products

After logging in, you can access products in two ways:

### Method 1: From Admin Dashboard
1. After login, you'll be at `/admin/dashboard`
2. Look for a **"Products"** link or menu item
3. Click it to go to `/admin/products`

### Method 2: Direct URL
Go directly to:
```
https://your-domain.com/admin/products
```

## Step 5: Add Your First Product

1. On `/admin/products` page, click **"Add New Product"** button
2. Fill in the product details:
   - Name
   - Description
   - Price
   - Stock
   - Images (URLs)
   - Category
   - Make sure **"Active"** is checked
3. Click **"Save"**
4. Your product will be saved to Firebase and appear on your website!

## Public Products Page

Customers can view products at:
```
https://your-domain.com/products
```
or
```
https://your-domain.com/en/products
```

---

## Quick Checklist

- [ ] Set `ADMIN_USERNAME` in Vercel environment variables
- [ ] Set `ADMIN_PASSWORD` in Vercel environment variables  
- [ ] Redeploy your site
- [ ] Go to `/admin/signin`
- [ ] Login with your credentials
- [ ] Go to `/admin/products`
- [ ] Add your first product!

---

## Troubleshooting

**"Invalid username or password"**
- Make sure `ADMIN_USERNAME` and `ADMIN_PASSWORD` are set in Vercel
- Make sure you redeployed after adding the variables
- Check that there are no extra spaces in the values

**Can't access `/admin/products`**
- Make sure you're logged in first
- Try logging out and logging back in
- Check browser console for errors

**Products not showing on public page**
- Make sure products have `active: true` in Firebase
- Check Firebase Console → Firestore → `products` collection
- Verify Firestore security rules are published

