import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Load from './Pages/Load';
import MapError from './Pages/MapError';
import NoSupport from './Pages/NoSupport';
import PageNotFound from './Pages/PageNotFound';
import Home from './Pages/Home';

export default function App() {
		const touchCancelHandler = (e) => {
			// If another event cancels the touch event the default would be to jump back within the code when the player returns.
			// This default behaviour would mess up the event listeners & game flow, that's the reason for preventDefault().
			// I have to figure out how to achieve this in React:
			 e.preventDefault();
		};
    const router = createBrowserRouter([
			{
				path: '/',
				element: <Load />,
				// element: <Home />,
				errorElement: <MapError />,
				children: [
					// { index: true, element: <Load /> },
					{ index: true, element: <Home /> },
					{ path: '/error', element: <MapError /> },
					{ path: '/no-support', element: <NoSupport /> },
					{ path: '*', element: <PageNotFound /> },
				],
			},
		]);
    return (
        <RouterProvider onTouchCancel={touchCancelHandler} router={router} />
    )
}
