import { tokenize, TokenError } from "./tokenizer";
import { Parser, ParserError } from "./parser";
import { interpret } from "./interpreter";

interface Result {
  readonly isError: boolean;
  readonly text: Array<string>;
}

class ErrorResult implements Result {
  readonly isError: boolean;
  readonly text: Array<string>;
  constructor(message: string) {
    this.isError = true;
    this.text = [message];
  }
}

class SuccessResult implements Result {
  readonly isError: boolean;
  constructor(public readonly text: Array<string>) {
    this.isError = false;
  }
}

export function evaluate(command: string): Result {
  try {
    const toks = tokenize(command);
    let p = new Parser(toks);
    const ast = p.parse();
    return new SuccessResult([`res = ${interpret(ast)}`]);
  } catch (te) {
    console.log(te);
    console.log(typeof te);
    return new ErrorResult(te.toString());
  }
}
