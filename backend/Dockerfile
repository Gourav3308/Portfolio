# Use OpenJDK 17 as base image
# Cache buster: 2025-09-17
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

# Download dependencies
RUN ./mvnw dependency:go-offline -B

# Copy source code
COPY src src

# Build the application
RUN ./mvnw clean package -DskipTests

# Debug: List target directory contents and find JAR files
RUN ls -la target/ && find target/ -name "*.jar" -type f

# Expose port
EXPOSE 8080

# Run the application - use shell to find and execute the JAR
CMD ["sh", "-c", "JAR_FILE=$(find target/ -name '*.jar' -type f | head -1) && echo \"Found JAR: $JAR_FILE\" && java -jar \"$JAR_FILE\""]
