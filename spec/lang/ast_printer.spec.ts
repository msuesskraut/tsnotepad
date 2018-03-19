import { print } from "../../src/lang/ast_printer";
import * as ast from "../helpers/ast";

describe("print", () => {
  it("should print numbers", () => {
    expect(print(ast.num(23))).toEqual("23");
  });

  it("should print upop", () => {
    const minus12 = ast.unop("-", ast.num(12));
    expect(print(minus12)).toEqual("Minus(12)");
  });

  it("should print binop +", () => {
    const threePlusFour = ast.binop("+", ast.num(3), ast.num(4));
    expect(print(threePlusFour)).toEqual("Plus(3, 4)");
  });

  it("should print binop -", () => {
    const threeMinusFour = ast.binop("-", ast.num(3), ast.num(4));
    expect(print(threeMinusFour)).toEqual("Minus(3, 4)");
  });

  it("should print binop *", () => {
    const threeTimesFour = ast.binop("*", ast.num(3), ast.num(4));
    expect(print(threeTimesFour)).toEqual("Times(3, 4)");
  });

  it("should print binop /", () => {
    const threeByFour = ast.binop("/", ast.num(3), ast.num(4));
    expect(print(threeByFour)).toEqual("Divide(3, 4)");
  });

  it("should print binop %", () => {
    const threeModuloFour = ast.binop("%", ast.num(3), ast.num(4));
    expect(print(threeModuloFour)).toEqual("Rem(3, 4)");
  });

  it("should print nesting correctly", () => {
    const fourMinusMinusFive = ast.binop(
      "-",
      ast.num(4),
      ast.unop("-", ast.num(5))
    );
    expect(print(fourMinusMinusFive)).toEqual("Minus(4, Minus(5))");
  });
});
