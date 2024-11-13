// App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/CreatePost";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProtectedRoute from "./utils/AuthRoute";
import Profile from "./pages/Profile";
import Loading from "./componetns/LoadingPage";
import { useState, useEffect } from "react";

function App() {
  const [storedUser, setStoredUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time while retrieving the user from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    setStoredUser(user);
    setLoading(false); // Set loading to false after user is retrieved

    // Listen to storage changes to update the state when user data is removed
    const handleStorageChange = () => {
      const updatedUser = JSON.parse(localStorage.getItem("user"));
      setStoredUser(updatedUser);
    };

    window.addEventListener("storage", handleStorageChange);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/create"
          element={
            <ProtectedRoute isAuthenticated={storedUser}>
              <Create />
            </ProtectedRoute>
          }
        />

        <Route path="/signup" element={<Signup />} />

        <Route
          path="/login"
          element={<Login setStoredUser={setStoredUser} />}
        />

        <Route
          path="/u/:username/profile"
          element={
            storedUser ? (
              <Profile />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Redirect to Home for any undefined routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
