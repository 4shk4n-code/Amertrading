# How to Copy Your Website to Another Location

## Step 1: Copy All Files

### Option A: Copy Entire Folder
1. Copy the entire `amertrading-web` folder to your new location
2. Or zip it and extract it elsewhere

### Option B: Use Git (Recommended)
```bash
# In the new location, clone your repository:
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

## Step 2: What Files to Copy

**✅ Copy these:**
- `src/` - All source code
- `public/` - Public assets
- `package.json` - Dependencies list
- `package-lock.json` - Locked versions
- `next.config.ts` - Next.js config
- `tsconfig.json` - TypeScript config
- `tailwind.config.ts` - Tailwind config
- `prisma/` - Database schema
- `sanity/` - Sanity CMS config
- `.gitignore` - Git ignore rules
- All other config files

**❌ DON'T copy these (they'll be regenerated):**
- `node_modules/` - Will be reinstalled
- `.next/` - Build folder, will be regenerated
- `.env.local` - Contains secrets, create new one
- `out/` - Build output

## Step 3: Setup in New Location

### 1. Install Dependencies
```bash
cd /path/to/new/location/amertrading-web
npm install
```

### 2. Create Environment File
Copy `.env.local` from your original project, OR create a new one:

```bash
# Copy the template
cp .env.example .env.local  # if you have one
# OR create manually
```

### 3. Add Environment Variables
Edit `.env.local` and add:
```env
# Admin Login
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123

# NextAuth
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=http://localhost:3000

# Firebase
FIREBASE_SERVICE_ACCOUNT_KEY='your-firebase-key-here'

# Add all other env variables you need
```

### 4. Generate Prisma Client (if using database)
```bash
npm run db:generate
```

### 5. Start the Server
```bash
npm run dev
```

## Step 4: Making Changes Independently

### Option A: Same Codebase, Different Branch
```bash
# Create a new branch for changes
git checkout -b new-features
# Make your changes
# Commit and push
git add .
git commit -m "My changes"
git push origin new-features
```

### Option B: Completely Separate Copy
- Just copy the folder
- Make changes in the new location
- They won't affect the original

### Option C: Fork/Clone for Testing
```bash
# Clone to a different folder
cd ..
git clone https://github.com/your-username/your-repo-name.git amertrading-web-test
cd amertrading-web-test
npm install
# Make changes here, original stays untouched
```

## Quick Copy Script

Create a file `copy-project.sh` (or `copy-project.ps1` for Windows):

### Windows PowerShell:
```powershell
# copy-project.ps1
$source = "E:\AmerTrading\amertrading-web"
$destination = "E:\AmerTrading\amertrading-web-copy"

# Copy files (excluding node_modules and .next)
robocopy $source $destination /E /XD node_modules .next out .git /XF .env.local

Write-Host "Project copied to: $destination"
Write-Host "Next steps:"
Write-Host "1. cd $destination"
Write-Host "2. npm install"
Write-Host "3. Copy .env.local from original"
Write-Host "4. npm run dev"
```

### Linux/Mac:
```bash
#!/bin/bash
# copy-project.sh
SOURCE="E:/AmerTrading/amertrading-web"
DEST="E:/AmerTrading/amertrading-web-copy"

rsync -av --exclude='node_modules' --exclude='.next' --exclude='out' --exclude='.git' --exclude='.env.local' "$SOURCE/" "$DEST/"

echo "Project copied to: $DEST"
echo "Next steps:"
echo "1. cd $DEST"
echo "2. npm install"
echo "3. Copy .env.local from original"
echo "4. npm run dev"
```

## Important Notes

1. **Environment Variables**: Always copy `.env.local` separately (it contains secrets)
2. **Firebase Key**: Same Firebase key can be used in both locations
3. **Database**: If using PostgreSQL, both can connect to the same database OR use separate databases
4. **Port Conflicts**: If running both at once, change port:
   ```bash
   # In new location, run on different port:
   PORT=3001 npm run dev
   ```

## Testing Changes

1. Make changes in the copied version
2. Test at `http://localhost:3000` (or `3001` if different port)
3. Original stays untouched
4. When happy, copy changes back or merge via Git

---

**Yes, you can absolutely copy and run your website anywhere!** 🚀

