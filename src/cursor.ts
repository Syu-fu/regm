import { ansi } from "cliffy/ansi/ansi.ts";
import { unicodeWidth } from "std/cli/unicode_width.ts";
import * as prompt from "./prompt.ts";

export const left = (cursorPosition: number) => {
  return ansi.cursorTo(cursorPosition - 1, 1).bytes();
};

export const right = (cursorPosition: number) => {
  return ansi.cursorTo(cursorPosition + 1, 1).bytes();
};

export const start = () => {
  return ansi.cursorTo(unicodeWidth(prompt.promptString) + 1, 1).bytes();
};

export const end = (searchQuery: string) => {
  return ansi
    .cursorTo(
      unicodeWidth(searchQuery) + unicodeWidth(prompt.promptString) + 1,
      1,
    )
    .bytes();
};

export const keep = (cursorPosition: number) => {
  return ansi.cursorTo(cursorPosition, 1).bytes();
};

export const clear = () => {
  return ansi.eraseScreen.cursorTo(0, 0).bytes();
};
