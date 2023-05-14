import React, { useState } from "react";
import BackgroundColor from "./BackgroundColor";
import classes from "./Header.module.css";

const Header = () => {
    return (
        <header className={classes.headerWrapper}>
            <div className="container">
                <div className={classes.header}>
                    <h5>Task Manager</h5>
                    < BackgroundColor />
                </div >
            </div >
        </header >
    );
};

export default Header;