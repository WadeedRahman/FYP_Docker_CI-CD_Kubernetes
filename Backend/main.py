from flask import Flask, jsonify, request
from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer
from chatterbot.logic import BestMatch
import logging
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
# Enable info level logging for the root logger
logging.basicConfig(level=logging.INFO)

# Filter out INFO messages for the chatterbot logger
chatterbot_logger = logging.getLogger('chatterbot')
chatterbot_logger.setLevel(logging.WARNING)

chatbot = ChatBot("Chatpot",
                  logic_adapters=[
                      {
                          'import_path': 'chatterbot.logic.BestMatch',
                          'default_response': 'I am sorry, but I do not understand,Plz try again.',
                          'maximum_similarity_threshold': 0.90
                      }
                  ]
)

# Optionally, you can train the chatbot with some data
# trainer = ChatterBotCorpusTrainer(chatbot)
# trainer.train('chatterbot.corpus.custom')
@app.route('/', methods=['GET'])
def index():
    return 'hello world'

@app.route('/get_response', methods=['POST','GET'])
def get_response():
    trainer = ChatterBotCorpusTrainer(chatbot)
    trainer.train('chatterbot.corpus.custom.myown')
    data = request.get_json()
    query = data['query']
    response = chatbot.get_response(query).text
    return jsonify({'response': response})


@app.route('/get_recommendation', methods=['POST','GET'])
def get_recommendation():
    trainer = ChatterBotCorpusTrainer(chatbot)
    trainer.train('chatterbot.corpus.custom.M1')
    data = request.get_json()
    query = data['query']
    response = chatbot.get_response(query).text
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True)
