# Vercel Setup - Quick Start Guide

## 🚀 Connect Your GitHub Repo to Vercel

### Step 1: Go to Vercel

1. Visit [vercel.com](https://vercel.com)
2. Click **"Sign Up"** or **"Login"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel to access your GitHub account

### Step 2: Import Your Repository

1. Once logged in, click **"Add New..."** → **"Project"**
2. You'll see a list of your GitHub repositories
3. Find **`ZaZza402/velvet-shaker`** in the list
4. Click **"Import"** next to it

### Step 3: Configure the Build Settings

Vercel will auto-detect most settings, but verify these:

```
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

**IMPORTANT:** Leave everything as auto-detected. Your `vercel.json` will handle the rest.

### Step 4: Deploy

1. Click **"Deploy"** button
2. Wait 2-3 minutes for the build to complete
3. You'll see a **"Congratulations!"** page with your deployment URL

### Step 5: Check the Build Logs

If the build fails:

1. Click on the failed deployment
2. Click **"View Build Logs"**
3. Scroll to find the error (usually highlighted in red)
4. Copy the error message and share it with me

---

## 🔧 What Happens After First Deploy

Once you've successfully deployed once:

- **Every `git push` to `main` will auto-deploy**
- Vercel will run the build checks
- If successful, it auto-deploys to production
- You'll get deployment notifications

---

## 🌐 Add Custom Domain (After First Deploy Succeeds)

### In Vercel Dashboard:

1. Go to your project → **Settings** → **Domains**
2. Add domain: `velvet-shaker.alecsdesign.xyz`
3. Vercel will give you DNS instructions

### At Your DNS Provider (for alecsdesign.xyz):

Add this CNAME record:

```
Type: CNAME
Name: velvet-shaker
Value: cname.vercel-dns.com
TTL: Auto (or 3600)
```

**Examples for common providers:**

#### Cloudflare:

1. DNS → Add record → CNAME
2. Name: `velvet-shaker`
3. Target: `cname.vercel-dns.com`
4. Proxy status: DNS only (gray cloud)
5. Save

#### Namecheap:

1. Advanced DNS → Add New Record → CNAME
2. Host: `velvet-shaker`
3. Value: `cname.vercel-dns.com`
4. TTL: Automatic
5. Save

#### GoDaddy:

1. DNS → Add → CNAME
2. Name: `velvet-shaker`
3. Value: `cname.vercel-dns.com`
4. TTL: 1 hour
5. Save

### Wait for DNS Propagation:

- Usually takes 5-30 minutes
- Can take up to 48 hours in rare cases
- Check status: [dnschecker.org](https://dnschecker.org)

### Verify in Vercel:

- Vercel will auto-detect the DNS record
- SSL certificate will be provisioned automatically (takes 1-2 minutes)
- Set as primary domain if you want

---

## ✅ Quick Checklist

Before deploying:

- [ ] GitHub repo is public or you've granted Vercel access
- [ ] All code is committed and pushed to `main` branch
- [ ] Local build works (`npm run build`)
- [ ] You have a Vercel account connected to GitHub

After first deploy:

- [ ] Build succeeded (check build logs)
- [ ] Visit the Vercel preview URL
- [ ] Test the website functionality
- [ ] Pop-up works (appears after 30s or 75% scroll)
- [ ] All images/videos load correctly

For custom domain:

- [ ] Added CNAME record at DNS provider
- [ ] Waited for DNS propagation (5-30 minutes)
- [ ] Domain verified in Vercel
- [ ] SSL certificate active
- [ ] Set as primary domain

---

## 🐛 Common Issues

### "Build Failed" Error

- Click "View Build Logs" in Vercel
- Look for red error messages
- Common causes:
  - Missing dependencies
  - TypeScript errors
  - Build command issues

### "Checks Failed" on GitHub

- If Vercel isn't connected, there are no checks
- Once connected, Vercel creates preview deployments
- Failed checks = failed build (check Vercel logs)

### Domain Not Working

- Check DNS propagation: [dnschecker.org](https://dnschecker.org)
- Verify CNAME points to `cname.vercel-dns.com`
- Wait 5-30 minutes after adding DNS record
- Check Vercel → Domains shows "Valid Configuration"

### Missing Images (404)

- Ensure all images are in `public/` folder
- Check `og-image.jpg` exists (for social sharing)
- Verify file names match exactly (case-sensitive)

---

## 📞 Need Help?

If you encounter errors:

1. Copy the full error message from Vercel build logs
2. Take a screenshot of the error
3. Share both with me and I'll help debug

**Ready to deploy?** Follow Step 1 above! 🚀
