import { useState, useEffect } from "react"
import { PRIORITIES } from "../constant/server"
import { FiX } from "react-icons/fi"

export default function TaskModal({ isOpen, onClose, onSave, editTask }) {

  const [title, setTitle] = useState("")
  const [priority, setPriority] = useState("Medium")
  const [assignee, setAssignee] = useState("")

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title)
      setPriority(editTask.priority)
      setAssignee(editTask.assignee || editTask.asignee || "")
    } else {
      setTitle("")
      setPriority("Medium")
      setAssignee("")
    }
  }, [editTask, isOpen])

  const handleSave = () => {
    if (!title.trim()) return
    onSave({
      title: title.trim(),
      priority,
      assignee: assignee.trim(),
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-xl p-8 animate-fade-in shadow-2xl">

        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-medium text-gray-800">
            {editTask ? "Edit Task" : "Create Task"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <FiX size={20} />
          </button>
        </div>

        <div className="flex flex-col gap-4">

          <div>
            <label className="text-sm text-gray-600 mb-1 block">
              Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400 transition-colors"
            />
            {!title.trim() && (
              <p className="text-red-400 text-xs mt-1">Title is required</p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-1 block">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400"
            >
              {PRIORITIES.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-1 block">Assignee</label>
            <input
              type="text"
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
              placeholder="Enter assignee name"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400 transition-colors"
            />
          </div>

        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!title.trim()}
            className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {editTask ? "Update" : "Create"}
          </button>
        </div>

      </div>
    </div>
  )
}