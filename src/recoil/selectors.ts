import { selector } from "recoil";
import { currentDateState, loginState } from "./atoms";

export const currentMonthSelector = selector<string>({
  key: "currentMonthSelector",
  get: ({ get }) => {
    const currentDate = get(currentDateState);
    return currentDate.toLocaleString("default", { month: "long" });
  },
});

export const isLoggedInState = selector({
  key: "isLoggedInState",
  get: ({ get }) => {
    const { id } = get(loginState);
    return id !== null;
  },
});
