"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formatPacketHeaderToJson_1 = require("@source/FormatPacket/formatPacketHeaderToJson");
describe('formatPacketHeaderToJson', () => {
    it('should format and return PacketHeader', () => {
        const packetArray = ['2054', 'create', 'event', '1497359166352', 'ee4d2439-e1c5-4cb7-98ad-9879b2fd84c2', 'Football', 'Sky Bet League Two', 'Accrington vs Cambridge', '1497359216693', '0', '1'];
        const result = (0, formatPacketHeaderToJson_1.formatPacketHeader)(packetArray);
        const expectedResult = {
            msgId: 2054,
            operation: 'create',
            type: 'event',
            timestamp: 1497359166352
        };
        expect(result).toStrictEqual(expectedResult);
    });
});
//# sourceMappingURL=formatPacketHeaderToJson.test.js.map