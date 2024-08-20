import { atom } from "recoil";

export type CurrentDate = Date;

export const currentDateState = atom<CurrentDate>({
  key: "currentDateState",
  default: new Date(),
});

export const loginState = atom({
  key: "loginState",
  default: { id: "", password: "", name: "" },
});
