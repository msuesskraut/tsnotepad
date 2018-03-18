import { Token, TokenKind, TokenLocation } from "./tokenizer";
import { ASTNode, Number, UnOp, BinOp } from "./ast";

export class ParserError {
  constructor(
    public readonly location: TokenLocation,
    public readonly message: string
  ) {}
}

export class Parser {
  private current: number;

  constructor(private readonly tokens: Array<Token>) {
    this.current = 0;
  }

  private peek(): Token {
    return this.tokens[this.current];
  }

  private previous(): Token {
    return this.tokens[this.current - 1];
  }

  private isAtEnd(): boolean {
    return this.peek().kind === TokenKind.EOF;
  }

  private advance(): Token {
    if (!this.isAtEnd()) {
      ++this.current;
    }
    return this.previous();
  }

  private check(tk: TokenKind): boolean {
    if (this.isAtEnd()) {
      return false;
    } else {
      return this.peek().kind === tk;
    }
  }

  private match(tks: Array<TokenKind>) {
    for (const tk of tks) {
      if (this.check(tk)) {
        this.advance();
        return true;
      }
    }
    return false;
  }

  private consume(tk: TokenKind, msg: string) {
    if (this.check(tk)) {
      return this.advance();
    }

    throw new ParserError(this.peek().location, msg);
  }

  private parseTerminal(): ASTNode {
    if (this.match([TokenKind.Number])) {
      return new Number(this.previous());
    }

    if (this.match([TokenKind.ParensOpen])) {
      const expr = this.parseExpr();
      this.consume(TokenKind.ParensClose, "Expect ')' after expression");
      return expr;
    }

    const tok = this.peek();
    throw new ParserError(
      tok.location,
      `Unexpected token ${TokenKind[tok.kind]} '${tok.text}'`
    );
  }

  private parseUnary(): ASTNode {
    if (this.match([TokenKind.Minus])) {
      const op = this.previous();
      let right = this.parseUnary();
      return new UnOp(op, right);
    }

    return this.parseTerminal();
  }

  private parseMul(): ASTNode {
    let expr = this.parseUnary();

    while (this.match([TokenKind.Times, TokenKind.Divide, TokenKind.Rem])) {
      const op = this.previous();
      const right = this.parseUnary();

      expr = new BinOp(op, expr, right);
    }

    return expr;
  }

  private parseAdd(): ASTNode {
    let expr = this.parseMul();

    while (this.match([TokenKind.Plus, TokenKind.Minus])) {
      const op = this.previous();
      const right = this.parseMul();

      expr = new BinOp(op, expr, right);
    }

    return expr;
  }

  private parseExpr(): ASTNode {
    return this.parseAdd();
  }

  parse(): ASTNode {
    return this.parseExpr();
  }
}
