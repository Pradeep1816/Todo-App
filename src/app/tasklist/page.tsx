"use client"

import useTaskStore from "@/store/task";
import { useEffect, useState } from "react";
import TaskItem from "../taslitem/page";
import axios from "axios";
import TaskForm from "../taskform/page";


export default function TaskList() {

  const [selectedTask, setSelectedTask] = useState(null)
  const { tasks, fetchTasks, updateTask, deleteTask } = useTaskStore()

  useEffect(() => {
    fetchTasks()
  }, [])

  // console.log(tasks)
  const handleUpdate = (task: any) => {
    setSelectedTask(task)
  }

  console.log()
  const handleDelete = async (id: any) => {

    if (confirm("Are you sure you want to delete this task?")) {
      const response = await axios.delete(`/api/task/${id}`)
      await deleteTask(id);
      console.log(response.data.message)
      fetchTasks()
    }
  }

  const handleFormSubmit = () => {
    fetchTasks();
    setSelectedTask(null)
  }

  return (
    <>
      <div>
        {
          tasks.map(task =>
            < TaskItem key={task.id} task={task} onUpdate={handleUpdate} onDelete={handleDelete} />
          )}
      </div>
      {selectedTask && <TaskForm task={selectedTask} onSubmit={handleFormSubmit} />}
    </>
  );
}