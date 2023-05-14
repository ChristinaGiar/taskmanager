import React, { useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';

const colors = [{ name: "Teal", code: "#028090" }, { name: "Purple", code: "purple" }, { name: "Black", code: "#101010" }, { name: "Blue", code: "#324ab2" }];

const BackgroundColor = () => {
    const [activeColor, setActiveColor] = useState(colors[0]);

    const changeBgColorHandler = (color) => {
        setActiveColor(color);
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
                            colors.map((color, idx) => {
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