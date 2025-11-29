# STEP 2: Add Firebase Key to Production Server

## What to do:

1. **Open your terminal/command prompt**

2. **Connect to your VPS server:**
   ```bash
   ssh root@your-server-ip
   ```
   (Replace `your-server-ip` with your actual server IP)

3. **Go to your project folder:**
   ```bash
   cd /var/www/amertrading-web
   ```

4. **Open the .env file:**
   ```bash
   nano .env
   ```

5. **Scroll to the bottom of the file** (use arrow keys)

6. **Press Enter** to create a new line

7. **Add this line (replace with your actual Firebase key from Firebase Console):**
   ```env
   FIREBASE_SERVICE_ACCOUNT_KEY='{"type":"service_account","project_id":"your-project-id","private_key_id":"your-private-key-id","private_key":"-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n","client_email":"your-service-account@your-project.iam.gserviceaccount.com","client_id":"your-client-id","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"https://www.googleapis.com/robot/v1/metadata/x509/your-service-account%40your-project.iam.gserviceaccount.com","universe_domain":"googleapis.com"}'
   ```
   
   **⚠️ IMPORTANT:** Get your actual Firebase service account key from Firebase Console > Project Settings > Service Accounts > Generate New Private Key. Replace all placeholder values above with your actual key JSON (on one line).

8. **Save the file:**
   - Press `Ctrl + X`
   - Press `Y` (to confirm)
   - Press `Enter` (to save)

✅ **Key is now added to your server!**

---

**Tell me when you've completed Step 2, and I'll give you Step 3 (restart server)!**

