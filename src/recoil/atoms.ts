import { atom } from "recoil";
import { FetchStatus, Image } from "../hooks/useImageFetch";

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

export const fetchStatusState = atom<FetchStatus>({
  key: "fetchStatusState",
  default: "idle",
});

export const errorState = atom<string | null>({
  key: "errorState",
  default: null,
});
