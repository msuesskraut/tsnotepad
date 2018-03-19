import { TokenKind } from "./tokenizer";
import * as ast from "./ast";

class Printer extends ast.Visitor<string> {
  visitNumber(n: ast.Number): string {
    return `${n.value}`;
  }

  visitUnOp(op: ast.UnOp): string {
    const arg = op.expr.accept(this);
    return `${TokenKind[op.token.kind]}(${arg})`;
  }

  visitBinOp(op: ast.BinOp): string {
    const left_arg = op.left.accept(this);
    const right_arg = op.right.accept(this);
    return `${TokenKind[op.token.kind]}(${left_arg}, ${right_arg})`;
  }
}
