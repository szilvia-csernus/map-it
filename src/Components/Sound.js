// Background music:
// Carefree Kevin MacLeod (incompetech.com)
// Licensed under Creative Commons: By Attribution 4.0 License
// http://creativecommons.org/licenses/by/4.0/
// Music promoted on https://www.chosic.com/free-music/all/
// https://www.chosic.com/download-audio/25863/

import classes from './Sound.module.css';
import { ReactComponent as SoundSVG } from '../assets/icons/sound.svg';
import { ReactComponent as NoSoundSVG } from '../assets/icons/noSound.svg';
import { useDispatch, useSelector } from 'react-redux';
import { roundActions } from '../store/round-slice';
import useSound from 'use-sound';
import  carefreeMusic from '../assets/audio/carefree.mp3';

/** Renders the 'mute' or 'sound' icons to the screen, adds event listener which
 * takes care of the sound enabling & disabling as well as adds the background music */
const Sound = () => {
    const muted = useSelector(state => state.roundSlice.muted);
    const [play, { stop }] = useSound(carefreeMusic, {volume: 0.25, loop: true});
    const dispatch = useDispatch();

    const muteClickHandler = () => {
        dispatch(roundActions.setMute());
        stop();
    }

     const unMuteClickHandler = () => {
        play();
		dispatch(roundActions.setUnMute());        
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