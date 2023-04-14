import { useDispatch, useSelector } from 'react-redux';

import classes from './Country.module.css';
import { forwardRef, memo } from 'react';
import { oneQuestion } from '../store/question-action-creators';

const Country = forwardRef((props, ref) => {

	const map = ref.current;
    const dispatch = useDispatch();
	const currentCountry = useSelector(
		(state) => state.roundSlice.currentCountry
	);

	const region = useSelector((state) => state.roundSlice.region);
	const classNames = `${classes.country} ${classes[`country${region}`]}`;

    oneQuestion(map, dispatch);

	return (
		<>{currentCountry && <div className={classNames}>{currentCountry[1]}</div>}</>
	);
});

// memoizing this component prevents it re-rendering when the star- or question
// mark icons are clicked.
export default memo(Country);
