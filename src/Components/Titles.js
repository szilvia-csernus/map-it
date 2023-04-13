import classes from './Titles.module.css';

export const MapItTitle = () => {
    return <h1 className={classes.title}>map it!</h1>;
};

export const ChooseARegionTitle = () => {
    return <h1 className={classes.choose}>Choose a region!</h1>;
};

export const FindTheCountryTitle = () => {
    return <h1 className={classes.findCountry}>Find the country on the map!</h1>;
}
