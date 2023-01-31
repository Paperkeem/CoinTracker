import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Coin from "./Coin";
import Coins from "./Coins";
import NotFound from "./NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { path: "", element: <Coins /> },
      { path: ":coinId", element: <Coin /> },
    ],
  },
]);
