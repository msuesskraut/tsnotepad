export enum TokenKind {
  Whitespace,
  Number,
  ParensOpen,
  ParensClose,
  Plus,
  Minus,
  Times,
  Divide,
  Rem,
  EOF
}

export class TokenLocation {
  constructor(public readonly offset: number) {}

  toString(): string {
    return `offset: ${this.offset}`;
  }
}

export class TokenError {
  constructor(
    public readonly message: string,
    public readonly location: TokenLocation
  ) {}

  GetFullErrorMessage(): string {
    return `Error at ${this.location.offset}: ${this.message}`;
  }
}

export class Token {
  constructor(
    public readonly kind: TokenKind,
    public readonly text: string,
    public readonly value: any,
    public readonly location: TokenLocation
  ) {}

  toString(): string {
    return `${TokenKind[this.kind]}; text: ${this.text}; value: ${
      this.value
    } at ${this.location}`;
  }
}

type TokenParser = (text: string, off: number) => Token | null;
type ConvertValue = (text: string) => any;

function id(x: string): string {
  return x;
}

function RegExParser(
  r: string,
  tk: TokenKind,
  convert: ConvertValue
): TokenParser {
  const regEx = new RegExp("^" + r);
  return function(text: string, off: number): Token | null {
    const m = regEx.exec(text);
    if (m === null) {
      return null;
    } else {
      const t = m[0];
      return new Token(tk, t, convert(t), new TokenLocation(off));
    }
  };
}

function EOFParser(text: string, off: number): Token | null {
  if (0 === text.length) {
    return new Token(TokenKind.EOF, "", "", new TokenLocation(off));
  } else {
    return null;
  }
}
let WhitespaceParser = RegExParser("[ \t\n\r]+", TokenKind.Whitespace, id);
let NumberParser = RegExParser("[0-9]+", TokenKind.Number, parseInt);
let PlusParser = RegExParser("\\+", TokenKind.Plus, id);
let MinusParser = RegExParser("-", TokenKind.Minus, id);
let TimesParser = RegExParser("\\*", TokenKind.Times, id);
let DivideParser = RegExParser("\\/", TokenKind.Divide, id);
let RemParser = RegExParser("%", TokenKind.Rem, id);
let ParensOpenParser = RegExParser("\\(", TokenKind.ParensOpen, id);
let ParensCloseParser = RegExParser("\\)", TokenKind.ParensClose, id);

export class Tokenizer {
  private loc: number;
  static parsers = [
    EOFParser,
    WhitespaceParser,
    NumberParser,
    PlusParser,
    MinusParser,
    TimesParser,
    DivideParser,
    RemParser,
    ParensOpenParser,
    ParensCloseParser
  ];

  constructor(
    private readonly text: string,
    private readonly skipWhitespace: boolean = true
  ) {
    this.loc = 0;
  }

  GetNextToken(): Token {
    let retry = false;
    do {
      retry = false;
      for (let p of Tokenizer.parsers) {
        let t = p(this.text.substr(this.loc), this.loc);
        if (t != null) {
          this.loc += t.text.length;
          if (this.skipWhitespace && TokenKind.Whitespace == t.kind) {
            retry = true;
            break;
          }
          return t;
        }
      }
    } while (retry);

    throw new TokenError(
      `Unknown char ${this.text[this.loc]}`,
      new TokenLocation(this.loc)
    );
  }
}

export function tokenize(s: string, skipWhitespace = true): Array<Token> {
  let t = new Tokenizer(s, skipWhitespace);
  let toks = [];
  do {
    toks.push(t.GetNextToken());
  } while (toks[toks.length - 1].kind != TokenKind.EOF);
  return toks;
}
