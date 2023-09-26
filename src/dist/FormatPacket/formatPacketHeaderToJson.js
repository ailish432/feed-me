"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatPacketHeader = void 0;
const formatPacketHeader = (packet) => {
    const msgId = parseInt(packet[0]);
    const operation = packet[1];
    const type = packet[2];
    const timestamp = parseInt(packet[3]);
    return {
        msgId,
        operation,
        type,
        timestamp
    };
};
exports.formatPacketHeader = formatPacketHeader;
//# sourceMappingURL=formatPacketHeaderToJson.js.map