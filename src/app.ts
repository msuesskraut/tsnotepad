import { Tokenizer, Token, TokenKind } from "./tokenizer";

export function evaluate(command: string) {
  let t = new Tokenizer(command);
  let toks = [];
  do {
    toks.push(t.GetNextToken());
  } while (toks[toks.length - 1].kind != TokenKind.EOF);
  return toks.map(tok => {
    return tok.toString();
  });
}
