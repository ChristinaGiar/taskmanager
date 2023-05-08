import React from "react";
import Homepage from "./components/Dashboard";
import Header from "./components/Header";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend';
import { AuthContextProvider } from "./store/auth-context";

const App = () => {

    return (
        <AuthContextProvider>
            <DndProvider backend={HTML5Backend}>
                <Header />
                <Homepage />
            </DndProvider>
        </AuthContextProvider>
    );
};

export default App;
