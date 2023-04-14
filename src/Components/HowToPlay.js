import classes from './HowToPlay.module.css';
import Modal from './Modal';
import { useDispatch, useSelector } from 'react-redux';
import { howToPlayActions } from '../store/how-to-play-slice';
import { ReactComponent as QuestionMarkSVG } from '../assets/icons/questionMark.svg';

// renders instructions screen & click event listener on "OK" button
export default function HowToPlay () {
	const dispatch = useDispatch();
    const mobile = useSelector(state => state.gameSlice.mobile);
	const visitedBefore =
		window.localStorage.getItem('visitedBefore') === 'true' ? true : false;
	const message = mobile ? 'Tap ' : 'Double Click / Double Tap';
	const fastClass = visitedBefore ? classes.fast : '';

    function clickHandler() {
        dispatch(howToPlayActions.remove());
    }
	
    return (
			<Modal>
        
				<div className={classes.howToPlayBackground}>
					<div className={classes.howToPlayCanvas}>
						<p className={`${classes.firstRule} ${fastClass}`}>
							Select a region.
						</p>
						<p className={`${classes.secondRule} ${fastClass}`}>
							Find 10 countries on the map.
						</p>
						<p className={`${classes.thirdRule} ${fastClass}`}>
							You can zoom in and out, pan & rotate the map.
						</p>
						<p className={`${classes.fourthRule} ${fastClass}`}>
							{`${message} to select a country.`}
						</p>
						<button className={`${classes.okay} ${fastClass}`} onClick={clickHandler}>
							OK
						</button>
					</div>
				</div>
 
			</Modal>
		);
};

export const QuestionMarkIcon = () => {
	const dispatch = useDispatch();

	const clickHandler = () => {
		dispatch(howToPlayActions.add());
	};

	return (
		<QuestionMarkSVG
			className={classes.questionMark}
			onClick={clickHandler}
			aria-label="info icon"
		/>
	);
}