import { assertEquals } from "std/assert/assert_equals.ts";
import { createRegExp, RegexFlavor } from "./regex.ts";

Deno.test(
  "createRegExp should create a valid RegExp object with correct pattern and flavor",
  () => {
    const pattern = "^\\d+$";
    const flavor: RegexFlavor = "ecma";
    const { regexp, isInvalid } = createRegExp(pattern, flavor);

    assertEquals(isInvalid, false);
    assertEquals(regexp instanceof RegExp, true);
    assertEquals(regexp.source, "^[0-9]+$");
  },
);

Deno.test(
  "createRegExp should create a valid RegExp object with correct pattern and flavor(basic flavor)",
  () => {
    const pattern = "abc|def";
    const flavor: RegexFlavor = "basic";
    const { regexp, isInvalid } = createRegExp(pattern, flavor);

    assertEquals(isInvalid, false);
    assertEquals(regexp instanceof RegExp, true);
    assertEquals(regexp.source, "abc\\|def");
  },
);

Deno.test(
  "createRegExp should create a valid RegExp object with correct pattern and flavor(extended flavor)",
  () => {
    // escape + sign
    const pattern = "abc|def";
    const flavor: RegexFlavor = "extended";
    const { regexp, isInvalid } = createRegExp(pattern, flavor);

    assertEquals(isInvalid, false);
    assertEquals(regexp instanceof RegExp, true);
    assertEquals(regexp.source, "abc|def");
  },
);

Deno.test("createRegExp should handle invalid regex pattern correctly", () => {
  const pattern = "\\";
  const flavor: RegexFlavor = "ecma";
  const { regexp, isInvalid } = createRegExp(pattern, flavor);

  assertEquals(isInvalid, true);
  assertEquals(regexp, new RegExp(""));
});
