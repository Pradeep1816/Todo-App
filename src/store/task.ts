import axios, { Axios } from "axios";
import {create} from "zustand"


interface Task{
  id: number;
  title: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  recurrenceType?: string;
  recurrenceInterval?: number;
  recurrenceDays?: string;
  frequency?: string;
  interval?: number;
  dayOfWeek?: string[];
  dayOfMonth?: number;
}



interface TaskStore{
  tasks:Task[];
  fetchTasks:()=>Promise<void>
  addTask:(task:Task)=>Promise<void>;
  updateTask:(taskId:number,updateTask:Task)=>Promise<void>;
  deleteTask:(taskId:number)=>Promise<void>;
}

const  useTaskStore=create<TaskStore>((set)=>({
   tasks:[],
   fetchTasks:async()=>{
       const response=await axios.get("/api/task");
       set({tasks:response.data})
   },
  
   addTask: async(data)=>{
      set((state)=>({tasks:[...state.tasks,data]}));
   },

   updateTask:async(taskId,updatedTask)=>{
    set((state)=>({
      tasks: state.tasks.map(task=> task.id===taskId ? {...task, updatedTask}: task)
    }))
   },

   deleteTask:async(taskId)=>{
      set((state)=> ({tasks:state.tasks.filter(task=>task.id!== taskId)})); 
   
   }


}));


export default useTaskStore;