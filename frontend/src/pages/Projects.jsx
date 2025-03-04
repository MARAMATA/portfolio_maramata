import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../services/api"; // Instance Axios configurée sur http://localhost:5001/api
import ProjectCard from "../components/ProjectCard";
import "aos/dist/aos.css";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Nouvelle palette de couleurs modernes pour les cartes
  const colors = ["#7E57C2", "#5C6BC0", "#26A69A", "#FFA726", "#FF7043", "#42A5F5"];

  const fetchProjects = () => {
    setLoading(true);
    api.get("/projects/")
      .then(response => {
        setProjects(response.data);
        setError(null);
      })
      .catch(err => {
        console.error("Erreur lors de la récupération des projets:", err);
        setError("Impossible de charger les projets. Veuillez réessayer plus tard.");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div
      className="container py-5"
      data-aos="fade-up"
      style={{
        background: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/assets/projects-bg.jpg') no-repeat center center/cover",
        color: "#fff"
      }}
    >
      <motion.h1
        className="text-center fw-bold mb-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Mes Projets
      </motion.h1>
      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger text-center">{error}</div>
      ) : projects.length === 0 ? (
        <p className="text-center">Aucun projet disponible pour le moment.</p>
      ) : (
        <div className="row">
          {projects.map((project, index) => (
            <div key={project.id} className="col-md-4 mb-4">
              <ProjectCard 
                project={project} 
                backgroundColor={colors[index % colors.length]} 
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;
