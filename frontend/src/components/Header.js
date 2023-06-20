import React, { useState } from "react";
import BackgroundColor from "./BackgroundColor";
import User from "./User";
import classes from "./Header.module.css";

const colors = [{ name: "Teal", code: "#028090" }, { name: "Purple", code: "purple" }, { name: "Black", code: "#101010" }, { name: "Blue", code: "#324ab2" }];

const Header = ({ name }) => {
    const [activeColor, setActiveColor] = useState(colors[0]);
    const activeColorHandler = (color) => {
        setActiveColor(color);
    }
    return (
        <header className={classes.headerWrapper}>
            <div className="container">
                <div className={classes.header}>
                    <h1 className={classes.headerTitle}>task.manager.org</h1>
                    <p className={classes.headerText}>All you need.</p>
                    {name && <div className={classes.greetingsTitle}>Hi, {name}!</div>}
                    <BackgroundColor getActiveColor={activeColorHandler} colors={colors}/>
                    <User color={activeColor}/>
                </div >
            </div >
        </header >
    );
};

export default Header;