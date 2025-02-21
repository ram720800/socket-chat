import React from "react";
import { Link } from "react-router-dom";
import { User, LogOut } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore.js";

export const Navbar = () => {
  const { authUser, logOut } = useAuthStore();

  return (
    <header className="fixed top-0 left-0 w-full py-10 z-50 max-lg:py-4">
      <div className="container flex justify-between items-center h-14">
        <div>
          <Link to="/">
            <img
              src="/Sec-logo.svg"
              width={150}
              height={95}
              alt="socket-chat"
            />
          </Link>
        </div>
        <div className="flex items-center gap-4">
          {authUser && (
            <>
              <Link to="/profile">
                <User className="size-5 text-[var(--color-wl1)]" />
                <span className="sm-inline hidden">Profile</span>
              </Link>
              <button onClick={logOut}>
                <LogOut className="size-5 text-[var(--color-wl1)]" />
                <span className="sm-inline hidden">Logout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
