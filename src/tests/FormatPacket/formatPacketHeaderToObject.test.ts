import { formatPacketHeader } from "@source/FormatPacket/formatPacketHeaderToObject";

describe('formatPacketHeaderToObject', () => {
    it('should format and return PacketHeader', () => {
        const packetArray = ['2054', 'create', 'event', '1497359166352', 'ee4d2439-e1c5-4cb7-98ad-9879b2fd84c2', 'Football', 'Sky Bet League Two', 'Accrington vs Cambridge', '1497359216693', '0', '1'];
        const result = formatPacketHeader(packetArray);
        const expectedResult = {
            msgId: 2054,
            operation: 'create',
            type: 'event',
            timestamp: 1497359166352
        };

        expect(result).toStrictEqual(expectedResult);
    });
});
