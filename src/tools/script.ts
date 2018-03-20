import { runScript } from "../lang/script";

const fn = process.argv[2];

if (fn) {
  console.log(`Execute ${fn}`);
  runScript(fn, (res: Array<string>) => {
    for (const line of res) {
      console.log(line);
    }
  });
}
