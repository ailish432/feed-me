"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.determinePacketDataType = void 0;
const formatPacketBodyToObject_1 = require("./formatPacketBodyToObject");
const formatPacketHeaderToObject_1 = require("./formatPacketHeaderToObject");
const createSinglePacketArray_1 = require("./createSinglePacketArray");
const determinePacketDataType = (packets, collection) => {
    packets.forEach((packet) => __awaiter(void 0, void 0, void 0, function* () {
        const packetArray = (0, createSinglePacketArray_1.createSinglePacketArray)(packet);
        const packetHeader = (0, formatPacketHeaderToObject_1.formatPacketHeader)(packetArray);
        switch (packetHeader.type) {
            case 'event':
                yield (0, formatPacketBodyToObject_1.formatEventToObject)(packetArray, packetHeader, collection);
                break;
            case 'market':
                (0, formatPacketBodyToObject_1.formatMarketToObject)(packetArray, packetHeader, collection);
                break;
            case 'outcome':
                (0, formatPacketBodyToObject_1.formatOutcomeToObject)(packetArray, packetHeader, collection);
                break;
            default:
                break;
        }
    }));
};
exports.determinePacketDataType = determinePacketDataType;
//# sourceMappingURL=determinePacketDataType.js.map