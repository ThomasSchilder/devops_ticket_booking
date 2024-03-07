# Use an official OpenJDK runtime as a parent image
FROM openjdk:17-jdk-slim

# Set the working directory in the container
WORKDIR /app

# Install Maven
RUN apt-get update && \
    apt-get install -y maven && \
    rm -rf /var/lib/apt/lists/*

# Verify Maven installation
RUN mvn --version

# Copy the current directory contents into the container at /app
COPY . /app

# Define default command to run when the container starts
CMD ["mvn", "package", "exec:java", "-f", "./"]