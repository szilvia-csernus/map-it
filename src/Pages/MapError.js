import { Link } from 'react-router-dom';
import classes from './Error.module.css';

/** This error page gets rendered if there was an error while connecting go Mapbox,
 * if the load number exceeded 49000 or if the Count API failed to fetch load number. */
export default function MapError() {
	return (
		<>
			<p className={classes.error}>
				An error happened while connecting to Mapbox, apologies for the
				inconvenience!
				<br />
				Please try again later.
			</p>
			<Link className={classes.errorBtn} to="/">
				Try again
			</Link>
		</>
	);
}
