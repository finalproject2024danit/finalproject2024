# Stage 1: Build
FROM maven:3.8.5-openjdk-17 as builder
WORKDIR /app
COPY . .
# Build the application and skip the tests (optional)
RUN mvn clean package -DskipTests

# Stage 2: Run
FROM eclipse-temurin:17-jdk-alpine as prod
WORKDIR /app
# Copy the JAR file from the builder stage
COPY --from=builder /app/target/*.jar /app/app.jar
ENV SERVER_PORT=9000
EXPOSE 9000
ENTRYPOINT ["java", "-jar", "/app/app.jar"]