from flask import Blueprint, jsonify
from flask_jwt_extended import get_jwt_identity, verify_jwt_in_request
from functools import wraps
from models import Project, ContactMessage, User

admin_bp = Blueprint('admin_bp', __name__)

def admin_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        try:
            verify_jwt_in_request()
        except Exception as e:
            print("Erreur lors de la vérification JWT:", e)
            return jsonify({"error": "Invalid token"}), 422
        user_id = get_jwt_identity()
        print("ID récupéré :", user_id)
        user = User.query.get(user_id)
        if user:
            print("User trouvé :", user.username, "is_admin =", user.is_admin)
        else:
            print("Aucun utilisateur trouvé pour l'ID", user_id)
        if not user or not user.is_admin:
            return jsonify({"error": "Admins only!"}), 403
        return fn(*args, **kwargs)
    return wrapper

@admin_bp.route('/projects', methods=['GET'])
@admin_required
def admin_get_projects():
    projects = Project.query.all()
    return jsonify([{
        'id': p.id,
        'title': p.title,
        'description': p.description,
        'image_url': p.image_url,
        'github_link': p.github_link,
        'demo_link': p.demo_link
    } for p in projects])

@admin_bp.route('/contacts', methods=['GET'])
@admin_required
def admin_get_contacts():
    contacts = ContactMessage.query.all()
    return jsonify([{
        'id': c.id,
        'name': c.name,
        'email': c.email,
        'message': c.message,
        'date': c.date
    } for c in contacts])
