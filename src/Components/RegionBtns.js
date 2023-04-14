import classes from './RegionBtns.module.css';
import { addTouchLayer} from '../js/map-layers';
import { addHoverLayer } from '../store/map-hover-layer';
import { startRound } from '../store/round-action-creators';
import { useSelector, useDispatch } from 'react-redux';
import { forwardRef, memo, useMemo } from 'react';
import { roundActions } from '../store/round-slice';
import { answersActions } from '../store/answers-slice';
import { mapForRotation, spinGlobe } from '../js/map';

const OneRegionBtn = forwardRef((props, ref) => {
	const dispatch = useDispatch();
	const classNames = `${classes.regionBtn} ${props.className}`;
	const map = ref.current;
	

	const clickHandler = () => {
		mapForRotation.off('moveend', spinGlobe);
		// set region to the chosen region
		dispatch(roundActions.setRegion(props.region));
		// remove 'Choose a region! title'
		dispatch(roundActions.removeChooseRegionTitle());
		// remove region buttons
		dispatch(roundActions.removeRegionBtns());
		// set canvas for checkmarks
		dispatch(answersActions.addCheckmarkCanvas());
		
		startRound(map, props, dispatch);
	}

	return (
		<button className={classNames} onClick={clickHandler}>
			{props.children}
		</button>
	);
});

/** creates all 4 region buttons */
const RegionBtns = forwardRef((props, ref) => {
	const map = ref.current;
	const mobile = useSelector((state) => state.gameSlice.mobile);
	const nrOfQuestions = useSelector((state) => state.roundSlice.nrOfQuestions);

	if (props.mobile) {
		addTouchLayer(map);
	} else {
		addHoverLayer(map);
	}
	const regions = [
		{
			name: 'Europe',
			className: classes.europe,
			coordinates: [14.213562, 53.541532],
			zoom: 3.5,
		},
		{
			name: 'Asia',
			className: classes.asia,
			coordinates: [77.367783, 32.17445],
			zoom: 2.5,
		},
		{
			name: 'Americas',
			className: classes.americas,
			coordinates: [-84.81102, 11.632733],
			zoom: 2.5,
		},
		{
			name: 'Africa',
			className: classes.africa,
			coordinates: [17.015762, 8.895926],
			zoom: 2.8,
		},
	];
	const buttons = [];

	for (const region of regions) {
		buttons.push(
			<OneRegionBtn
				key={region.name}
				region={region.name}
				nrOfQuestions={nrOfQuestions}
				className={region.className}
				coordinates={region.coordinates}
				zoom={region.zoom}
				mobile={mobile}
				ref={ref}
			>
				{region.name}
			</OneRegionBtn>
		);
	}

	return <div className={classes.regionCanvas}>{buttons}</div>;
});

export default memo(RegionBtns);
