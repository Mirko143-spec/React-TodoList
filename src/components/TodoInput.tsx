import { useState } from "react";

interface TodoInputProps {
  onAddTodo: (text: string) => void;
}

function TodoInput({ onAddTodo }: TodoInputProps) {
  const [text, setText] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (text.trim()) {
      onAddTodo(text);
      setText("");
    }
  }
  return (
    <>
      <form
        className="flex-col flex items-center justify-center w-lg h-56 mt-4 bg-gray-100 rounded-2xl"
        onSubmit={handleSubmit}
      >
        <h1 className="my-8 text-4xl">TodoApp</h1>
        <div className="flex flex-row items-center">
          <input
            type="text"
            placeholder="Todos..."
            className="border my-4 p-2 w-64 rounded-2xl outline-none"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            className="ml-2 w-16 border rounded-2xl p-2 cursor-pointer hover:bg-gray-300 transition duration-300 ease-in-out"
            type="submit"
          >
            OK
          </button>
        </div>
      </form>
    </>
  );
}

export default TodoInput;
