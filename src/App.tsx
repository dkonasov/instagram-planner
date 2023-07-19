import type { Component } from "solid-js";

import { Routes, Route } from "@solidjs/router";
import { indexDataFunction } from "./resolvers";
import { IndexPage } from "./routes/index";
import { LoginPage } from "./routes/login";
import { MainLayout } from "./routes/main-layout";

const App: Component = () => {
  return (
    <Routes>
      <Route path="/login" component={LoginPage} />
      <Route path="/" component={MainLayout}>
        <Route path="/" component={IndexPage} data={indexDataFunction} />
      </Route>
    </Routes>
  );
};

export default App;
