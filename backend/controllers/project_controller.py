from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from models import Project, db

project_bp = Blueprint('project_bp', __name__)

@project_bp.route('/', methods=['GET'])
def get_projects():
    projects = Project.query.all()
    return jsonify([{
        'id': p.id,
        'title': p.title,
        'description': p.description,
        'image_url': p.image_url,
        'github_link': p.github_link,
        'demo_link': p.demo_link
    } for p in projects])

@project_bp.route('/', methods=['POST'])
@jwt_required()
def create_project():
    data = request.get_json()
    project = Project(
        title=data['title'], 
        description=data['description'], 
        image_url=data.get('image_url'), 
        github_link=data.get('github_link'),
        demo_link=data.get('demo_link')
    )
    db.session.add(project)
    db.session.commit()
    return jsonify({'message': 'Project created'})

@project_bp.route('/<int:project_id>', methods=['PUT'])
@jwt_required()
def update_project(project_id):
    project = Project.query.get_or_404(project_id)
    data = request.get_json()
    project.title = data.get('title', project.title)
    project.description = data.get('description', project.description)
    project.image_url = data.get('image_url', project.image_url)
    project.github_link = data.get('github_link', project.github_link)
    project.demo_link = data.get('demo_link', project.demo_link)
    db.session.commit()
    return jsonify({'message': 'Project updated'})

@project_bp.route('/<int:project_id>', methods=['DELETE'])
@jwt_required()
def delete_project(project_id):
    project = Project.query.get_or_404(project_id)
    db.session.delete(project)
    db.session.commit()
    return jsonify({'message': 'Project deleted'})
