import React, { useContext, useState } from "react";
import { data } from "../data/index";

const AuthContext = React.createContext({
    items: data,
    setItems: () => { },
    dropHandler: () => { },
    moveHandler: () => { },
    addTaskHandler: () => { },
    deleteTaskHandler: () => { }
})

export const AuthContextProvider = (props) => {
    const [items, setItems] = useState(data);

    const dropHandler = (item, status, icon) => {
        setItems(prevState => {
            const newItems = prevState
                .filter(i => i.id !== item.id)
                .concat({ ...item, status, icon: icon });
            return [...newItems];
        });
    }

    const moveHandler = (dragIndex, hoverIndex) => {
        const item = items[dragIndex];
        setItems(prevState => {
            const newItems = prevState.filter((i, idx) => idx !== dragIndex);
            newItems.splice(hoverIndex, 0, item);
            return [...newItems];
        });
    };

    const addTaskHandler = (status, counter, columnItems) => {
        setItems(prevState => {
            const column = columnItems.find(column => column.status === status)
            prevState.splice(prevState.length, 0, {
                id: counter,
                icon: column.icon,
                status: column.status,
                title: "Task Title",
                content: "Task Description",
                progress: "0"
            });

            return [...prevState];
        })
    }

    const deleteTaskHandler = (id) => {
        setItems(prevState => {
            const newItems = prevState.filter(item => item.id !== id);
            return [...newItems];
        })
    }

    return (
        <AuthContext.Provider
            value={{
                items: items,
                setItems: setItems,
                dropHandler: dropHandler,
                moveHandler: moveHandler,
                addTaskHandler: addTaskHandler,
                deleteTaskHandler: deleteTaskHandler
            }}>
            {props.children}
        </AuthContext.Provider>
    )
}


export default AuthContext;

export const useTaskContext = () => useContext(AuthContext);