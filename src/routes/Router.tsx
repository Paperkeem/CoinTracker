import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Chart from "./Chart";
import Coin from "./Coin";
import Coins from "./Coins";
import NotFound from "./NotFound";
import Price from "./Price";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { path: "", element: <Coins /> },
      {
        path: ":coinId",
        element: <Coin />,
        children: [
          { path: "chart", element: <Chart /> },
          { path: "price", element: <Price /> },
        ],
      },
    ],
  },
]);
