import React from "react";
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
                        {!token && 
                            <Link to="/auth?mode=signup">
                                Sign up
                            </Link>}
                        {token && token!=="EXPIRED" && <Dropdown.Item value={"login"} className={``}>
                            <Form action="/logout" method="post">
                                Logout
                            </Form>
                        </Dropdown.Item>}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </>
    );
};

export default User;