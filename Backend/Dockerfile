# Use an official Python runtime as a parent image
FROM python:3.8.0-slim

# Set environment variables
ENV FLASK_APP=main.py
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_RUN_PORT=5000

# Install system dependencies
RUN apt-get update && \
    apt-get install -y gcc g++ libpq-dev && \
    rm -rf /var/lib/apt/lists/*

# Install spaCy and language model
RUN pip install --upgrade pip && \
    pip install --no-cache-dir spacy==2.3.5 && \
    python -m spacy download en_core_web_sm && \
    python -m spacy link en_core_web_sm en

# Set the working directory
WORKDIR /app

# Copy requirements and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy ChatterBot custom data
COPY myown.yml /usr/local/lib/python3.8/site-packages/chatterbot_corpus/data/custom/
COPY M1.yml /usr/local/lib/python3.8/site-packages/chatterbot_corpus/data/custom/

# Copy application code
COPY . .

# Expose the app port
EXPOSE 5000

# Run the app
CMD ["flask", "run"]
