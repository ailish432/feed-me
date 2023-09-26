"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSinglePacketArray = void 0;
const createSinglePacketArray = (packet) => {
    const slicedPacket = packet.slice(1, -1);
    const packetWithoutBackslashes = slicedPacket.replace(/\\/g, '');
    const formattedPacket = packetWithoutBackslashes
        .replace(/\|\|([a-zA-Z\s]+)\|/, '|' + '$1')
        .replace(/\|([a-zA-Z\s]+)\|\|/, '$1' + '|');
    return formattedPacket.split('|');
};
exports.createSinglePacketArray = createSinglePacketArray;
//# sourceMappingURL=createSinglePacketArray.js.map