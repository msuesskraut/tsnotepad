import { evaluate } from "./repl";
import { createInterface } from "readline";
import { createReadStream } from "fs";

export function runScript(fn: string, cb: (res: Array<string>) => void) {
  var lineReader = createInterface({
    input: createReadStream(fn)
  });

  let res: Array<string> = [];
  lineReader
    .on("line", function(line: string) {
      const lineRes = evaluate(line);
      res.push(...lineRes.text);
      if (lineRes.isError) {
        lineReader.close();
      }
    })
    .on("close", () => {
      cb(res);
    });
}
