import React from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend';
import { isLoggedIn } from '../utils/auth';
import { AuthContextProvider } from "../store/auth-context";
import Dashboard from "../components/Dashboard";

const ErrorPage = () => {
  return (
    <>
        <h1>404</h1>
        <h3>Ooops!</h3>
        <h3>Page not Found</h3>
        <p>This page wasn't found. We suggest you to go back to homepage</p>
        <Link to="/">Back to Home</Link>
        </>
  )
}

export default ErrorPage;