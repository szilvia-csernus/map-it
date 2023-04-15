import classes from './Error.module.css';

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
