from flask import Flask, request, jsonify
from flask_cors import CORS
import json

app = Flask('yourapplication')

CORS(app)

def write_data(data):
    try:
        # Open template
        with open("myObj.json", "r") as file:
            myObj = json.load(file)
    except FileNotFoundError:
        print("Erreur : File doesn't exists.")
    except IOError:
        print("Erreur : Error : Can't read the file.")

    myObj["netDevice"].append(data)

    try:
    #generate new json
        with open("myObj.json", "w") as file:
            json.dump(myObj, file, indent=4)
    except IOError:
        print(f"Error : Can't write the file.")

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
    write_data(data)
    return jsonify(response), 200

# Lancer l'application en mode développement
if __name__ == '__main__':
    app.run(debug=True)

