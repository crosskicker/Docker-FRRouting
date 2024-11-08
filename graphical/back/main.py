from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask('yourapplication')

CORS(app)

@app.route('/')
def home():
    return "Hello, welcome to my simple Flask app!"

@app.route('/add-to-board',methods=['POST'])
def addToBoard():
    data = request.get_json()
    response = {
            "message": "Element added to board successfully",
            "received_data": data  # Inclure les données reçues pour confirmation
        }
    print(data)

    return jsonify(response), 200

# Lancer l'application en mode développement
if __name__ == '__main__':
    app.run(debug=True)

