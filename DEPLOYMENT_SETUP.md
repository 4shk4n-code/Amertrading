# 🚀 Auto-Deployment Setup Guide

This guide will help you set up automatic deployment from GitHub to your VPS. Every time you push code to GitHub, it will automatically deploy to your VPS and go live!

## 📋 Prerequisites

- GitHub repository (you already have this!)
- VPS with IP: `72.61.143.56`
- SSH access to your VPS
- Domain name (amertrading.com)

---

## 🎯 Step-by-Step Setup

### **STEP 1: Generate SSH Key for GitHub Actions**

We need to create an SSH key that GitHub Actions will use to connect to your VPS.

**On your local computer (Windows):**

1. Open PowerShell or Command Prompt

2. **First, create the .ssh directory:**
   ```powershell
   mkdir $env:USERPROFILE\.ssh
   ```

3. **Generate the SSH key:**
   ```powershell
   ssh-keygen -t ed25519 -C "github-actions-deploy" -f $env:USERPROFILE\.ssh\vps_deploy_key
   ```
   - When asked for a passphrase, just press **Enter** (leave it empty)
   - When asked to confirm, press **Enter** again
   - This creates two files: `vps_deploy_key` (private) and `vps_deploy_key.pub` (public)

4. **Display the PUBLIC key** (we'll add this to VPS):
   ```powershell
   Get-Content $env:USERPROFILE\.ssh\vps_deploy_key.pub
   ```
   Copy the entire output (starts with `ssh-ed25519`)

5. **Display the PRIVATE key** (we'll add this to GitHub):
   ```powershell
   Get-Content $env:USERPROFILE\.ssh\vps_deploy_key
   ```
   Copy the entire output (starts with `-----BEGIN OPENSSH PRIVATE KEY-----`)

---

### **STEP 2: Add SSH Key to Your VPS**

**Connect to your VPS:**
```bash
ssh root@72.61.143.56
```

**Once connected, run these commands:**

1. Create `.ssh` directory if it doesn't exist:
   ```bash
   mkdir -p ~/.ssh
   chmod 700 ~/.ssh
   ```

2. Add the public key to authorized_keys:
   ```bash
   echo "PASTE_YOUR_PUBLIC_KEY_HERE" >> ~/.ssh/authorized_keys
   chmod 600 ~/.ssh/authorized_keys
   ```
   (Replace `PASTE_YOUR_PUBLIC_KEY_HERE` with the public key you copied)

3. Test SSH connection (from your local computer):
   ```bash
   ssh -i ~/.ssh/vps_deploy_key root@72.61.143.56
   ```
   If it connects without asking for a password, you're good! Type `exit` to disconnect.

---

### **STEP 3: Set Up GitHub Secrets**

GitHub needs to know how to connect to your VPS. We'll add this as "secrets" in your GitHub repository.

1. Go to your GitHub repository: `https://github.com/YOUR_USERNAME/YOUR_REPO`

2. Click on **Settings** (top menu)

3. Click on **Secrets and variables** → **Actions** (left sidebar)

4. Click **New repository secret** and add these 4 secrets:

   **Secret 1: `VPS_HOST`**
   - Name: `VPS_HOST`
   - Value: `72.61.143.56`
   - Click **Add secret**

   **Secret 2: `VPS_USER`**
   - Name: `VPS_USER`
   - Value: `root` (or your VPS username)
   - Click **Add secret**

   **Secret 3: `VPS_SSH_KEY`**
   - Name: `VPS_SSH_KEY`
   - Value: Paste your **PRIVATE** key here (the entire content from `-----BEGIN` to `-----END`)
   - Click **Add secret**

   **Secret 4: `VPS_PORT`** (Optional, only if your SSH port is not 22)
   - Name: `VPS_PORT`
   - Value: `22` (or your custom SSH port)
   - Click **Add secret**

---

### **STEP 4: Initial VPS Setup**

**Connect to your VPS and run the setup script:**

```bash
ssh root@72.61.143.56
```

**Run these commands one by one:**

1. **Update system:**
   ```bash
   apt-get update -y
   ```

2. **Install Node.js 20.x:**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
   apt-get install -y nodejs
   ```

3. **Install Git:**
   ```bash
   apt-get install git -y
   ```

4. **Install PM2 (process manager):**
   ```bash
   npm install -g pm2
   ```

5. **Install Nginx (web server):**
   ```bash
   apt-get install nginx -y
   ```

6. **Clone your repository:**
   ```bash
   mkdir -p /var/www
   cd /var/www
   git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git amertrading-web
   cd amertrading-web
   ```
   (Replace `YOUR_USERNAME` and `YOUR_REPO` with your actual GitHub username and repository name)

7. **Install dependencies:**
   ```bash
   npm install
   ```

8. **Create environment file:**
   ```bash
   nano .env
   ```
   Add all your environment variables (DATABASE_URL, SANITY_PROJECT_ID, etc.)
   Press `Ctrl+X`, then `Y`, then `Enter` to save

9. **Generate Prisma client:**
   ```bash
   npm run db:generate
   ```

10. **Build the application:**
    ```bash
    npm run build
    ```

11. **Start with PM2:**
    ```bash
    pm2 start ecosystem.config.js
    pm2 save
    pm2 startup
    ```
    (Follow the instructions if `pm2 startup` asks you to run a command)

12. **Set up Nginx:**
    ```bash
    nano /etc/nginx/sites-available/amertrading
    ```
    
    Paste this configuration:
    ```nginx
    server {
        listen 80;
        server_name amertrading.com www.amertrading.com;

        location / {
            proxy_pass http://localhost:3000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
    ```
    
    Press `Ctrl+X`, then `Y`, then `Enter` to save

13. **Enable Nginx site:**
    ```bash
    ln -sf /etc/nginx/sites-available/amertrading /etc/nginx/sites-enabled/
    rm -f /etc/nginx/sites-enabled/default
    nginx -t
    systemctl restart nginx
    ```

14. **Set up SSL (HTTPS) with Let's Encrypt:**
    ```bash
    apt-get install certbot python3-certbot-nginx -y
    certbot --nginx -d amertrading.com -d www.amertrading.com
    ```
    Follow the prompts (enter your email, agree to terms)

---

### **STEP 5: Test Auto-Deployment**

1. Make a small change to your code (add a comment or change some text)

2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Test auto-deployment"
   git push origin master
   ```

3. Go to your GitHub repository → **Actions** tab

4. You should see a workflow running called "Deploy to VPS"

5. Click on it to see the deployment progress

6. Once it says "✅ Deploy to VPS" (green checkmark), your changes are live!

---

## 🔧 Troubleshooting

### **Deployment fails with "Permission denied"**
- Make sure you added the public key to VPS `~/.ssh/authorized_keys`
- Check file permissions: `chmod 600 ~/.ssh/authorized_keys`

### **Deployment fails with "PM2 not found"**
- SSH into VPS and run: `npm install -g pm2`

### **Website not loading**
- Check PM2 status: `pm2 list`
- Check PM2 logs: `pm2 logs amertrading-web`
- Check Nginx: `systemctl status nginx`
- Check if port 3000 is listening: `netstat -tuln | grep 3000`

### **GitHub Actions can't connect to VPS**
- Verify all GitHub secrets are set correctly
- Test SSH connection manually: `ssh -i ~/.ssh/vps_deploy_key root@72.61.143.56`
- Check VPS firewall allows SSH (port 22)

---

## 📝 Useful Commands

**On VPS:**
- View logs: `pm2 logs amertrading-web`
- Restart app: `pm2 restart amertrading-web`
- Check status: `pm2 status`
- View Nginx logs: `tail -f /var/log/nginx/error.log`

**Manual deployment (if needed):**
```bash
cd /var/www/amertrading-web
bash deploy.sh
```

---

## ✅ You're Done!

Now every time you push code to GitHub, it will automatically:
1. ✅ Pull latest code
2. ✅ Install dependencies
3. ✅ Build the application
4. ✅ Restart the server
5. ✅ Go live on your domain!

🎉 **Happy coding!**

