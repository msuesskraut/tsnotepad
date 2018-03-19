import { Token, TokenKind, TokenLocation } from "../../src/lang/tokenizer";

export { TokenKind } from "../../src/lang/tokenizer";

export function tok(tk: TokenKind, val: any): Token {
  return new Token(tk, `${val}`, val, new TokenLocation(0));
}

export function num(v: number): Token {
  return tok(TokenKind.Number, v);
}

export const EOF = tok(TokenKind.EOF, "");
