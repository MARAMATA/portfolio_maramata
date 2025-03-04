import React, { useState } from "react";
import axios from "axios";
import { FaUser, FaEnvelope, FaCommentDots, FaPaperPlane } from "react-icons/fa";
import { motion } from "framer-motion";
import "aos/dist/aos.css";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    axios.post("http://localhost:5001/api/contact/", form)
      .then(() => {
        setSuccess("Votre message a été envoyé avec succès !");
        setForm({ name: "", email: "", message: "" });
      })
      .catch(() => {
        setError("Une erreur est survenue. Veuillez réessayer.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div 
      className="container py-5" 
      data-aos="fade-up"
      style={{
        // Background combinant une image et un overlay dégradé pour améliorer la lisibilité
        background: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/assets/contact-bg.jpg') no-repeat center center/cover",
        color: "#fff"
      }}
    >
      <motion.div
        className="mx-auto"
        style={{ maxWidth: "600px" }}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 60, duration: 1 }}
      >
        <h1 className="text-center fw-bold mb-4">Contactez-moi</h1>

        {error && <div className="alert alert-danger text-center">{error}</div>}
        {success && <div className="alert alert-success text-center">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <span className="input-group-text">
              <FaUser />
            </span>
            <input 
              type="text" 
              name="name" 
              placeholder="Nom" 
              className="form-control" 
              value={form.name} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">
              <FaEnvelope />
            </span>
            <input 
              type="email" 
              name="email" 
              placeholder="Email" 
              className="form-control" 
              value={form.email} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">
              <FaCommentDots />
            </span>
            <textarea 
              name="message" 
              placeholder="Votre message" 
              className="form-control" 
              value={form.message} 
              onChange={handleChange} 
              required 
              rows="5"
            ></textarea>
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Envoi en cours...
                </>
              ) : (
                <>
                  <FaPaperPlane className="me-2" /> Envoyer
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Contact;
