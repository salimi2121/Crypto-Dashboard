import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./component/pages/Dashboard/Dashboard";
import Wallet from "../src/component/pages/Wallet";
import Messages from "../src/component/pages/Messages";
import Trade from "../src/component/pages/Trade";
import Settings from "../src/component/pages/Settings";
import App from "./App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "wallet",
        element: <Wallet />,
      },
      {
        path: "messages",
        element: <Messages />,
      },
      {
        path: "trade",
        element: <Trade />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
]);