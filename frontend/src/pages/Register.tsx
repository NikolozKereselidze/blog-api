import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";
import "../styles/Auth.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await register(formData.username, formData.email, formData.password);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="authSection">
      <div className="authContainer">
        <h2 className="authHeader">Register An Account</h2>
        {error && <p className="error">{error} </p>}
        <div>
          <form className="authForm" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button className="authButton" type="submit">
              Register
            </button>
          </form>
          <h3 className="authFooter">
            Already have an account?
            <a className="authLink" href="/login">
              Login
            </a>
          </h3>
        </div>
      </div>
    </section>
  );
};

export default Register;
