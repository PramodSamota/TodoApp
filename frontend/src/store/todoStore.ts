import {create} from "zustand";
import axiosInstance from "@/utils/axios";


interface todo{
    title:string,
    completed:boolean
}
interface todoStore {
    todo:todo,
    todos:todo[],
    getAllTodo:()=>void,
    deleteTodo:(id:string)=>void  
    createTodo:(data:todo) =>void  
}
export const useTodoStore = create<todoStore>((set) => ({
    todos : [] , 
    todo:{
        title:"",
        completed:false
    },

    getAllTodo: async () => {
        try {
            const response = await axiosInstance.get("/todo/all-todo");
            console.log("todos",response.data.todos)
            set({ todos: response.data.todos });
            return {success:true}
        } catch (error) {
            console.error("Failed to fetch todos", error);
            return {success:false}
        }
    },

    createTodo: async(data) =>{
          try {            
            const res = await axiosInstance.post("/todo/create-todo",data);
            console.log(res.data.todoItem);
            return {success:true}
          } catch (error) {
            console.log(error);
            return {success:false}
          }
    },

    deleteTodo: async(id:string) =>{
        try {
            const res = await axiosInstance.delete(`/todo/delete-todo/${id}`)
            console.log(res);
            return {success:true}
        } catch (error) {
             console.error("Failed to fetch todos", error);
            return {success:false}
        }
    }
}))