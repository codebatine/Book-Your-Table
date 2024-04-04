import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { NotFound } from "./pages/NotFound";
import { Home } from "./pages/Home";
import { Booking } from "./pages/Booking";
import { Thankyou } from "./pages/Thankyou";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { path: "/", index: true, element: <Home /> },
      { path: "/booking", element: <Booking /> },
      { path: "/thankyou", element: <Thankyou /> }
    ],
  }
]);
