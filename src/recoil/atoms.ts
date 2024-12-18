import { atom } from "recoil";
import { FetchStatus, Image } from "../hooks/useImagesGet";
import { TodoItemType } from "../hooks/useTodoGet";

export type CurrentDate = Date;

export const currentDateState = atom<CurrentDate>({
  key: "currentDateState",
  default: new Date(),
});

export const loginState = atom({
  key: "loginState",
  default: { id: "", password: "", name: "" },
});

export const imagesState = atom<Image[]>({
  key: "imagesState",
  default: [],
});

export const todosState = atom<TodoItemType[]>({
  key: "todosState",
  default: [],
});

export const fetchStatusState = atom<FetchStatus>({
  key: "fetchStatusState",
  default: "idle",
});

export const errorState = atom<string | null>({
  key: "errorState",
  default: null,
});

export const loadState = atom<boolean>({
  key: "loadState",
  default: false,
});
