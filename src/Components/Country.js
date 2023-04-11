import { useSelector } from 'react-redux';

import classes from './Country.module.css';
import { useEffect, forwardRef } from 'react';
import { oneQuestion } from '../store/question-action-creators';

const Country = forwardRef((props, ref) => {
	const map = ref.current;
	const currentCountryName = useSelector(
		(state) => state.roundSlice.currentCountryName
	);
    const currentCountryCode = useSelector(state => state.roundSlice.currentCountryCode);
	const region = useSelector((state) => state.roundSlice.region);
	const classNames = `${classes.country} ${classes[`country${region}`]}`;

    useEffect(() => {
        if (currentCountryCode === null) {
            // end of round logic
        }
        oneQuestion(map, currentCountryCode, currentCountryName, region);
    }, [map, currentCountryCode, currentCountryName, region])

	return (
		<>{currentCountryName && <div className={classNames}>{currentCountryName}</div>}</>
	);
});

export default Country;
