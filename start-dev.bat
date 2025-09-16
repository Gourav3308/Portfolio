@echo off
echo Starting Gourav Kumar Portfolio Development Environment...
echo.

echo Installing Angular dependencies...
call npm install

echo.
echo Starting Angular development server...
start "Angular Dev Server" cmd /k "ng serve"

echo.
echo Starting Spring Boot backend...
cd backend
start "Spring Boot Server" cmd /k "mvn spring-boot:run"

echo.
echo Development servers starting...
echo Angular: http://localhost:4200
echo Spring Boot: http://localhost:8080/api
echo.
pause
