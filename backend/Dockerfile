# Use the official Node.js base image
FROM node:alpine

WORKDIR /app

# Install necessary dependencies for JMeter, JDK, and unzip
RUN apk update && apk add --no-cache curl unzip openjdk11-jdk git

# Set environment variables for JMeter
ENV JMETERPATH=/opt/apache-jmeter-5.5
ENV PATH=$JMETERPATH/bin:$PATH

# Set JAVA_HOME environment variable
ENV JAVA_HOME=/usr/lib/jvm/java-11-openjdk

# Download JMeter 5.5
RUN curl -LJO https://downloads.apache.org/jmeter/binaries/apache-jmeter-5.5.zip

# Extract JMeter
RUN unzip -q apache-jmeter-5.5.zip -d /opt && rm apache-jmeter-5.5.zip



# Copy package.json and install dependencies
COPY package.json .
RUN npm install

# Copy the rest of the files
COPY . .

# EXPOSE 5000
CMD ["npm", "run", "start"]
