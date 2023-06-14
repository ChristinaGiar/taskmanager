import React, { useEffect, useState } from 'react'
import Header from "../components/Header";
import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import { getTokenDuration } from '../utils/auth';

const Root = () => {
    const token = useLoaderData();
    const submit = useSubmit();
    const [name, setName] = useState("");
    useEffect(() => {

        if(!token) {
            return;
        }

        if(token === 'EXPIRED') {
            submit(null, { action: '/logout', method: 'post'});
            return;
        }

        const tokenDuration = getTokenDuration();
        console.log(tokenDuration);
    
        setTimeout(() => {
          submit(null, { action: '/logout', method: 'post' });
          localStorage.removeItem('token');
          localStorage.removeItem('token-duration');
          localStorage.removeItem('name');
        }, tokenDuration);

        setName(localStorage.getItem('name'));
    }, [token, submit])

    return (
        <>
            <Header name={name}/>
            <Outlet />
        </>
    )
}

export default Root