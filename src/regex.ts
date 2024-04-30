import RegexTranslator from "regex-translator";

export type RegexFlavor =
  | "basic"
  | "extended"
  | "pcre"
  | "vim"
  | "ecma"
  | "re2";

export const createRegExp = (
  pattern: string,
  flavor: RegexFlavor,
): {
  regexp: RegExp;
  isInvalid: boolean;
} => {
  try {
    const mediaryString = RegexTranslator.getMediaryStringFromRegexString(
      pattern,
      flavor,
    );
    const regexString = RegexTranslator.getRegexStringFromMediaryString(
      mediaryString,
      "ecma",
    );
    return { regexp: new RegExp(regexString, "gm"), isInvalid: false };
  } catch (_error) {
    return { regexp: new RegExp(""), isInvalid: true };
  }
};
