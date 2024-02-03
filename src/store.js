import { atomFamily, selectorFamily } from "recoil";
import { TODOS } from "./todos";
import axios from "axios";

//defining a atom family
export const todo = atomFamily({
  key: "todo",
  default: (userId) => {
    return TODOS.find((x) => x.id === userId);
  },
});

export const getTodoAsync = atomFamily({
  key: "getTodoAsync",
  default: selectorFamily({
    key: "selector",
    get:
      (id) =>
      async ({ get }) => {
        await new Promise((r) => setTimeout(r, 5000));

        const res = await axios.get(
          `https://sum-server.100xdevs.com/todo?id=${id}`
        );
        return res.data.todo;
      },
  }),
});
