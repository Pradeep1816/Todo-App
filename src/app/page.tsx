import React from "react";
import TaskForm from "./taskform/page";
import Header from "./header/page";

export default function Home() {
  return (
    <>
      <Header />
      <div className="">
        <TaskForm />
      </div>
    </>
  );
}
