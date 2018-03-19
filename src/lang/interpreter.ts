import * as ast from "./ast";
import { TokenKind } from "./tokenizer";

class InterpreterError {
  constructor(public readonly msg: string) {}

  toString(): string {
    return this.msg;
  }
}

class Interpreter extends ast.Visitor<number> {
  visitNumber(n: ast.Number): number {
    return n.value;
  }

  visitUnOp(op: ast.UnOp): number {
    const v = op.expr.accept(this);
    switch (op.op) {
      case TokenKind.Minus:
        return -v;

      default:
        throw new InterpreterError(
          `Unsupported unary operation ${TokenKind[op.op]}`
        );
    }
  }

  visitBinOp(op: ast.BinOp): number {
    const left = op.left.accept(this);
    const right = op.right.accept(this);
    switch (op.op) {
      case TokenKind.Plus:
        return left + right;

      case TokenKind.Minus:
        return left - right;

      case TokenKind.Times:
        return left * right;

      case TokenKind.Divide:
        if (0 == right) {
          throw new InterpreterError("Division by zero.");
        }
        return left / right;

      case TokenKind.Rem:
        if (0 == right) {
          throw new InterpreterError("Division by zero.");
        }
        return left % right;

      default:
        throw new InterpreterError(
          `Unsupported binary operation ${TokenKind[op.op]}`
        );
    }
  }
}

export function interpret(expr: ast.Node): number {
  const interp = new Interpreter();
  return expr.accept(interp);
}
