# 🚀 Deployment Guide - Women Empowerment Portal

This guide provides step-by-step instructions for deploying your Women Empowerment Portal to **Netlify** (Frontend) and **Render** (Backend).

## 📋 Prerequisites

- [Netlify](https://netlify.com) account (free)
- [Render](https://render.com) account (free)
- [MongoDB Atlas](https://mongodb.com/cloud/atlas) account (free)
- GitHub account with your project repository

## 🌐 Frontend Deployment (Netlify)

### Step 1: Build & Test Local Build
```bash
cd frontend
npm run build
npm run preview  # Test production build locally
```

### Step 2: Deploy to Netlify

#### Method A: Git Integration (Recommended)
1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect Netlify to GitHub**
   - Go to [Netlify Dashboard](https://app.netlify.com)
   - Click "New site from Git"
   - Connect your GitHub account
   - Select your repository
   - Choose `frontend` directory as the publish directory
   - Set build command: `npm run build`
   - Set publish directory: `dist`

3. **Configure Environment Variables**
   In Netlify dashboard → Site settings → Environment variables, add:
   ```
   VITE_API_URL=https://your-backend-api.onrender.com/api
   ```

4. **Deploy**
   - Click "Deploy site"
   - Wait for build to complete (2-5 minutes)
   - Your site will be available at `https://random-name.netlify.app`

#### Method B: Manual Deployment
1. **Build locally**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy via Netlify CLI**
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod --dir=dist
   ```

### Step 3: Configure Custom Domain (Optional)
1. In Netlify dashboard → Domain management
2. Add custom domain
3. Update DNS records as instructed

## 🖥️ Backend Deployment (Render)

### Step 1: Prepare Backend for Production

1. **Update server.js for Render** (Already configured)
   - The server.js is ready for production deployment
   - Uses process.env.PORT for dynamic port assignment

2. **Database Setup**
   - Create MongoDB Atlas cluster
   - Get connection string
   - Configure database access

### Step 2: Deploy to Render

#### Method A: Git Integration
1. **Connect GitHub Repository**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository

2. **Configure Build Settings**
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: `backend`

3. **Environment Variables** (Add in Render dashboard)
   ```
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/women_empowerment?retryWrites=true&w=majority
   JWT_SECRET=your-super-secure-jwt-secret-key-here
   PORT=10000
   FRONTEND_URL=https://your-netlify-site.netlify.app
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Your API will be available at `https://your-app-name.onrender.com`

### Step 3: Database Configuration

1. **MongoDB Atlas Setup**
   - Create new cluster
   - Set up database user
   - Configure IP whitelist
   - Get connection string

2. **Update Environment Variables**
   - Replace local MongoDB URI with Atlas URI
   - Update JWT_SECRET with secure random string

## ⚙️ Environment Variables Reference

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-api.onrender.com/api
```

### Backend (.env)
```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/women_empowerment?retryWrites=true&w=majority

# Authentication
JWT_SECRET=your-super-secure-jwt-secret-key-here

# Server
PORT=10000
NODE_ENV=production

# Frontend URL (for CORS)
FRONTEND_URL=https://your-netlify-site.netlify.app

# Cloudinary (for file uploads)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## 🔧 Post-Deployment Configuration

### 1. Update Frontend API URL
- After backend deployment, copy the Render URL
- Update VITE_API_URL in Netlify environment variables
- Redeploy frontend

### 2. Test API Endpoints
```bash
curl https://your-backend-api.onrender.com/api/health
```

### 3. Test Frontend
- Visit your Netlify URL
- Test registration/login functionality
- Verify all routes work correctly

## 🔒 Security Checklist

- [ ] JWT_SECRET is secure and unique
- [ ] MongoDB Atlas access is properly restricted
- [ ] CORS is configured correctly
- [ ] Environment variables are not exposed in frontend
- [ ] Database user has minimum required permissions
- [ ] Frontend API URLs point to production backend

## 🚨 Troubleshooting

### Common Issues

1. **API Connection Failed**
   - Check VITE_API_URL in Netlify environment variables
   - Verify backend is running and accessible
   - Check CORS configuration in backend

2. **Build Failed**
   - Check build logs in Netlify
   - Ensure all dependencies are installed
   - Verify Node.js version compatibility

3. **Database Connection Error**
   - Verify MongoDB Atlas connection string
   - Check IP whitelist configuration
   - Confirm database user permissions

4. **Routes Not Working**
   - Ensure _redirects file is in public folder
   - Check netlify.toml configuration
   - Verify SPA routing is enabled

### Debug Commands
```bash
# Test backend API
curl https://your-backend-api.onrender.com/api/health

# Check frontend build
cd frontend && npm run build

# Test local production build
cd frontend && npm run preview
```

## 📊 Monitoring & Maintenance

### Render Monitoring
- View logs in Render dashboard
- Monitor CPU and memory usage
- Set up health checks

### Netlify Monitoring
- Monitor build and deploy logs
- Check site analytics
- Monitor function execution (if using)

### Database Monitoring
- Monitor MongoDB Atlas performance
- Set up alerts for connection issues
- Regular database backups

## 🔄 Continuous Deployment

Both Netlify and Render support automatic deployments from Git:
- Push to main branch → automatic deployment
- Pull requests → preview deployments
- Rollback capabilities available

## 📞 Support

If you encounter deployment issues:
1. Check deployment logs
2. Verify environment variables
3. Test API endpoints manually
4. Consult platform-specific documentation

---

**🎉 Your Women Empowerment Portal is now live and ready to empower women worldwide!**