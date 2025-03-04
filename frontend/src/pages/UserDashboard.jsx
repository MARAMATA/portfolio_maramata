import React, { useEffect, useState } from "react";
import api from "../services/api"; // Utilise l'instance Axios configurée
import ProjectCard from "../components/ProjectCard";

const UserDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = () => {
    console.log("Appel de fetchProjects...");
    setLoading(true);
    api.get("/projects/")
      .then(response => {
        console.log("Projets récupérés:", response.data);
        setProjects(response.data);
        setError(null);
      })
      .catch(err => {
        console.error("Erreur lors de la récupération des projets:", err);
        setError("Erreur lors du chargement des projets.");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    console.log("UserDashboard monté");
    fetchProjects();
  }, []);

  return (
    <div className="p-4" data-aos="fade-up">
      <h1 className="mb-4 text-center">User Dashboard</h1>
      <div className="text-center mb-3">
        <button className="btn btn-secondary" onClick={fetchProjects}>
          Rafraîchir les projets
        </button>
      </div>
      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger text-center">{error}</div>
      ) : projects.length === 0 ? (
        <p className="text-center">Aucun projet disponible pour le moment.</p>
      ) : (
        <div className="row">
          {projects.map(project => (
            <div key={project.id} className="col-md-4">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
