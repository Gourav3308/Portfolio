@echo off
echo 🚀 Deploying Portfolio to GitHub...
echo.

echo 📦 Building frontend for production...
call npm run build:prod
if %errorlevel% neq 0 (
    echo ❌ Frontend build failed!
    pause
    exit /b 1
)

echo.
echo 📤 Pushing to GitHub...
git add .
git commit -m "Deploy: Updated for production"
git push origin main

echo.
echo ✅ Deployment complete!
echo.
echo 🌐 Next steps:
echo 1. Deploy backend to Railway: https://railway.app
echo 2. Deploy frontend to Vercel: https://vercel.com
echo 3. Update API URL in environment.prod.ts with your Railway backend URL
echo.
pause
