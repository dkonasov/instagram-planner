import { Outlet } from "@solidjs/router";
import { Component } from "solid-js";

export const Main: Component = () => {
  return (
    <main>
      <Outlet />
    </main>
  );
};
