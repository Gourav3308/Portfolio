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

# Make mvnw executable and check its contents
RUN chmod +x ./mvnw
RUN ls -la ./mvnw
RUN head -10 ./mvnw

# Copy source code first
COPY src src

# Build the application using system Maven (mvnw is corrupted - 0 bytes)
RUN echo "Starting Maven build process using system Maven..."
RUN mvn --version
RUN echo "Maven version check complete"
RUN echo "Running Maven clean with verbose output..."
RUN mvn clean -X
RUN echo "Maven clean complete"
RUN echo "Running Maven compile with verbose output..."
RUN mvn compile -X
RUN echo "Maven compile complete"
RUN echo "Running Maven package with verbose output..."
RUN mvn package -DskipTests -X
RUN echo "Maven package complete"

# Debug: List current directory and target directory contents
RUN pwd && ls -la && ls -la target/ 2>/dev/null || echo "target directory does not exist"

# Expose port
EXPOSE 8080

# Run the application - use shell to find and execute the JAR
CMD ["sh", "-c", "JAR_FILE=$(find target/ -name '*.jar' -type f | head -1) && echo \"Found JAR: $JAR_FILE\" && java -jar \"$JAR_FILE\""]
