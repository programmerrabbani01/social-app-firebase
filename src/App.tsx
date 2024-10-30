import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home.tsx";
import Register from "./pages/Register/Register.tsx";
import Login from "./pages/Login/Login.tsx";
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./firebase/auth.ts";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const PublicRoute: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => {
    return user ? <Navigate to="/" /> : <>{children}</>;
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="dark"
      />

      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute user={user}>
                <Home user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
