

export const generateId = ()=>{
    return `task-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;
};
// console.log(generateId);

export const CreateTask = ({ title, priority = "Medium", assignee = "" }) => {
    return {
        id: generateId(),
        title,
        priority,
        assignee,
        createdAt:new Date().toISOString() ,
    };
};

export const filterByPriority  = (tasks, priority)=>{

    if(!priority || priority==="All") return tasks
    return tasks.filter((task) => task.priority === priority)

}

export const filterByAssignee = (tasks, assignee) => {
  if (!assignee || assignee === "All") return tasks
  return tasks.filter((task) => {
    const taskAssignee = task.assignee || task.asignee || ""
    return taskAssignee.toLowerCase().includes(assignee.toLowerCase())
  })
}

export const applyFilters = (tasks, { priority, assignee }) => {
  let result = tasks
  result = filterByPriority(result, priority)   
  result = filterByAssignee(result, assignee)   
  return result
}