import React, { useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';


const BackgroundColor = (props) => {
    const [activeColor, setActiveColor] = useState(props.colors[0]);

    const changeBgColorHandler = (color) => {
        setActiveColor(color);
        props.getActiveColor(color);
    }

    return (
        <>
            <style>{`body { background-color: ${activeColor.code}; }`}</style>
            <div className="color-dropdown">
                <Dropdown>
                    <Dropdown.Toggle id="color-dropdown">
                        <i className="fa-solid fa-droplet" style={{ color: `${activeColor.code}` }}></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <div className="title-dropdown"> Change color</div>
                        {
                            props.colors.map((color, idx) => {
                                return (
                                    <Dropdown.Item key={idx} value={color} className={`color-box ${(activeColor.code === color.code) ? "active" : ""} `} style={{ backgroundColor: `${color.code}` }} onClick={() => changeBgColorHandler(color)}>{color.name}</Dropdown.Item>
                                )
                            })}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </>
    );
};

export default BackgroundColor;