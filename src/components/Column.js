import Note from "./Note";

import classes from './Column.module.css';

const Column = () => {

    return (
        <div className={classes.column}>
             <Note></Note>
        </div>
             
    )
}

export default Column;