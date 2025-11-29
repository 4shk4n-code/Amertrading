# ⚠️ IMPORTANT: Restart Server Required

The `NEXTAUTH_SECRET` was missing and has been added to `.env.local`.

**You MUST restart your development server for the changes to take effect:**

1. **Stop the current server:**
   - Go to your terminal where `npm run dev` is running
   - Press `Ctrl + C` to stop it

2. **Start it again:**
   ```bash
   npm run dev
   ```

3. **Clear your browser session:**
   - Go to `http://localhost:3000/admin/signin`
   - Logout if you're logged in (or clear cookies)
   - Login again with:
     - Username: `admin`
     - Password: `admin123`

4. **Now try accessing:**
   - `http://localhost:3000/admin/dashboard`

The JWT session error should be fixed after restarting!

