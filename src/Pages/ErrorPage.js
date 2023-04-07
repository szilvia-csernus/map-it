import { Link } from 'react-router-dom';
import classes from './ErrorPage.module.css';

export default function Error() {
    return (
			<body>
				<p className={classes.error}>Opps... seems like it is an invalid address.</p>
				<Link className={classes.errorBtn} to="./index.html">
					Go to map it!
				</Link>
			</body>
		);
}

