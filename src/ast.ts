import { Token } from "./tokenizer";

export abstract class ASTNode {
  constructor(public readonly token: Token) {}
}

/// a terminal
export class Number extends ASTNode {
  readonly value: number;
  constructor(token: Token) {
    super(token);
    this.value = token.value as number;
  }
}

export class UnOp extends ASTNode {
  readonly op: string;
  constructor(token: Token, public readonly expr: ASTNode) {
    super(token);
    this.op = token.value as string;
  }
}

export class BinOp extends ASTNode {
  readonly op: string;
  constructor(
    token: Token,
    public readonly left: ASTNode,
    public readonly right: ASTNode
  ) {
    super(token);
    this.op = token.value as string;
  }
}
