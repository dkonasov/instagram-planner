import { useNavigate } from "@solidjs/router";
import { Component } from "solid-js";

export const Header: Component = () => {
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header>
      <button type="button" onClick={onLogout}>
        Logout
      </button>
    </header>
  );
};
