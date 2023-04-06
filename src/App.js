import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './Pages/Root';
import ErrorPage from './Pages/ErrorPage';

// import classes from './App.module.css';

export default function App() {
    const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
    	errorElement: <ErrorPage />,
		children: [
			{ index: true, element: <Root /> },
			// { path: '/no-support', element: <NoSupport /> },
			// { path: '/not-found', element: <NotFound /> },
		],
	},
]);
    return (
        <RouterProvider router={router} />
    )
}
