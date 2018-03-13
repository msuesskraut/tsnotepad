import {
  TokenLocation,
  TokenError,
  TokenKind,
  Token,
  Tokenizer
} from "../../src/tokenizer";

describe("TokenLocation", function() {
  let loc = new TokenLocation(42);
  it("Should be constructed from a number", function() {
    expect(loc.offset).toEqual(42);
  });
  it("Should have a string representation with the offset", function() {
    expect(`${loc}`).toEqual("offset: 42");
  });
});

describe("TokenError", function() {
  let err = new TokenError("myError", new TokenLocation(19));
  let msg = err.GetFullErrorMessage();

  it("Full message should contain the error location", function() {
    expect(msg).toContain("19");
  });
  it("Full message should contain the error message", function() {
    expect(msg).toContain("myError");
  });
});

describe("Token", function() {
  let tok = new Token(TokenKind.Number, "13", 13, new TokenLocation(45));

  it("should be constructed correctly", function() {
    expect(tok.kind).toEqual(TokenKind.Number);
    expect(tok.text).toEqual("13");
    expect(tok.value).toEqual(13);
    expect(tok.location.offset).toEqual(45);
  });

  it("Should have a string represenation with all member", function() {
    let s = `${tok}`;
    expect(s).toEqual("Number; text: 13; value: 13 at offset: 45");
  });
});

describe("Tokenizer", function() {
  it("Should return IsFinished for empty string", function() {
    let t = new Tokenizer("");
    expect(t.IsFinished()).toBeTruthy();
  });

  it("Should throw when calling NextToken on a finished Tokenizer", function() {
    let t = new Tokenizer("");
    expect(t.NextToken).toThrow();
  });

  it("should parse operator +", function() {
    let t = new Tokenizer("+");
    let tok = t.NextToken();
    expect(tok).toEqual(
      new Token(TokenKind.Operator, "+", "+", new TokenLocation(0))
    );
  });

  it("should parse all operators", function() {
    ["-", "*", "/"].forEach(op => {
      let t = new Tokenizer(op);
      let tok = t.NextToken();
      expect(tok).toEqual(
        new Token(TokenKind.Operator, op, op, new TokenLocation(0))
      );
    });
  });

  it("should parse an single digit integer", function() {
    let tok = new Tokenizer("3").NextToken();
    expect(tok).toEqual(
      new Token(TokenKind.Number, "3", 3, new TokenLocation(0))
    );
  });

  it("should parse an multi digit integers", function() {
    let tok = new Tokenizer("143").NextToken();
    expect(tok).toEqual(
      new Token(TokenKind.Number, "143", 143, new TokenLocation(0))
    );
  });
});
