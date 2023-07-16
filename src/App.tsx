import type { Component } from "solid-js";

import { Route, Routes } from "@solidjs/router";
import { LoginPage } from "./routes/login";
import { IndexPage } from "./routes/index";
import { indexDataFunction } from "./resolvers";

const App: Component = () => {
  return (
    <Routes>
      <Route path="/login" component={LoginPage} />
      <Route path="/" component={IndexPage} data={indexDataFunction} />
    </Routes>
  );
};

export default App;
