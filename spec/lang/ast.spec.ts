import * as ast from "../../src/lang/ast";
import * as tok from "../helpers/token";

describe("ast.Vistor", () => {
  class DummyVisitor extends ast.Visitor<void> {
    visitNumber(n: ast.Number) {}
    visitUnOp(op: ast.UnOp) {}
    visitBinOp(op: ast.BinOp) {}
  }

  const num1 = new ast.Number(tok.num(23));
  const num2 = new ast.Number(tok.num(12));
  const num3 = new ast.Number(tok.num(34));

  it("should visit numbers", () => {
    let v = new DummyVisitor();
    spyOn(v, "visitNumber");
    num1.accept(v);
    expect(v.visitNumber).toHaveBeenCalledWith(num1);
  });

  it("should visit unary ops", () => {
    const op = new ast.UnOp(tok.tok(tok.TokenKind.Minus, "-"), num2);
    let v = new DummyVisitor();
    spyOn(v, "visitUnOp");
    op.accept(v);
    expect(v.visitUnOp).toHaveBeenCalledWith(op);
  });

  it("should visit binary ops", () => {
    const op = new ast.BinOp(tok.tok(tok.TokenKind.Times, "*"), num2, num3);
    let v = new DummyVisitor();
    spyOn(v, "visitBinOp");
    op.accept(v);
    expect(v.visitBinOp).toHaveBeenCalledWith(op);
  });
});
