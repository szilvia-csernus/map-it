// Background music:
// Carefree Kevin MacLeod (incompetech.com)
// Licensed under Creative Commons: By Attribution 4.0 License
// http://creativecommons.org/licenses/by/4.0/
// Music promoted on https://www.chosic.com/free-music/all/
// https://www.chosic.com/download-audio/25863/

import classes from './Sound.module.css';
import { ReactComponent as SoundSVG } from '../assets/icons/sound.svg';
import { ReactComponent as NoSoundSVG } from '../assets/icons/noSound.svg';
import carefreeMusic from '../assets/audio/carefree.mp3';
import { useDispatch, useSelector } from 'react-redux';
import { gameActions } from '../store/game-slice';
import useSound from 'use-sound';

/** Renders the 'mute' or 'sound' icons to the screen, adds event listener which
 * takes care of the sound enabling & disabling as well as adds the background music */
const Sound = () => {
    const muted = useSelector(state => state.gameSlice.muted);
    const [play, { stop }] = useSound(carefreeMusic, {volume: 0.25, loop: true});
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