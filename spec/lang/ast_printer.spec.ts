import { print } from "../../src/lang/ast_printer";
import * as hast from "../helpers/ast";

describe("print", () => {
  it("should print numbers", () => {
    expect(print(hast.num(23))).toEqual("23");
  });

  it("should print upop", () => {
    const minus12 = hast.unop("-", hast.num(12));
    expect(print(minus12)).toEqual("Minus(12)");
  });

  it("should print binop +", () => {
    const threePlusFour = hast.binop("+", hast.num(3), hast.num(4));
    expect(print(threePlusFour)).toEqual("Plus(3, 4)");
  });

  it("should print binop -", () => {
    const threeMinusFour = hast.binop("-", hast.num(3), hast.num(4));
    expect(print(threeMinusFour)).toEqual("Minus(3, 4)");
  });

  it("should print binop *", () => {
    const threeTimesFour = hast.binop("*", hast.num(3), hast.num(4));
    expect(print(threeTimesFour)).toEqual("Times(3, 4)");
  });

  it("should print binop /", () => {
    const threeByFour = hast.binop("/", hast.num(3), hast.num(4));
    expect(print(threeByFour)).toEqual("Divide(3, 4)");
  });

  it("should print binop %", () => {
    const threeModuloFour = hast.binop("%", hast.num(3), hast.num(4));
    expect(print(threeModuloFour)).toEqual("Rem(3, 4)");
  });

  it("should print nesting correctly", () => {
    const fourMinusMinusFive = hast.binop(
      "-",
      hast.num(4),
      hast.unop("-", hast.num(5))
    );
    expect(print(fourMinusMinusFive)).toEqual("Minus(4, Minus(5))");
  });
});
