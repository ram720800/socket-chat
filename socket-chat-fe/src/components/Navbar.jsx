import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore.js";

export const Navbar = () => {
  const { authUser } = useAuthStore();

  const location = useLocation();

  const hideLogo = location.pathname === "/chat";

  const escape = location.pathname === "/profile";

  const userPosition =
    location.pathname === "/chat" ? "absolute top-135 right-240" : "relative";

  return (
    <header className="fixed top-0 left-0 w-full py-10 z-50 max-lg:py-4">
      <div className="container flex justify-between items-center h-14">
        <div>
          {!hideLogo && (
            <Link to="/">
              <img
                src="/Sec-logo.svg"
                width={150}
                height={95}
                alt="socket-chat"
              />
            </Link>
          )}
        </div>
        <div>
          <div className={`${userPosition}`}>
            {authUser && (
              <>
                {!escape ? (
                  <Link to="/profile">
                    <img
                      src="/images/gear.svg"
                      alt="gear"
                      className="size-5"
                    />
                  </Link>
                ) : (
                  <Link to="/chat">
                    <img
                      src="/images/cross.svg"
                      alt="gear"
                      className="size-5"
                    />
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
