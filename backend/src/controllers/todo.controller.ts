import todo from "../model/todo.model";
import { Request, Response } from "express";

export const getTodos = async (req: Request, res: Response) => {
    try {
        const userId= (req as any).user._id;
        const todos = await todo.find({user:userId});

        if(!todos){return res.status(400).json({message:"No todos found"})} 

         console.log("todos",todos);
        res.status(200).json({todos,message:"Todos fetched successfully"});
    } catch (error) {
        console.log("error in getTodos", error);
    }
};

export const createTodo = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user._id;

        const { title } = req.body;
        const todoItem = await todo.create({ title, completed: false , user: userId});    

        if(!todoItem){
            return res.status(400).json({message:"Todo not found"})}    

        res.status(201).json({todoItem,message:"Todo created successfully"});

    } catch (error) {
        console.log("error in createTodo", error);
    }
};   

export const updateTodo = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const {completed} = req.body;
        const todoItem = await todo.findByIdAndUpdate(id,
            {completed},
            {new:true});

        if(!todoItem){
            return res.status(400).json({message:"Todo not found"})} 
        res.status(200).json({todoItem,message:"Todo updated successfully"});
    } catch (error) {
        console.log("error in updateTodo", error);
    }
};

export const deleteTodo = async(req:Request,res:Response) =>{
    try {
        const {id} = req.params;
        const todoItem = await todo.findByIdAndDelete(id);
        if(!todoItem){
            return res.status(400).json({message:"Todo not found"})} 
        res.status(200).json({todoItem,message:"Todo deleted successfully"});
    } catch (error) {
        console.log("error in deleteTodo", error);
    }
}