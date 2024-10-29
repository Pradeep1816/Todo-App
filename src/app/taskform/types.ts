export interface Task {
  id: number;
  title: string;
  description?: string;
  startDate?: Date | null;
  endDate?: Date | null;
  recurrenceType?: string;
  recurrenceInterval?: number;
  recurrenceDays?: string;
  frequency?: string;         
  interval?: number;
  dayOfWeek?: string[];
  dayOfMonth?: number;
}

// export interface Task{
//   id: number;
//   title: string;
//   description: string;
//   startDate: string | null;
//   endDate: string | null;
//   recurringPattern: {
//     frequency?: string;
//     interval: number;
//     dayOfWeek: string[];
//   };
//   dayOfMonth: number
// }