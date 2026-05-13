import { FiFilter } from "react-icons/fi"
import { PRIORITIES } from "../constant/server"

export default function Filters({ filters, onChange, assignees }) {

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6 w-full">

      <div className="flex items-center gap-2">
        <FiFilter size={16} className="text-gray-400" />
        <span className="text-sm font-medium text-gray-500 sm:hidden">Filters</span>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <select
          value={filters.priority}
          onChange={(e) => onChange({ ...filters, priority: e.target.value })}
          className="w-full sm:w-auto border border-gray-200 rounded-lg px-3 py-2 sm:py-1.5 text-sm outline-none focus:border-blue-400 text-gray-600 bg-white"
        >
          <option value="All">All Priorities</option>
          {PRIORITIES.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>

        <select
          value={filters.assignee}
          onChange={(e) => onChange({ ...filters, assignee: e.target.value })}
          className="w-full sm:w-auto border border-gray-200 rounded-lg px-3 py-2 sm:py-1.5 text-sm outline-none focus:border-blue-400 text-gray-600 bg-white"
        >
          <option value="All">All Assignees</option>
          {assignees.map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>

        {(filters.priority !== "All" || filters.assignee !== "All") && (
          <button
            onClick={() => onChange({ priority: "All", assignee: "All" })}
            className="w-full sm:w-auto text-xs bg-red-100 text-red-600 px-3 py-2 sm:py-1.5 rounded-lg hover:bg-red-200 transition-colors font-medium flex items-center justify-center"
          >
            Reset
          </button>
        )}
      </div>

    </div>
  )
}