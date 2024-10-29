
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


interface DatePickerProps {
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
  placeholderText: string;
}





export default function DatePickerField({ selectedDate, onChange, placeholderText }: DatePickerProps) {
  return (


    <DatePicker
      selected={selectedDate}
      onChange={onChange}
      placeholderText={placeholderText} className="border outline-none" />


  );
}
