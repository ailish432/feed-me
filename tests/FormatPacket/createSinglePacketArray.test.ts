import { createSinglePacketArray } from "@source/FormatPacket/createSinglePacketArray";

describe('CreateSinglePacketArray', () => {
    it('should format and return array as expected', () => {
        const packet = '|2054|create|event|1497359166352|ee4d2439-e1c5-4cb7-98ad-9879b2fd84c2|Football|Sky Bet League Two|\|Accrington\| vs \|Cambridge\||1497359216693|0|1|';
        const expectedResult = ['2054', 'create', 'event', '1497359166352', 'ee4d2439-e1c5-4cb7-98ad-9879b2fd84c2', 'Football', 'Sky Bet League Two', 'Accrington vs Cambridge', '1497359216693', '0', '1'];

        const result = createSinglePacketArray(packet);

        expect(result).toStrictEqual(expectedResult);
    });
});
