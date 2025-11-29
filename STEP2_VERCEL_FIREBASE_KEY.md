# STEP 2: Add Firebase Key to Vercel

## What to do:

1. **Go to Vercel Dashboard:**
   - Open: **https://vercel.com/dashboard**
   - Sign in with your account

2. **Select your project:**
   - Click on **"amertrading-web"** (or your project name)

3. **Go to Settings:**
   - Click **"Settings"** tab at the top

4. **Go to Environment Variables:**
   - Click **"Environment Variables"** in the left menu

5. **Add the new variable:**
   - Click **"Add New"** button
   - **Key:** `FIREBASE_SERVICE_ACCOUNT_KEY`
   - **Value:** Paste your Firebase service account key JSON (all on one line):
   ```
   {"type":"service_account","project_id":"your-project-id","private_key_id":"your-private-key-id","private_key":"-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n","client_email":"your-service-account@your-project.iam.gserviceaccount.com","client_id":"your-client-id","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"https://www.googleapis.com/robot/v1/metadata/x509/your-service-account%40your-project.iam.gserviceaccount.com","universe_domain":"googleapis.com"}
   ```
   
   **⚠️ IMPORTANT:** Get your actual Firebase service account key from Firebase Console > Project Settings > Service Accounts > Generate New Private Key. Replace all placeholder values above with your actual key JSON (on one line).
   - **Environment:** Select all three: ☑ Production ☑ Preview ☑ Development
   - Click **"Save"**

6. **Redeploy your site:**
   - Go to **"Deployments"** tab
   - Click the **"..."** menu on the latest deployment
   - Click **"Redeploy"**
   - Or push a new commit to trigger automatic deployment

✅ **Done! Firebase key is now on Vercel!**

---

**Tell me when you've completed Step 2, and I'll give you Step 3 (test it)!**

