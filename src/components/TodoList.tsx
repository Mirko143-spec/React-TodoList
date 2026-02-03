import { useState } from "react";
import type { Todo } from "../App";

interface TodoListProps {
  todos: Todo[];
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

function TodoList({ todos, onDelete, onToggle, onEdit }: TodoListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  function startEdit(todo: Todo) {
    setEditingId(todo.id);
    setEditText(todo.text);
  }

  function saveEdit() {
    if (editText.trim() && editingId) {
      onEdit(editingId, editText);
      setEditingId(null);
      setEditText("");
    }
  }

  function cancelEdit() {
    setEditingId(null);
    setEditText("");
  }

  return (
    <ul>
      {todos.map((todo) => (
        <li
          key={todo.id}
          className={`my-4 w-lg h-20 flex items-center rounded-2xl p-4 overflow-x-scroll justify-between ${todo.completed ? "bg-gray-400" : "bg-gray-100"}`}
        >
          {editingId === todo.id ? (
            <div className="flex gap-4">
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="flex-1 p-2 border rounded-lg outline-none"
                autoFocus
              />
              <button
                onClick={saveEdit}
                className="border p-2 rounded-lg cursor-pointer hover:bg-gray-300"
              >
                Save
              </button>
              <button
                onClick={cancelEdit}
                className="border p-2 rounded-lg cursor-pointer hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          ) : (
            <>
              <p className={`${todo.completed ? "line-through" : ""} flex-1`}>
                {todo.text}
              </p>
              <div className="gap-4 flex">
                <button
                  onClick={() => startEdit(todo)}
                  className="cursor-pointer border p-2 rounded-2xl w-fit hover:bg-gray-300 transition duration-300 ease-in-out"
                >
                  Edit
                </button>
                <button
                  onClick={() => onToggle(todo.id)}
                  className="cursor-pointer border p-2 rounded-2xl w-fit hover:bg-gray-300 transition duration-300 ease-in-out"
                >
                  {todo.completed ? "Undo" : "Check"}
                </button>
                <button
                  onClick={() => onDelete(todo.id)}
                  className="cursor-pointer border p-2 rounded-2xl w-fit hover:bg-gray-300 transition duration-300 ease-in-out"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
