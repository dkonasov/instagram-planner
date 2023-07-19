import { Component } from "solid-js";
import { Header } from "../../layout/header";
import { Main } from "../../layout/main";

export const MainLayout: Component = () => {
  return (
    <>
      <Header />
      <Main />
    </>
  );
};
