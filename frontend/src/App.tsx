import React from "react";

import { RouterProvider } from "react-router-dom";
import { Container } from "@mui/material";

import router from "./router";

function App() {
  return (
    <Container>
      <RouterProvider router={router()} />
    </Container>
  );
}

export default App;