import { Link } from 'react-router-dom';
import classes from './Error.module.css';

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

