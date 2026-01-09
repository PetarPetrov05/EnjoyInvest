# 1) Build stage
FROM gradle:8.14.3-jdk21 AS builder
WORKDIR /app

COPY gradlew ./
COPY gradle ./gradle
COPY build.gradle settings.gradle ./
RUN ./gradlew --version

COPY src ./src
RUN ./gradlew clean build -x test


# 2) Run stage
FROM eclipse-temurin:21-jre AS runner
WORKDIR /app

RUN apt-get update && apt-get install -y netcat-openbsd && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /app/uploads

COPY wait-for-it.sh /app/wait-for-it.sh
RUN chmod +x /app/wait-for-it.sh

COPY --from=builder /app/build/libs/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["./wait-for-it.sh", "db", "5432", "--", "java", "-jar", "app.jar"]

