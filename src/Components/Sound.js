import classes from './Sound.module.css';
import { ReactComponent as SoundSVG } from '../assets/icons/sound.svg';
import { ReactComponent as NoSoundSVG } from '../assets/icons/noSound.svg';
import weekendMusic from '../assets/audio/weekend.mp3';
import { useDispatch, useSelector } from 'react-redux';
import { gameActions } from '../store/game-slice';
import useSound from 'use-sound';

const Sound = () => {
    const muted = useSelector(state => state.gameSlice.muted);
    const [play, { stop }] = useSound(weekendMusic, {volume: 0.25, loop: true});
    const dispatch = useDispatch();

    const muteClickHandler = () => {
        dispatch(gameActions.setMute());
        stop();
    }

     const unMuteClickHandler = () => {
        play();
		dispatch(gameActions.setUnMute());        
	};

    return (
			<>
				{muted && (
					<>
						<NoSoundSVG
							className={classes.sound}
							onClick={unMuteClickHandler}
						/>
					</>
				)}
				{!muted && (
					<SoundSVG className={classes.sound} onClick={muteClickHandler} />
				)}
			</>
		);
}

export default Sound