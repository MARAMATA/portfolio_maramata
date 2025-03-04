import React from "react";
import { Link, useNavigate } from "react-router-dom";
// Importer la majorité des icônes depuis react-icons/fa (FontAwesome 5)
import { 
  FaHome, 
  FaUser, 
  FaProjectDiagram, 
  FaEnvelope, 
  FaSignOutAlt, 
  FaUserShield, 
  FaUserCircle,
  FaFacebook,
  FaLinkedin,
  FaGithub
} from "react-icons/fa";
// Importer l'icône X pour Twitter depuis react-icons/fa6 (FontAwesome 6)
import { FaXTwitter } from "react-icons/fa6";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("is_admin") === "true";
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("is_admin");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold text-warning" to="/">Maramata DIOP</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* Liens publics */}
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center" to="/">
                <FaHome className="me-2" /> Accueil
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center" to="/about">
                <FaUser className="me-2" /> À propos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center" to="/projects">
                <FaProjectDiagram className="me-2" /> Projets
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center" to="/contact">
                <FaEnvelope className="me-2" /> Contact
              </Link>
            </li>
            {/* Liens sociaux */}
            <li className="nav-item d-flex align-items-center">
              <a 
                href="https://www.facebook.com/maramata.diop.7/" 
                className="nav-link" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ color: "#1877F2" }}
              >
                <FaFacebook />
              </a>
              <a 
                href="https://x.com/SirMaramataDiop" 
                className="nav-link" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ color: "#1DA1F2" }}
              >
                <FaXTwitter />
              </a>
              <a 
                href="https://www.linkedin.com/in/maramata-diop/" 
                className="nav-link" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ color: "#0077B5" }}
              >
                <FaLinkedin />
              </a>
              <a 
                href="https://github.com/MARAMATA" 
                className="nav-link" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ color: "#ffffff" }}
              >
                <FaGithub />
              </a>
            </li>
            {/* Liens pour utilisateurs authentifiés */}
            {token && (
              <>
                <li className="nav-item">
                  <Link 
                    className={`nav-link d-flex align-items-center ${isAdmin ? "text-warning" : "text-info"}`} 
                    to={isAdmin ? "/admin" : "/dashboard"}
                  >
                    {isAdmin ? <FaUserShield className="me-2" /> : <FaUserCircle className="me-2" />}
                    {isAdmin ? "Admin" : "Tableau de bord"}
                  </Link>
                </li>
                <li className="nav-item">
                  <button 
                    className="btn btn-link nav-link text-danger d-flex align-items-center" 
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt className="me-2" /> Déconnexion
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
