import { TokenKind } from '../../src/tokenizer';

describe("hello", function () {
    it("Should be true", function () {
        expect(TokenKind.Number).not.toEqual(TokenKind.Operator);
    });
});

