# 🚀 Netlify Deployment Troubleshooting Guide

## Problem: Latest commits not reaching Netlify

### ✅ **Step 1: Verify Repository Connection**
1. **Log into your Netlify dashboard** (https://app.netlify.com/)
2. **Go to Site Settings > General > Repository**
3. **Check these settings:**
   - Repository URL matches: `https://github.com/coder4-c/women-empowerment`
   - Branch is set to: `main`
   - Click "Update repository" if needed

### ✅ **Step 2: Check Build Settings**
1. **Site Settings > Build & Deploy > Build Settings**
2. **Verify:**
   - **Build command**: `cd frontend && npm install --force && npm run build`
   - **Publish directory**: `frontend/dist`
   - **Node version**: `18` or `20`

### ✅ **Step 3: Check Netlify Webhooks**
1. **GitHub Repository Settings > Webhooks**
2. **Look for Netlify webhooks:**
   - Should see webhooks for: `push`, `pull_request`
   - If missing, re-connect repository in Netlify

### ✅ **Step 4: Force a New Deployment**
1. **Go to Netlify dashboard > Deploys tab**
2. **Click "Trigger deploy"**
3. **Select "Deploy site"** (not just "Deploy preview")
4. **Monitor the build logs** for errors

### ✅ **Step 5: Check for Build Failures**
1. **Look at recent deployments** in Netlify dashboard
2. **Click on failed deployments** to see error logs
3. **Common build issues to fix:**
   - Missing dependencies
   - Build command errors
   - Environment variables

### ✅ **Step 6: Alternative Solutions**

#### Option A: Make a Small Test Commit
```bash
# Add a small whitespace change to trigger webhook
echo "" >> README.md
git add README.md
git commit -m "trigger: force netlify rebuild"
git push origin main
```

#### Option B: Reconnect Repository
1. **Site Settings > General > Repository**
2. **Click "Disconnect site"**
3. **Click "Link repository"**
4. **Re-select your GitHub repo**

#### Option C: Manual Build Verification
```bash
# Test local build to ensure it works
cd frontend
npm install --force
npm run build
# Should create/updated frontend/dist/
```

## 🔍 **Debugging Commands**

### Check your local build works:
```bash
cd frontend && npm run build
ls -la frontend/dist/
```

### Verify git pushes are working:
```bash
git log --oneline -5
git push origin main
# Should see "Everything up-to-date" if already pushed
```

### Check Netlify build logs:
1. **Netlify Dashboard → Site → Deploys**
2. **Click on latest deploy**
3. **View "Deploy log"**

## 🚨 **Most Common Causes & Fixes**

1. **Wrong publish directory**: Should be `frontend/dist` (not just `dist`)
2. **Wrong build command**: Must install dependencies first
3. **Branch mismatch**: Should be `main` (not `master`)
4. **Missing Netlify webhooks**: Reconnect repository
5. **Build failures**: Check error logs in Netlify dashboard

## 📞 **Still Having Issues?**

1. **Check Netlify status page**: https://netlifystatus.com/
2. **Try disabling and re-enabling** Auto-build in Netlify settings
3. **Contact Netlify support** if repository connection seems broken

---

**Quick Test**: After making changes, commit and push, then check Netlify dashboard for new deployment within 2-3 minutes.
