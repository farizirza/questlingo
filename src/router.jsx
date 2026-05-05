import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Result from "./pages/Result";
import Review from "./pages/Review";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/game",
        element: <Game />,
      },
      {
        path: "/result",
        element: <Result />,
      },
      {
        path: "/review",
        element: <Review />,
      },
    ],
  },
]);
