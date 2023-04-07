import classes from './Home.module.css';
import Intro from '../Components/Intro';
import MapContainer from '../Components/MapContainer';
import HowToPlay from '../Components/HowToPlay';
import { ReactComponent as ExitIcon } from '../assets/icons/exit.svg';
import { ReactComponent as QuestionMarkIcon } from '../assets/icons/questionMark.svg';
import { ReactComponent as StarIcon } from '../assets/icons/star.svg';
import { useSelector } from 'react-redux';
import { ChooseARegionTitle, MapItTitle } from '../Components/Titles';
import { RegionBtns } from '../Components/Buttons';

function Home() {
	const howToPlayVisible = useSelector(state => state.howToPlaySlice.visible);
	const exitIconVisible = useSelector(state => state.gameSlice.exitIcon);
	const questionMarkIconVisible = useSelector(state => state.gameSlice.questionMarkIcon);
	const starIconVisible = useSelector(state => state.gameSlice.starIcon);
	const chooseRegionTitleVisible = useSelector(state => state.gameSlice.chooseRegionTitle);
	const mapItTitleVisible = useSelector(state => state.gameSlice.mapItTitle);
	const regionBtnsVisible = useSelector(state => state.gameSlice.regionBtns);
	
	// If another event cancels the touch event the default would be to jump back within the code when the player returns.
	// This default behaviour would mess up the event listeners & game flow, that's the reason for preventDefault().
	// I have to figure out how to achieve this in React:
	// document.querySelector('body').on('touchcancel', (e) => e.preventDefault());
	return (
		<>
			{mapItTitleVisible && <MapItTitle />}
			<Intro />
			<MapContainer />
			{howToPlayVisible && <HowToPlay/>}
			{exitIconVisible && <ExitIcon className={classes.exit} aria-label="exit icon"/>}
			{questionMarkIconVisible && <QuestionMarkIcon className={classes.questionMark} aria-label="exit icon"/>}
			{starIconVisible && <StarIcon className={classes.star} aria-label="exit icon"/>}
			{chooseRegionTitleVisible && <ChooseARegionTitle />}
			{regionBtnsVisible && <RegionBtns />}
		</>
	);
}

export default Home;
