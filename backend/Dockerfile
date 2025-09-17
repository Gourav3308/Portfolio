# Use OpenJDK 17 as base image
# Cache buster: 2025-09-17-14:27 - FORCE REBUILD
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Install Maven
RUN apt-get update && apt-get install -y maven && rm -rf /var/lib/apt/lists/*

# Copy Maven wrapper and pom.xml
COPY mvnw .
COPY mvnw.cmd .
COPY .mvn .mvn
COPY pom.xml .

# Make mvnw executable
RUN chmod +x ./mvnw

# Copy source code first
COPY src src

# Build the application with explicit Maven execution - NEW VERSION
RUN echo "Starting Maven build process..."
RUN ./mvnw --version
RUN echo "Maven version check complete"
RUN ./mvnw clean
RUN echo "Maven clean complete"
RUN ./mvnw compile
RUN echo "Maven compile complete"
RUN ./mvnw package -DskipTests
RUN echo "Maven package complete"

# Debug: List current directory and target directory contents
RUN pwd && ls -la && ls -la target/ 2>/dev/null || echo "target directory does not exist"

# Expose port
EXPOSE 8080

# Run the application - use shell to find and execute the JAR
CMD ["sh", "-c", "JAR_FILE=$(find target/ -name '*.jar' -type f | head -1) && echo \"Found JAR: $JAR_FILE\" && java -jar \"$JAR_FILE\""]
