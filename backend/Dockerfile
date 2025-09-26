# Base image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install OS deps
RUN apt-get update && apt-get install -y build-essential libpq-dev && rm -rf /var/lib/apt/lists/*

# Install Python deps
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy Django project
COPY . .

# Collect static files (if you use them)
RUN python manage.py collectstatic --noinput

# Expose port
EXPOSE 8000

# Run gunicorn
CMD ["gunicorn", "nexus.wsgi:application", "--bind", "0.0.0.0:8000"]
