import axios from "axios";
import { useEffect, useState } from "react";
import { TodoContext } from "./Context/TodoContext";

const StyledToDo = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  async function getTodos() {
    const response = await axios.get("http://localhost:3000/todos");
    setTodos(response.data.todos);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getTodos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <TodoContext.Provider value={{ todos, setTodos }}>
        {/* Header */}
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
            ToDo App
          </h1>

          {/* Add Todo Form */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <form className="flex gap-3">
              <input
                type="text"
                value={inputValue}
                placeholder="Enter a todo"
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={async () => {
                  await axios.post("http://localhost:3000/todo", {
                    text: inputValue,
                  });
                  setInputValue("");
                  getTodos();
                }}
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Add
              </button>
            </form>
          </div>

          {/* Todo List */}
          <div className="space-y-4">
            {todos.map((singleTodo) => (
              <div
                key={singleTodo._id}
                className="bg-white rounded-lg shadow-md p-5 flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <span
                    className={`text-lg ${
                      singleTodo.completed
                        ? "line-through text-gray-500"
                        : "text-gray-800"
                    }`}
                  >
                    {singleTodo.text}
                  </span>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={async () => {
                      await axios.put(
                        `http://localhost:3000/todos/${singleTodo._id}`
                      );
                      getTodos();
                    }}
                    className={`px-4 py-2 rounded-lg font-medium ${
                      singleTodo.completed
                        ? "bg-green-100 text-green-800 hover:bg-green-200"
                        : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                    } transition-colors duration-200`}
                  >
                    {singleTodo.completed ? "✅ Completed" : "Mark Complete"}
                  </button>
                  <button
                    onClick={async () => {
                      await axios.delete(
                        `http://localhost:3000/todos/${singleTodo._id}`
                      );
                      getTodos();
                    }}
                    className="px-4 py-2 bg-red-100 text-red-800 rounded-lg font-medium hover:bg-red-200 transition-colors duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          {todos.length > 0 && (
            <div className="mt-8 bg-white rounded-lg shadow-md p-5">
              <p className="text-gray-700 text-center">
                Total tasks: <span className="font-bold">{todos.length}</span>
              </p>
            </div>
          )}
        </div>
      </TodoContext.Provider>
    </div>
  );
};

export default StyledToDo;
