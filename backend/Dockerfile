# 1) Build stage
FROM gradle:8.14.3-jdk21 AS builder
WORKDIR /app

# Copy Gradle wrapper and gradle folder
COPY gradlew ./
COPY gradle ./gradle

# Copy build files
COPY build.gradle settings.gradle ./

# Cache dependencies
RUN ./gradlew --version

# Copy source code
COPY src ./src

# Build fat JAR, skip tests (optional)
RUN ./gradlew clean build -x test

# 2) Run stage
FROM eclipse-temurin:21-jre AS runner
WORKDIR /app

# Copy built JAR
COPY --from=builder /app/build/libs/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]
