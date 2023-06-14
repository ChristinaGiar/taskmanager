import React, { useState } from "react";
import { useRouteLoaderData, Link, Form } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';


const User = () => {
    const token = useRouteLoaderData('root');

    return (
        <>
            <div className="user-dropdown">
                <Dropdown>
                    <Dropdown.Toggle id="user-dropdown">
                        <i className="fa-solid fa-droplet"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {!token && 
                            <Link to="/auth?mode=login">
                                Login
                            </Link>}
                        {/* <Dropdown.Item value={"login"} className={``}> */}
                        {!token && 
                            <Link to="/auth?mode=signup">
                                Sign up
                            </Link>}
                        {/* </Dropdown.Item>} */}
                        {token && token!=="EXPIRED" && <Dropdown.Item value={"login"} className={``}>
                            <Form action="/logout" method="post">
                                Logout
                            </Form>
                        </Dropdown.Item>}

                        {/* {
                            colors.map((color, idx) => {
                                return (
                                    <Dropdown.Item key={idx} value={color} className={`color-box ${(activeColor.code === color.code) ? "active" : ""} `} style={{ backgroundColor: `${color.code}` }} onClick={() => changeBgColorHandler(color)}>{color.name}</Dropdown.Item>
                                )
                            })} */}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </>
    );
};

export default User;