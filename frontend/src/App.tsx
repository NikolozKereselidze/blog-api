import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import PostDetails from "./pages/PostDetails";
import IsLoggedIn from "./components/IsLoggedin";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/posts/:postId"
          element={
            <ProtectedRoute>
              <PostDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <IsLoggedIn>
              <Register />
            </IsLoggedIn>
          }
        />
        <Route
          path="/login"
          element={
            <IsLoggedIn>
              <Login />
            </IsLoggedIn>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
