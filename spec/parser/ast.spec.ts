import * as ast from "../../src/ast";
import { TokenKind, TokenLocation, Token } from "../../src/tokenizer";

describe("ast.Vistor", () => {
  class DummyVisitor extends ast.Visitor<void> {
    visitNumber(n: ast.Number) {}
    visitUnOp(op: ast.UnOp) {}
    visitBinOp(op: ast.BinOp) {}
  }

  function tok(tk: TokenKind, val: any): Token {
    return new Token(tk, `${val}`, val, new TokenLocation(0));
  }

  function numTok(v: number): Token {
    return tok(TokenKind.Number, v);
  }

  const num1 = new ast.Number(numTok(23));
  const num2 = new ast.Number(numTok(12));
  const num3 = new ast.Number(numTok(34));

  it("should visit numbers", () => {
    let v = new DummyVisitor();
    spyOn(v, "visitNumber");
    num1.accept(v);
    expect(v.visitNumber).toHaveBeenCalledWith(num1);
  });

  it("should visit unary ops", () => {
    const op = new ast.UnOp(tok(TokenKind.Minus, "-"), num2);
    let v = new DummyVisitor();
    spyOn(v, "visitUnOp");
    op.accept(v);
    expect(v.visitUnOp).toHaveBeenCalledWith(op);
  });

  it("should visit binary ops", () => {
    const op = new ast.BinOp(tok(TokenKind.Times, "*"), num2, num3);
    let v = new DummyVisitor();
    spyOn(v, "visitBinOp");
    op.accept(v);
    expect(v.visitBinOp).toHaveBeenCalledWith(op);
  });
});
