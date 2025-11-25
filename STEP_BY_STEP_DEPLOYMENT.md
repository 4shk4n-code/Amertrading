# Step-by-Step Deployment Setup Guide

## 🎯 Where to Run Each Command

- **LOCAL** = Your Windows computer (PowerShell)
- **VPS** = Your server (SSH terminal)

---

## STEP 1: Generate SSH Keys (LOCAL)

**On your Windows computer, open PowerShell:**

```powershell
cd E:\AmerTrading\amertrading-web
.\setup-deployment.ps1
```

**What happens:**
- Creates SSH keys
- Shows PUBLIC key (copy this - you'll need it for VPS)
- Shows PRIVATE key (copy this - you'll need it for GitHub)
- Saves keys to text files

**📋 Copy the PUBLIC key** - you'll paste it in Step 2

---

## STEP 2: Add Public Key to VPS (VPS)

**Connect to your VPS via SSH:**

```bash
ssh your-username@your-vps-ip
```

**Once connected to VPS, run:**

```bash
mkdir -p ~/.ssh
chmod 700 ~/.ssh
nano ~/.ssh/authorized_keys
```

**In nano editor:**
1. Paste your PUBLIC key (from Step 1)
2. Press `Ctrl+X`
3. Press `Y`
4. Press `Enter`

**Then run:**

```bash
chmod 600 ~/.ssh/authorized_keys
cat ~/.ssh/authorized_keys
```

**✅ Verify:** You should see your public key displayed

---

## STEP 3: Setup Project Directory on VPS (VPS)

**Still on VPS, run:**

```bash
sudo mkdir -p /var/www/amertrading-web
sudo chown -R $USER:$USER /var/www/amertrading-web
cd /var/www/amertrading-web
```

**If you haven't cloned the repo yet:**

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git .
```

**OR if repo already exists:**

```bash
git pull origin master
```

**Make deploy.sh executable:**

```bash
chmod +x deploy.sh
```

---

## STEP 4: Install Node.js on VPS (VPS)

**Still on VPS, check if Node.js is installed:**

```bash
node --version
```

**If it shows "command not found", install Node.js:**

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
node --version
npm --version
```

**✅ Verify:** Should show version numbers (e.g., v20.x.x)

---

## STEP 5: Install PM2 on VPS (VPS)

**Still on VPS, run:**

```bash
sudo npm install -g pm2
pm2 --version
```

**✅ Verify:** Should show PM2 version

---

## STEP 6: Install Project Dependencies (VPS)

**Still on VPS, make sure you're in project directory:**

```bash
cd /var/www/amertrading-web
pwd
```

**Should show:** `/var/www/amertrading-web`

**Install dependencies:**

```bash
npm install
```

**Generate Prisma client (if using Prisma):**

```bash
npm run db:generate
```

**Build the project:**

```bash
npm run build
```

**⚠️ This might take a few minutes**

---

## STEP 7: Start Application with PM2 (VPS)

**Still on VPS, run:**

```bash
cd /var/www/amertrading-web
pm2 start npm --name "amertrading-web" -- start
pm2 save
pm2 startup
```

**After `pm2 startup`, it will show a command like:**
```
sudo env PATH=... pm2 startup systemd -u your-username --hp /home/your-username
```

**Copy and run that exact command it shows**

**Check if it's running:**

```bash
pm2 status
pm2 logs amertrading-web
```

**✅ Verify:** Should show app is "online"

---

## STEP 8: Add GitHub Secrets (LOCAL)

**On your Windows computer, open browser:**

1. Go to: `https://github.com/YOUR_USERNAME/YOUR_REPO/settings/secrets/actions`
2. Click **"New repository secret"**

**Add Secret 1:**
- Name: `VPS_HOST`
- Value: Your VPS IP address (e.g., `123.45.67.89`)
- Click **"Add secret"**

**Add Secret 2:**
- Name: `VPS_USER`
- Value: Your VPS username (e.g., `root` or `ubuntu`)
- Click **"Add secret"**

**Add Secret 3:**
- Name: `VPS_SSH_KEY`
- Value: Paste the **PRIVATE key** from Step 1 (entire content)
- Click **"Add secret"**

**Add Secret 4 (Optional):**
- Name: `VPS_PORT`
- Value: `22`
- Click **"Add secret"**

**✅ Verify:** You should see 4 secrets listed

---

## STEP 9: Test Manual Deployment (VPS)

**On VPS, test the deployment script:**

```bash
cd /var/www/amertrading-web
bash deploy.sh
```

**Watch the output - it should:**
- Pull latest code
- Install dependencies
- Build project
- Restart PM2

**✅ If successful:** You'll see "✅ Deployment completed successfully!"

---

## STEP 10: Test Auto-Deployment (LOCAL)

**On your Windows computer, open PowerShell:**

```powershell
cd E:\AmerTrading\amertrading-web
git add .
git commit -m "Test auto-deployment"
git push origin master
```

**✅ Verify:** Should push successfully

---

## STEP 11: Check GitHub Actions (LOCAL)

**On your Windows computer, open browser:**

1. Go to: `https://github.com/YOUR_USERNAME/YOUR_REPO/actions`
2. You should see **"Deploy to VPS"** workflow running
3. Click on it to see logs
4. Wait for it to complete

**✅ If successful:** Green checkmark ✅

**❌ If failed:** Click to see error logs

---

## STEP 12: Verify Website is Live (LOCAL)

**On your Windows computer, open browser:**

1. Go to your website URL
2. Should be loading/running

**On VPS, check logs:**

```bash
pm2 logs amertrading-web --lines 50
pm2 status
```

---

## 🆘 Troubleshooting

### If GitHub Actions fails:

**Check secrets are correct:**
- VPS_HOST: Your IP
- VPS_USER: Your username
- VPS_SSH_KEY: Full private key

**Test SSH connection manually:**

**On LOCAL Windows:**

```powershell
ssh -i $env:USERPROFILE\.ssh\github_deploy your-username@your-vps-ip
```

**Should connect without password**

---

### If deployment script fails on VPS:

**Check paths in deploy.sh:**

```bash
cd /var/www/amertrading-web
cat deploy.sh | grep PROJECT_DIR
```

**Should show:** `PROJECT_DIR="/var/www/amertrading-web"`

**If different, update it:**

```bash
nano deploy.sh
# Change PROJECT_DIR to your actual path
# Save: Ctrl+X, Y, Enter
```

---

### If PM2 not working:

**Check PM2:**

```bash
pm2 status
pm2 logs amertrading-web
pm2 restart amertrading-web
```

---

## 📝 Quick Command Reference

**LOCAL (Windows PowerShell):**
```powershell
cd E:\AmerTrading\amertrading-web
.\setup-deployment.ps1          # Generate keys
git push origin master          # Push code
```

**VPS (SSH Terminal):**
```bash
cd /var/www/amertrading-web
bash deploy.sh                  # Manual deploy
pm2 status                      # Check status
pm2 logs amertrading-web        # View logs
pm2 restart amertrading-web     # Restart app
```

---

## ✅ Checklist

- [ ] Step 1: Generated SSH keys (LOCAL)
- [ ] Step 2: Added public key to VPS (VPS)
- [ ] Step 3: Setup project directory (VPS)
- [ ] Step 4: Installed Node.js (VPS)
- [ ] Step 5: Installed PM2 (VPS)
- [ ] Step 6: Installed dependencies (VPS)
- [ ] Step 7: Started PM2 (VPS)
- [ ] Step 8: Added GitHub secrets (LOCAL)
- [ ] Step 9: Tested manual deployment (VPS)
- [ ] Step 10: Pushed to GitHub (LOCAL)
- [ ] Step 11: Checked GitHub Actions (LOCAL)
- [ ] Step 12: Verified website (LOCAL)

---

**Start with Step 1!** 🚀

