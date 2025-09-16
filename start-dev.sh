#!/bin/bash

echo "Starting Gourav Kumar Portfolio Development Environment..."
echo

echo "Installing Angular dependencies..."
npm install

echo
echo "Starting Angular development server..."
ng serve &
ANGULAR_PID=$!

echo
echo "Starting Spring Boot backend..."
cd backend
mvn spring-boot:run &
SPRING_PID=$!

echo
echo "Development servers starting..."
echo "Angular: http://localhost:4200"
echo "Spring Boot: http://localhost:8080/api"
echo
echo "Press Ctrl+C to stop all servers"

# Function to cleanup background processes
cleanup() {
    echo "Stopping servers..."
    kill $ANGULAR_PID 2>/dev/null
    kill $SPRING_PID 2>/dev/null
    exit
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM

# Wait for user to stop
wait
