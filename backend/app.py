from flask import Flask, jsonify
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from config import Config
from extensions import db

app = Flask(__name__)
app.config.from_object(Config)

# Initialisation de SQLAlchemy
db.init_app(app)

# Initialisation de JWT et configuration CORS explicite
jwt = JWTManager(app)
CORS(app, resources={r"/*": {"origins": "*"}})

# Gestionnaires d'erreurs globaux pour retourner du JSON
@app.errorhandler(403)
def forbidden_error(e):
    return jsonify({"error": "Forbidden", "message": str(e)}), 403

@app.errorhandler(404)
def not_found_error(e):
    return jsonify({"error": "Not Found", "message": "La ressource demandée est introuvable"}), 404

@app.errorhandler(500)
def internal_error(e):
    return jsonify({"error": "Internal Server Error", "message": "Une erreur interne est survenue"}), 500

# Gestion des erreurs JWT pour forcer le format JSON
@jwt.unauthorized_loader
def unauthorized_response(callback):
    return jsonify({"error": "Missing Authorization Header"}), 401

@jwt.invalid_token_loader
def invalid_token_response(callback):
    return jsonify({"error": "Invalid token"}), 422

@jwt.expired_token_loader
def expired_token_callback(jwt_header, jwt_payload):
    return jsonify({"error": "Token has expired"}), 401

# Importation des blueprints
from controllers.auth_controller import auth_bp
from controllers.project_controller import project_bp
from controllers.contact_controller import contact_bp
from controllers.admin_controller import admin_bp

# Enregistrement des blueprints avec les préfixes appropriés
app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(project_bp, url_prefix="/api/projects")
app.register_blueprint(contact_bp, url_prefix="/api/contact")
app.register_blueprint(admin_bp, url_prefix="/api/admin")

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=5001)
