import classes from './ErrorPage.module.css';

export default function Error() {
    return (
			<body>
				<p className={classes.error}>Opps... seems like it is an invalid address.</p>
				<a className={classes.errorBtn} href="./index.html">
					Go to map it!
				</a>
			</body>
		);
}

