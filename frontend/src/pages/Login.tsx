import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../components/authService";
import "../styles/Auth.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <section className="authSection">
      <div className="authContainer">
        <h2 className="authHeader">Login</h2>
        <form className="authForm" onSubmit={handleLogin}>
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
            Login
          </button>
        </form>

        <h3 className="authFooter">
          Don't have an account?
          <a className="authLink" href="/register">
            Sign Up
          </a>
        </h3>
      </div>
    </section>
  );
};

export default Login;
