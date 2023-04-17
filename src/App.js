import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Load from './Pages/Load';
import MapError from './Pages/MapError';
import NoSupport from './Pages/NoSupport';
import PageNotFound from './Pages/PageNotFound';

export default function App() {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <Load />,
			errorElement: <PageNotFound />,
		},

		{ index: true, element: <Load /> },
		{ path: '/error', element: <MapError /> },
		{ path: '/no-support', element: <NoSupport /> },
	]);
	return <RouterProvider router={router} />;
}
