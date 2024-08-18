import { selector } from "recoil";
import { currentDateState } from "./atoms";

export const currentMonthSelector = selector<string>({
  key: "currentMonthSelector",
  get: ({ get }) => {
    const currentDate = get(currentDateState);
    return currentDate.toLocaleString("default", { month: "long" });
  },
});
