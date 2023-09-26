"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertBufferToArray = void 0;
const convertBufferToArray = (packets) => {
    const packetString = packets.toString();
    return packetString.split('\n');
};
exports.convertBufferToArray = convertBufferToArray;
//# sourceMappingURL=convertBufferToArray.js.map