# 🚀 Portfolio Deployment Guide

## Overview
This guide will help you deploy your Angular + Spring Boot portfolio to free hosting services.

## Architecture
- **Frontend**: Angular → Vercel (Free)
- **Backend**: Spring Boot → Render (Free) 
- **Database**: MySQL → PlanetScale (Free)

> **Note**: Railway is no longer free. We'll use Render.com instead.

---

## 📋 Pre-Deployment Steps

### 1. Prepare Your Code
```bash
# Make sure everything is committed to Git
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### 2. Create Production Environment Files
- Update API URLs for production
- Set up environment variables
- Configure CORS for production domain

---

## 🎯 Step 1: Deploy Database (PlanetScale - Free)

### Create PlanetScale Account
1. Go to https://planetscale.com/
2. Sign up with GitHub
3. Create new database: `portfolio-db`

### Get Connection String
1. Go to your database → Connect
2. Select "Spring Boot" framework
3. Copy the connection URL
4. Save for backend deployment

---

## 🎯 Step 2: Deploy Backend (Render - Free)

### Setup Render
1. Go to https://render.com/
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Name**: `portfolio-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Java`
   - **Build Command**: `./mvnw clean package -DskipTests`
   - **Start Command**: `java -jar target/portfolio-backend-1.0.0.jar`

### Configure Environment Variables
Add these in Render dashboard:
```
DATABASE_URL=your_planetscale_connection_string
EMAIL_USERNAME=your_gmail
EMAIL_PASSWORD=your_app_password
SPRING_PROFILES_ACTIVE=prod
```

### Update application.yml for Production
```yaml
spring:
  profiles:
    active: production
  datasource:
    url: ${DATABASE_URL}
---
spring:
  config:
    activate:
      on-profile: production
  datasource:
    url: ${DATABASE_URL}
    driver-class-name: com.mysql.cj.jdbc.Driver
```

---

## 🎯 Step 3: Deploy Frontend (Vercel - Free)

### Setup Vercel
1. Go to https://vercel.com/
2. Sign up with GitHub
3. Import your repository
4. Set build settings:
   - Framework: Angular
   - Build Command: `ng build`
   - Output Directory: `dist/portfolio`

### Update Environment Configuration
Create `src/environments/environment.prod.ts`:
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-render-app.onrender.com/api'
};
```

### Update Angular Service
Update contact service to use environment:
```typescript
import { environment } from '../../environments/environment';

private apiUrl = `${environment.apiUrl}/contact/send`;
```

---

## 🎯 Step 4: Configure CORS

Update your Spring Boot CORS configuration:
```java
@CrossOrigin(origins = {
  "http://localhost:4200", 
  "https://your-vercel-domain.vercel.app"
})
```

---

## 🎯 Step 5: Final Steps

### 1. Update Contact Form API URL
```typescript
// In contact-section.component.ts
private sendMessageViaAPI(formData: any) {
  const apiUrl = 'https://your-render-app.onrender.com/api/contact/send';
  // ... rest of the code
}
```

### 2. Test Everything
1. Test frontend deployment
2. Test backend API endpoints
3. Test contact form submission
4. Verify database connections
5. Test email functionality

### 3. Custom Domain (Optional)
- Add custom domain in Vercel
- Update CORS settings
- Update environment variables

---

## 🔧 Troubleshooting

### Common Issues:
1. **CORS Errors**: Update CORS origins in Spring Boot
2. **API Not Found**: Check Render deployment logs
3. **Database Connection**: Verify PlanetScale connection string
4. **Email Not Sending**: Check Gmail app password
5. **Cold Starts**: Render free tier sleeps after 15min inactivity

### Useful Commands:
```bash
# Build for production
ng build --configuration production

# Test API endpoint
curl https://your-render-app.onrender.com/api/projects

# Keep your app awake (optional)
# Set up a cron job to ping your API every 10 minutes
```

---

## 📊 Free Tier Limits

### Vercel (Frontend)
- 100GB bandwidth/month
- Unlimited static deployments
- Custom domains included

### Render (Backend)
- 750 hours/month runtime
- 512MB RAM
- Sleeps after 15min inactivity
- Auto-wake on request

### PlanetScale (Database)
- 1 database
- 1GB storage
- 1 billion row reads/month

---

## 🎉 Success!

Your portfolio should now be live at:
- **Frontend**: https://your-domain.vercel.app
- **Backend**: https://your-render-app.onrender.com
- **Database**: Connected via PlanetScale

---

## 📝 Next Steps

1. Monitor deployment health
2. Set up analytics (Google Analytics)
3. Add SSL certificates (automatic)
4. Configure custom domain
5. Set up monitoring alerts
