import { NextRequest,NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma =new PrismaClient()

interface Params{
  id:number;
}


export  async function POST(req:NextRequest) {
      try {
        const body=await req.json();
        console.log(body)
         const task =await prisma.task.create({data:body})

        return NextResponse.json(task,{status:201});
      } catch (error) {
        console.error('Error creating task:', error); // Log the full error for debugging
        return NextResponse.json({ error: "Error creating task"}, { status: 500 });
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

export async function DELETE(req:NextRequest, context:any) {
  console.log(context.params.id);
   try {
      
     await prisma.task.delete({where:{id:Number(context.params.id)}});
     return NextResponse.json({ message: "Task deleted successfully" }, { status: 200 });
   } catch (error) {
       return NextResponse.json({error:"error while delete"})
   }
}
  
export async function PATCH(req:NextResponse,context:any) {
   try {
    const   taskId=Number(context.params.id);
    console.log(taskId);
    const body=await req.json();
    console.log(body)
    const updatedTask=await prisma.task.update({
     where:{id:taskId},
      data:body
    })
      return NextResponse.json(updatedTask)
   } catch (error) {
      console.log(error)
   }
}
