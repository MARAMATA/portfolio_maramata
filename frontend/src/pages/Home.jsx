import React from "react";
import { FaFileDownload, FaProjectDiagram } from "react-icons/fa";
import { motion } from "framer-motion";
import "aos/dist/aos.css";

const Home = () => {
  return (
    <div 
      className="d-flex align-items-center justify-content-center vh-100" 
      style={{
        background: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/assets/hero-bg.jpg') no-repeat center center/cover",
        color: "#fff"
      }}
      data-aos="fade-in"
    >
      <motion.div
        className="text-center p-5 rounded"
        initial={{ opacity: 0, x: "-100vw" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 60, duration: 1 }}
      >
        <h1 className="display-4 fw-bold mb-3">Bienvenue sur mon Portfolio</h1>
        <p className="lead mb-4" style={{ textAlign: "center" }}>
          Je suis <span className="fw-bold text-warning">Douanier</span> et <span className="fw-bold text-info">Data Scientist</span>, passionné par l'analyse des données et l'optimisation des processus douaniers.
        </p>
        <hr className="my-4 border-light" />
        <p className="mb-4" style={{ textAlign: "center" }}>
          Grâce à mon expertise en intelligence artificielle et en réglementation douanière, j'aide à améliorer la <strong>gestion des flux commerciaux</strong>, la <strong>conformité</strong> et la <strong>détection des fraudes</strong> grâce à des solutions basées sur la <strong>données et l’IA</strong>.
        </p>
        <div className="d-flex justify-content-center">
          <motion.a
            href="/projects"
            className="btn btn-primary btn-lg me-3 d-flex align-items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          >
            <FaProjectDiagram className="me-2" /> Voir mes projets
          </motion.a>
          <motion.a
            href="/cv.pdf"
            download
            className="btn btn-light btn-lg d-flex align-items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          >
            <FaFileDownload className="me-2" /> Télécharger mon CV
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;

