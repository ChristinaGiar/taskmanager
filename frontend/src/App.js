import React from "react";
// import Homepage from "./components/Dashboard";
import TaskManagerPage from "./pages/TaskManagerPage";
import Header from "./components/Header";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend';
import { AuthContextProvider } from "./store/auth-context";
import { createBrowserRouter, RouterProvider, Outlet, redirect } from "react-router-dom";
import Root from "./pages/Root";
import Homepage from "./pages/Homepage";
import AuthPage, { authAction } from "./pages/AuthPage";
import ErrorPage from "./pages/ErrorPage";
import { getAuthToken, isLoggedIn, tokenLoader } from "./utils/auth";
import { logoutAction } from "./components/Logout";

const authLoader = ({ request }) => {
    console.log("req", request);
    // const location = useLocation();
    // const searchParams = new URLSearchParams(location.search);
    // if (isLoggedIn && searchParams.get('mode')) {
    //     redirect("/");
    //     return;
    // }
    getAuthToken();

    // if (token) {
    //     let searchParams = new URL(request.url).searchParams;
    //     // let isLogin = searchParams.get('mode') === 'login';
    //     if (searchParams.get('mode')) {
    //         redirect("/");
    //         return;
    //     }
    // }
}

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
        id: "root",
        loader: tokenLoader,
        children: [
            { index: true, element: <Homepage /> },

            {
                path: 'auth',
                element: <AuthPage />,
                action: authAction
            },
            {
                path: 'logout',
                action: logoutAction
            }
        ]
    }
])


const App = () => {
    // {/* <Header />
    // <AuthContextProvider>
    //     <DndProvider backend={HTML5Backend}>
    //         <Homepage />
    //     </DndProvider>
    // </AuthContextProvider> */}

    return (
        // <React.StrictMode>

        <RouterProvider router={router} />
        // </React.StrictMode>

        // </RouterProvider>
    );
};

export default App;
