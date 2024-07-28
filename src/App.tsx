import Home from './pages/Home/Home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from './pages/NotFound/NotFound';
import DetailedPlanet from './pages/DetailedPlanet/DetailedPlanet.tsx';

const App = () => {
  const router = () =>
    createBrowserRouter([
      {
        path: '/',
        errorElement: <NotFound />,
        children: [
          {
            path: '',
            element: <Home />,
            children: [
              {
                path: 'card/:id',
                element: <DetailedPlanet />,
              },
            ],
          },
        ],
      },
    ]);

  return <RouterProvider router={router()} />;
};

export default App;
