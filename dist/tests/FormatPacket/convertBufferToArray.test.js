"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const convertBufferToArray_1 = require("@source/FormatPacket/convertBufferToArray");
describe('convertBufferToArray', () => {
    it('should split input by \n and return array of results', () => {
        const bufferElement = '|2054|create|event|1497359166352|ee4d2439-e1c5-4cb7-98ad-9879b2fd84c2|Football|Sky Bet League Two|\|Accrington\| vs \|Cambridge\||1497359216693|0|1|\n|2461|create|market|1695131919506|f397cbdb-4eef-48c7-b389-6c13df45b43c|35c3bade-c3b2-4acc-86c7-5dff7c7ff70c|Goal Handicap (+2)|0|1|\n|2474|update|outcome|1695131920369|c293cafa-5c19-46ac-a472-5f8c9594782b|abab3502-dfe1-4e69-8df6-2241e49fc691|\|Milos Raonic\| to win a set|10/3|1|0|';
        const buffer = Buffer.from(bufferElement);
        const result = (0, convertBufferToArray_1.convertBufferToArray)(buffer);
        console.log(result);
        const expectedResult = ['|2054|create|event|1497359166352|ee4d2439-e1c5-4cb7-98ad-9879b2fd84c2|Football|Sky Bet League Two|\|Accrington\| vs \|Cambridge\||1497359216693|0|1|',
            '|2461|create|market|1695131919506|f397cbdb-4eef-48c7-b389-6c13df45b43c|35c3bade-c3b2-4acc-86c7-5dff7c7ff70c|Goal Handicap (+2)|0|1|',
            '|2474|update|outcome|1695131920369|c293cafa-5c19-46ac-a472-5f8c9594782b|abab3502-dfe1-4e69-8df6-2241e49fc691|\|Milos Raonic\| to win a set|10/3|1|0|'
        ];
        expect(result).toStrictEqual(expectedResult);
    });
});
//# sourceMappingURL=convertBufferToArray.test.js.map