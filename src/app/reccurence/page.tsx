// frontend/components/RecurrenceOptions.js
import React, { useState } from 'react';
import { Task } from '../taskform/types';

interface RecurrenceOptionsProps {
  recurrence: Task;
  setRecurrence: React.Dispatch<React.SetStateAction<Task>>;
}



const RecurrenceOptions: React.FC<RecurrenceOptionsProps> = ({ recurrence, setRecurrence }) => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const [selectedDays, setSelectedDays] = useState<String[]>([]);

  const handleFrequencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const frequency = e.target.value;
    setRecurrence((prev: any) => ({ ...prev, frequency }));
  };

  const handleIntervalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const interval = e.target.value;
    setRecurrence((prev: any) => ({ ...prev, interval }));
  };

  const toggleDayOfWeek = (day: string) => {
    const updatedDays = selectedDays.includes(day)
      ? selectedDays.filter((d) => d !== day)
      : [...selectedDays, day];
    setSelectedDays(updatedDays);
    setRecurrence((prev: any) => ({ ...prev, dayOfWeek: updatedDays }));
  };

  const handleDayOfMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dayOfMonth = e.target.value;
    setRecurrence((prev: any) => ({ ...prev, dayOfMonth }));
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label>Frequency</label>
        <select value={recurrence.frequency} onChange={handleFrequencyChange} className="p-2 border">
          <option value="">Select Recurrence</option>
          <option value="DAILY">Daily</option>
          <option value="WEEKLY">Weekly</option>
          <option value="MONTHLY">Monthly</option>
          <option value="YEARLY">Yearly</option>
        </select>
      </div>

      <div>
        <label>Every: </label>
        <input
          type="number"
          min="1"
          value={recurrence.interval}
          onChange={handleIntervalChange}
          placeholder="Interval (e.g., every X days)"
          className="p-2 border"
        />
      </div>

      {recurrence.frequency === 'WEEKLY' && (
        <div>
          <label>Select Days of the Week</label>
          <div className="flex gap-2">
            {daysOfWeek.map((day) => (
              <button
                key={day}
                onClick={() => toggleDayOfWeek(day)}
                className={`p-2 border rounded ${selectedDays.includes(day) ? 'bg-blue-500 text-white' : ''}`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      )}

      {recurrence.frequency === 'MONTHLY' && (
        <div>
          <label>Day of the Month</label>
          <input
            type="number"
            min="1"
            max="31"
            value={recurrence.dayOfMonth}
            onChange={handleDayOfMonthChange}
            className="p-2 border"
          />
        </div>
      )}
    </div>
  );
};


export default RecurrenceOptions;
