import { Command, CompletionsCommand } from "cliffy/command/mod.ts";
import * as ui from "./ui.ts";
import { readLines } from "https://deno.land/std@0.101.0/io/mod.ts";

type Options = {
  file: string;
  ecma: boolean;
  basic: boolean;
  extended: boolean;
  pcre: boolean;
  vim: boolean;
  re2: boolean;
};

const execute = async (options: Options) => {
  if (Object.keys(options).length > 2) {
    throw new Error("Only one flavor option can be selected.");
  }

  const flavor = getKeyWithValueOtherThanFile(options);
  const filePath = options.file;
  const file = await Deno.open(filePath);
  const lines = readLines(file);
  const initialItems = [];
  for await (const line of lines) {
    initialItems.push(line);
  }
  file.close();
  ui.run(initialItems.join("\n"), flavor);
};

const getKeyWithValueOtherThanFile = (
  options: Options,
): Exclude<keyof Options, "file"> => {
  for (const key in options) {
    if (key !== "file") {
      return key as Exclude<keyof Options, "file">;
    }
  }
  return "ecma";
};

export const run = async () => {
  try {
    const { options } = await new Command()
      .name("regm")
      .usage("[OPTIONS]")
      .description("Interactive regular expression matcher.")
      .version("0.0.1")
      .option("-f, --file <file:string>", "Read from file.", { required: true })
      .group("Flavor options(choose one, defaults to ECMA flavor)")
      .option("-e, --ecma", "ECMA flavor.")
      .option("-b, --basic", "Basic flavor.(BRE)")
      .option("-x, --extended", "Extended flavor.(ERE)")
      .option("-p, --pcre", "PCRE flavor.")
      .option("-v, --vim", "Vim flavor.")
      .option("-r, --re2", "RE2 flavor.")
      .command("completions", new CompletionsCommand())
      .parse(Deno.args);
    await execute(options as Options);
  } catch (err) {
    console.error(err.message);
    Deno.exit(1);
  }
};
