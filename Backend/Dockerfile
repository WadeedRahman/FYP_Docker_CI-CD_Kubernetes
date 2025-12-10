# Use Python 3.8 base image
FROM python:3.8-slim-bookworm

# Set environment variables
ENV FLASK_APP=main.py
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_RUN_PORT=5000

# Install system dependencies required for building SpaCy 2.3.5
RUN apt-get update && \
    apt-get install -y build-essential gcc g++ make libpq-dev wget && \
    rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy Python dependencies
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Install additional dependencies for ChatterBot and NLP
RUN pip install --no-cache-dir pytz PyYAML nltk chatterbot chatterbot-corpus==1.2.0

# Install SpaCy + English model
RUN pip install --no-cache-dir spacy==2.3.5 && \
    python -m spacy download en_core_web_sm && \
    python -m spacy link en_core_web_sm en

# Download NLTK data including punkt_tab
RUN python -m nltk.downloader punkt stopwords wordnet averaged_perceptron_tagger punkt_tab

# Copy custom corpus files
COPY myown.yml /usr/local/lib/python3.8/site-packages/chatterbot_corpus/data/custom/
COPY M1.yml /usr/local/lib/python3.8/site-packages/chatterbot_corpus/data/custom/

# Copy all application files
COPY . .

# Expose the Flask port
EXPOSE 5000

# Command to run the Flask application
CMD ["flask", "run"]
