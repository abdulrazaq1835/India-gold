import { useState } from "react"
import { DragDropContext } from "@hello-pangea/dnd"
import { useBoard } from "../hooks/useBoard"
import { applyFilters } from "../utils/lib.js"
import Column from "./Column"
import Filters from "./Filter.jsx"
import TaskModal from "./TaskModal"
import { FiPlus, FiRotateCcw } from "react-icons/fi"
import logo from '../../public/logo.jpg'

export default function Board() {

  const {
    board,
    addTask,
    editTask,
    deleteTask,
    moveTask,
    undo,
    canUndo,
    columnOrder,
  } = useBoard()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [activeColumn, setActiveColumn] = useState("todo")
  const [filters, setFilters] = useState({ priority: "All", assignee: "All" })

  const assignees = [
    ...new Set(
      Object.values(board)
        .flat()
        .map((task) => task.assignee)
        .filter(Boolean)
    ),
  ]

  const handleDragEnd = (result) => {
    const { source, destination } = result
    if (!destination) return
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) return
    moveTask(source, destination)
  }

  const handleCreateClick = (columnId) => {
    setEditingTask(null)
    setActiveColumn(columnId)
    setIsModalOpen(true)
  }

  const handleEdit = (task, columnId) => {
    setEditingTask(task)
    setActiveColumn(columnId)
    setIsModalOpen(true)
  }

  const handleSave = (taskData) => {
    if (editingTask) {
      editTask(activeColumn, editingTask.id, taskData)
    } else {
      addTask(activeColumn, taskData)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 gap-4">

        <div className="flex flex-row items-center gap-4">
          <img src={logo} className="h-20 rounded-xl" />
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold text-black">
              Task <span className="text-blue-700">Management</span>
            </h1>
            <p className="text-sm text-gray-400">
              Handles creating, editing, and deleting tasks with full undo support.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={undo}
            disabled={!canUndo}
            className="flex items-center gap-1.5 text-sm bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            <FiRotateCcw size={15} />
            Undo
          </button>

          <button
            onClick={() => handleCreateClick("todo")}
            className="flex items-center gap-1.5 text-sm bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            <FiPlus size={16} />
            Create Task
          </button>
        </div>

      </div>

   

      <Filters
        filters={filters}
        onChange={setFilters}
        assignees={assignees}
      />

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex flex-col md:flex-row gap-6 overflow-x-auto pb-4">
          {columnOrder.map((columnId) => (
            <Column
              key={columnId}
              columnId={columnId}
              tasks={applyFilters(board[columnId], filters)}
              onEdit={handleEdit}
              onDelete={deleteTask}
              onAddTask={() => handleCreateClick(columnId)}
            />
          ))}
        </div>
      </DragDropContext>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        editTask={editingTask}
      />

         <div className="mb-6">
        <h2 className="text-base font-medium text-gray-700">Drag & Drop</h2>
        <p className="text-sm text-gray-800">
          Powered by @hello-pangea/dnd — move tasks across columns or reorder within the same column.
        </p>
      </div>

    </div>
  )
}