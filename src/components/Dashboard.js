import React, { useState } from "react";
import Task from "./Task";
import DropWrapper from "./DropWrapper";
import { data, statuses } from "../data";

import classes from "./Dashboard.module.css";

const Dashboard = () => {
    const [items, setItems] = useState(data);

    const onDrop = (item, monitor, status) => {
        const mapping = statuses.find(si => si.status === status);

        setItems(prevState => {
            const newItems = prevState
                .filter(i => i.id !== item.id)
                .concat({ ...item, status, icon: mapping.icon });
            return [...newItems];
        });
    };

    const moveItem = (dragIndex, hoverIndex) => {
        const item = items[dragIndex];
        setItems(prevState => {
            const newItems = prevState.filter((i, idx) => idx !== dragIndex);
            newItems.splice(hoverIndex, 0, item);
            return [...newItems];
        });
    };

    return (
        <div className={"container"}>
            <div className={"row"}>
                {statuses.map(s => (
                    <div key={s.status} className={`col ${classes.columnWrapper}`}>
                        <h2 className={classes.columnHeader}>{s.status.toUpperCase()}</h2>
                        <DropWrapper onDrop={onDrop} status={s.status}>
                            {/* get the status when onDrop exec */}
                            <div>
                                {items
                                    .filter(i => i.status === s.status)
                                    .map((i, idx) => <Task key={i.id} task={i} index={idx} moveItem={moveItem} status={s} />)
                                }
                            </div>
                        </DropWrapper>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;