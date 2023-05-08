import React, { useContext, useState } from "react";
import Task from "./Task";
import DropWrapper from "./DropWrapper";
import AddTask from "./AddTask";
import AddColumn from "./AddColumn";
import ScrollButtons from "./ScrollButtons";
import { data, statuses } from "../data/index";

import classes from "./Dashboard.module.css";
import AuthContext from "../store/auth-context";

const Dashboard = () => {
    const [columnItems, setColumnItems] = useState(statuses);
    const [counter, setCounter] = useState({ dataCounter: data.length + 1, simpleCounter: 1 });

    const crx = useContext(AuthContext);

    const onDrop = (item, monitor, status) => {
        const mapping = columnItems.find(si => si.status === status);
        crx.dropHandler(item, status, mapping.icon);
    };

    const addItem = (status) => {
        crx.addTaskHandler(status, counter.dataCounter, columnItems);
        setCounter(prevCounter => ({ ...prevCounter, dataCounter: prevCounter.dataCounter + 1 }));
    }

    const deleteTask = (id) => {
        crx.deleteTaskHandler(id);
    }
    const addColumn = () => {
        setCounter(prevCounter => ({ ...prevCounter, simpleCounter: prevCounter.simpleCounter + 1 }));

        setColumnItems(prevColumns => ([...prevColumns, {
            statusId: statuses.length + counter.simpleCounter,
            status: `New Column ${counter.simpleCounter}`,
            icon: "🎉",
        }]));
    }

    return (
        <div className={"container position-relative"}>
            <div className={`row ${classes.box} scroll-container`}>
                {columnItems.map((s) => (
                    <div key={s.status} className={`col-6 col-sm-4 col-md-3`}>
                        <div className={classes.columnWrapper}>
                            <h2 className={classes.columnHeader}>{s.status.toUpperCase()}</h2>
                            <DropWrapper onDrop={onDrop} status={s.status}>
                                <div>
                                    {crx.items
                                        .filter(i => i.status === s.status)
                                        .map((i, idx, array) => {
                                            return <Task key={i.id} task={i} deleteTask={deleteTask} />
                                        })
                                    }
                                </div>
                            </DropWrapper>
                            <AddTask items={crx.items} status={s.status} addItem={addItem}></AddTask>
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