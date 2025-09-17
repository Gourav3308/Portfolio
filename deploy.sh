#!/bin/bash

echo "🚀 Starting deployment process..."

# Build Angular for production
echo "📦 Building Angular app for production..."
ng build --configuration production

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Angular build successful!"
else
    echo "❌ Angular build failed!"
    exit 1
fi

# Build Spring Boot
echo "📦 Building Spring Boot app..."
cd backend
./mvnw clean package -DskipTests

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Spring Boot build successful!"
else
    echo "❌ Spring Boot build failed!"
    exit 1
fi

cd ..

echo "🎉 Build process completed successfully!"
echo ""
echo "Next steps:"
echo "1. Deploy frontend to Vercel: https://vercel.com/"
echo "2. Deploy backend to Railway: https://railway.app/"
echo "3. Set up database on PlanetScale: https://planetscale.com/"
echo ""
echo "📖 See DEPLOYMENT_GUIDE.md for detailed instructions"
