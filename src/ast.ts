import { Token, TokenKind } from "./tokenizer";

export abstract class Visitor<T> {
  abstract visitNumber(n: Number): T;
  abstract visitUnOp(op: UnOp): T;
  abstract visitBinOp(op: BinOp): T;
}

export abstract class Node {
  constructor(public readonly token: Token) {}

  abstract accept<T>(v: Visitor<T>): T;
}

/// a terminal
export class Number extends Node {
  readonly value: number;
  constructor(token: Token) {
    super(token);
    this.value = token.value as number;
  }

  accept<T>(v: Visitor<T>): T {
    return v.visitNumber(this);
  }
}

export class UnOp extends Node {
  readonly op: TokenKind;
  constructor(token: Token, public readonly expr: Node) {
    super(token);
    this.op = token.kind;
  }

  accept<T>(v: Visitor<T>): T {
    return v.visitUnOp(this);
  }
}

export class BinOp extends Node {
  readonly op: TokenKind;
  constructor(
    token: Token,
    public readonly left: Node,
    public readonly right: Node
  ) {
    super(token);
    this.op = token.kind;
  }

  accept<T>(v: Visitor<T>): T {
    return v.visitBinOp(this);
  }
}
