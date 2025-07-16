import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useTodoStore } from "@/store/todoStore";

const HomePage = () => {
  const [todoName, setTodoName] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const { todos, createTodo, deleteTodo, getAllTodo } = useTodoStore();

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!todoName.trim()) {
      alert("Please enter a todo name.");
      return;
    }

    setIsAdding(true);
    try {
      const newTodo = {
        title: todoName,
        completed: false,
      };
      const res = await createTodo(newTodo);
      if (res.success) {
        setTodoName("");
        await getAllTodo(); // Refresh the list after adding
      }
    } finally {
      setIsAdding(false);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteTodo(id);
    await getAllTodo(); // Refresh the list after deleting
  };

  useEffect(() => {
    getAllTodo();
  }, [getAllTodo]); // Removed deleteTodo from dependencies

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todo App</h1>

      <form onSubmit={handleAddTodo} className="flex gap-2 mb-6">
        <Input
          id="name"
          type="text"
          value={todoName}
          onChange={(e) => setTodoName(e.target.value)}
          placeholder="Add a new todo..."
          className="flex-1"
          disabled={isAdding}
        />
        <Button type="submit" disabled={isAdding}>
          {isAdding ? "Adding..." : "Add"}
        </Button>
      </form>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold mb-2">Your Todos</h2>
        {todos.length === 0 ? (
          <p className="text-gray-500">No todos yet. Add one above!</p>
        ) : (
          todos.map((todo) => (
            <div
              key={todo._id}
              className="flex items-center justify-between p-3 border rounded-lg mt-[10px]"
            >
              <div className="flex items-center space-x-10">
                <Checkbox
                  className="h-[23px] w-[23px] mr-[10px]"
                  id={`todo-${todo._id}`}
                  checked={todo.completed}
                />
                <Label htmlFor={`todo-${todo._id}`}>{todo.title}</Label>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(todo._id)}
              >
                Delete
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export { HomePage };
