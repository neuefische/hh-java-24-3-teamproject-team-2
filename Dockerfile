#docker build -t {user}/taletrail_app:latest .

FROM --platform=linux/amd64 openjdk:22
EXPOSE 8080
ADD backend/target/TaleTrail.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
