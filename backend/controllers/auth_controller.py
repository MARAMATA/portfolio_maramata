from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from models import User, db

auth_bp = Blueprint('auth_bp', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    # Pour créer un admin, envoyez "is_admin": true dans le JSON
    user = User(username=data['username'], is_admin=data.get('is_admin', False))
    user.set_password(data['password'])
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'User registered successfully'})

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    if user and user.check_password(data['password']):
        # Convertir l'ID en chaîne pour que le token soit valide
        token = create_access_token(identity=str(user.id))
        return jsonify({'token': token, 'is_admin': user.is_admin})
    return jsonify({'error': 'Invalid credentials'}), 401


