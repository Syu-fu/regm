import { getCursorPosition } from "cliffy/ansi/cursor_position.ts";
import { unicodeWidth } from "std/cli/unicode_width.ts";
import { keypress } from "cliffy/keypress/mod.ts";

import * as prompt from "./prompt.ts";
import * as cursor from "./cursor.ts";
import * as regex from "./regex.ts";

const highlightMatches = (item: string, reg: RegExp): string => {
  return item.replace(reg, (m) => prompt.matchColor(m));
};

const addSpaceToEndOfString = (str: string, mod = 0): string => {
  const space = " ";
  const spaceCount = Deno.consoleSize().columns - unicodeWidth(str) - mod;
  return str + space.repeat(spaceCount);
};

const handleInput = async (
  items: string,
  searchQuery: string,
  flavor: regex.RegexFlavor,
): Promise<string | undefined> => {
  let updatedSearchQuery = searchQuery;

  for await (const event of keypress()) {
    const cursorPosition = getCursorPosition({ writer: Deno.stderr }).x;
    const inputCursorPosition = cursorPosition -
      unicodeWidth(prompt.promptString) - 1;

    if (event.ctrlKey) {
      switch (event.key) {
        // deno-lint-ignore no-fallthrough
        case "c":
          Deno.exit();
        case "b":
          if (inputCursorPosition > 0) {
            Deno.stderr.write(cursor.left(cursorPosition));
          }
          break;
        case "f":
          if (inputCursorPosition < updatedSearchQuery.length) {
            Deno.stderr.write(cursor.right(cursorPosition));
          }
          break;
        case "a":
          Deno.stderr.write(cursor.start());
          break;
        case "e":
          Deno.stderr.write(cursor.end(searchQuery));
          break;
        case "k":
          updatedSearchQuery = updatedSearchQuery.slice(
            inputCursorPosition,
            updatedSearchQuery.length,
          );
          render(items, updatedSearchQuery, flavor);
          break;
        case "u":
          updatedSearchQuery = "";
          render(items, updatedSearchQuery, flavor);
          Deno.stderr.write(cursor.start());
          break;
      }
    } else {
      switch (event.key) {
        case "return":
          Deno.stdout.write(new TextEncoder().encode(updatedSearchQuery));
          Deno.stderr.write(cursor.clear());
          return updatedSearchQuery;
        case "escape":
          updatedSearchQuery = "";
          render(items, updatedSearchQuery, flavor);
          Deno.stderr.write(cursor.start());
          break;
        case "left":
          if (inputCursorPosition > 0) {
            Deno.stderr.write(cursor.left(cursorPosition));
          }
          break;
        case "right":
          if (inputCursorPosition < updatedSearchQuery.length) {
            Deno.stderr.write(cursor.right(cursorPosition));
          }
          break;
        case "delete":
          if (inputCursorPosition < updatedSearchQuery.length) {
            updatedSearchQuery =
              updatedSearchQuery.slice(0, inputCursorPosition) +
              updatedSearchQuery.slice(inputCursorPosition + 1);
            render(items, updatedSearchQuery, flavor);
            Deno.stderr.write(cursor.keep(cursorPosition));
          }
          break;
        case "backspace":
          if (
            inputCursorPosition <= 0 ||
            inputCursorPosition > updatedSearchQuery.length
          ) {
            break;
          }
          updatedSearchQuery =
            updatedSearchQuery.slice(0, inputCursorPosition - 1) +
            updatedSearchQuery.slice(inputCursorPosition);
          render(items, updatedSearchQuery, flavor);
          if (
            cursorPosition >
              unicodeWidth(prompt.promptString) +
                unicodeWidth(updatedSearchQuery) +
                1
          ) {
            Deno.stderr.write(cursor.end(updatedSearchQuery));
          } else {
            Deno.stderr.write(cursor.left(cursorPosition));
          }
          break;
        default:
          if (event.char === undefined) {
            break;
          }
          updatedSearchQuery =
            updatedSearchQuery.slice(0, inputCursorPosition) +
            event.char +
            updatedSearchQuery.slice(inputCursorPosition);
          render(items, updatedSearchQuery, flavor);
          Deno.stderr.write(cursor.right(cursorPosition));
          break;
      }
    }
  }
};

const render = (
  items: string,
  searchQuery: string,
  flavor: regex.RegexFlavor,
): void => {
  Deno.stderr.write(cursor.start());
  Deno.stderr.write(
    new TextEncoder().encode(
      addSpaceToEndOfString(searchQuery, prompt.promptString.length),
    ),
  );
  Deno.stderr.write(new TextEncoder().encode("\n"));
  const { regexp, isInvalid } = regex.createRegExp(searchQuery, flavor);
  isInvalid
    ? Deno.stderr.write(
      new TextEncoder().encode(prompt.errorColor("Invalid pattern")),
    )
    : Deno.stderr.write(new TextEncoder().encode(addSpaceToEndOfString("")));
  Deno.stderr.write(new TextEncoder().encode("\n"));
  const lines = highlightMatches(items, regexp);
  Deno.stderr.write(new TextEncoder().encode(lines));
  Deno.stderr.write(new TextEncoder().encode("\n"));
};

export const run = async (
  initialItems: string,
  flavor: regex.RegexFlavor,
): Promise<void> => {
  const items = initialItems;
  const searchQuery = "";
  Deno.stderr.write(cursor.clear());
  Deno.stderr.write(
    new TextEncoder().encode(prompt.promptColor(prompt.promptString)),
  );
  render(items, searchQuery, flavor);
  Deno.stderr.write(cursor.start());
  await handleInput(items, searchQuery, flavor);
};
