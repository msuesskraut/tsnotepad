import { Token } from "./tokenizer";

export abstract class ASTVisitor<T> {
  abstract visitNumber(n: Number): T;
  abstract visitUnOp(op: UnOp): T;
  abstract visitBinOp(op: BinOp): T;
}

export abstract class ASTNode {
  constructor(public readonly token: Token) {}

  abstract accept<T>(v: ASTVisitor<T>): T;
}

/// a terminal
export class Number extends ASTNode {
  readonly value: number;
  constructor(token: Token) {
    super(token);
    this.value = token.value as number;
  }

  accept<T>(v: ASTVisitor<T>): T {
    return v.visitNumber(this);
  }
}

export class UnOp extends ASTNode {
  readonly op: string;
  constructor(token: Token, public readonly expr: ASTNode) {
    super(token);
    this.op = token.value as string;
  }

  accept<T>(v: ASTVisitor<T>): T {
    return v.visitUnOp(this);
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

  accept<T>(v: ASTVisitor<T>): T {
    return v.visitBinOp(this);
  }
}
