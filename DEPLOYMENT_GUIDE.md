# 🚀 Vercel Deployment & Custom Domain Setup

## ✅ Prerequisites Done

- [x] Code pushed to GitHub repository
- [x] vercel.json configuration created
- [x] Meta tags for social sharing added
- [x] Favicon created and linked

---

## 📦 Step 1: Connect Vercel to GitHub

### **Option A: Via Vercel Dashboard (Easiest)**

1. **Go to Vercel:**

   - Visit: https://vercel.com
   - Sign in with GitHub

2. **Import Project:**

   - Click "Add New Project"
   - Click "Import Git Repository"
   - Find your repository: `ZaZza402/velvet-shaker`
   - Click "Import"

3. **Configure Project:**

   - **Project Name:** `velvet-shaker`
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build` (auto-detected)
   - **Output Directory:** `dist` (auto-detected)
   - **Install Command:** `npm install` (auto-detected)

4. **Deploy:**
   - Click "Deploy"
   - Wait 2-3 minutes
   - You'll get a URL like: `velvet-shaker.vercel.app`

---

### **Option B: Via Vercel CLI**

```bash
# 1. Install Vercel CLI globally
npm install -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy from your project directory
cd D:\CLIENTS\DEMO\bar-design-template\bar-design-template
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name: velvet-shaker
# - Directory: ./ (current)
# - Override settings? No

# 4. Deploy to production
vercel --prod
```

---

## 🌐 Step 2: Add Custom Domain (velvet-shaker.alecsdesign.xyz)

### **A. In Vercel Dashboard:**

1. **Go to your project:**

   - https://vercel.com/dashboard
   - Click on `velvet-shaker` project

2. **Go to Settings:**

   - Click "Settings" tab
   - Click "Domains" in left sidebar

3. **Add Domain:**

   - Enter: `velvet-shaker.alecsdesign.xyz`
   - Click "Add"

4. **Vercel will show you DNS records needed:**
   ```
   Type: CNAME
   Name: velvet-shaker
   Value: cname.vercel-dns.com
   ```

---

### **B. Configure DNS (Where you manage alecsdesign.xyz):**

Go to your DNS provider (could be Cloudflare, Namecheap, GoDaddy, etc.)

**Add CNAME Record:**

```
Type: CNAME
Name: velvet-shaker
Target: cname.vercel-dns.com
TTL: 3600 (or automatic)
```

**Example for Cloudflare:**

1. Go to Cloudflare Dashboard
2. Select `alecsdesign.xyz` domain
3. Click "DNS" tab
4. Click "Add record"
5. Fill in:
   - Type: `CNAME`
   - Name: `velvet-shaker`
   - Target: `cname.vercel-dns.com`
   - Proxy status: DNS only (gray cloud)
   - TTL: Auto
6. Click "Save"

**Example for Namecheap:**

1. Go to Domain List
2. Click "Manage" on alecsdesign.xyz
3. Click "Advanced DNS"
4. Click "Add New Record"
5. Fill in:
   - Type: `CNAME Record`
   - Host: `velvet-shaker`
   - Value: `cname.vercel-dns.com`
   - TTL: Automatic
6. Click "Save"

---

### **C. Verify Domain in Vercel:**

1. After adding DNS record, wait 5-10 minutes
2. Go back to Vercel → Project → Settings → Domains
3. Your domain should show as "Valid"
4. If not, click "Refresh" or wait longer (DNS propagation can take up to 48 hours, but usually 5-30 minutes)

---

## 🔄 Step 3: Set Production Domain

1. **In Vercel Dashboard:**

   - Go to Settings → Domains
   - Find `velvet-shaker.alecsdesign.xyz`
   - Click the three dots (⋯)
   - Click "Set as Primary Domain"

2. **Now your site will be accessible at:**
   - ✅ https://velvet-shaker.alecsdesign.xyz (main)
   - ✅ https://velvet-shaker.vercel.app (still works)
   - ✅ https://velvet-shaker-git-main-[username].vercel.app (git branch)

---

## 🔐 Step 4: SSL Certificate (Automatic)

Vercel automatically provisions SSL certificates for all domains.

**After domain is verified:**

- SSL certificate is automatically issued (takes 1-2 minutes)
- Your site will be accessible via HTTPS
- HTTP automatically redirects to HTTPS

---

## 🎉 Step 5: Test Your Deployment

1. **Visit your domain:**

   ```
   https://velvet-shaker.alecsdesign.xyz
   ```

2. **Test social sharing:**

   - WhatsApp: Share the link in a chat
   - Should show preview with image and description
   - Facebook: Use Facebook Debugger: https://developers.facebook.com/tools/debug/
   - Twitter: Use Twitter Card Validator: https://cards-dev.twitter.com/validator

3. **Check favicon:**
   - Should show neon cocktail icon in browser tab

---

## 🔄 Automatic Deployments

### **Already Set Up!**

Every time you push to GitHub:

1. Vercel detects the push
2. Automatically builds the project
3. Deploys to production
4. Updates `velvet-shaker.alecsdesign.xyz`

**Workflow:**

```bash
# Make changes locally
git add .
git commit -m "Update popup logic"
git push origin main

