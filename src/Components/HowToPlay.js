import classes from './HowToPlay.module.css';
import { localStorageActions } from '../store/local-storage-slice';
import Modal from './Modal';
import { useDispatch, useSelector } from 'react-redux';
import { howToPlayActions } from '../store/how-to-play-slice';

// renders instructions screen & click event listener on "OK" button
export default function HowToPlay (callback = () => {}) {
    const mobile = useSelector(state => state.playBtnSlice.mobile);
    const howToPlayState = useSelector(state => state.howToPlaySlice);
    const localStorageState = useSelector(state => state.localStorageSlice);
    const dispatch = useDispatch();

	// // remove the icon so that user can't click it again when instructions are already rendered on the page.
	// $('#questionMark').remove();

	const message = mobile ? 'Tap ' : 'Double Click / Double Tap';
	const fastClass = localStorageState.visitedBefore ? classes.fast : '';

    function clickHandler() {
        dispatch(howToPlayActions.remove(howToPlayState));
        // 	addHowToPlayIcon(isMobile, true);
        // 	callback();
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


// adds instructions (question mark) icon & click event listener
// export const addHowToPlayIcon = (isMobile) => {
// 	if (!document.getElementById('questionMark')) {
// 		$('body').append(
// 			'<img id="questionMark" class="questionMark" src="./assets/icons/questionMark.svg" alt="how to play icon"></img>'
// 		);
// 		$('#questionMark').click(function () {
// 			// remove the icon so that user can't click it again when instructions are already rendered on the page.
// 			$('#questionMark').remove();
// 			addHowToPlay(isMobile, true);
// 		});
// 	}
// };
