"use client"

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Task } from "./types";
// components/TaskForm.tsx
import { useEffect, useState } from 'react';
import RecurrenceOptions from "../reccurence/page";
import DatePickerField from "../datepicker/page";
import axios from "axios";
import useTaskStore from "@/store/task";
import toast from "react-hot-toast";


interface TaskFormProps {
  task: Task | null;
  onSubmit: (updateTask: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSubmit }) => {
  // const { addTask } = useTaskStore();
  const { addTask, updateTask } = useTaskStore()

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [recurrence, setRecurrence] = useState<Task>({
    id: 0,
    title: '',
    frequency: '',
    interval: 1,
    dayOfWeek: [],
    dayOfMonth: 1,
    startDate: null,
    endDate: null,
  });

  useEffect(() => {
    if (task) {
      setTitle(task.title),
        setDescription(task.description || '');
      setRecurrence({
        ...recurrence,
        title: task.title,
        startDate: task.startDate,
        endDate: task.endDate
      })
    }
  }, [task])


  const [errors, setErrors] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: ''
  })


  // validation fuction

  const validate = () => {
    const newErrors = { title: '', description: '', startDate: '', endDate: '' };

    if (!title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!description.trim()) {
      newErrors.description = "Description is required"
    }
    if (!recurrence.startDate) {
      newErrors.startDate = "Start date is required";
    }
    if (!recurrence.endDate) {
      newErrors.endDate = "End date is required";
    }
    else if (recurrence.startDate && recurrence.endDate && recurrence.endDate < recurrence.startDate) {
      newErrors.endDate = "End  date  cannot ne before start date"
    }

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error);
  }



  const handleSubmit = async () => {

    if (!validate()) {
      return
    }



    const newTask = {
      title,
      description,
      recurringPattern: recurrence,
      startDate: recurrence.startDate,
      endDate: recurrence.endDate
    };

    console.log(newTask)

    if (task?.id) {
      try {
        const response = await axios.patch(`/api/task/${task?.id}`, newTask);
        updateTask(task?.id, response.data)
        onSubmit(response.data);
        console.log(response);
        toast.success("Task update successfull");
      } catch (error) {
        toast.success("Errro while Upating");
      }
    } else {


      try {
        const res = await axios.post("/api/task", newTask)
        addTask(res.data)
        setTitle('');
        setDescription('');
        toast.success("Task successfull Add");
      } catch (error) {
        toast.success(error);
      }
    }
  };

  return (
    <div className="p-4 border rounded-md">
      <div className="w-[50%] m-auto flex flex-col gap-5 border rounded-lg p-4">
        <div className="flex gap-5">
          <h1>Title</h1>
          <div className="border">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task Title"
              className="border"
              required
            />
            <div> {errors.title && <p className="text-red-500 text-sm mb-2">{errors.title}</p>}</div>
          </div>
        </div>
        <div className="flex gap-5">
          <p>Description</p>
          <div className="">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Task Description"
              className="p-2 border"
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.description}</p>}
          </div>

        </div>
        {/* Recurrence Options */}

        <RecurrenceOptions recurrence={recurrence} setRecurrence={setRecurrence} />


        {/* start Date */}
        <div className="flex gap-3 ">
          <h1>Start Date</h1>
          <div>
            <DatePickerField selectedDate={recurrence.startDate ?? null}
              onChange={(date: any) => setRecurrence((prev) => ({ ...prev, startDate: date }))}

              placeholderText="select date" />
            {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate}</p>}
          </div>
        </div>
        {/* End Date */}
        <div className="flex gap-3">
          <h1>End Date</h1>
          <div>
            <DatePickerField selectedDate={recurrence.endDate ?? null}
              onChange={(date: any) => setRecurrence((prev) => ({ ...prev, endDate: date }))}

              placeholderText="select date" />
            {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate}</p>}
          </div>
        </div>
        <button onClick={handleSubmit} className="mt-2 p-2 bg-blue-500 text-white">
          {task ? "update" : "Add Task"}
        </button>
      </div>
    </div>
  );
};

export default TaskForm;
