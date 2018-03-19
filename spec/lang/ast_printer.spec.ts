import { print } from "../../src/lang/ast_printer";
import * as hast from "../helpers/ast";

describe("print", () => {
  it("should print numbers", () => {
    expect(print(hast.num(23))).toEqual("23");
  });

  const minus12 = hast.unop("-", hast.num(12));

  it("should print upop", () => {
    expect(print(minus12)).toEqual("Minus(12)");
  });

  const threePlusFour = hast.binop("+", hast.num(3), hast.num(4));

  it("should print binop +", () => {
    expect(print(threePlusFour)).toEqual("Plus(3, 4)");
  });

  const threeMinusFour = hast.binop("-", hast.num(3), hast.num(4));

  it("should print binop -", () => {
    expect(print(threeMinusFour)).toEqual("Minus(3, 4)");
  });

  const threeTimesFour = hast.binop("*", hast.num(3), hast.num(4));

  it("should print binop *", () => {
    expect(print(threeTimesFour)).toEqual("Times(3, 4)");
  });

  const threeByFour = hast.binop("/", hast.num(3), hast.num(4));

  it("should print binop /", () => {
    expect(print(threeByFour)).toEqual("Divide(3, 4)");
  });

  const threeModuloFour = hast.binop("%", hast.num(3), hast.num(4));

  it("should print binop %", () => {
    expect(print(threeModuloFour)).toEqual("Rem(3, 4)");
  });
});
