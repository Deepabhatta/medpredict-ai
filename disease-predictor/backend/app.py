from flask import Flask
from flask_cors import CORS
from routes.diabetes   import diabetes_bp
from routes.heart      import heart_bp
from routes.cancer     import cancer_bp
from routes.report     import report_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(diabetes_bp, url_prefix='/api')
app.register_blueprint(heart_bp,    url_prefix='/api')
app.register_blueprint(cancer_bp,   url_prefix='/api')
app.register_blueprint(report_bp,   url_prefix='/api')

@app.route('/api/health')
def health():
    return {'status': 'ok', 'message': 'Multiple Disease Predictor API Running'}

if __name__ == '__main__':
    app.run(debug=True, port=5000)
