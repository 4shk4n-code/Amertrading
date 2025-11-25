# VPS Setup Commands - Copy & Paste Guide

## ⚠️ IMPORTANT: Where to Run What

- **setup-deployment.ps1** → Run on YOUR LOCAL WINDOWS MACHINE (PowerShell)
- **VPS commands below** → Run on YOUR VPS SERVER (SSH terminal)

---

## PART 1: On Your LOCAL Windows Machine (PowerShell)

### Step 1: Generate SSH Keys

Open PowerShell on your Windows machine and run:

```powershell
cd E:\AmerTrading\amertrading-web
.\setup-deployment.ps1
```

This will show you:
- PUBLIC key (copy this for VPS)
- PRIVATE key (copy this for GitHub Secrets)

---

## PART 2: On Your VPS Server (SSH Terminal)

### Step 2: Add Public Key to VPS

**If you're connected to VPS via SSH, run these commands:**

```bash
# Create .ssh directory if it doesn't exist
mkdir -p ~/.ssh
chmod 700 ~/.ssh

# Add your public key (replace with the PUBLIC key from Step 1)
echo "PASTE_YOUR_PUBLIC_KEY_HERE" >> ~/.ssh/authorized_keys

# Set correct permissions
chmod 600 ~/.ssh/authorized_keys

# Verify it was added
cat ~/.ssh/authorized_keys
```

**OR use nano editor:**

```bash
nano ~/.ssh/authorized_keys
# Paste your PUBLIC key, press Ctrl+X, then Y, then Enter
chmod 600 ~/.ssh/authorized_keys
```

---

### Step 3: Setup Project Directory on VPS

```bash
# Create project directory
sudo mkdir -p /var/www/amertrading-web
sudo chown -R $USER:$USER /var/www/amertrading-web
cd /var/www/amertrading-web

# Clone your repository (replace with your GitHub repo URL)
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git .

# OR if you already cloned it, just pull:
cd /var/www/amertrading-web
git pull origin master

# Make deploy.sh executable
chmod +x deploy.sh
```

---

### Step 4: Install Node.js and PM2 (if not installed)

```bash
# Check if Node.js is installed
node --version

# If not installed, install Node.js 20.x:
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version

# Install PM2 globally
sudo npm install -g pm2

# Verify PM2 installation
pm2 --version
```

---

### Step 5: Install Project Dependencies

```bash
cd /var/www/amertrading-web

# Install dependencies
npm install

# Generate Prisma client (if using Prisma)
npm run db:generate

# Build the project
npm run build
```

---

### Step 6: Start Application with PM2

```bash
cd /var/www/amertrading-web

# Start the app
pm2 start npm --name "amertrading-web" -- start

# Save PM2 configuration
pm2 save

# Setup PM2 to start on system boot
pm2 startup
# Follow the command it prints (usually something like: sudo env PATH=...)
```

---

### Step 7: Test Manual Deployment

```bash
cd /var/www/amertrading-web
bash deploy.sh
```

This should:
- Pull latest code
- Install dependencies
- Build the project
- Restart PM2

---

## PART 3: On GitHub Website

### Step 8: Add GitHub Secrets

1. Go to: `https://github.com/YOUR_USERNAME/YOUR_REPO/settings/secrets/actions`
2. Click **"New repository secret"**
3. Add these secrets:

**Secret 1:**
- Name: `VPS_HOST`
- Value: Your VPS IP address (e.g., `123.45.67.89`)

**Secret 2:**
- Name: `VPS_USER`
- Value: Your VPS username (usually `root` or `ubuntu`)

**Secret 3:**
- Name: `VPS_SSH_KEY`
- Value: The **PRIVATE** key from Step 1 (entire content including `-----BEGIN` and `-----END`)

**Secret 4 (Optional):**
- Name: `VPS_PORT`
- Value: `22` (or your SSH port if different)

---

## PART 4: Test Auto-Deployment

### Step 9: Push to GitHub

**On your LOCAL Windows machine:**

```powershell
cd E:\AmerTrading\amertrading-web
git add .
git commit -m "Test auto-deployment"
git push origin master
```

### Step 10: Check GitHub Actions

1. Go to your GitHub repo
2. Click **"Actions"** tab
3. You should see **"Deploy to VPS"** workflow running
4. Click on it to see deployment logs

### Step 11: Check VPS Logs

**On your VPS:**

```bash
# Check PM2 status
pm2 status

# Check application logs
pm2 logs amertrading-web

# Check if app is running
pm2 list
```

---

## Troubleshooting Commands

### Check if deployment script works:
```bash
cd /var/www/amertrading-web
bash deploy.sh
```

### Check PM2 status:
```bash
pm2 status
pm2 logs amertrading-web --lines 50
```

### Restart PM2 manually:
```bash
pm2 restart amertrading-web
```

### Check if port is in use:
```bash
sudo netstat -tlnp | grep :3000
# or
sudo lsof -i :3000
```

### Check disk space:
```bash
df -h
```

### Check Node.js memory:
```bash
node --version
free -h
```

---

## Quick Reference

**Local Windows (PowerShell):**
- Generate keys: `.\setup-deployment.ps1`
- Push code: `git push origin master`

**VPS (Bash):**
- Deploy manually: `cd /var/www/amertrading-web && bash deploy.sh`
- Check PM2: `pm2 status`
- View logs: `pm2 logs amertrading-web`

