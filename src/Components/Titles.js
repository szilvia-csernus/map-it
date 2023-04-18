import classes from './Titles.module.css';

/** Renders 'map it!' title */
export const MapItTitle = () => {
    return <h1 className={classes.title}>map it!</h1>;
};

/** Renders 'Choose a region!' title */
export const ChooseARegionTitle = () => {
    return <h1 className={classes.choose}>Choose a region!</h1>;
};

/** Renders 'Find the country on the map!' title */
export const FindTheCountryTitle = () => {
    return <h1 className={classes.findCountry}>Find the country on the map!</h1>;
}
