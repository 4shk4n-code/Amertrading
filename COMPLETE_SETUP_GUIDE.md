# 🚀 Complete VPS Setup & Auto-Deployment Guide

**For Beginners - Step by Step**

This guide will help you:
1. ✅ Clean your VPS completely
2. ✅ Set up everything from scratch
3. ✅ Connect GitHub to VPS for auto-deployment
4. ✅ Make your website go live automatically when you push code

---

## 📋 What You Need

- VPS IP: `72.61.143.56`
- GitHub repository (your code)
- Domain name: `amertrading.com`
- SSH access to your VPS (username: `root`)

---

## 🧹 PART 1: Clean Your VPS

**Goal:** Remove everything except DNS settings (DNS is managed at your domain registrar, not on VPS)

### Step 1.1: Connect to Your VPS

Open PowerShell on your computer and run:
```powershell
ssh root@72.61.143.56
```
(Enter your VPS password when asked)

### Step 1.2: Stop All Running Applications

Once connected, run these commands one by one:

```bash
# Stop PM2 processes
pm2 stop all
pm2 delete all
pm2 kill
```

### Step 1.3: Remove Project Directory

```bash
rm -rf /var/www/amertrading-web
```

### Step 1.4: Remove Nginx Configuration

```bash
rm -f /etc/nginx/sites-available/amertrading
rm -f /etc/nginx/sites-enabled/amertrading
```

### Step 1.5: Verify Everything is Clean

```bash
# Check if project directory is gone
ls -la /var/www/amertrading-web 2>&1 || echo "✅ Directory removed"

# Check PM2
pm2 list || echo "✅ No PM2 processes"

# Check Nginx configs
ls -la /etc/nginx/sites-available/amertrading 2>&1 || echo "✅ Nginx config removed"
```

**✅ If all show "removed" or "No processes", you're clean!**

---

## 🛠️ PART 2: Install Required Software on VPS

**Goal:** Install Node.js, Git, PM2, and Nginx

### Step 2.1: Update System

```bash
apt-get update -y
```

### Step 2.2: Install Node.js 20.x

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs
```

**Verify it worked:**
```bash
node --version
```
(Should show something like `v20.x.x`)

### Step 2.3: Install Git

```bash
apt-get install git -y
```

**Verify it worked:**
```bash
git --version
```

### Step 2.4: Install PM2 (Process Manager)

```bash
npm install -g pm2
```

**Verify it worked:**
```bash
pm2 --version
```

### Step 2.5: Install Nginx (Web Server)

```bash
apt-get install nginx -y
```

**Verify it worked:**
```bash
nginx -v
```

**✅ All software installed!**

---

## 🔑 PART 3: Set Up SSH Keys for Auto-Deployment

**Goal:** Create keys so GitHub can connect to your VPS automatically

### Step 3.1: Generate SSH Key on Your Computer

**On your Windows computer (PowerShell):**

```powershell
# Create .ssh folder if it doesn't exist
mkdir $env:USERPROFILE\.ssh -ErrorAction SilentlyContinue

# Generate SSH key
ssh-keygen -t ed25519 -C "github-actions-deploy" -f $env:USERPROFILE\.ssh\vps_deploy_key -N '""'
```

(When asked for passphrase, just press Enter twice)

### Step 3.2: Get Your PUBLIC Key

```powershell
Get-Content $env:USERPROFILE\.ssh\vps_deploy_key.pub
```

**Copy the entire output** (starts with `ssh-ed25519`)

### Step 3.3: Add PUBLIC Key to Your VPS

**Still connected to your VPS, run:**

```bash
# Create .ssh directory
mkdir -p ~/.ssh
chmod 700 ~/.ssh

# Add your public key (REPLACE with the key you copied)
echo "PASTE_YOUR_PUBLIC_KEY_HERE" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

**Example:** If your public key is `ssh-ed25519 AAAAC3...`, run:
```bash
echo "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAINzLyuvkA0E6v3hGoZP1eAvHXEsI0xej7FTj40gP8E3A github-actions-deploy" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

### Step 3.4: Test SSH Connection

**On your computer (PowerShell), test if it works:**

```powershell
ssh -i $env:USERPROFILE\.ssh\vps_deploy_key root@72.61.143.56
```

If it connects **without asking for password**, you're good! Type `exit` to disconnect.

---

## 📦 PART 4: Clone Your Repository on VPS

**Goal:** Get your code on the VPS

### Step 4.1: Create Project Directory

**On your VPS:**

```bash
mkdir -p /var/www
cd /var/www
```

### Step 4.2: Clone Your Repository

**Replace `YOUR_GITHUB_USERNAME` and `YOUR_REPO_NAME` with your actual GitHub info:**

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git amertrading-web
```

**Example:** If your repo is `https://github.com/4shk4n-code/Amertrading.git`, run:
```bash
git clone https://github.com/4shk4n-code/Amertrading.git amertrading-web
```

### Step 4.3: Go Into Project Directory

```bash
cd /var/www/amertrading-web
```

---

## ⚙️ PART 5: Set Up Environment Variables

