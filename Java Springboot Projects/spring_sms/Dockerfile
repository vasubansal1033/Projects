FROM openjdk:11
LABEL maintainer="vasu.bansal"
ADD build/libs/sms-0.0.1-SNAPSHOT.jar sms.jar
ENTRYPOINT ["java", "-jar", "sms.jar"]
EXPOSE 8080