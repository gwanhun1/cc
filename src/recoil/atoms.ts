import { atom } from "recoil";

export type CurrentDate = Date;

export const currentDateState = atom<CurrentDate>({
  key: "currentDateState",
  default: new Date(),
});
