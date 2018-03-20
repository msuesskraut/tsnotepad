import { evaluate } from "../../src/lang/repl";

describe("evaluate", () => {
  it("should return the result on success", () => {
    const res = evaluate("2+3");
    expect(res.isError).toBeFalsy();
    expect(res.text).toEqual(["res = 5"]);
  });

  it("should return the error on error", () => {
    const res = evaluate("2+");
    expect(res.isError).toBeTruthy();
    expect(res.text.length).toEqual(1);
    expect(res.text[0]).toMatch(/.*Unexpected.*EOF.*/);
  });
});
