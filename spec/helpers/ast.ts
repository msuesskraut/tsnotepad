import * as ast from "../../src/lang/ast";
import * as tok from "./token";

export function num(n: number): ast.Number {
  return new ast.Number(tok.num(n));
}

const unop_string2tk = new Map<string, tok.TokenKind>([
  ["-", tok.TokenKind.Minus]
]);

export function unop(s: string, v: ast.Node): ast.UnOp {
  return new ast.UnOp(tok.tok(unop_string2tk.get(s) as tok.TokenKind, s), v);
}

const binop_string2tk = new Map<string, tok.TokenKind>([
  ["+", tok.TokenKind.Plus],
  ["-", tok.TokenKind.Minus],
  ["*", tok.TokenKind.Times],
  ["/", tok.TokenKind.Divide],
  ["%", tok.TokenKind.Rem]
]);

export function binop(s: string, l: ast.Node, r: ast.Node): ast.BinOp {
  return new ast.BinOp(
    tok.tok(binop_string2tk.get(s) as tok.TokenKind, s),
    l,
    r
  );
}
