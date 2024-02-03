import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { RecoilRoot, useRecoilValue, useRecoilValueLoadable } from "recoil";
import { getTodoAsync, todo } from "./store";

function App() {
  return (
    <>
      <RecoilRoot>
        <DisplayTodo id={1} />
        <DisplayTodoUsingSelectorFamily id={1} />
        <DisplayTodoUsingSelectorFamily id={2} />

      </RecoilRoot>
    </>
  );
}

//Displaying todo info as per their respective ID
function DisplayTodo({ id }) {
  const specificTodo = useRecoilValue(todo(id));
  console.log(specificTodo);
  return (
    <div style={{ border: "2px solid white", marginBottom: "10px" }}>
      <h3>{specificTodo.title}</h3>
      <h4>{specificTodo.description}</h4>
    </div>
  );
}

function DisplayTodoUsingSelectorFamily({ id }) {
  const specificTodo = useRecoilValueLoadable(getTodoAsync(id));
  console.log(specificTodo.state);
  if (specificTodo.state === "loading") {
    return <div>loading...</div>;
  } else if (specificTodo.state === "hasValue") {
    return (
      <div style={{ border: "1px dotted red", marginBottom: "10px" }}>
        <h2>Using Selector Family</h2>
        <h3>{specificTodo.contents.title}</h3>
        <h4>{specificTodo.contents.description}</h4>
      </div>
    );
  } else if (specificTodo.state === "hasError") {
    return <div>Error whiel rendering</div>;
  }
}

export default App;
