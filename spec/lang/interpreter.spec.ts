import { interpret } from "../../src/lang/interpreter";
import * as ast from "../helpers/ast";

describe("interpret", () => {
  const n1 = 23;
  const ast_n1 = ast.num(n1);

  it("should interpret a number", () => {
    expect(interpret(ast_n1)).toEqual(n1);
  });
});
