import Home from './pages/Home/Home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from './pages/NotFound/NotFound';
import DetailedPlanet from './pages/DetailedPlanet/DetailedPlanet.tsx';
import { useState } from 'react';
import Loader from './components/loader/Loader.tsx';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);

  const router = () =>
    createBrowserRouter([
      {
        path: '/',
        errorElement: <NotFound />,
        children: [
          {
            path: '',
            element: <Home setIsLoading={setIsLoading} />,
            children: [
              {
                path: 'card/:id',
                element: <DetailedPlanet setIsLoading={setIsLoading} />,
              },
            ],
          },
        ],
      },
    ]);

  return (
    <>
      {isLoading && <Loader />}
      <RouterProvider router={router()} />
    </>
  );
};

export default App;
