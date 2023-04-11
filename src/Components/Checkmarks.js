import { useSelector } from 'react-redux';
import classes from './Checkmarks.module.css';
import { ReactComponent as CorrectIcon } from '../assets/icons/correct.svg';
import { ReactComponent as IncorrectItem } from '../assets/icons/incorrect.svg';

const Checkmarks = () => {
    const list = useSelector(state => state.answersSlice.list);
    const marks = [];
    list.forEach((el, idx) => {
        if (el) {
            marks.push(
                <CorrectIcon key={idx} className={classes.correct} />
            )
        } else {
            marks.push(
                <IncorrectItem key={idx} className={classes.incorrect} />
            )
        }
    });

    return (
        <ul className={classes.checkmarks}>
            {marks}
        </ul>
    )
};

export default Checkmarks;