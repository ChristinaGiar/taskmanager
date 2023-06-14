import React, { useEffect, useState } from 'react'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend';
import { AuthContextProvider } from "../store/auth-context";
import Dashboard from "../components/Dashboard";
import Header from "../components/Header";
import { Outlet, useLoaderData, useSubmit, redirect, useLocation } from "react-router-dom";
import { getTokenDuration } from '../utils/auth';

const Root = () => {
    const token = useLoaderData();
    const submit = useSubmit();
    const [name, setName] = useState(""); // = "CHRIS";

    // let isLogin = searchParams.get('mode') === 'login';
    // if(isLoggedIn) {
    //   return redirect("/");
    // }
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