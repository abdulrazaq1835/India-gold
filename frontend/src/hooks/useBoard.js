import { useState } from "react"
import { useLocalStorage } from "./useLocalStorage.js"        
import {CreateTask} from "../utils/lib.js"          
import { COLUMN_ORDER } from "../constant/server.js"        

const initialBoard = {
  todo: [],
  in_progress: [],
  done: [],
}

export const useBoard = () => {
  const [board, setBoard] = useLocalStorage("boardData", initialBoard)
  const [history, setHistory] = useState([])

  const saveHistory = (currentBoard) => {
    setHistory((prev) => [...prev, currentBoard])
  }

  const addTask = (columnId, taskData) => {       
    saveHistory(board)
    const newTask = CreateTask(taskData)          
    setBoard((prev) => ({
      ...prev,
      [columnId]: [...prev[columnId], newTask],
    }))
  }

  const editTask = (columnId, taskId, updatedData) => {
    saveHistory(board)
    setBoard((prev) => ({
      ...prev,
      [columnId]: prev[columnId].map((task) =>
        task.id === taskId ? { ...task, ...updatedData } : task
      ),
    }))
  }

  const deleteTask = (columnId, taskId) => {
    saveHistory(board)
    setBoard((prev) => ({
      ...prev,
      [columnId]: prev[columnId].filter((task) => task.id !== taskId),
    }))
  }

  const moveTask = (source, destination) => {
    saveHistory(board)
    const sourceCol = [...board[source.droppableId]]
    const destCol =
      source.droppableId === destination.droppableId
        ? sourceCol
        : [...board[destination.droppableId]]
    const [movedTask] = sourceCol.splice(source.index, 1)
    destCol.splice(destination.index, 0, movedTask)
    setBoard((prev) => ({
      ...prev,
      [source.droppableId]: sourceCol,
      [destination.droppableId]: destCol,
    }))
  }

  const undo = () => {
    if (history.length === 0) return
    const previousBoard = history[history.length - 1]
    setHistory((prev) => prev.slice(0, -1))
    setBoard(previousBoard)
  }

  return {
    board,
    addTask,
    editTask,
    deleteTask,
    moveTask,
    undo,
    canUndo: history.length > 0,
    columnOrder: COLUMN_ORDER,
  }
}                                                