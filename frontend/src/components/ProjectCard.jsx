import React from "react";
import { FaGithub } from "react-icons/fa";
import "./ProjectCard.css";

const ProjectCard = ({ project, backgroundColor }) => {
  return (
    <div className="project-card" style={{ backgroundColor: backgroundColor }}>
      {project.image_url && (
        <img src={project.image_url} className="card-img-top" alt={project.title} />
      )}
      <div className="card-body">
        <h5 className="card-title">{project.title}</h5>
        <p className="card-text">{project.description}</p>
        <div className="card-links">
          {project.github_link && (
            <a href={project.github_link} target="_blank" rel="noopener noreferrer">
              <FaGithub size={24} />
            </a>
          )}
          {project.demo_link && (
            <a 
              href={project.demo_link} 
              className="btn btn-secondary" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
