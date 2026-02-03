import { useState } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  // creates new todo
  function addTodo(text: string) {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
    };

    setTodos([...todos, newTodo]);
  }

  // removes todo
  function deleteTodo(id: string) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  // marks complete/incomplete
  function toggleTodo(id: string) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }

  // updates todo text
  function editTodo(id: string, newText: string) {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo)),
    );
  }
  return (
    <div className="w-screen h-screen flex flex-col justify-start items-center bg-gray-700">
      <TodoInput onAddTodo={addTodo} />
      <TodoList
        todos={todos}
        onDelete={deleteTodo}
        onToggle={toggleTodo}
        onEdit={editTodo}
      />
    </div>
  );
}

export default App;
