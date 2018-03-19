import { Parser, ParserError } from "../../src/lang/parser";
import * as ast from "../../src/lang/ast";
import * as tok from "../helpers/token";

describe("Parser", () => {
  const tnum1 = tok.num(12);
  const anum1 = new ast.Number(tnum1);

  it("should parse numbers", () => {
    let p = new Parser([tnum1, tok.EOF]);
    expect(p.parseFully()).toEqual(anum1);
  });

  const minus = tok.tok(tok.TokenKind.Minus, "-");

  it("should parse unops", () => {
    let p = new Parser([minus, tnum1, tok.EOF]);
    expect(p.parseFully()).toEqual(new ast.UnOp(minus, anum1));
  });

  const tnum2 = tok.num(32);
  const anum2 = new ast.Number(tnum2);

  it("should parse binops", () => {
    let p = new Parser([tnum2, minus, tnum1, tok.EOF]);
    expect(p.parseFully()).toEqual(new ast.BinOp(minus, anum2, anum1));
  });

  it("should parse an unop nested in a binop", () => {
    let p = new Parser([tnum2, minus, minus, tnum1, tok.EOF]);
    expect(p.parseFully()).toEqual(
      new ast.BinOp(minus, anum2, new ast.UnOp(minus, anum1))
    );
  });

  const times = tok.tok(tok.TokenKind.Times, "*");
  const tnum3 = tok.num(34);
  const anum3 = new ast.Number(tnum3);

  it("should respect operator preference in a - b * c", () => {
    // a - b * c
    let p = new Parser([tnum2, minus, tnum1, times, tnum3, tok.EOF]);
    expect(p.parseFully()).toEqual(
      new ast.BinOp(minus, anum2, new ast.BinOp(times, anum1, anum3))
    );
  });

  it("should respect operator preference in a * b - c", () => {
    // a * b - c
    let p = new Parser([tnum2, times, tnum1, minus, tnum3, tok.EOF]);
    expect(p.parseFully()).toEqual(
      new ast.BinOp(minus, new ast.BinOp(times, anum2, anum1), anum3)
    );
  });
});
