from flask import Flask

app = Flask('yourapplication')

@app.route('/')
def home():
    return "Hello, welcome to my simple Flask app!"

# Lancer l'application en mode développement
if __name__ == '__main__':
    app.run(debug=True)

