import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";
import { COLUMN_LABELS } from "../constant/server";

export default function Column({ columnId, tasks, onEdit, onDelete }) {
  return (
    <div className="bg-gray-50 rounded-2xl p-4 sm:p-5 w-full md:w-80 lg:w-96 flex flex-col shrink-0 border border-gray-300">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-gray-700">
          {COLUMN_LABELS[columnId]}
        </h2>
        <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
          {tasks.length}
        </span>
      </div>

      <Droppable droppableId={columnId}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`
              flex-1 min-h-20 rounded-xl transition-colors
              ${snapshot.isDraggingOver ? "bg-blue-50" : ""}
            `}
          >
            {tasks.length > 0 ? (
              tasks.map((task, index) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  index={index}
                  columnId={columnId}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))
            ) : (
              <div className="flex items-center justify-center h-20">
                <p className="text-xs text-gray-300">No tasks here</p>
              </div>
            )}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
