# Deployment Guide for Hostinger VPS

This guide will help you set up automatic deployment from GitHub to your Hostinger VPS.

## Option 1: GitHub Actions Auto-Deploy (Recommended)

### Step 1: Set up SSH on VPS

1. **Generate SSH key on your local machine:**
   ```bash
   ssh-keygen -t ed25519 -C "deploy@amertrading"
   ```

2. **Copy public key to VPS:**
   ```bash
   ssh-copy-id -i ~/.ssh/id_ed25519.pub your-username@your-vps-ip
   ```

3. **Test SSH connection:**
   ```bash
   ssh your-username@your-vps-ip
   ```

### Step 2: Add GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Add these secrets:
   - `VPS_HOST`: Your VPS IP address or domain
   - `VPS_USER`: Your SSH username
   - `VPS_SSH_KEY`: Your private SSH key (the content of `~/.ssh/id_ed25519`)
   - `VPS_PORT`: SSH port (usually 22)

### Step 3: Update deploy.sh

Edit `deploy.sh` and update:
- `PROJECT_DIR`: Your project directory path (e.g., `/var/www/amertrading-web`)
- `BRANCH`: Your branch name (usually `master` or `main`)
- `APP_NAME`: Your PM2 app name

### Step 4: Upload files to VPS

```bash
# On your local machine
scp deploy.sh your-username@your-vps-ip:/var/www/amertrading-web/
scp ecosystem.config.js your-username@your-vps-ip:/var/www/amertrading-web/
```

### Step 5: Make deploy.sh executable

```bash
# SSH into VPS
ssh your-username@your-vps-ip

# Make script executable
chmod +x /var/www/amertrading-web/deploy.sh
```

### Step 6: Test deployment

Push to GitHub and watch the Actions tab. It should automatically deploy!

---

## Option 2: Git Post-Receive Hook (Alternative)

### Step 1: Set up bare repository on VPS

```bash
# SSH into VPS
ssh your-username@your-vps-ip

# Create bare repository
mkdir -p /var/www/amertrading-web.git
cd /var/www/amertrading-web.git
git init --bare

# Copy post-receive hook
cp /path/to/hooks/post-receive hooks/post-receive
chmod +x hooks/post-receive

# Edit hooks/post-receive and update paths
nano hooks/post-receive
```

### Step 2: Add remote to your local repository

```bash
# On your local machine
git remote add vps your-username@your-vps-ip:/var/www/amertrading-web.git
```

### Step 3: Push to VPS

```bash
git push vps master
```

---

## Option 3: Manual Deployment Script

### Step 1: Upload deploy.sh to VPS

```bash
scp deploy.sh your-username@your-vps-ip:/var/www/amertrading-web/
```

### Step 2: Make it executable

```bash
ssh your-username@your-vps-ip
chmod +x /var/www/amertrading-web/deploy.sh
```

### Step 3: Run manually when needed

```bash
cd /var/www/amertrading-web
bash deploy.sh
```

---

## Setting up PM2 (Process Manager)

### Install PM2

```bash
npm install -g pm2
```

### Start application with PM2

```bash
cd /var/www/amertrading-web
pm2 start ecosystem.config.js
pm2 save
pm2 startup  # Follow instructions to enable auto-start on reboot
```

### PM2 Commands

```bash
pm2 list              # List all apps
pm2 restart amertrading-web  # Restart app
pm2 stop amertrading-web     # Stop app
pm2 logs amertrading-web     # View logs
pm2 monit              # Monitor dashboard
```

---

## Initial VPS Setup

### 1. Install Node.js and npm

```bash
# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

### 2. Install Git

```bash
sudo apt-get update
sudo apt-get install git -y
```

### 3. Clone your repository

```bash
cd /var/www
sudo git clone https://github.com/4shk4n-code/Amertrading.git amertrading-web
cd amertrading-web
sudo chown -R $USER:$USER .
```

### 4. Install dependencies

```bash
npm install
```

### 5. Set up environment variables

```bash
# Create .env file
nano .env

# Add your environment variables:
# DATABASE_URL=...
# ADMIN_USERNAME=...
# ADMIN_PASSWORD=...
# etc.
```

### 6. Generate Prisma client

```bash
npm run db:generate
```

### 7. Build the application

```bash
npm run build
```

### 8. Start with PM2

```bash
pm2 start ecosystem.config.js
pm2 save
```

---

## Nginx Reverse Proxy Setup (Optional but Recommended)

### Install Nginx

```bash
sudo apt-get install nginx -y
```

### Create Nginx config

```bash
sudo nano /etc/nginx/sites-available/amertrading
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

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

### Enable site

```bash
sudo ln -s /etc/nginx/sites-available/amertrading /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## Troubleshooting

### Check if app is running

```bash
pm2 list
pm2 logs amertrading-web
```

### Check Nginx status

```bash
sudo systemctl status nginx
```

### Check port 3000

```bash
sudo netstat -tlnp | grep 3000
```

### View deployment logs

```bash
tail -f /var/www/amertrading-web/logs/pm2-out.log
tail -f /var/www/amertrading-web/logs/pm2-error.log
```

---

## Quick Reference

- **Deploy manually**: `bash deploy.sh`
- **Restart app**: `pm2 restart amertrading-web`
- **View logs**: `pm2 logs amertrading-web`
- **Check status**: `pm2 status`
- **SSH into VPS**: `ssh your-username@your-vps-ip`