# Vercel automatically:
# 1. Detects push
# 2. Runs build
# 3. Deploys to production
# 4. Done in 2-3 minutes!
```

---

## 📱 Environment Variables (If Needed)

If you need to add any environment variables:

1. Go to Vercel Dashboard
2. Project → Settings → Environment Variables
3. Add variables:
   - Key: `VITE_FACEBOOK_PAGE`
   - Value: `https://www.facebook.com/ax.m826`
4. Redeploy

---

## 🐛 Troubleshooting

### **Domain Not Working:**

1. **Check DNS propagation:**

   ```
   https://dnschecker.org/#CNAME/velvet-shaker.alecsdesign.xyz
   ```

2. **Verify CNAME record:**

   ```bash
   # Windows:
   nslookup velvet-shaker.alecsdesign.xyz

   # Mac/Linux:
   dig velvet-shaker.alecsdesign.xyz CNAME
   ```

3. **Should return:**
   ```
   velvet-shaker.alecsdesign.xyz CNAME cname.vercel-dns.com
   ```

### **Build Fails:**

1. Check Vercel build logs
2. Common issues:
   - Missing dependencies: `npm install` locally
   - TypeScript errors: Fix locally, test with `npm run build`
   - Environment variables missing

### **Social Preview Not Showing:**

1. **Create og-image.jpg:**

   - See `public/OG_IMAGE_INSTRUCTIONS.txt`
   - Must be 1200x630px
   - Place in `/public/` folder

2. **Clear Facebook cache:**

   - https://developers.facebook.com/tools/debug/
   - Enter your URL
   - Click "Scrape Again"

3. **Clear Twitter cache:**
   - https://cards-dev.twitter.com/validator
   - Enter your URL
   - Click "Preview card"

---

## 📋 Checklist

Before going live:

- [ ] Code pushed to GitHub
- [ ] Vercel project created and connected
- [ ] First deployment successful
- [ ] Custom domain added in Vercel
- [ ] DNS CNAME record added
- [ ] Domain verified in Vercel
- [ ] Domain set as primary
- [ ] SSL certificate issued (HTTPS working)
- [ ] Site accessible at velvet-shaker.alecsdesign.xyz
- [ ] OG image created and uploaded
- [ ] Social sharing tested (WhatsApp, Facebook)
- [ ] Favicon showing correctly
- [ ] Pop-up working on all devices
- [ ] All links pointing to correct Facebook page

---

## 🎯 Quick Commands

```bash
# Deploy manually
vercel --prod

# Check deployment status
vercel ls

# View logs
vercel logs

# Remove deployment
vercel remove velvet-shaker
```

---

## 🔗 Important URLs

- **Live Site:** https://velvet-shaker.alecsdesign.xyz
- **Vercel Dashboard:** https://vercel.com/dashboard
- **GitHub Repo:** https://github.com/ZaZza402/velvet-shaker
- **Facebook Debugger:** https://developers.facebook.com/tools/debug/
- **DNS Checker:** https://dnschecker.org

---

## 📞 Support

If issues persist:

1. Check Vercel status: https://www.vercel-status.com
2. Vercel docs: https://vercel.com/docs
3. Contact Vercel support via dashboard

---

**Status:** Ready to Deploy! 🚀  
**Estimated Time:** 10-15 minutes  
**Difficulty:** Easy
