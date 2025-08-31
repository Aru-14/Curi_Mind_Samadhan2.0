import { useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");


  const addTodo = () => {
    if (!input.trim()) return; // prevent empty todos
    setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
    setInput("");
  };

 
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };


  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">To-Do List</h1>

        <div className="flex mb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
            placeholder="Add a task..."
            className="flex-grow border rounded-l px-3 py-2 focus:outline-none"
          />
          <button
            onClick={addTodo}
            className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
          >
            Add
          </button>
        </div>

      
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between bg-gray-100 p-2 rounded"
            >
              <span
                className={`flex-grow ${
                  todo.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {todo.text}
              </span>

              {/* Complete button */}
              <button
                onClick={() => toggleTodo(todo.id)}
                className={`px-2 py-1 rounded mr-2 text-white ${
                  todo.completed
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-gray-400 hover:bg-gray-500"
                }`}
              >
                {todo.completed ? "Done" : "Complete"}
              </button>

                <button
                onClick={() => deleteTodo(todo.id)}
                className="bg-red-600 p-1 rounded-sm text-white hover:text-yellow-300 "
              >
                Delete task
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
