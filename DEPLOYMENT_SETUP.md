# Auto-Deployment Setup Guide

This guide will help you set up automatic deployment from GitHub to your VPS.

## Prerequisites

- GitHub repository (this repo)
- VPS server (Hostinger or similar)
- SSH access to your VPS
- Node.js and PM2 installed on VPS

---

## Step-by-Step Setup

### Step 1: Generate SSH Key Pair (if you don't have one)

**On your local Windows machine (PowerShell):**

```powershell
# Generate SSH key (if you don't have one)
ssh-keygen -t ed25519 -C "github-deploy" -f $env:USERPROFILE\.ssh\github_deploy

# View the PUBLIC key (you'll need this)
cat $env:USERPROFILE\.ssh\github_deploy.pub
```

**Copy the public key output** - you'll need it in Step 2.

---

### Step 2: Add SSH Key to VPS

**Connect to your VPS via SSH:**

```bash
ssh your-username@your-vps-ip
```

**On the VPS, add the public key:**

```bash
# Create .ssh directory if it doesn't exist
mkdir -p ~/.ssh
chmod 700 ~/.ssh

# Add your public key to authorized_keys
echo "PASTE_YOUR_PUBLIC_KEY_HERE" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

**Or use this method:**

```bash
# Copy the public key content and run:
nano ~/.ssh/authorized_keys
# Paste the key, save (Ctrl+X, Y, Enter)
chmod 600 ~/.ssh/authorized_keys
```

---

### Step 3: Get Your Private SSH Key

**On your local Windows machine (PowerShell):**

```powershell
# View the PRIVATE key (you'll need this for GitHub Secrets)
cat $env:USERPROFILE\.ssh\github_deploy
```

**Copy the entire output** including:
- `-----BEGIN OPENSSH PRIVATE KEY-----`
- All the key content
- `-----END OPENSSH PRIVATE KEY-----`

---

### Step 4: Configure GitHub Secrets

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add these secrets one by one:

#### Secret 1: `VPS_HOST`
- **Name:** `VPS_HOST`
- **Value:** Your VPS IP address or domain (e.g., `123.45.67.89` or `vps.yourdomain.com`)

#### Secret 2: `VPS_USER`
- **Name:** `VPS_USER`
- **Value:** Your VPS username (e.g., `root` or `ubuntu`)

#### Secret 3: `VPS_SSH_KEY`
- **Name:** `VPS_SSH_KEY`
- **Value:** Paste the **PRIVATE** key you copied in Step 3 (entire content)

#### Secret 4: `VPS_PORT` (Optional)
- **Name:** `VPS_PORT`
- **Value:** SSH port (usually `22`, skip if using default)

---

### Step 5: Update deploy.sh Paths

**Edit `deploy.sh` and update these lines:**

```bash
PROJECT_DIR="/var/www/amertrading-web"  # Change to your actual project path
BRANCH="master"                         # Change if using 'main' branch
APP_NAME="amertrading-web"              # PM2 app name
```

**Save the file.**

---

### Step 6: Setup VPS Directory Structure

**SSH into your VPS:**

```bash
ssh your-username@your-vps-ip
```

**Create project directory:**

```bash
sudo mkdir -p /var/www/amertrading-web
sudo chown -R $USER:$USER /var/www/amertrading-web
cd /var/www/amertrading-web
```

**Clone your repository:**

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git .
# OR if you have SSH setup:
git clone git@github.com:YOUR_USERNAME/YOUR_REPO_NAME.git .
```

**Make deploy.sh executable:**

```bash
chmod +x deploy.sh
```

---

### Step 7: Install Dependencies on VPS

**On your VPS:**

```bash
cd /var/www/amertrading-web

# Install Node.js (if not installed)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 globally
sudo npm install -g pm2

# Install project dependencies
npm install

# Generate Prisma client
npm run db:generate

# Build the project
npm run build
```

---

### Step 8: Setup PM2 (Process Manager)

**On your VPS:**

```bash
cd /var/www/amertrading-web

# Start the app with PM2
pm2 start npm --name "amertrading-web" -- start

# Save PM2 configuration
pm2 save

# Setup PM2 to start on system boot
pm2 startup
# Follow the instructions it prints (usually involves running a sudo command)
```

---

### Step 9: Test Deployment

**Push a test commit to trigger deployment:**

```powershell
# On your local machine
git add .
git commit -m "Test deployment"
git push origin master
```

**Check GitHub Actions:**
1. Go to your GitHub repo
2. Click **Actions** tab
3. You should see "Deploy to VPS" workflow running
4. Click on it to see logs

**Check VPS logs:**

```bash
# SSH into VPS
ssh your-username@your-vps-ip

# Check PM2 status
pm2 status

# Check PM2 logs
pm2 logs amertrading-web

# Check deployment script logs
cd /var/www/amertrading-web
cat deploy.sh  # Verify paths are correct
```

---

## Troubleshooting

### GitHub Actions Fails

1. **Check Secrets:** Make sure all secrets are set correctly
2. **Check SSH Key:** Verify the private key matches the public key on VPS
3. **Check VPS Access:** Test SSH connection manually:
   ```bash
   ssh -i ~/.ssh/github_deploy your-username@your-vps-ip
   ```

### Build Fails on VPS

1. **Memory Issues:** The deploy.sh script automatically tries 2GB then 3GB
2. **Check Node Version:** `node --version` (should be 18+)
3. **Check npm:** `npm --version`
4. **Check Disk Space:** `df -h`

### PM2 Not Starting

1. **Check PM2:** `pm2 list`
2. **Check Logs:** `pm2 logs amertrading-web`
3. **Check Port:** Make sure port 3000 (or your port) is not in use
4. **Restart PM2:** `pm2 restart amertrading-web`

### Website Not Loading

1. **Check PM2:** `pm2 status`
2. **Check Port:** Make sure your reverse proxy (nginx/apache) is configured
3. **Check Firewall:** Make sure port 80/443 is open
4. **Check Logs:** `pm2 logs amertrading-web`

---

## Manual Deployment (if auto-deploy fails)

**SSH into VPS:**

```bash
ssh your-username@your-vps-ip
cd /var/www/amertrading-web
bash deploy.sh
```

---

## Next Steps

- Set up reverse proxy (nginx/apache) for HTTPS
- Configure domain name
- Set up SSL certificate (Let's Encrypt)
- Configure environment variables on VPS

