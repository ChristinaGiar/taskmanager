import React, { useContext, useState } from "react";
import Task from "./Task";
import DropWrapper from "./DropWrapper";
import AddTask from "./AddTask";
import AddColumn from "./AddColumn";
import ScrollButtons from "./ScrollButtons";
import { data, statuses } from "../data/index";
import update from 'immutability-helper'


import classes from "./Dashboard.module.css";
import AuthContext from "../store/auth-context";

const Dashboard = () => {
    // let count = 0;
    const [items, setItems] = useState(data);
    const [columnItems, setColumnItems] = useState(statuses);
    const [counter, setCounter] = useState({dataCounter: data.length+1, simpleCounter: 0});

    const crx = useContext(AuthContext);

    const onDrop = (item, monitor, status) => {
        const mapping = columnItems.find(si => si.status === status);

        // crx.dropHandler(mapping.icon);
        setItems(prevState => {
            const newItems = prevState
                .filter(i => i.id !== item.id)
                .concat({ ...item, status, icon: mapping.icon });
            return [...newItems];
        });
    };

    const moveItem = (dragIndex, hoverIndex) => {
        // crx.moveHandler(dragIndex, hoverIndex);
        let item = items[dragIndex];
        setItems((prevCards) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex]],
          ],
        }),
      )
        // setItems(prevState => {
        //     const newItems = prevState.filter((i, idx) => idx !== dragIndex);
        //     // prevState.splice(dragIndex, 1)
        //     newItems.splice(hoverIndex, 0, item);
        //     console.log(prevState);
            
        //     return [...newItems];
        // });
    };
    const addItem = (status) => {
        // crx.addTaskHandler(status, counter.dataCounter, columnItems);
        setItems(prevState => {
            // const lastStatusItemIndex = prevState.findIndex((item) => item.status === status);
            console.log(data.length, counter.dataCounter);
            const column = columnItems.find(column => column.status === status)
            prevState.splice(prevState.length, 0, {
                id: counter.dataCounter,
                icon: column.icon,
                status: column.status,
                title: "Task Title",
                content: "Task Description"
            });
            return [...prevState];
        })
        setCounter(prevCounter => ({ ...prevCounter, dataCounter: prevCounter.dataCounter + 1 }));
    }

    const deleteTask = (id) => {
        // crx.deleteTaskHandler(id);
        setItems(prevState => {
            const newItems = prevState.filter(item => item.id !== id);
            return [...newItems];

        })
    }
    const addColumn = () => {
        // count++
        setCounter(prevCounter => ({ ...prevCounter, simpleCounter: prevCounter.simpleCounter + 1 }));

        setColumnItems(prevColumns => ([ ...prevColumns,  {
            status: `New Column ${counter.simpleCounter}`,
            icon: "🎉",
        }]));
    }

    return (
        <div className={"container"}>
            <div className={`row ${classes.box}`}>
                {columnItems.map(s => (
                    <div key={s.status} className={`col-6 col-sm-4 col-md-3`}>
                        <div className={classes.columnWrapper}>
                        <h2 className={classes.columnHeader}>{s.status.toUpperCase()}</h2>
                        <DropWrapper onDrop={onDrop} status={s.status}>
                            {/* get the status when onDrop exec */}
                            <div>
                                {items
                                    .filter(i => i.status === s.status)
                                    .map((i, idx) => <Task key={i.id} task={i} index={idx} moveItem={moveItem} status={s.status} deleteTask={deleteTask}/>)
                                }
                            </div>
                        </DropWrapper>
                        {/* {console.log("RUN")} */}
                        <AddTask items={items} status={s.status} addItem={addItem}></AddTask>
                        </div>
                    </div>
                ))}
                <AddColumn addColumn={addColumn} />
                <ScrollButtons />
            </div>
        </div>
    );
};

export default Dashboard;