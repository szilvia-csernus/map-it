import { Link } from 'react-router-dom';
import classes from './Error.module.css';

/** Renders if there is an unknown path in the url. */
export default function PageNotFound() {
    return (
			<>
				<p className={classes.error}>Opps... seems like it is an invalid address.</p>
				<Link className={classes.errorBtn} to='/'>
					Go to map it!
				</Link>
			</>
		);
}

