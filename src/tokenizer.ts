export enum TokenKind {
    Number,
    Operator
}

export class TokenLocation {
    constructor(public readonly offset : number) { }

    toString(): string {
        return `offset: ${this.offset}`
    }
}

export class TokenError {
    constructor(
        public readonly message: string,
        public readonly location : TokenLocation)
    { }

    GetFullErrorMessage() : string {
        return `Error at ${this.location.offset}: ${this.message}`;
    }
}

export class Token {
    constructor(
        public readonly kind : TokenKind,
        public readonly text : string,
        public readonly value : any,
        public readonly location : TokenLocation)
    { }

    toString() : string {
        return `${TokenKind[this.kind]}; text: ${this.text}; value: ${this.value} at ${this.location}`;
    }
}

export class Tokennizer {
    private text : string;
    private loc : number;

    constructor(txt : string) {
        this.text = txt;
        this.loc = 0;
    }

    private AdvanceChar() : void {
        this.loc += 1;
    }

    private IsOperator(c : string) : boolean {
        return c in ['+', '-', '*', '/'];
    }

    private IsDigit(c : string) : boolean {
        return c >= '0' && c <= '9';
    }

    IsFinished() : boolean {
        return this.loc === this.text.length;
    }

    NextToken() : Token {
        let c = this.text[this.loc];
        if (this.IsOperator(c)) {
            let t = new Token(TokenKind.Operator, c, c, new TokenLocation(this.loc));
            this.AdvanceChar();
            return t;
        }
        else if (this.IsDigit(c)) {
            let l = this.loc;
            let strNum = '';
            while (this.IsDigit(c)) {
                strNum += c;
                this.AdvanceChar();
                c = this.text[this.loc];
            }
            let t = new Token(TokenKind.Number, strNum, parseInt(strNum), new TokenLocation(l));
            return t;
        }
        else {
            throw new TokenError(`Unknown char ${c}`, new TokenLocation(this.loc));
        }
    }
}