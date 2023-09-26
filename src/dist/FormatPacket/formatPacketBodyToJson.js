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
exports.formatOutcomeToJson = exports.formatMarketToJson = exports.formatEventToJson = void 0;
const storeFixtures_1 = require("../StoreFixtures/storeFixtures");
const formatEventToJson = (packetArray, header, collection) => __awaiter(void 0, void 0, void 0, function* () {
    const eventId = packetArray[4];
    const category = packetArray[5];
    const subCategory = packetArray[6];
    const name = packetArray[7];
    const startTime = parseInt(packetArray[8]);
    const displayed = packetArray[9] === '1' ? true : false;
    const suspended = packetArray[10] === '1' ? true : false;
    const markets = [];
    const event = {
        header: Object.assign({}, (header)),
        body: {
            eventId,
            category,
            subCategory,
            name,
            startTime,
            displayed,
            suspended,
            markets
        }
    };
    yield (0, storeFixtures_1.storeEvent)(collection, event);
});
exports.formatEventToJson = formatEventToJson;
const formatMarketToJson = (packetArray, header, collection) => __awaiter(void 0, void 0, void 0, function* () {
    const eventId = packetArray[4];
    const marketId = packetArray[5];
    const name = packetArray[6];
    const displayed = packetArray[7] === '1' ? true : false;
    const suspended = packetArray[8] === '1' ? true : false;
    const outcomes = [];
    const market = {
        header: Object.assign({}, (header)),
        body: {
            eventId,
            marketId,
            name,
            displayed,
            suspended,
            outcomes
        }
    };
    yield (0, storeFixtures_1.storeMarket)(collection, market);
});
exports.formatMarketToJson = formatMarketToJson;
const formatOutcomeToJson = (packetArray, header, collection) => __awaiter(void 0, void 0, void 0, function* () {
    const marketId = packetArray[4];
    const outcomeId = packetArray[5];
    const name = packetArray[6];
    const price = packetArray[7];
    const displayed = packetArray[8] === '1' ? true : false;
    const suspended = packetArray[9] === '1' ? true : false;
    const outcome = {
        header: Object.assign({}, (header)),
        body: {
            marketId,
            outcomeId,
            name,
            price,
            displayed,
            suspended
        }
    };
    yield (0, storeFixtures_1.storeOutcome)(collection, outcome);
});
exports.formatOutcomeToJson = formatOutcomeToJson;
//# sourceMappingURL=formatPacketBodyToJson.js.map