import React, { useContext, useEffect, useState } from 'react'
import { data, statuses as initialStatuses } from '../data/index'
import { themeColors } from '../data/index'
import { BACKEND_URL_LOCAL } from '../utils/constants'

const AuthContext = React.createContext({
  items: data,
  statuses: initialStatuses,
  themeColor: themeColors[0],
  dataIsLoaded: false,
  setItems: () => {},
  dropHandler: () => {},
  moveHandler: () => {},
  addTaskHandler: () => {},
  deleteTaskHandler: () => {},
  addNewStatusHandler: () => {},
  themeColorHandler: () => {},
  changeStatusesHandler: () => {},
})

export const AuthContextProvider = (props) => {
  const [items, setItems] = useState(data)
  const [statuses, setStatuses] = useState(initialStatuses)
  const [themeColor, setThemeColor] = useState(themeColors[0])
  const [dataIsLoaded, setDataIsLoaded] = useState(false)

  useEffect(() => {
    const userActivityUpdate = async () => {
      const response = await fetch(
        BACKEND_URL_LOCAL +
          'getUserActivity?id=' +
          localStorage.getItem('userId')
      )
      const user = await response.json()
      if (user.userActivity) {
        setItems(user.userActivity.items)
        setStatuses(user.userActivity.statuses)
        setThemeColor(user.userActivity.themeColor)
      }
      setDataIsLoaded(true)
    }
    userActivityUpdate()
  }, [])

  const dropHandler = (item, statusId) => {
    setItems((prevState) => {
      const newItems = prevState
        .filter((i) => i.id !== item.id)
        .concat({ ...item, statusId: statusId })
      return newItems
    })
  }

  const moveHandler = (dragIndex, hoverIndex) => {
    const item = items[dragIndex]
    setItems((prevState) => {
      const newItems = prevState.filter((i, idx) => idx !== dragIndex)
      newItems.splice(hoverIndex, 0, item)
      return newItems
    })
  }

  const addTaskHandler = (statusId, columnItems) => {
    setItems((prevState) => {
      const column = columnItems.find((column) => column.id === statusId)

      return prevState.concat([
        {
          id: items.length + 1,
          statusId: column.id,
          title: 'Task Title',
          content: 'Task Description',
          progress: '0',
        },
      ])
    })
  }

  const deleteTaskHandler = (id) => {
    setItems((prevState) => {
      const newItems = prevState.filter((item) => item.id !== id)
      return newItems
    })
  }

  const addNewStatusHandler = (newStatus) => {
    setStatuses((prevState) => {
      return [...prevState, newStatus]
    })
  }

  const themeColorHandler = (color) => {
    setThemeColor(color)
  }

  const changeStatusesHandler = (newStatus) => {
    setStatuses((prevState) => {
      const newStatusIndex = prevState.findIndex(
        (status) => newStatus.id === status.id
      )
      const newStatusState = prevState.slice()
      newStatusState[newStatusIndex] = { ...newStatus }
      return newStatusState
    })
  }

  return (
    <AuthContext.Provider
      value={{
        items: items,
        statuses: statuses,
        themeColor: themeColor,
        dataIsLoaded: dataIsLoaded,
        setItems: setItems,
        dropHandler: dropHandler,
        moveHandler: moveHandler,
        addTaskHandler: addTaskHandler,
        deleteTaskHandler: deleteTaskHandler,
        addNewStatusHandler: addNewStatusHandler,
        themeColorHandler: themeColorHandler,
        changeStatusesHandler: changeStatusesHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext

export const useTaskContext = () => useContext(AuthContext)
