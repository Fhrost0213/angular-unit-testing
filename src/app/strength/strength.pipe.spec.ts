import { StrengthPipe } from "./strength.pipe";

describe('StrengthPipe', () => {
    it('should display weak if strength is 5', () => {
        // act
        let pipe = new StrengthPipe();

        // arrange
        let value = pipe.transform(5);

        // assert
        expect(value).toEqual('5 (weak)')
    })

    it('should display strong if strength is 10', () => {
        // act
        let pipe = new StrengthPipe();

        // arrange
        let value = pipe.transform(10);

        // assert
        expect(value).toEqual('10 (strong)')
    })

    it('should display unbelievable if strength is 20', () => {
        // act
        let pipe = new StrengthPipe();

        // arrange
        let value = pipe.transform(20);

        // assert
        expect(value).toEqual('20 (unbelievable)')
    })
})