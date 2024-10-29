import { NextRequest,NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma =new PrismaClient()

export  async function POST(req:NextRequest) {
      try {
        const body=await req.json();
        console.log(body)
         const task =await prisma.task.create({data:body})

        return NextResponse.json(task,{status:201});
      } catch (error) {
        console.error('Error creating task:', error); // Log the full error for debugging
        return NextResponse.json({ error: "Error creating task",}, { status: 500 });
      }
}

export  async function GET(){
  try {
    //  const body=await req.json();
    //  console.log(body);
     const task=await prisma.task.findMany();
     return NextResponse.json(task)
  } catch (error) {
    console.log(error)
  }
}


  
