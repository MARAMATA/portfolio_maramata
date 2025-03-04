import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    image_url: "",
    github_link: "",
    demo_link: "",
  });

  const token = localStorage.getItem("token");

  const fetchProjects = () => {
    setLoading(true);
    axios.get("http://localhost:5001/api/admin/projects", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => setProjects(response.data))
      .catch(() => setError("Erreur lors du chargement des projets."))
      .finally(() => setLoading(false));
  };

  const fetchContacts = () => {
    axios.get("http://localhost:5001/api/admin/contacts", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => setContacts(response.data))
      .catch(() => setError("Erreur lors du chargement des contacts."));
  };

  useEffect(() => {
    if (token) {
      fetchProjects();
      fetchContacts();
    }
  }, [token]);

  const handleProjectChange = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5001/api/projects/", newProject, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        setMessage("Projet ajouté avec succès !");
        fetchProjects();
        setNewProject({ title: "", description: "", image_url: "", github_link: "", demo_link: "" });
      })
      .catch(() => setError("Erreur lors de l'ajout du projet."));
  };

  const handleDeleteProject = (projectId) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce projet ?")) {
      axios.delete(`http://localhost:5001/api/projects/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(() => {
          setMessage("Projet supprimé avec succès !");
          fetchProjects();
        })
        .catch(() => setError("Erreur lors de la suppression du projet."));
    }
  };

  return (
    <div className="container my-5" data-aos="fade-up">
      <h1 className="mb-4 text-center fw-bold">Admin Dashboard</h1>

      {message && <div className="alert alert-success text-center">{message}</div>}
      {error && <div className="alert alert-danger text-center">{error}</div>}

      <section className="mb-5">
        <h2>Ajouter un Projet</h2>
        <form onSubmit={handleAddProject} className="mx-auto" style={{ maxWidth: "600px" }}>
          <div className="mb-3">
            <input type="text" name="title" placeholder="Titre du projet" className="form-control" value={newProject.title} onChange={handleProjectChange} required />
          </div>
          <div className="mb-3">
            <textarea name="description" placeholder="Description" className="form-control" value={newProject.description} onChange={handleProjectChange} required />
          </div>
          <div className="mb-3">
            <input type="url" name="image_url" placeholder="URL de l'image" className="form-control" value={newProject.image_url} onChange={handleProjectChange} />
          </div>
          <div className="mb-3">
            <input type="url" name="github_link" placeholder="Lien GitHub" className="form-control" value={newProject.github_link} onChange={handleProjectChange} />
          </div>
          <div className="mb-3">
            <input type="url" name="demo_link" placeholder="Lien Démo" className="form-control" value={newProject.demo_link} onChange={handleProjectChange} />
          </div>
          <button type="submit" className="btn btn-primary w-100">Ajouter le Projet</button>
        </form>
      </section>

      <section className="mb-5">
        <h2>Liste des Projets</h2>
        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Chargement...</span>
            </div>
          </div>
        ) : projects.length === 0 ? (
          <p className="text-center">Aucun projet trouvé.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Titre</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td>{project.title}</td>
                  <td>{project.description}</td>
                  <td>
                    <button className="btn btn-danger btn-sm me-2" onClick={() => handleDeleteProject(project.id)}>
                      Supprimer
                    </button>
                    <button className="btn btn-warning btn-sm">Modifier</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section>
        <h2>Messages de Contact</h2>
        {contacts.length === 0 ? (
          <p className="text-center">Aucun message reçu.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Email</th>
                <th>Message</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact.id}>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.message}</td>
                  <td>{new Date(contact.date).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;
