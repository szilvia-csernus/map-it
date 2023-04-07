import classes from './Titles.module.css';

export function MapItTitle() {
    return (
        <h1 className={classes.title}>map it!</h1>
    )
}

export function ChooseARegionTitle() {
    return <h1 className={classes.choose}>Choose a region!</h1>;
}