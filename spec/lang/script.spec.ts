import { runScript } from "../../src/lang/script";
import * as tmp from "tmp";
import * as fs from "fs";

describe("runScript", () => {
  it("should evaluate file line-by-line", () => {
    let f = tmp.fileSync();
    fs.writeSync(f.fd, "2+3\n17-3*2\n8");
    fs.closeSync(f.fd);

    const res = runScript(f.name, res => {
      expect(res).toEqual(["res = 5", "res = 11", "res = 8"]);
    });

    f.removeCallback();
  });

  it("should stop at error", () => {
    let f = tmp.fileSync();
    fs.writeSync(f.fd, "2+3\n17-3*\n8");
    fs.closeSync(f.fd);

    const res = runScript(f.name, res => {
      expect(res.length).toEqual(2);
      expect(res[0]).toEqual("res = 5");
      expect(res[1]).toMatch(/.*Unexpected.*EOF.*/);
    });

    f.removeCallback();
  });
});
