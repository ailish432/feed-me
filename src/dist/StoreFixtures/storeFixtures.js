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
exports.storeOutcome = exports.storeMarket = exports.storeEvent = void 0;
const ts_retry_1 = require("ts-retry");
const storeEvent = (collection, event) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield collection.insertOne({ event });
        console.log(`document created containing event with eventId ${event.body.eventId}`);
    }
    catch (err) {
        console.log(`document creation unsuccessful for event with eventId ${event.body.eventId}:`, err);
    }
});
exports.storeEvent = storeEvent;
const storeMarket = (collection, market) => __awaiter(void 0, void 0, void 0, function* () {
    const eventId = market.body.eventId;
    const marketId = market.body.marketId;
    yield collection.findOne({ "event.body.eventId": { $regex: `${eventId}` } });
    try {
        yield (0, ts_retry_1.retryAsync)(() => __awaiter(void 0, void 0, void 0, function* () {
            return yield collection.findOne({ "event.body.eventId": { $regex: `${eventId}` } });
        }), {
            delay: 100,
            maxTry: 3,
            until: (doc) => doc._id !== null,
        });
    }
    catch (err) {
        if ((0, ts_retry_1.isTooManyTries)(err)) {
            console.log(`could not find document for eventId ${eventId}:`, err);
        }
        else {
            console.log(`something went wrong trying to find document for eventId ${eventId}:`, err);
        }
    }
    try {
        yield collection.updateOne({ "event.body.eventId": { $regex: `${eventId}` } }, { $addToSet: { "event.body.markets": { market } } });
        console.log(`document updated with market with marketId ${marketId}`);
    }
    catch (err) {
        console.log(`document update unsuccessful for market with marketId ${marketId}:`, err);
    }
});
exports.storeMarket = storeMarket;
const storeOutcome = (collection, outcome) => __awaiter(void 0, void 0, void 0, function* () {
    const marketId = outcome.body.marketId;
    const outcomeId = outcome.body.outcomeId;
    try {
        yield (0, ts_retry_1.retryAsync)(() => __awaiter(void 0, void 0, void 0, function* () {
            const document = yield collection.findOne({ "event.body.markets": {
                    "$elemMatch": { "market.body.marketId": marketId }
                } });
            return document;
        }), {
            delay: 100,
            maxTry: 3,
            until: (doc) => doc._id !== null,
        });
    }
    catch (err) {
        if ((0, ts_retry_1.isTooManyTries)(err)) {
            console.log(`could not find document for marketId ${marketId}:`, err);
        }
        else {
            console.log(`something went wrong trying to find document for marketId ${marketId}:`, err);
        }
    }
    try {
        yield collection.updateOne({ "event.body.markets": {
                "$elemMatch": { "market.body.marketId": marketId }
            } }, { $addToSet: { "event.body.markets.$[market].market.body.outcomes": { outcome } } }, {
            arrayFilters: [
                { "market.market.body.marketId": marketId }
            ]
        });
        console.log(`document updated with outcome with outcomeId ${outcomeId}`);
    }
    catch (error) {
        console.log(`document update unsuccessful for outcome with outcomeId ${outcomeId}:`, error);
    }
});
exports.storeOutcome = storeOutcome;
//# sourceMappingURL=storeFixtures.js.map