export enum TokenKind {
    Number,
    Operator
}

export class TokenLocation {
    readonly offset : number;
    constructor(off : number) {
        this.offset = off;
    }
}

export class TokenError {
    readonly message : string;
    readonly location : TokenLocation;
    constructor(msg: string, loc : TokenLocation) {
        this.message = msg;
        this.location = loc;
    }

    GetFullErrorMessage() : string {
        return `Error at ${this.location.offset}: ${this.message}`;
    }
}

export class Token {
    readonly kind : TokenKind;
    readonly text : string;
    readonly value : any;
    readonly location : TokenLocation;

    constructor(k : TokenKind, txt : string, loc : TokenLocation) {
        this.kind = k;
        this.text = txt;
        this.location = loc;
        if (this.kind == TokenKind.Operator) {
            this.value = this.text;
        }
        else if (this.kind === TokenKind.Number) {
            this.value = parseInt(this.text);
        }
    }

    AsString() : string {
        return `${this.kind} (${this.text}) at ${this.location}`;
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
            let t = new Token(TokenKind.Operator, c, new TokenLocation(this.loc));
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
            let t = new Token(TokenKind.Number, strNum, new TokenLocation(l));
            return t;
        }
        else {
            throw new TokenError(`Unknown char ${c}`, new TokenLocation(this.loc));
        }
    }
}