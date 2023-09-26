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
const formatPacketBodyToJson_1 = require("@source/FormatPacket/formatPacketBodyToJson");
const storeFixtures_1 = require("@source/StoreFixtures/storeFixtures");
jest.mock('@source/StoreFixtures/storeFixtures');
const mockStoreEvent = storeFixtures_1.storeEvent;
const mockStoreMarket = storeFixtures_1.storeMarket;
const mockStoreOutcome = storeFixtures_1.storeOutcome;
describe('formatPacketBodyToJson', () => {
    const mDB = {
        collection: jest.fn(),
    };
    const collection = mDB.collection('test-collection');
    describe('formatEventToJson', () => {
        const header = {
            msgId: 2054,
            operation: 'create',
            type: 'event',
            timestamp: 1497359166352
        };
        it('should format and return PacketResponse', () => __awaiter(void 0, void 0, void 0, function* () {
            const eventPacket = ['2054', 'create', 'event', '1497359166352', 'ee4d2439-e1c5-4cb7-98ad-9879b2fd84c2', 'Football', 'Sky Bet League Two', 'Accrington vs Cambridge', '1497359216693', '0', '1'];
            yield (0, formatPacketBodyToJson_1.formatEventToJson)(eventPacket, header, collection);
            const event = {
                header: {
                    msgId: 2054,
                    operation: 'create',
                    type: 'event',
                    timestamp: 1497359166352
                },
                body: {
                    eventId: 'ee4d2439-e1c5-4cb7-98ad-9879b2fd84c2',
                    category: 'Football',
                    subCategory: 'Sky Bet League Two',
                    name: 'Accrington vs Cambridge',
                    startTime: 1497359216693,
                    displayed: false,
                    suspended: true,
                    markets: []
                }
            };
            expect(mockStoreEvent).toBeCalledWith(collection, event);
        }));
    });
    describe('formatMarketToJson', () => {
        const header = {
            msgId: 61,
            operation: 'create',
            type: 'market',
            timestamp: 1695131740241
        };
        it('should format and return PacketResponse', () => __awaiter(void 0, void 0, void 0, function* () {
            const marketPacket = ['61', 'create', 'market', '1695131740241', 'ff6b98da-c9e4-4209-8ccf-e3555b71ab32', '5d6d1450-d75d-4454-9c9e-4fc2b02c6f28', 'Goal Handicap (-1)', '0', '1'];
            yield (0, formatPacketBodyToJson_1.formatMarketToJson)(marketPacket, header, collection);
            const market = {
                header: {
                    msgId: 61,
                    operation: 'create',
                    type: 'market',
                    timestamp: 1695131740241
                },
                body: {
                    eventId: 'ff6b98da-c9e4-4209-8ccf-e3555b71ab32',
                    marketId: '5d6d1450-d75d-4454-9c9e-4fc2b02c6f28',
                    name: 'Goal Handicap (-1)',
                    displayed: false,
                    suspended: true,
                    outcomes: []
                }
            };
            expect(mockStoreMarket).toBeCalledWith(collection, market);
        }));
    });
    describe('formatOperationToJson', () => {
        const header = {
            msgId: 62,
            operation: 'create',
            type: 'outcome',
            timestamp: 1695131740241
        };
        it('should format and return PacketResponse', () => __awaiter(void 0, void 0, void 0, function* () {
            const outcomePacket = ['62', 'create', 'outcome', '1695131740241', '5d6d1450-d75d-4454-9c9e-4fc2b02c6f28', 'b4cd040b-c3dd-4a6a-9ad4-a4469358dc5d', 'Port Vale -1', '4/11', '0', '1'];
            yield (0, formatPacketBodyToJson_1.formatOutcomeToJson)(outcomePacket, header, collection);
            const outcome = {
                header: {
                    msgId: 62,
                    operation: 'create',
                    type: 'outcome',
                    timestamp: 1695131740241
                },
                body: {
                    marketId: '5d6d1450-d75d-4454-9c9e-4fc2b02c6f28',
                    outcomeId: 'b4cd040b-c3dd-4a6a-9ad4-a4469358dc5d',
                    name: 'Port Vale -1',
                    price: '4/11',
                    displayed: false,
                    suspended: true
                }
            };
            expect(mockStoreOutcome).toBeCalledWith(collection, outcome);
        }));
    });
});
//# sourceMappingURL=formatPacketBodyToJson.test.js.map