import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Load from './Pages/Load';
import MapError from './Pages/MapError';
import NoSupport from './Pages/NoSupport';
import PageNotFound from './Pages/PageNotFound';

// import classes from './App.module.css';

export default function App() {
    const router = createBrowserRouter([
			{
				path: '/',
				element: <Load />,
				errorElement: <MapError />,
				children: [
					{ index: true, element: <Load /> },
					{ path: '/error', element: <MapError /> },
					{ path: '/no-support', element: <NoSupport /> },
					{ path: '*', element: <PageNotFound /> },
				],
			},
		]);
    return (
        <RouterProvider router={router} />
    )
}
