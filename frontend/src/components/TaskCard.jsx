import { Draggable } from "@hello-pangea/dnd";
import { PRIORITY_COLORS } from "../constant/server";
import { FiEdit2, FiTrash2, FiUser } from "react-icons/fi";

export default function TaskCard({ task, index, columnId, onEdit, onDelete }) {
  const priorityColor = PRIORITY_COLORS[task.priority];

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`
            bg-white border border-gray-200 rounded-xl p-3 mb-2
            cursor-grab active:cursor-grabbing
            ${snapshot.isDragging ? "shadow-lg rotate-1 border-blue-300" : ""}
          `}
        >
          <p className="text-sm font-medium text-gray-800 mb-2 break-words">{task.title}</p>

          <div className="flex items-center justify-between mb-2 gap-2">
            <span
              className={`
              text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap shrink-0
              ${priorityColor.bg} ${priorityColor.text}
            `}
            >
              {task.priority}
            </span>

            {(task.assignee || task.asignee) && (
              <span className="text-xs text-gray-400 flex items-center gap-1 overflow-hidden">
                <FiUser size={11} className="shrink-0" />
                <span className="truncate">{task.assignee || task.asignee}</span>
              </span>
            )}
          </div>

          <div className="flex justify-end gap-2 mt-1">
            <button
              onClick={() => onEdit(task, columnId)}
              className="text-blue-400 hover:text-blue-600 transition-colors"
            >
              <FiEdit2 size={14} />
            </button>

            <button
              onClick={() => onDelete(columnId, task.id)}
              className="text-red-400 hover:text-red-600 transition-colors"
            >
              <FiTrash2 size={14} />
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
}
