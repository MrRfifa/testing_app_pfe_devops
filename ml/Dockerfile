# Use the official Python base image
FROM python:3.9

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file to the container
COPY requirements.txt .

# Install the Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code to the container
COPY . .

# # Expose the port that Flask is running on
# EXPOSE 5001

# Start the Flask application
CMD ["flask", "run", "--host=0.0.0.0"]
