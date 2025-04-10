const API_URL = "http://localhost:5000/api/users";

export const login = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.errors?.[0]?.msg || "login failed");
    }

    // Store the token in localStorage
    localStorage.setItem("token", data.token);
    return data;
  } catch (err) {
    console.error("Error:", err);
    throw err;
  }
};

export const register = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const response = await fetch("http://localhost:5000/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || data.errors?.[0]?.msg || "Registration failed"
      );
    }

    return data;
  } catch (err) {
    console.error("Error:", err);
    throw err;
  }
};

export const logout = (navigate: (path: string) => void) => {
  localStorage.removeItem("token");
  navigate("/login");
};
