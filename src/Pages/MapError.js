import { Link } from 'react-router-dom';
import classes from './Error.module.css';

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
