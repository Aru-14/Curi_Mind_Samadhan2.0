import { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchTodos = () => {
    fetch("http://localhost:5000/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim()) return;

    if (editId) {
      fetch(`http://localhost:5000/todos/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task }),
      })
        .then(() => {
          fetchTodos();
          setTask("");
          setEditId(null);
        });
    } else {
      fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task }),
      }).then(() => {
        fetchTodos();
        setTask("");
      });
    }
  };

  const deleteTodo = (id) => {
    fetch(`http://localhost:5000/todos/${id}`, { method: "DELETE" }).then(() =>
      fetchTodos()
    );
  };

  const editTodo = (todo) => {
    setEditId(todo.id);
    setTask(todo.task);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-4">To-Do App</h1>

        <form onSubmit={handleSubmit} className="flex mb-4">
          <input
            type="text"
            placeholder="Enter a task..."
            className="flex-grow border rounded-l px-3 py-2 focus:outline-none"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-r">
            {editId ? "Update" : "Add"}
          </button>
        </form>

        <ul>
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded mb-2 shadow-sm"
            >
              <span>{todo.task}</span>
              <div className="space-x-2">
                <button
                  onClick={() => editTodo(todo)}
                  className="bg-yellow-400 px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
