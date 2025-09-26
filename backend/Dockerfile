# Use official Python image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install system deps (for psycopg2 etc.)
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY . .

# Expose port
EXPOSE 8000

# Run migrations + server (for dev)
CMD ["sh", "-c", "python manage.py migrate && gunicorn nexus.wsgi:application --bind 0.0.0.0:8000"]
# CMD ["sh", "-c", "python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]
# CMD ["gunicorn", "nexus.wsgi:application", "--bind", "0.0.0.0:8000"]
