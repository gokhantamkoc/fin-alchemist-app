import React from "react";

import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import Blog from "../pages/Blog";

const router = () => {
    return createBrowserRouter(
        [
            {
                "path": "/",
                "element": <Home />
            },
            {
                "path": "/blog",
                "element": <Blog />
            }
        ]
    );
} 

export default router;