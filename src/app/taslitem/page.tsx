import { Task } from "../taskform/types";

interface taskItemProps {
  task: Task;
  onUpdate: (task: Task) => void;
  onDelete: (taskId: number | Task) => void;
}

const TaskItem: React.FC<taskItemProps> = ({ task, onUpdate, onDelete }) => {
  console.log(task)
  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-4 bg-white border border-gray-300 rounded-lg shadow-md mb-4">
      <div className="flex flex-col gap-2 w-full md:w-2/3">
        <h2 className="text-lg font-semibold text-gray-800">{task.title}</h2>
        <p className="text-gray-600">{task.description}</p>
        <div className="flex flex-col md:flex-row gap-4 text-sm text-gray-500 mt-2">
          <div>
            <span>DayOfWeek:</span>
            <p>{task.dayOfWeek}</p>
          </div>
          <div>
            <span>Reccurence: </span>
            <p>{task.frequency}</p>
          </div>
          <div>
            <span className="font-medium">Start Date:</span> {task.startDate ? new Date(task.startDate).toLocaleDateString() : "N/A"}
          </div>
          <div>
            <span className="font-medium">End Date:</span> {task.endDate ? new Date(task.endDate).toLocaleDateString() : "N/A"}
          </div>

        </div>
      </div>
      <div className="flex gap-3 mt-4 md:mt-0">
        <button
          onClick={() => onUpdate(task)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
        >
          Update
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-200"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem