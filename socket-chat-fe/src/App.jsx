import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { LandingPage } from "./pages/LandingPage";
import { SignUpPage } from "./pages/SignUpPage";
import { SignInPage } from "./pages/SignInPage";
import { ProfilePage } from "./pages/ProfilePage";
import { ChatingPage } from "./pages/ChatingPage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";

function App() {
  const { authUser, me, isMeAuth } = useAuthStore();

  useEffect(() => {
    me();
  }, [me]);

  console.log(authUser);

  if (isMeAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="s-20 animate-spin" />
      </div>
    );

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/chat" />}
        />
        <Route
          path="/signin"
          element={!authUser ? <SignInPage /> : <Navigate to="/chat" />}
        />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/signin" />}
        />
        <Route
          path="/chat"
          element={authUser ? <ChatingPage /> : <Navigate to="/signin" />}
        />
      </Routes>
    </div>
  );
}

export default App;
