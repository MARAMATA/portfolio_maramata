import React from "react";
import { motion } from "framer-motion";
import { FaUserTie } from "react-icons/fa";
import "aos/dist/aos.css";

const About = () => {
  return (
    <div 
      className="container py-5" 
      data-aos="fade-right"
      style={{
        background: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/assets/hero-bg.jpg') no-repeat center center/cover",
        color: "#fff"
      }}
    >
      <motion.div 
        className="row align-items-center"
        initial={{ opacity: 0, x: "-50vw" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 50, duration: 1 }}
      >
        {/* Image de profil */}
        <div className="col-md-4 text-center mb-4 mb-md-0">
          <img 
            src="/assets/profile.jpg" 
            alt="Maramata Diop" 
            className="img-fluid rounded-circle shadow-lg" 
            style={{ maxWidth: "250px" }}
          />
        </div>
        {/* Texte de présentation */}
        <div className="col-md-8">
          <div className="d-flex align-items-center mb-3">
            <FaUserTie className="me-3" size={40} color="#ffc107" />
            <h1 className="fw-bold mb-0">À Propos de Moi</h1>
          </div>
          <p className="lead" style={{ textAlign: "justify" }}>
            Je suis <span className="fw-bold text-warning">Douanier</span> et <span className="fw-bold text-info">Data Scientist</span>, passionné par l'<strong>analyse des données</strong> et l'<strong>optimisation des processus douaniers</strong>.
          </p>
          <p style={{ textAlign: "justify" }}>
            Mon expertise me permet de <strong>détecter les anomalies</strong>, d'<strong>optimiser la gestion des flux commerciaux</strong> et d'<strong>assurer la conformité réglementaire</strong> en utilisant des solutions basées sur l'<strong>IA et la science des données</strong>.
          </p>
          <p style={{ textAlign: "justify" }}>
            J’allie mes compétences en <strong>intelligence artificielle</strong>, <strong>machine learning</strong> et <strong>automatisation</strong> pour améliorer la <strong>sécurité</strong>, la <strong>transparence</strong> et l'<strong>efficacité des opérations douanières</strong>.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
