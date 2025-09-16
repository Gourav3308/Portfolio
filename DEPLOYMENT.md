# 🚀 Portfolio Deployment Guide

## Free Hosting Options

### Option 1: Vercel + Railway (Recommended)

#### Frontend (Vercel)
1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Click "New Project"
   - Import your repository
   - Set build command: `ng build --prod`
   - Set output directory: `dist/gourav-portfolio`
   - Deploy!

#### Backend (Railway)
1. **Go to Railway**:
   - Visit [railway.app](https://railway.app)
   - Sign up with GitHub
   - Click "New Project" → "Deploy from GitHub repo"

2. **Configure Environment Variables**:
   ```
   DATABASE_URL=jdbc:postgresql://your-railway-db-url
   DB_USERNAME=your-username
   DB_PASSWORD=your-password
   ```

3. **Deploy**:
   - Select your backend folder
   - Railway will auto-detect Dockerfile
   - Deploy!

### Option 2: Render (All-in-One)

1. **Go to Render**:
   - Visit [render.com](https://render.com)
   - Sign up with GitHub

2. **Deploy Frontend**:
   - New → Static Site
   - Connect GitHub repo
   - Build command: `npm install && npm run build`
   - Publish directory: `dist/gourav-portfolio`

3. **Deploy Backend**:
   - New → Web Service
   - Connect GitHub repo
   - Root directory: `backend`
   - Build command: `./mvnw clean package -DskipTests`
   - Start command: `java -jar target/portfolio-0.0.1-SNAPSHOT.jar`

4. **Create Database**:
   - New → PostgreSQL
   - Name: `gourav-portfolio-db`
   - Connect to backend service

## Environment Variables

### Backend (.env)
```
DATABASE_URL=jdbc:postgresql://your-db-url
DB_USERNAME=your-username
DB_PASSWORD=your-password
PORT=8080
```

### Frontend (environment.prod.ts)
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-backend-url.com/api'
};
```

## Database Migration

### From MySQL to PostgreSQL
1. **Update Dependencies** (pom.xml):
   ```xml
   <dependency>
       <groupId>org.postgresql</groupId>
       <artifactId>postgresql</artifactId>
   </dependency>
   ```

2. **Update application.yml**:
   ```yaml
   spring:
     datasource:
       driver-class-name: org.postgresql.Driver
   jpa:
     hibernate:
       dialect: org.hibernate.dialect.PostgreSQLDialect
   ```

## Testing Deployment

### 1. Check Frontend
- Visit your Vercel/Render URL
- Test all functionality
- Check console for errors

### 2. Check Backend
- Test API endpoints:
  - `https://your-backend-url.com/api/projects`
  - `https://your-backend-url.com/api/skills`
  - `https://your-backend-url.com/api/contact`

### 3. Check Database
- Verify data loads correctly
- Test form submissions
- Check contact form functionality

## Troubleshooting

### Common Issues
1. **CORS Errors**: Update CORS configuration in backend
2. **Database Connection**: Check environment variables
3. **Build Failures**: Check build logs for specific errors
4. **API Not Found**: Verify backend URL in frontend

### Debug Commands
```bash
# Check backend logs
railway logs

# Check frontend build
vercel logs

# Test API locally
curl https://your-backend-url.com/api/projects
```

## Cost Breakdown

### Vercel (Frontend)
- **Free**: Unlimited deployments, custom domains
- **Pro**: $20/month (if needed)

### Railway (Backend + Database)
- **Free**: $5 credit monthly
- **Pro**: $5/month per service

### Render (All-in-One)
- **Free**: 750 hours/month
- **Starter**: $7/month per service

## Final Steps

1. **Update Frontend API URL**:
   - Update `environment.prod.ts`
   - Point to your deployed backend

2. **Test Everything**:
   - All pages load correctly
   - Forms work
   - Animations work
   - Mobile responsive

3. **Custom Domain** (Optional):
   - Add custom domain in Vercel
   - Update DNS settings

4. **SSL Certificate**:
   - Automatically provided by hosting platforms

## Support

If you encounter issues:
1. Check hosting platform logs
2. Verify environment variables
3. Test API endpoints manually
4. Check browser console for errors

Happy Deploying! 🎉
