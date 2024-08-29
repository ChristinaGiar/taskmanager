import React, { useContext, useEffect, useState } from 'react'
import Task from './Task'
import DropWrapper from './DropWrapper'
import AddTask from './AddTask'
import AddColumn from './AddColumn'
import ScrollButtons from './ScrollButtons'

import classes from './Dashboard.module.css'
import AuthContext from '../store/auth-context'
import TitleColumn from './TitleColumn'
import { isLoggedIn } from '../utils/auth'

const Dashboard = () => {
  const crx = useContext(AuthContext)

  useEffect(() => {
    const changesTimer = setTimeout(() => {
      if (crx.dataIsLoaded && isLoggedIn()) {
        try {
          const saveDataInDB = async () => {
            const response = await fetch(
              process.env.REACT_APP_BACKEND_URL + 'saveUserActivity',
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  items: crx.items,
                  statuses: crx.statuses,
                  themeColor: crx.themeColor,
                  userId: localStorage.getItem('userId'),
                }),
              }
            )
            const message = await response.json()
            console.log(message)
          }
          saveDataInDB()
        } catch (error) {
          console.error(error)
        }
      }
    }, 1000)

    return () => clearTimeout(changesTimer)
    // eslint-disable-next-line
  }, [crx.items, crx.statuses, crx.themeColor])

  const [counter, setCounter] = useState({
    dataCounter: crx.items.length + 1,
    simpleCounter: 1,
  })

  const onDrop = (item, monitor, statusId) => {
    crx.dropHandler(item, statusId)
  }

  const addItem = (status) => {
    crx.addTaskHandler(status, crx.statuses)
    setCounter((prevCounter) => ({
      ...prevCounter,
      dataCounter: prevCounter.dataCounter + 1,
    }))
  }

  const deleteTask = (id) => {
    crx.deleteTaskHandler(id)
  }
  const addColumn = () => {
    setCounter((prevCounter) => ({
      ...prevCounter,
      simpleCounter: prevCounter.simpleCounter + 1,
    }))

    crx.addNewStatusHandler({
      id: crx.statuses.length + counter.simpleCounter,
      status: `New Column ${counter.simpleCounter}`,
      icon: '🎉',
    })
  }

  return (
    <div className={'container position-relative'}>
      <div className={`row ${classes.box} scroll-container`}>
        {crx.statuses.map((s) => (
          <div key={s.status} className={`col-6 col-sm-4 col-md-3`}>
            <div className={classes.columnWrapper}>
              <TitleColumn status={s} />
              <DropWrapper onDrop={onDrop} statusId={s.id}>
                <div>
                  {crx.items
                    .filter((i) => i.statusId === s.id)
                    .map((i, idx, array) => {
                      return (
                        <Task
                          key={i.id}
                          task={i}
                          deleteTask={deleteTask}
                          icon={s.icon}
                        />
                      )
                    })}
                </div>
              </DropWrapper>
              <AddTask
                items={crx.items}
                statusId={s.id}
                addItem={addItem}
              ></AddTask>
            </div>
          </div>
        ))}
        <AddColumn addColumn={addColumn} />
        <ScrollButtons />
      </div>
    </div>
  )
}

export default Dashboard
