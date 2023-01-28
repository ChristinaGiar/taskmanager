import { Fragment } from "react";
import Column from "./Column";
import classes from './Panel.module.css';

const Panel = () => {

    return (
        <div className={classes.panelContainer}>
            <div className={classes.panel}>
                <Column />
            </div>

        </div>
    )
}

export default Panel;