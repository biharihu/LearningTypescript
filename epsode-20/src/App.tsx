import React, { useCallback, useRef } from "react";
import {
  useTodos,
  useAddTodos,
  useRemoveTodos,
  TodosProvider,
} from "./useTodos";
import "./App.css";

const Heading = ({ title }: { title: string }) => <h2>{title}</h2>;

const Box: React.FunctionComponent = ({ children }) => (
  <div style={{ padding: "1rem", fontWeight: "bold" }}>{children}</div>
);

const Button: React.FunctionComponent<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > & {
    title?: string;
  }
> = ({ children, style, title, ...rest }) => (
  <button
    {...rest}
    style={{
      ...style,
      background: "red",
      color: "white",
      fontSize: "xx-large",
    }}
  >
    {title ?? children}
  </button>
);

function UL<T>({
  items,
  render,
  itemClick,
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLUListElement>,
  HTMLUListElement
> & {
  items: T[];
  render: (item: T) => React.ReactNode;
  itemClick: (item: T) => void;
}) {
  return (
    <ul>
      {items.map((item, index) => (
        <li onClick={() => itemClick(item)} key={index}>
          {render(item)}
        </li>
      ))}
    </ul>
  );
}

function App() {
  const todos = useTodos();
  const addTodo = useAddTodos();
  const removeTodo = useRemoveTodos();

  const newTodoRef = useRef<HTMLInputElement>(null);

  const onAddTodo = useCallback(() => {
    if (newTodoRef.current) {
      addTodo(newTodoRef.current.value);
      newTodoRef.current.value = "";
    }
  }, [addTodo]);

  return (
    <div>
      <Heading title="Introduction" />
      <Box>Hello there</Box>

      <Heading title="Todos" />
      <UL
        items={todos}
        itemClick={(item) => alert(item.id)}
        render={(todo) => (
          <>
            {todo.text}
            <Button onClick={() => removeTodo(todo.id)}>Remove</Button>
          </>
        )}
      />
      <div>
        <input type="text" ref={newTodoRef} />
        <Button onClick={onAddTodo}>Add Todo</Button>
      </div>
    </div>
  );
}

const JustShowTodos = () => {
  const todos = useTodos();

  return (
    <UL
      items={todos}
      itemClick={() => {}}
      render={(todo) => <>{todo.text}</>}
    />
  );
};

const AppWrapper = () => (
  <TodosProvider
    initialTodos={[{ id: 0, text: "Hey there useContext", done: false }]}
  >
    <div style={{ display: "grid", gridTemplateColumns: "50% 50%" }}>
      <App />
      <JustShowTodos />
    </div>
  </TodosProvider>
);

export default AppWrapper;
