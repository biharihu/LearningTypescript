import React, {
  useReducer,
  useCallback,
  createContext,
  useContext,
} from "react";

type ActionType =
  | { type: "ADD"; text: string }
  | { type: "REMOVE"; id: number };

interface Todo {
  id: number;
  done: boolean;
  text: string;
}

type UseTodosManagerTypeResult = ReturnType<typeof useTodosManager>;

const TodoContext = createContext<UseTodosManagerTypeResult>({
  todos: [],
  addTodo: () => {},
  removeTodo: () => {},
});

export function useTodosManager(initialtodos: Todo[]): {
  todos: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (id: number) => void;
} {
  const [todos, dispatch] = useReducer((state: Todo[], action: ActionType) => {
    switch (action.type) {
      case "ADD":
        return [
          ...state,
          {
            id: state.length,
            text: action.text,
            done: false,
          },
        ];
      case "REMOVE":
        return state.filter(({ id }) => id !== action.id);
      default:
        throw new Error();
    }
  }, initialtodos);

  const addTodo = useCallback((text: string) => {
    dispatch({ type: "ADD", text });
  }, []);

  const removeTodo = useCallback((id: number) => {
    dispatch({ type: "REMOVE", id });
  }, []);

  return { todos, addTodo, removeTodo };
}

export const TodosProvider: React.FunctionComponent<{
  initialTodos: Todo[];
}> = ({ initialTodos, children }) => (
  <TodoContext.Provider value={useTodosManager(initialTodos)}>
    {children}
  </TodoContext.Provider>
);

export const useTodos = (): Todo[] => {
  const { todos } = useContext(TodoContext);
  return todos;
};

export const useAddTodos = (): UseTodosManagerTypeResult["addTodo"] => {
  const { addTodo } = useContext(TodoContext);
  return addTodo;
};
export const useRemoveTodos = (): UseTodosManagerTypeResult["removeTodo"] => {
  const { removeTodo } = useContext(TodoContext);
  return removeTodo;
};
