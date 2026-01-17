import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import NotFound from "./components/pages/NotFound";
import App from "./components/App";
import WallView from "./components/pages/WallView";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<NotFound />} element={<App />}>
      <Route path="/" element={<WallView />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(<RouterProvider router={router} />);

// allows for live updating
if (module.hot !== undefined) {
  module.hot.accept();
}
