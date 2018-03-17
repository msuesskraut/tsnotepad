import {
  TokenLocation,
  TokenError,
  TokenKind,
  Token,
  Tokenizer
} from "../../src/tokenizer";

describe("TokenLocation", function() {
  const loc = new TokenLocation(42);
  it("Should be constructed from a number", function() {
    expect(loc.offset).toEqual(42);
  });
  it("Should have a string representation with the offset", function() {
    expect(`${loc}`).toEqual("offset: 42");
  });
});

describe("TokenError", function() {
  const err = new TokenError("myError", new TokenLocation(19));
  const msg = err.GetFullErrorMessage();

  it("Full message should contain the error location", function() {
    expect(msg).toContain("19");
  });
  it("Full message should contain the error message", function() {
    expect(msg).toContain("myError");
  });
});

describe("Token", function() {
  const tok = new Token(TokenKind.Number, "13", 13, new TokenLocation(45));

  it("should be constructed correctly", function() {
    expect(tok.kind).toEqual(TokenKind.Number);
    expect(tok.text).toEqual("13");
    expect(tok.value).toEqual(13);
    expect(tok.location.offset).toEqual(45);
  });

  it("Should have a string represenation with all member", function() {
    const s = `${tok}`;
    expect(s).toEqual("Number; text: 13; value: 13 at offset: 45");
  });
});

describe("Tokenizer", function() {
  it("Should throw when calling NextToken on a finished Tokenizer", function() {
    let t = new Tokenizer("");
    expect(t.GetNextToken).toThrow();
  });

  it("should parse operator +", function() {
    let t = new Tokenizer("+");
    const tok = t.GetNextToken();
    expect(tok).toEqual(
      new Token(TokenKind.Operator, "+", "+", new TokenLocation(0))
    );
  });

  it("should parse all operators", function() {
    ["-", "*", "/"].forEach(op => {
      let t = new Tokenizer(op);
      const tok = t.GetNextToken();
      expect(tok).toEqual(
        new Token(TokenKind.Operator, op, op, new TokenLocation(0))
      );
    });
  });

  it("should parse an single digit integer", function() {
    const tok = new Tokenizer("3").GetNextToken();
    expect(tok).toEqual(
      new Token(TokenKind.Number, "3", 3, new TokenLocation(0))
    );
  });

  it("should parse an multi digit integers", function() {
    const tok = new Tokenizer("143").GetNextToken();
    expect(tok).toEqual(
      new Token(TokenKind.Number, "143", 143, new TokenLocation(0))
    );
  });

  it("should parse multiple tokens", function() {
    let t = new Tokenizer("12+34");
    let toks: Array<Token> = [];
    let isFinished = false;
    while (!isFinished) {
      const tok = t.GetNextToken();
      isFinished = tok.kind == TokenKind.EOF;
      toks.push(tok);
    }
    expect(toks).toEqual([
      new Token(TokenKind.Number, "12", 12, new TokenLocation(0)),
      new Token(TokenKind.Operator, "+", "+", new TokenLocation(2)),
      new Token(TokenKind.Number, "34", 34, new TokenLocation(3)),
      new Token(TokenKind.EOF, "", "", new TokenLocation(5))
    ]);
  });

  it("Should parse whitespace", () => {
    let t = new Tokenizer("   ", false);
    const tok = t.GetNextToken();
    expect(tok).toEqual(
      new Token(TokenKind.Whitespace, "   ", "   ", new TokenLocation(0))
    );
  });

  it("should parse EOF", () => {
    let t = new Tokenizer("");
    const tok = t.GetNextToken();
    expect(tok).toEqual(new Token(TokenKind.EOF, "", "", new TokenLocation(0)));
  });

  it("should parse EOF with whitespace", () => {
    let t = new Tokenizer(" \n  ");
    const tok = t.GetNextToken();
    expect(tok).toEqual(new Token(TokenKind.EOF, "", "", new TokenLocation(4)));
  });

  it("should skip whitespace before a token", function() {
    let t = new Tokenizer("  234   ");
    const tok = t.GetNextToken();
    expect(tok).toEqual(
      new Token(TokenKind.Number, "234", 234, new TokenLocation(2))
    );
  });

  it("should parse (", () => {
    let t = new Tokenizer("(");
    const tok = t.GetNextToken();
    expect(tok.kind).toEqual(TokenKind.ParensOpen);
  });

  it("should parse )", () => {
    let t = new Tokenizer(")");
    const tok = t.GetNextToken();
    expect(tok.kind).toEqual(TokenKind.ParensClose);
  });
});
