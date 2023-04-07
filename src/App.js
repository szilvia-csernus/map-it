import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Pages/Home';
import ErrorPage from './Pages/ErrorPage';

// import classes from './App.module.css';

export default function App() {
    const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
    	errorElement: <ErrorPage />,
		children: [
			{ index: true, element: <Home /> },
			// { path: '/no-support', element: <NoSupport /> },
			// { path: '/not-found', element: <NotFound /> },
		],
	},
]);
    return (
        <RouterProvider router={router} />
    )
}
