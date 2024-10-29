import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <h1 className="text-2xl font-semibold text-center">Add To-Do List</h1>
      <Link href="/tasklist"> <h1 className="flex justify-end">Show Task</h1></Link>
    </header>
  );
};


