"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatOutcomeToJson = exports.formatMessageToJson = exports.formatEventToJson = void 0;
const formatEventToJson = (packetArray) => {
    const eventId = packetArray[0];
    const category = packetArray[1];
    const subCategory = packetArray[2];
    const name = packetArray[3];
    const startTime = parseInt(packetArray[4]);
    const displayed = packetArray[5] === '1' ? true : false;
    const suspended = packetArray[6] === '1' ? true : false;
    return {
        eventId,
        category,
        subCategory,
        name,
        startTime,
        displayed,
        suspended
    };
};
exports.formatEventToJson = formatEventToJson;
const formatMessageToJson = (packetArray) => {
    const eventId = packetArray[0];
    const marketId = packetArray[1];
    const name = packetArray[2];
    const displayed = packetArray[3] === '1' ? true : false;
    const suspended = packetArray[4] === '1' ? true : false;
    return {
        eventId,
        marketId,
        name,
        displayed,
        suspended
    };
};
exports.formatMessageToJson = formatMessageToJson;
const formatOutcomeToJson = (packetArray) => {
    const marketId = packetArray[0];
    const outcomeId = packetArray[1];
    const name = packetArray[2];
    const price = packetArray[3];
    const displayed = packetArray[4] === '1' ? true : false;
    const suspended = packetArray[5] === '1' ? true : false;
    return {
        marketId,
        outcomeId,
        name,
        price,
        displayed,
        suspended
    };
};
exports.formatOutcomeToJson = formatOutcomeToJson;
//# sourceMappingURL=formatPacketToJson.js.map