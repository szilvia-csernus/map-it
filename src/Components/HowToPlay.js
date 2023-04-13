import classes from './HowToPlay.module.css';
// import { localStorageActions } from '../store/local-storage-slice';
import Modal from './Modal';
import { useDispatch, useSelector } from 'react-redux';
import { howToPlayActions } from '../store/how-to-play-slice';
import { ReactComponent as QuestionMarkSVG } from '../assets/icons/questionMark.svg';

// renders instructions screen & click event listener on "OK" button
export default function HowToPlay () {
    const mobile = useSelector(state => state.gameSlice.mobile);
	const visitedBefore = useSelector(state => state.localStorageSlice.visitedBefore)
    // const howToPlayState = useSelector(state => state.howToPlaySlice);
    // const localStorageState = useSelector(state => state.localStorageSlice);
    const dispatch = useDispatch();

	// // remove the icon so that user can't click it again when instructions are already rendered on the page.
	// $('#questionMark').remove();

	const message = mobile ? 'Tap ' : 'Double Click / Double Tap';
	const fastClass = visitedBefore ? classes.fast : '';

    function clickHandler() {
        dispatch(howToPlayActions.remove());
        // 	addHowToPlayIcon(isMobile, true);
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