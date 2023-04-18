import classes from './Error.module.css';

/** This error page renders if the browser does not suppport Mapbox GL JS. */
export default function NoSupport() {
	return (
		<>
			<div className={classes.error}>
				It seems that your browser does not support Mapbox GL JS, apologies for
				the inconvenience!
				<br />
				Please use an up-to-date version of either Chrome, Firefox, Edge or
				Safari.
			</div>
		</>
	);
}
