import React, { useContext, useState } from 'react'
import { data, statuses as initialStatuses } from '../data/index'

const AuthContext = React.createContext({
  items: data,
  setItems: () => {},
  dropHandler: () => {},
  moveHandler: () => {},
  addTaskHandler: () => {},
  deleteTaskHandler: () => {},
  addNewStatusHandler: () => {},
  changeStatusesHandler: () => {},
})

export const AuthContextProvider = (props) => {
  const [items, setItems] = useState(data)
  const [statuses, setStatuses] = useState(initialStatuses)

  const dropHandler = (item, status, icon) => {
    setItems((prevState) => {
      const newItems = prevState
        .filter((i) => i.id !== item.id)
        .concat({ ...item, status, icon: icon })
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

  const addTaskHandler = (status, counter, columnItems) => {
    setItems((prevState) => {
      const column = columnItems.find((column) => column.status === status)
      //   prevState.splice(prevState.length, 0, {
      //     id: counter,
      //     icon: column.icon,
      //     status: column.status,
      //     title: 'Task Title',
      //     content: 'Task Description',
      //     progress: '0',
      //   })
      // return [...prevState]
      return prevState.concat([
        {
          id: counter,
          icon: column.icon,
          status: column.status,
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

  const changeStatusesHandler = (newStatus) => {
    setStatuses((prevState) => {
      const newStatusIndex = prevState.findIndex(
        (status) => newStatus.id === status.id
      )
      const newStatusState = prevState.slice()
      newStatusState[newStatusIndex] = { ...newStatus }
      return newStatusState
      // return [...prevState.filter(status => newStatus.id !== status.id), newStatus]
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
        deleteTaskHandler: deleteTaskHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext

export const useTaskContext = () => useContext(AuthContext)