**Goal:** Add your configuration (database, API keys, etc.)

### Step 5.1: Create .env File

```bash
nano .env
```

### Step 5.2: Add Your Environment Variables

**Paste all your environment variables.** Example:
```
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=...
SANITY_PROJECT_ID=...
SANITY_DATASET=production
SANITY_API_TOKEN=...
NEXTAUTH_URL=https://amertrading.com
NEXT_PUBLIC_SITE_URL=https://amertrading.com
```

**To save:** Press `Ctrl+X`, then `Y`, then `Enter`

---

## 🏗️ PART 6: Build and Start Your Application

**Goal:** Install dependencies, build, and start the app

### Step 6.1: Install Dependencies

```bash
cd /var/www/amertrading-web
npm install
```

(This might take a few minutes)

### Step 6.2: Generate Prisma Client

```bash
npm run db:generate
```

### Step 6.3: Build the Application

```bash
npm run build
```

(This might take a few minutes)

### Step 6.4: Start with PM2

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

**If `pm2 startup` shows a command, copy and run it!**

### Step 6.5: Check if It's Running

```bash
pm2 list
pm2 logs amertrading-web
```

(Press `Ctrl+C` to exit logs)

**✅ Your app should be running on port 3000!**

---

## 🌐 PART 7: Set Up Nginx (Web Server)

**Goal:** Make your website accessible via domain name

### Step 7.1: Create Nginx Configuration

```bash
nano /etc/nginx/sites-available/amertrading
```

### Step 7.2: Paste This Configuration

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

**To save:** Press `Ctrl+X`, then `Y`, then `Enter`

### Step 7.3: Enable the Site

```bash
ln -sf /etc/nginx/sites-available/amertrading /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl restart nginx
```

**✅ Your website should be accessible at `http://amertrading.com`!**

---

## 🔒 PART 8: Set Up SSL (HTTPS)

**Goal:** Make your website secure with HTTPS

### Step 8.1: Install Certbot

```bash
apt-get install certbot python3-certbot-nginx -y
```

### Step 8.2: Get SSL Certificate

```bash
certbot --nginx -d amertrading.com -d www.amertrading.com
```

**Follow the prompts:**
- Enter your email address
- Type `A` to agree to terms
- Type `Y` or `N` for sharing email (your choice)
- Type `2` to redirect HTTP to HTTPS

**✅ Your website should now be at `https://amertrading.com`!**

---

## 🔄 PART 9: Set Up GitHub Secrets

**Goal:** Tell GitHub how to connect to your VPS

### Step 9.1: Get Your PRIVATE Key

**On your computer (PowerShell):**

```powershell
Get-Content $env:USERPROFILE\.ssh\vps_deploy_key
```

**Copy the ENTIRE output** (from `-----BEGIN` to `-----END`, all lines)

### Step 9.2: Add Secrets to GitHub

1. Go to your GitHub repository
2. Click **Settings** (top menu)
3. Click **Secrets and variables** → **Actions** (left sidebar)
4. Click **New repository secret**

**Add these 4 secrets:**

**Secret 1:**
- Name: `VPS_HOST`
- Value: `72.61.143.56`
- Click **Add secret**

**Secret 2:**
- Name: `VPS_USER`
- Value: `root`
- Click **Add secret**

**Secret 3:**
- Name: `VPS_SSH_KEY`
- Value: Paste your **PRIVATE key** (the entire thing you copied)
- Click **Add secret**

**Secret 4:**
- Name: `VPS_PORT`
- Value: `22`
- Click **Add secret**

**✅ GitHub secrets configured!**

---

## 🎉 PART 10: Test Auto-Deployment

**Goal:** Make sure everything works automatically

### Step 10.1: Make a Small Change

**On your computer, edit any file** (add a comment or change some text)

### Step 10.2: Push to GitHub

```powershell
cd E:\AmerTrading\amertrading-web
git add .
git commit -m "Test auto-deployment"
git push origin master
```

### Step 10.3: Watch It Deploy

1. Go to your GitHub repository
2. Click **Actions** tab
3. You should see "Deploy to VPS" running
4. Click on it to see the progress
5. Wait for green checkmark ✅

### Step 10.4: Check Your Website

Visit `https://amertrading.com` - your changes should be live!

---

## ✅ You're Done!

**Now every time you push code to GitHub, it will:**
1. ✅ Automatically deploy to your VPS
2. ✅ Build your application
3. ✅ Restart the server
4. ✅ Go live on your domain!

---

## 🆘 Troubleshooting

### Website not loading?
```bash
# Check PM2
pm2 list
pm2 logs amertrading-web

# Check Nginx
systemctl status nginx
nginx -t

# Check if port 3000 is running
netstat -tuln | grep 3000
```

### Deployment fails?
- Check GitHub Actions logs (click on the failed workflow)
- Make sure all GitHub secrets are correct
- Test SSH connection: `ssh -i ~/.ssh/vps_deploy_key root@72.61.143.56`

### Need to manually deploy?
```bash
cd /var/www/amertrading-web
bash deploy.sh
```

---

**🎊 Congratulations! You've set up auto-deployment!**

