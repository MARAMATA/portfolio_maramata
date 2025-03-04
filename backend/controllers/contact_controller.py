from flask import Blueprint, request, jsonify
from models import ContactMessage, db
from services.email_service import send_email
from config import Config

contact_bp = Blueprint('contact_bp', __name__)

@contact_bp.route('/', methods=['POST'])
def send_contact():
    data = request.get_json()
    message = ContactMessage(
        name=data['name'], 
        email=data['email'], 
        message=data['message']
    )
    db.session.add(message)
    db.session.commit()
    # Envoyer l'email en indiquant l'email de l'utilisateur dans le Reply-To
    send_email("New Contact Message", data['message'], data['email'], Config.ADMIN_EMAIL)
    return jsonify({'message': 'Message sent'})
