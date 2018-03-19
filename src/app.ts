import { tokenize } from "./tokenizer";
import { Parser } from "./parser";
import { print } from "./ast_printer";

export function evaluate(command: string): Array<string> {
  const toks = tokenize(command);
  let p = new Parser(toks);
  const ast = p.parse();
  return [print(ast)];
}
