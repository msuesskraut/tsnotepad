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

  const threeTimesFour = hast.binop("*", hast.num(3), hast.num(4));

  it("should print binop", () => {
    expect(print(threeTimesFour)).toEqual("Times(3, 4)");
  });
});
