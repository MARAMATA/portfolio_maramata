import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    axios.post("http://localhost:5001/api/auth/login", form)
      .then(response => {
        const { token, is_admin } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("is_admin", is_admin);
        // Redirection : admin vers /admin, sinon vers /dashboard
        navigate(is_admin ? "/admin" : "/dashboard");
      })
      .catch(() => {
        setError("Identifiants incorrects. Veuillez réessayer.");
        setLoading(false);
      });
  };

  return (
    <div className="container py-5" data-aos="fade-up">
      <h1 className="text-center fw-bold mb-4">Connexion</h1>
      {error && <div className="alert alert-danger text-center">{error}</div>}
      <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: "400px" }}>
        <div className="mb-3">
          <input type="text" name="username" placeholder="Nom d'utilisateur" className="form-control" value={form.username} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <input type="password" name="password" placeholder="Mot de passe" className="form-control" value={form.password} onChange={handleChange} required />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary btn-lg w-100" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Connexion...
              </>
            ) : (
              "Se connecter"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
