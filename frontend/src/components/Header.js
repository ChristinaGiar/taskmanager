import React, { useState } from "react";
import BackgroundColor from "./BackgroundColor";
import User from "./User";
import classes from "./Header.module.css";

const Header = ({ name }) => {
    return (
        <header className={classes.headerWrapper}>
            <div className="container">
                <div className={classes.header}>
                    <h5>Task Manager</h5>
                    {name && <div className={classes.greetingsTitle}>Hi, {name}!</div>}
                    <BackgroundColor />
                    <User/>
                </div >
            </div >
        </header >
    );
};

export default Header;