import { useDispatch, useSelector } from 'react-redux';

import classes from './Country.module.css';
import { useEffect, forwardRef, useState } from 'react';
import { oneQuestion } from '../store/question-action-creators';

const Country = forwardRef((props, ref) => {

	const map = ref.current;
    const dispatch = useDispatch();
	const currentCountryName = useSelector(
		(state) => state.roundSlice.currentCountryName
	);
    // const currentCountryCode = useSelector(state => state.roundSlice.currentCountryCode);
	const region = useSelector((state) => state.roundSlice.region);
	const classNames = `${classes.country} ${classes[`country${region}`]}`;
    // const mobile = useSelector(state => state.playBtnSlice.mobile);

    oneQuestion(map, dispatch);

	return (
		<>{currentCountryName && <div className={classNames}>{currentCountryName}</div>}</>
	);
});

export default Country;
