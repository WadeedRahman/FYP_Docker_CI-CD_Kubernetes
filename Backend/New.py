from flask import Flask, jsonify, request
from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer
import logging
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

logging.basicConfig(level=logging.INFO)
chatterbot_logger = logging.getLogger('chatterbot')
chatterbot_logger.setLevel(logging.WARNING)

# Initialize ChatBot with SQLStorageAdapter
chatbot = ChatBot(
    "Chatpot",
    storage_adapter='chatterbot.storage.SQLStorageAdapter',
    database_uri='sqlite:///database.sqlite3',
    logic_adapters=[
        {
            'import_path': 'chatterbot.logic.BestMatch',
            'default_response': 'I am sorry, but I do not understand, please try again.',
            'maximum_similarity_threshold': 0.90
        }
    ]
)

# Optionally, you can train the chatbot with some data
trainer = ChatterBotCorpusTrainer(chatbot)
trainer.train('chatterbot.corpus.custom.myown')
trainer.train('chatterbot.corpus.custom.M1')

@app.route('/', methods=['GET'])
def index():
    return 'Hello, world!'

@app.route('/get_response', methods=['POST'])
def get_response():
    data = request.get_json()
    query = data['query']
    response = chatbot.get_response(query).text
    return jsonify({'response': response})

@app.route('/get_recommendation', methods=['POST'])
def get_recommendation():
    data = request.get_json()
    query = data['query']
    response = chatbot.get_response(query).text
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True)
