import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Gamename from "./pages/Gamename";
import Play from "./pages/Play";
import Selectplaces from "./pages/Selectplaces";
import Scores from "./pages/Scores";
import Playtime from "./pages/Playtime";
import PlayOutlet from "./components/PlayOutlet";
import PlayProvider from "./context/PlayProvider";
import PlayMap from "./pages/PlayMap";

const router = createBrowserRouter([
  {
    path: "/gamename",
    element: <Gamename />,
  },
  {
    path: "/play",
    element: (
      <PlayProvider>
        <PlayOutlet />
      </PlayProvider>
    ),
    children: [
      {
        path: "/play",
        element: <Play />,
      },
      {
        path: "/play/playmap",
        element: <PlayMap />,
      },
      {
        path: "/play/selectplaces",
        element: <Selectplaces />,
      },
      {
        path: "/play/playtime",
        element: <Playtime />,
      },
      {
        path: "/play/scores",
        element: <Scores />,
      },
    ],
  },
]);

function App() {

  
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
