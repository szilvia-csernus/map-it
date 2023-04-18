import classes from './Intro.module.css'

/** Renders an animation - white globe with blue background */
export default function Intro () {
    return (
        <div id="introContainer" className={classes.introContainer}>
            <div className={classes.intro} />
        </div>
    )
}