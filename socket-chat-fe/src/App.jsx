import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { SignUpPage } from "./pages/SignUpPage";
import { SignInPage } from "./pages/SignInPage";
import { ProfilePage } from "./pages/ProfilePage";
import { ChatingPage } from "./pages/ChatingPage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

function App() {
  const { authUser, me, isMeAuth, onlineUsers } = useAuthStore();

  console.log(onlineUsers);

  useEffect(() => {
    me();
  }, [me]);

  console.log(authUser);

  if (isMeAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen bg-bl1">
        <Loader className="s-20 animate-spin text-wl1" />
      </div>
    );

  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/signup"
          element={
            !authUser ? <SignUpPage type="signup" /> : <Navigate to="/chat" />
          }
        />
        <Route
          path="/signin"
          element={
            !authUser ? <SignInPage type="signin" /> : <Navigate to="/chat" />
          }
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

      <Toaster />
    </div>
  );
}

export default App;
