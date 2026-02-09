// import axios from "axios";
// import { useEffect, useState } from "react";
// import { TodoContext } from "./Context/TodoContext";
import StyledToDo from "./StyledToDo";

const App = () => {
  // const [todos, setTodos] = useState([]);
  // const [inputValue, setInputValue] = useState("");
  // async function getTodos() {
  //   const response = await axios.get("http://localhost:3000/todos");
  //   // console.log(response.data)
  //   // console.log(response.data.todos)
  //   setTodos(response.data.todos);
  // }

  // useEffect(() => {
  //   // eslint-disable-next-line react-hooks/set-state-in-effect
  //   getTodos();
  // }, []);

  return (
    <div>
      <StyledToDo/>
  {/* //     <TodoContext.Provider value={{ todos, setTodos }}>
  //       <h1 className="text-3xl font-bold underline">ToDo App</h1>
  //       <form>
  //         <input
  //           type="text"
  //           value={inputValue}
  //           placeholder="Enter a todo"
  //           onChange={(e) => setInputValue(e.target.value)}
  //         />
  //         <button
  //           onClick={async () => {
  //             await axios.post("http://localhost:3000/todo", {
  //               text: inputValue,
  //             });
  //             getTodos();
  //           }}
  //         >
  //           Add
  //         </button>
  //       </form>

  //       {todos.map((singleTodo) => (
  //         <>
  //           <li key={singleTodo._id}>{singleTodo.text}</li>
  //           <button
  //             onClick={async () => {
  //               await axios.put(
  //                 `http://localhost:3000/todos/${singleTodo._id}`
  //               );
  //               getTodos();
  //             }}
  //           >
  //             {singleTodo.completed ? "✅" : "update"}
  //           </button>
  //           <button
  //             onClick={async () => {
  //               await axios.delete(
  //                 `http://localhost:3000/todos/${singleTodo._id}`
  //               );
  //               getTodos();
  //             }}
  //           >
  //             Delete
  //           </button>
  //         </>
  //       ))}
  //     </TodoContext.Provider> */}
    </div>
  );
};

export default App;
